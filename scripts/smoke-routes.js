const { spawn } = require('node:child_process');

const args = process.argv.slice(2);
const baseArg = args.find((arg) => arg.startsWith('--base='));
const baseUrl = (baseArg ? baseArg.split('=')[1] : null || process.env.PRODUCTION_URL || 'http://localhost:3000').replace(/\/+$/, '');

const routes = [
  '/',
  '/home',
  '/about',
  '/gallery',
  '/videos',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/en',
  '/fr',
  '/de',
  '/robots.txt',
  '/sitemap.xml',
];

async function fetchWithTimeout(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal, redirect: 'follow' });
    const text = await response.text();
    return { ok: response.ok, status: response.status, text, url };
  } catch (error) {
    return { ok: false, status: 0, text: '', url, error: error.message };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const failures = [];

  for (const route of routes) {
    const url = `${baseUrl}${route}`;
    const result = await fetchWithTimeout(url);
    const passed = result.ok && result.status >= 200 && result.status < 400 && result.text.trim().length > 0;

    if (passed) {
      console.log(`PASS ${url} (${result.status})`);
    } else {
      console.log(`FAIL ${url} (${result.status || 'network'})`);
      failures.push({ route, result });
    }
  }

  if (failures.length > 0) {
    console.error(`Smoke checks failed for ${failures.length} route(s).`);
    process.exit(1);
  }

  console.log(`All ${routes.length} smoke checks passed for ${baseUrl}.`);
}

main();
