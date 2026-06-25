import React, { useState, useEffect } from 'react';
import SeoHead from '../components/SeoHead';

const EmailSetup = () => {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [inputPassword, setInputPassword] = useState('');

  useEffect(() => {
    // URLのハッシュ（#以降）からパスワードを取得
    // 例: https://.../email-setup#Tatsuki123-- でアクセスした場合
    const hashPassword = window.location.hash.replace('#', '');
    if (hashPassword) {
      generateProfile(hashPassword);
    }
  }, []);

  const generateProfile = (pass) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>PayloadContent</key>
	<array>
		<dict>
			<key>EmailAccountDescription</key>
			<string>MS Works</string>
			<key>EmailAccountName</key>
			<string>奥村</string>
			<key>EmailAccountType</key>
			<string>EmailTypeIMAP</string>
			<key>EmailAddress</key>
			<string>okumura-t@ms-works-kyoto.co.jp</string>
			<key>IncomingMailServerAuthentication</key>
			<string>EmailAuthPassword</string>
			<key>IncomingMailServerHostName</key>
			<string>imap.lolipop.jp</string>
			<key>IncomingMailServerPortNumber</key>
			<integer>993</integer>
			<key>IncomingMailServerUseSSL</key>
			<true/>
			<key>IncomingMailServerUsername</key>
			<string>okumura-t@ms-works-kyoto.co.jp</string>
			<key>IncomingPassword</key>
			<string>${pass}</string>
			<key>OutgoingMailServerAuthentication</key>
			<string>EmailAuthPassword</string>
			<key>OutgoingMailServerHostName</key>
			<string>smtp.lolipop.jp</string>
			<key>OutgoingMailServerPortNumber</key>
			<integer>465</integer>
			<key>OutgoingMailServerUseSSL</key>
			<true/>
			<key>OutgoingMailServerUsername</key>
			<string>okumura-t@ms-works-kyoto.co.jp</string>
			<key>OutgoingPasswordSameAsIncomingPassword</key>
			<true/>
			<key>PayloadDescription</key>
			<string>メール設定を構成します。</string>
			<key>PayloadDisplayName</key>
			<string>MS Works メール</string>
			<key>PayloadIdentifier</key>
			<string>com.apple.mail.managed.4e163574-909d-46bb-a6ab-5353f83dde74</string>
			<key>PayloadType</key>
			<string>com.apple.mail.managed</string>
			<key>PayloadUUID</key>
			<string>4e163574-909d-46bb-a6ab-5353f83dde74</string>
			<key>PayloadVersion</key>
			<real>1</real>
		</dict>
	</array>
	<key>PayloadDescription</key>
	<string>iPhoneに okumura-t@ms-works-kyoto.co.jp のメールアカウントを追加します。</string>
	<key>PayloadDisplayName</key>
	<string>MS Works メール設定</string>
	<key>PayloadIdentifier</key>
	<string>jp.co.ms-works-kyoto.email</string>
	<key>PayloadRemovalDisallowed</key>
	<false/>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>eba8f481-fd68-4264-bd33-9b42e794ca76</string>
	<key>PayloadVersion</key>
	<integer>1</integer>
</dict>
</plist>`;
    
    // Blobを作成してメモリ上に一時的なダウンロードURLを生成（サーバーには保存されない）
    const blob = new Blob([xml], { type: 'application/x-apple-aspen-config' });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setIsReady(true);
  };

  const handleManualGenerate = (e) => {
    e.preventDefault();
    if (inputPassword) {
      generateProfile(inputPassword);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <SeoHead 
        title="メール設定プロファイル | 株式会社MS-Works" 
        description="社内用メール設定プロファイルのインストールページです。"
      />
      
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-8 mt-12 border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            メール初期設定
          </h2>
          <p className="text-sm text-gray-500">
            iPhone / iPad 専用
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-md">
          <p className="text-sm text-blue-700">
            下のボタンをタップすると、iPhoneの「設定」アプリにメールアカウントが自動的に追加されます。
          </p>
        </div>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-xs text-gray-500 font-semibold">設定するメールアドレス</p>
            <p className="text-md font-medium text-gray-900 break-all">okumura-t@ms-works-kyoto.co.jp</p>
          </div>
        </div>

        {isReady ? (
          <div className="pt-6">
            <a
              href={downloadUrl}
              download="okumura-email.mobileconfig"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              プロファイルをダウンロード
            </a>
          </div>
        ) : (
          <form onSubmit={handleManualGenerate} className="pt-6 space-y-4">
            <p className="text-sm text-red-600 font-medium">セキュリティ保護のため、パスワードを入力してください。</p>
            <input
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder="パスワードを入力"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              設定ファイルを生成する
            </button>
          </form>
        )}

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">インストール手順</h3>
          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-3">
            <li>上のボタンをタップし、「許可」を選択します。</li>
            <li>iPhoneの「設定」アプリを開きます。</li>
            <li>「プロファイルがダウンロードされました」をタップします。</li>
            <li>右上の「インストール」をタップし、画面の指示に従います。</li>
            <li>完了後、標準の「メール」アプリで送受信が可能になります。</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default EmailSetup;