import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createTransport } from "npm:nodemailer@6.9.13";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EstimateData {
    id: string;
    work_type: string;
    building_type: string;
    floors: string;
    structure: string;
    area: string;
    timing: string;
    prefecture: string;
    city: string;
    customer_type: string;
    name: string;
    name_kana: string;
    phone: string;
    email: string;
    created_at: string;
}

const translateWorkType = (val: string) => {
    const types: Record<string, string> = { 'full': '建物全体の解体', 'partial': '建物の一部の解体', 'interior': '内装のみ', 'other': 'その他' };
    return types[val] || val;
};

const translateBuildingType = (val: string) => {
    const types: Record<string, string> = { 'house': '一戸建て住宅', 'apartment': 'アパート', 'mansion': 'マンション', 'building': 'ビル', 'other': 'その他' };
    return types[val] || val;
};

const translateStructure = (val: string) => {
    const types: Record<string, string> = { 'wood': '木造', 'steel': '鉄骨造', 'rc': 'RC造', 'unknown': 'わからない' };
    return types[val] || val;
};

const translateTiming = (val: string) => {
    const types: Record<string, string> = { 'asap': 'できるだけ早く', '3months': '3ヶ月以内', '6months': '半年以内', '1year': '1年以内', '1year+': '1年以上先', 'undecided': '未定' };
    return types[val] || val;
};

const translateCustomerType = (val: string) => {
    const types: Record<string, string> = { 'owner': '所有者・親族', 'buyer': '購入検討者', 'realtor': '不動産業者', 'constructor': '建設業者', 'other': 'その他' };
    return types[val] || val;
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { record } = await req.json() as { record: EstimateData };

        if (!record || !record.email) {
            console.log("No record or email found, skipping mail send.");
            return new Response(JSON.stringify({ message: "No email provided" }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            });
        }

        const transporter = createTransport({
            host: Deno.env.get("SMTP_HOST") || "smtp.lolipop.jp",
            port: parseInt(Deno.env.get("SMTP_PORT") || "465"),
            secure: true,
            auth: {
                user: Deno.env.get("SMTP_USER"),
                pass: Deno.env.get("SMTP_PASS"),
            },
        });

        // 1. Send Admin Notification Email
        const adminMailOptions = {
            from: `"${record.name} 様" <${Deno.env.get("MAIL_FROM")}>`,
            to: Deno.env.get("SMTP_USER"),
            replyTo: record.email,
            subject: `【HPお見積もり】${record.name}様より依頼がありました`,
            text: `
ホームページより新しいお見積もり依頼がありました。

■お客様情報
お名前：${record.name} (${record.name_kana}) 様
電話番号：${record.phone}
メールアドレス：${record.email}
属性：${translateCustomerType(record.customer_type)}

■工事・建物情報
工事の種類：${translateWorkType(record.work_type)}
建物の種類：${translateBuildingType(record.building_type)}
階数：${record.floors}
構造：${translateStructure(record.structure)}
延床面積：${record.area}
工事予定地：${record.prefecture} ${record.city}
希望時期：${translateTiming(record.timing)}

--------------------------------------------------
管理画面で詳細を確認してください。
      `,
            html: `
        <h2>ホームページより新しいお見積もり依頼がありました</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; text-align: left; width: 30%;">お名前</th>
            <td style="padding: 10px; border: 1px solid #ddd;">${record.name} (${record.name_kana}) 様</td>
          </tr>
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; text-align: left;">電話番号</th>
            <td style="padding: 10px; border: 1px solid #ddd;">${record.phone}</td>
          </tr>
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; text-align: left;">メールアドレス</th>
            <td style="padding: 10px; border: 1px solid #ddd;">${record.email}</td>
          </tr>
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; text-align: left;">属性</th>
            <td style="padding: 10px; border: 1px solid #ddd;">${translateCustomerType(record.customer_type)}</td>
          </tr>
        </table>
        <br>
        <h3>工事・建物情報</h3>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; text-align: left; width: 30%;">工事の種類</th>
            <td style="padding: 10px; border: 1px solid #ddd;">${translateWorkType(record.work_type)}</td>
          </tr>
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; text-align: left;">建物の種類</th>
            <td style="padding: 10px; border: 1px solid #ddd;">${translateBuildingType(record.building_type)}</td>
          </tr>
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; text-align: left;">階数</th>
            <td style="padding: 10px; border: 1px solid #ddd;">${record.floors}</td>
          </tr>
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; text-align: left;">構造</th>
            <td style="padding: 10px; border: 1px solid #ddd;">${translateStructure(record.structure)}</td>
          </tr>
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; text-align: left;">延床面積</th>
            <td style="padding: 10px; border: 1px solid #ddd;">${record.area}</td>
          </tr>
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; text-align: left;">工事予定地</th>
            <td style="padding: 10px; border: 1px solid #ddd;">${record.prefecture} ${record.city}</td>
          </tr>
           <tr>
            <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; text-align: left;">希望時期</th>
            <td style="padding: 10px; border: 1px solid #ddd;">${translateTiming(record.timing)}</td>
          </tr>
        </table>
      `,
        };

        // 2. Send Customer Confirmation Email
        const customerMailOptions = {
            from: `"株式会社M'Sworks" <${Deno.env.get("MAIL_FROM")}>`,
            to: record.email,
            subject: `【株式会社M'Sworks】お見積もり依頼ありがとうございます`,
            text: `
${record.name} 様

この度は、株式会社M'Sworksにお見積もりをご依頼いただき、誠にありがとうございます。
以下の内容で承りました。

担当者が内容を確認次第、改めてご連絡させていただきます。
今しばらくお待ちくださいませ。

--------------------------------------------------
■ご依頼内容
お名前：${record.name} 様
工事予定地：${record.prefecture} ${record.city}
工事の種類：${translateWorkType(record.work_type)}
--------------------------------------------------

※本メールは自動送信されています。
お急ぎの場合は、080-4012-3141 までお電話にてご連絡ください。

==================================================
株式会社M'Sworks (エムズワークス)
〒613-0043 京都府久世郡久御山町島田堤外2-10
TEL: 080-4012-3141 / 075-203-1283
URL: https://ms-works-kyoto.co.jp
==================================================
      `,
        };

        // Send emails
        console.log("Sending admin email...");
        await transporter.sendMail(adminMailOptions);

        console.log("Sending customer email...");
        await transporter.sendMail(customerMailOptions);

        return new Response(JSON.stringify({ success: true, message: "Emails sent successfully" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });

    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
});
