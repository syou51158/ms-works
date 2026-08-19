// head のタイトル・meta・canonical・JSON-LD を直接更新するユーティリティ。
//
// react-helmet-async (v2.0.5) はこの構成で副作用が一切発火せず、
// タイトルも canonical もページごとに切り替わらなかったため、
// SEO タグは自前で管理している。
// 既存のタグがあれば上書きするので、index.html の静的タグと重複しない。

export function setTitle(title) {
    if (title) document.title = title;
}

export function upsertMeta(attr, key, content) {
    if (!content) return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

export function upsertLink(rel, href) {
    if (!href) return;
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
}

// ページ固有の構造化データ。id ごとに1つだけ存在させ、
// アンマウント時は null を渡して取り除く。
export function upsertJsonLd(id, data) {
    let el = document.getElementById(id);
    if (!data) {
        if (el) el.remove();
        return;
    }
    if (!el) {
        el = document.createElement('script');
        el.type = 'application/ld+json';
        el.id = id;
        document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
}
