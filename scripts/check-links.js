const fs = require('node:fs');
const path = require('node:path');

const args = process.argv.slice(2);
const baseArg = args.find((arg) => arg.startsWith('--base='));
const baseUrl = (baseArg ? baseArg.split('=')[1] : null || process.env.PRODUCTION_URL || 'http://localhost:3000').replace(/\/+$/, '');

const directories = ['src', 'app', 'public'];
const sitePaths = new Set(['/', '/home', '/about', '/gallery', '/videos', '/contact', '/privacy', '/terms', '/cookies', '/en', '/fr', '/de']);

function collectFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath));
    } else if (/\.(ts|tsx|js|jsx|md|mdx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = directories.flatMap((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  return fs.existsSync(fullPath) ? collectFiles(fullPath) : [];
});

const matches = new Set();
const hrefPattern = /(?:href|to)=['"]([^'"]+)['"]/g;

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(hrefPattern)) {
    const value = match[1];
    if (!value || value.startsWith('http') || value.startsWith('#') || value.startsWith('mailto:') || value.startsWith('tel:')) {
      continue;
    }

    if (value.includes('?')) {
      continue;
    }

    if (value.startsWith('/')) {
      matches.add(value);
    }
  }
}

const pathsToCheck = [...new Set([...sitePaths, ...[...matches].filter((value) => value.startsWith('/'))])].sort();

async function checkUrl(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, { signal: controller.signal, redirect: 'follow' });
    return { ok: response.ok, status: response.status };
  } catch (error) {
    return { ok: false, status: 0, error: error.message };
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  const failures = [];

  for (const route of pathsToCheck) {
    const result = await checkUrl(`${baseUrl}${route}`);
    if (result.ok) {
      console.log(`PASS ${route} (${result.status})`);
    } else {
      console.log(`FAIL ${route} (${result.status || 'network'})`);
      failures.push({ route, result });
    }
  }

  if (failures.length > 0) {
    console.error(`Broken links found: ${failures.length}`);
    process.exit(1);
  }

  console.log(`All ${pathsToCheck.length} internal routes responded successfully.`);
}

main();
