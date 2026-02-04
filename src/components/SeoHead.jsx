import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function SeoHead() {
    const location = useLocation();
    const [meta, setMeta] = useState({
        title: "M'S Works | 京都府久世郡の解体工事",
        description: "株式会社M'S Worksは京都府久世郡を拠点に、解体工事を専門に行う建設会社です。安全・安心・丁寧な施工をお約束します。",
        ogImage: "https://ms-works-kyoto.co.jp/assets/images/ogp_main.png"
    });

    useEffect(() => {
        const fetchSeo = async () => {
            // Remove trailing slash for consistency (except root)
            let path = location.pathname;
            if (path !== '/' && path.endsWith('/')) {
                path = path.slice(0, -1);
            }

            const { data, error } = await supabase
                .from('seo_settings')
                .select('*')
                .eq('page_path', path)
                .single();

            if (data && !error) {
                setMeta({
                    title: data.title || meta.title,
                    description: data.description || meta.description,
                    ogImage: data.og_image_url || meta.ogImage
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
            <meta property="og:url" content={`https://ms-works-kyoto.co.jp${location.pathname}`} />
            <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
    );
}
