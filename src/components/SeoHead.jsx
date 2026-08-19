import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { areas } from '../data/areas';
import { setTitle, upsertMeta, upsertLink } from '../lib/seo';

const SITE = 'https://www.ms-works-kyoto.co.jp';
const DEFAULT_OG_IMAGE = "https://ms-works-kyoto.co.jp/assets/images/ogp_main.png";

// DBにSEO設定が無いページ用のデフォルト (検索キーワードを意識したページ別メタ)
const PAGE_DEFAULTS = {
    '/': {
        title: "株式会社M'Sworks | 京都の解体工事専門会社【見積もり無料】",
        description: "京都の解体工事なら株式会社M'Sworksへ。木造・鉄骨・RC造の建物解体から内装解体まで一貫対応。京都府久世郡久御山町を拠点に京都市内・府内全域対応。お見積もり無料。"
    },
    '/guide': {
        title: "京都の解体工事 費用相場・補助金ガイド | 株式会社M'Sworks",
        description: "京都で家の解体を検討中の方へ。木造・鉄骨・RC造の解体費用の目安、費用が変わるポイント、空き家解体の補助金、工事の流れまで解体のプロがわかりやすく解説します。"
    },
    '/estimate': {
        title: "解体工事の無料お見積もり | 京都の解体専門 株式会社M'Sworks",
        description: "京都の解体工事の無料見積もりフォーム。建物の種類・構造・広さを選ぶだけの簡単入力。2営業日以内に担当者よりご連絡します。"
    },
    '/service': {
        title: "事業案内 | 木造・鉄骨・RC解体 株式会社M'Sworks",
        description: "株式会社M'Sworksの事業案内。木造家屋の解体、鉄骨造・RC造の解体、内装解体、残置物撤去まで、京都の解体工事をワンストップで対応します。"
    },
    '/works': {
        title: "施工実績 | 京都の解体工事 株式会社M'Sworks",
        description: "株式会社M'Sworksの解体工事の施工実績一覧。京都府内の戸建て・アパート・店舗などの解体事例をご紹介します。"
    },
    '/about': {
        title: "会社情報 | 株式会社M'Sworks(京都府久世郡久御山町)",
        description: "京都の解体工事専門会社、株式会社M'Sworksの会社情報。代表挨拶、会社概要、アクセスをご紹介します。"
    },
    '/contact': {
        title: "お問い合わせ | 京都の解体工事 株式会社M'Sworks",
        description: "解体工事のご相談・お見積もり依頼はこちら。お電話(080-4012-3141)またはメールフォームでお気軽にお問い合わせください。"
    },
    '/news': {
        title: "お知らせ | 株式会社M'Sworks",
        description: "株式会社M'Sworksからのお知らせ一覧です。"
    },
    '/recruit': {
        title: "採用情報 | 京都の解体工事 株式会社M'Sworks",
        description: "株式会社M'Sworksでは解体工事の現場スタッフを募集しています。未経験者歓迎。京都で一緒に働く仲間をお待ちしています。"
    }
};

function defaultsFor(path) {
    // 地域別ページ (/area/:slug) は areas.js のデータから組み立てる
    if (path.startsWith('/area/')) {
        const area = areas.find((a) => a.slug === path.slice('/area/'.length));
        if (area) {
            return { title: area.title, description: area.description, ogImage: DEFAULT_OG_IMAGE };
        }
    }
    const d = PAGE_DEFAULTS[path] || PAGE_DEFAULTS['/'];
    return { title: d.title, description: d.description, ogImage: DEFAULT_OG_IMAGE };
}

export default function SeoHead({ title, description, image }) {
    const location = useLocation();
    const [meta, setMeta] = useState(() => defaultsFor(location.pathname));

    useEffect(() => {
        // Remove trailing slash for consistency (except root)
        let path = location.pathname;
        if (path !== '/' && path.endsWith('/')) {
            path = path.slice(0, -1);
        }

        const defaults = defaultsFor(path);
        setMeta(defaults);

        // 遷移が速いと古いレスポンスが後から届くので、その場合は捨てる
        let cancelled = false;

        const fetchSeo = async () => {
            const { data, error } = await supabase
                .from('seo_settings')
                .select('*')
                .eq('page_path', path)
                .single();

            if (cancelled) return;

            if (data && !error) {
                setMeta({
                    title: data.title || defaults.title,
                    description: data.description || defaults.description,
                    ogImage: data.og_image_url || defaults.ogImage
                });
            }
        };

        fetchSeo();

        return () => { cancelled = true; };
    }, [location.pathname]);

    // head へ反映する。呼び出し側から props で渡された場合はそちらを優先する。
    useEffect(() => {
        const t = title || meta.title;
        const d = description || meta.description;
        const img = image || meta.ogImage;
        const path = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '');
        const url = `${SITE}${path}`;

        setTitle(t);
        upsertMeta('name', 'description', d);
        upsertMeta('property', 'og:title', t);
        upsertMeta('property', 'og:description', d);
        upsertMeta('property', 'og:image', img);
        upsertMeta('property', 'og:url', url);
        upsertMeta('name', 'twitter:card', 'summary_large_image');
        upsertMeta('name', 'twitter:title', t);
        upsertMeta('name', 'twitter:description', d);
        upsertMeta('name', 'twitter:image', img);
        upsertLink('canonical', url);
    }, [meta, title, description, image, location.pathname]);

    return null;
}
