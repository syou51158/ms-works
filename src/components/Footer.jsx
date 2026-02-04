import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div>
                        <div className="footer-logo">M'S<span>works</span></div>
                        <address className="footer-address">
                            <strong>株式会社M'Sworks</strong><br />
                            【本社】〒613-0043 京都府久世郡久御山町島田堤外2-10<br />
                            【八幡】〒614-8001 京都府八幡市八幡科手4<br />
                            TEL: 080-4012-3141 / 075-203-1283
                        </address>
                    </div>
                    <div className="footer-links">
                        <h4>メニュー</h4>
                        <ul>
                            <li><Link to="/">ホーム</Link></li>
                            <li><Link to="/about">会社情報</Link></li>
                            <li><Link to="/service">事業案内</Link></li>
                            <li><Link to="/works">施工実績</Link></li>
                            <li><Link to="/contact">お問い合わせ</Link></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>その他</h4>
                        <ul>
                            <li><Link to="/news">お知らせ</Link></li>
                            <li><Link to="/recruit">採用情報</Link></li>
                            <li><Link to="#">プライバシーポリシー</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    &copy; 2023 M'Sworks Co., Ltd. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
