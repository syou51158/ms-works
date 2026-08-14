// 流入元トラッキング
// 初回訪問時に「どこから来たか」を localStorage に保存し、
// 見積もり・お問い合わせ送信時に DB へ記録する。
// 紹介手数料の根拠となるため、送信データには必ず添付すること。

const STORAGE_KEY = 'msw_attribution_v1';

function detectChannel({ utmSource, utmMedium, gclid, referrer, userAgent }) {
    const src = (utmSource || '').toLowerCase();
    const medium = (utmMedium || '').toLowerCase();

    // 広告経由 (URLに gclid か utm_medium=cpc 等が付いている)
    if (gclid) return 'google_ads';
    if (['cpc', 'ppc', 'paid'].includes(medium)) return src ? `paid_${src}` : 'paid';

    // UTMで明示されている場合はそれを優先 (例: LINE配信 ?utm_source=line)
    if (src) return src;

    // LINEアプリ内ブラウザはリファラが空でもUAで判別できる
    if (/Line\//i.test(userAgent || '')) return 'line';

    if (!referrer) return 'direct';

    let host = '';
    try {
        host = new URL(referrer).hostname;
    } catch {
        return 'direct';
    }

    if (/google\./.test(host)) return 'google_organic';
    if (/yahoo\./.test(host)) return 'yahoo_organic';
    if (/bing\./.test(host)) return 'bing_organic';
    if (/instagram\.com$/.test(host)) return 'instagram';
    if (/facebook\.com$/.test(host)) return 'facebook';
    if (/^t\.co$/.test(host) || /twitter\.com$/.test(host) || /^x\.com$/.test(host)) return 'twitter';
    if (/line\.me$/.test(host)) return 'line';

    return `referral:${host}`;
}

// アプリ起動時に一度だけ呼ぶ。初回訪問の情報 (ファーストタッチ) を保存する。
// 既に保存済みなら上書きしない — 「最初にどこから見つけたか」が手数料の根拠になるため。
export function captureAttribution() {
    try {
        if (localStorage.getItem(STORAGE_KEY)) return;

        const params = new URLSearchParams(window.location.search);
        const referrer = document.referrer || '';
        // 自サイト内遷移のリファラは流入元ではないので無視
        const isInternal = referrer && referrer.includes(window.location.hostname);

        const data = {
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            gclid: params.get('gclid') || '',
            referrer: isInternal ? '' : referrer,
            landing_page: window.location.pathname + window.location.search,
            first_visit_at: new Date().toISOString(),
            device: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
        };

        data.channel = detectChannel({
            utmSource: data.utm_source,
            utmMedium: data.utm_medium,
            gclid: data.gclid,
            referrer: data.referrer,
            userAgent: navigator.userAgent
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('Attribution capture failed:', e);
    }
}

// フォーム送信時に DB へ入れる流入元カラム一式を返す
export function getAttributionData() {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return {
            lead_source: 'website',
            channel: stored.channel || 'unknown',
            referrer: stored.referrer || '',
            landing_page: stored.landing_page || '',
            utm_source: stored.utm_source || '',
            utm_medium: stored.utm_medium || '',
            utm_campaign: stored.utm_campaign || '',
            first_visit_at: stored.first_visit_at || null,
            device: stored.device || ''
        };
    } catch {
        return { lead_source: 'website', channel: 'unknown' };
    }
}

// DB側にまだ流入元カラムが無い場合の insert 失敗を判定 (移行期間のフォールバック用)
export function isMissingColumnError(error) {
    return error && (error.code === '42703' || /column/i.test(error.message || ''));
}

// 管理画面表示用の日本語ラベル
export function channelLabel(channel) {
    if (!channel) return '不明';
    if (channel.startsWith('referral:')) return `他サイト (${channel.slice(9)})`;
    if (channel.startsWith('paid_')) return `広告 (${channel.slice(5)})`;
    const map = {
        google_organic: 'Google検索',
        yahoo_organic: 'Yahoo!検索',
        bing_organic: 'Bing検索',
        google_ads: 'Google広告',
        line: 'LINE',
        instagram: 'Instagram',
        facebook: 'Facebook',
        twitter: 'X (Twitter)',
        direct: '直接アクセス',
        unknown: '不明'
    };
    return map[channel] || channel;
}
