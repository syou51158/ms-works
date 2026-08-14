import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

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
    const d = PAGE_DEFAULTS[path] || PAGE_DEFAULTS['/'];
    return { title: d.title, description: d.description, ogImage: DEFAULT_OG_IMAGE };
}

export default function SeoHead() {
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

        const fetchSeo = async () => {
            const { data, error } = await supabase
                .from('seo_settings')
                .select('*')
                .eq('page_path', path)
                .single();

            if (data && !error) {
                setMeta({
                    title: data.title || defaults.title,
                    description: data.description || defaults.description,
                    ogImage: data.og_image_url || defaults.ogImage
                });
            }
        };

        fetchSeo();
    }, [location.pathname]);

    return (
        <Helmet>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:image" content={meta.ogImage} />
            <meta property="og:url" content={`https://www.ms-works-kyoto.co.jp${location.pathname}`} />
            <link rel="canonical" href={`https://www.ms-works-kyoto.co.jp${location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '')}`} />
            <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
    );
}
