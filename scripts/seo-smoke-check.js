const siteUrl = (process.env.PRODUCTION_URL || 'https://cannix.be').replace(/\/+$/, '');
const paths = ['/', '/robots.txt', '/sitemap.xml'];

async function main() {
  const results = [];

  for (const path of paths) {
    const url = `${siteUrl}${path}`;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(url, { signal: controller.signal, redirect: 'follow' });
      clearTimeout(timeout);
      const body = await response.text();
      const ok = response.ok && body.trim().length > 0;
      results.push({ path, ok, status: response.status, url });
      console.log(`${ok ? '✅' : '❌'} ${url} -> ${response.status}`);
    } catch (error) {
      results.push({ path, ok: false, status: 0, url, error: error.message });
      console.log(`❌ ${url} -> ERROR (${error.message})`);
    }
  }

  const failed = results.filter((r) => !r.ok);
  if (failed.length > 0) {
    console.error(`SEO smoke check failed for ${failed.length} route(s).`);
    process.exit(1);
  }

  console.log('✅ SEO smoke check passed for production URLs.');
}

main();
