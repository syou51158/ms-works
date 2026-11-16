// 変更後のサイトをビルドして、PC とスマホのスクリーンショットを撮るスクリプト。
// AI が「公開前の見た目」を確認・共有するために使う。
//
// 使い方:
//   node scripts/screenshot.cjs                 # トップページ
//   node scripts/screenshot.cjs / /works /guide # 複数ページ
//
// 出力先: .screenshots/（Git には入らない）
//
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY が環境変数にあれば本物のデータで表示する。
// 無い場合はダミー値でビルドする（ページは表示されるが、施工実績・お知らせ一覧は空になる）。
// Playwright が必要（Claude Code のクラウド環境には最初から入っている）。

const { spawn, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

let chromium, devices;
try {
    ({ chromium, devices } = require('playwright'));
} catch {
    console.error('Playwright が見つかりません。Claude Code のクラウド環境で実行するか、`npm i -D playwright` で入れてください。');
    process.exit(1);
}

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, '.screenshots');
const PORT = 4173;
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];

const env = { ...process.env };
if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
    console.warn('※ Supabase の接続情報が無いのでダミー値でビルドします（DB のデータは表示されません）。');
    env.VITE_SUPABASE_URL = 'http://127.0.0.1:54321';
    env.VITE_SUPABASE_ANON_KEY = 'placeholder';
}

const build = spawnSync('npx', ['vite', 'build'], { cwd: ROOT, env, stdio: 'inherit' });
if (build.status !== 0) {
    console.error('ビルドに失敗しました。上のエラーを確認してください。');
    process.exit(1);
}

async function waitForServer(url, timeoutMs = 20000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        try {
            const res = await fetch(url);
            if (res.ok) return;
        } catch { /* まだ起動していない */ }
        await new Promise((r) => setTimeout(r, 300));
    }
    throw new Error(`プレビューサーバーが起動しませんでした: ${url}`);
}

// スクロールで表示されるアニメーション要素を出し切ってから撮る
async function revealLazyContent(page) {
    await page.evaluate(async () => {
        const step = Math.max(200, Math.floor(window.innerHeight / 2));
        for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
}

function fileName(p) {
    const name = p.replace(/^\/+|\/+$/g, '').replace(/[^a-zA-Z0-9_-]+/g, '_');
    return name || 'home';
}

(async () => {
    const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
        cwd: ROOT, env, stdio: 'ignore',
    });
    const base = `http://localhost:${PORT}`;
    let browser;
    try {
        await waitForServer(base);
        fs.mkdirSync(OUT_DIR, { recursive: true });
        browser = await chromium.launch();
        const viewports = {
            desktop: { viewport: { width: 1366, height: 900 } },
            mobile: { ...devices['iPhone 13'] },
        };
        for (const p of pages) {
            for (const [label, options] of Object.entries(viewports)) {
                const context = await browser.newContext(options);
                const page = await context.newPage();
                await page.goto(base + p, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
                await revealLazyContent(page);
                const out = path.join(OUT_DIR, `${fileName(p)}-${label}.jpg`);
                await page.screenshot({ path: out, fullPage: true, type: 'jpeg', quality: 70 });
                console.log(out);
                await context.close();
            }
        }
    } finally {
        if (browser) await browser.close();
        server.kill();
    }
})().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
});
