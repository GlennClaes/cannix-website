const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ============ CONFIGURATIE ============
const BACKLOGS = {
    security: '../obsidian-vault/06-Security-Backlog.md',
    seo: '../obsidian-vault/01-SEO-Backlog.md',
    performance: '../obsidian-vault/02-Performance-Backlog.md',
    a11y: '../obsidian-vault/07-Accessibility-Backlog.md',
    quality: '../obsidian-vault/08-Code-Quality-Backlog.md',
};
const DASHBOARD = '../obsidian-vault/09-Analytics-Dashboard.md';
const LOG_DIR = '../obsidian-vault/05-Nightly-Run-Log';

const THRESHOLDS = {
    maxBuildTime: 180000,      // 3 minuten
    maxBundleSize: 250 * 1024, // 250 KB
    minLighthouseScore: 0.90,
};

const NIGHTLY_TASKS = [
    { id: 'security-audit', name: 'Security Audit', cmd: 'npm audit --omit=dev --audit-level=high', critical: true },
    { id: 'lint', name: 'ESLint', cmd: 'npm run lint', critical: true },
    { id: 'typecheck', name: 'TypeScript', cmd: 'npm run typecheck', critical: true },
    { id: 'build', name: 'Production Build', cmd: 'npm run build', critical: true },
    { id: 'bundle-check', name: 'Bundle Size Check', cmd: 'node scripts/check-bundle-size.js', critical: true },
    { id: 'lighthouse', name: 'Lighthouse CI', cmd: 'npx @lhci/cli@latest autorun --collect.startServerCommand="npm run start"', critical: false },
    // The dedicated GitHub Actions workflow performs the authoritative secrets scan.
    { id: 'secrets-scan', name: 'Secrets Scan', cmd: 'npx trufflehog filesystem . --fail', critical: false },
    { id: 'dep-check', name: 'Unused Dependencies', cmd: 'npx depcheck', critical: false },
];

// ============ HELPERS ============
function getLogFile() {
    const dateStr = new Date().toISOString().split('T')[0];
    if (!fs.existsSync(path.join(__dirname, LOG_DIR))) {
        fs.mkdirSync(path.join(__dirname, LOG_DIR), { recursive: true });
    }
    return path.join(__dirname, LOG_DIR, `${dateStr}.md`);
}

function log(msg, level = 'INFO') {
    const time = new Date().toLocaleTimeString('nl-BE');
    const line = `[${time}] [${level}] ${msg}\n`;
    console.log(line.trim());
    fs.appendFileSync(getLogFile(), line);
}

function safeRun(cmd, timeout = 120000) {
    try {
        const out = execSync(cmd, {
            encoding: 'utf-8',
            stdio: 'pipe',
            timeout,
            cwd: path.join(__dirname, '..')
        });
        return { ok: true, out: out.trim() };
    } catch (err) {
        return { ok: false, err: (err.stderr || err.message || '').trim() };
    }
}

function countOpenTasks(filePath) {
    const fullPath = path.join(__dirname, filePath);
    if (!fs.existsSync(fullPath)) return 0;
    return fs.readFileSync(fullPath, 'utf-8')
        .split('\n')
        .filter(l => l.trim().startsWith('- [ ]')).length;
}

function updateDashboard(results) {
    const fullPath = path.join(__dirname, DASHBOARD);
    const today = new Date().toISOString().split('T')[0];
    const passed = results.filter(r => r.ok).length;
    const failed = results.filter(r => !r.ok).length;
    const criticalFailed = results.filter(r => !r.ok && r.critical).length;

    const status = criticalFailed > 0 ? '🔴 CRITICAL' : failed > 0 ? '🟡 WARNING' : '🟢 OK';
    const line = `| ${today} | ${status} | ${passed}/${results.length} | ${results.find(r=>r.id==='lighthouse')?.ok ? '✅'  : '⏭️'} | ${results.find(r=>r.id==='secrets-scan')?.ok ? '🟢' : '🔴'} |\n`;

    if (fs.existsSync(fullPath)) fs.appendFileSync(fullPath, line);
}

// ============ MAIN LOOP ============
async function main() {
    log("==================================================");
    log("🚀 NACHTELIJKE ENTERPRISE AUTOMATISERING v2.0");
    log("==================================================");

    const startTime = Date.now();
    const results = [];

    // Voer alle taken uit
    for (const task of NIGHTLY_TASKS) {
        log(`▶️ Start: ${task.name}...`);
        const result = safeRun(task.cmd, task.id === 'build' ? THRESHOLDS.maxBuildTime : 120000);
        result.id = task.id;
        result.critical = task.critical;
        results.push(result);

        if (result.ok) {
            log(`✅  ${task.name}: GESLAAGD`);
        } else {
            log(`❌  ${task.name}: GEMISLUKT - ${result.err.substring(0, 200)}`, task.critical ? 'ERROR' : 'WARN');
        }
    }

    // Check of kritieke taken geslaagd zijn
    const criticalFailed = results.filter(r => !r.ok && r.critical).length;

    if (criticalFailed > 0) {
        log(`🛑 ${criticalFailed} KRITIEKE TAKEN GEMISLUKT - Loop beëindigd om breuk te voorkomen`, 'ERROR');
    } else {
        log("🎉 Alle kritieke checks geslaagd! Applicatie is productieklaar.");
    }

    // Backlog statistieken
    const stats = {};
    let totalOpen = 0;
    for (const [key, file] of Object.entries(BACKLOGS)) {
        stats[key] = countOpenTasks(file);
        totalOpen += stats[key];
    }

    // Update dashboard
    updateDashboard(results);

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    log(`⏱️ Totale duur: ${duration}s`);
    log(`📋 Open taken: ${totalOpen} (Sec: ${stats.security}, SEO: ${stats.seo}, Perf: ${stats.performance}, A11y: ${stats.a11y}, Qual: ${stats.quality})`);
    log("==================================================");
    log("🏁 NACHTELIJKE LOOP VOLTOOID");
    log("==================================================");

    // Exit code voor CI
    process.exit(criticalFailed > 0 ? 1 : 0);
}

main().catch(err => {
    log(`💥 ONVERWACHTE FOUT: ${err.message}`, 'FATAL');
    process.exit(1);
});