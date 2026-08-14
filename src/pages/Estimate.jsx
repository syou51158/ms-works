import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getAttributionData, isMissingColumnError } from '../lib/attribution';

export default function Estimate() {
    const [formData, setFormData] = useState({
        workType: '',
        buildingType: '',
        floors: '',
        structure: '',
        area: '',
        timing: '',
        prefecture: '',
        city: '',
        customerType: '',
        name: '',
        nameKana: '',
        phone: '',
        email: '',
        agreed: false
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing/selecting
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
        if (submitError) setSubmitError('');
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.workType) newErrors.workType = '工事の種類を選択してください';
        if (!formData.buildingType) newErrors.buildingType = '建物の種類を選択してください';
        if (!formData.floors) newErrors.floors = '建物の階数を選択してください';
        if (!formData.structure) newErrors.structure = '建物の構造を選択してください';
        if (!formData.area) newErrors.area = '延床面積を選択してください';
        if (!formData.timing) newErrors.timing = '工事希望時期を選択してください';
        if (!formData.prefecture) newErrors.prefecture = '都道府県を選択してください';
        if (!formData.customerType) newErrors.customerType = 'お客様の属性を選択してください';
        if (!formData.name) newErrors.name = 'お名前を入力してください';
        if (!formData.nameKana) newErrors.nameKana = 'お名前（ふりがな）を入力してください';
        if (!formData.phone) newErrors.phone = '電話番号を入力してください';
        if (!formData.agreed) newErrors.agreed = '個人情報保護方針に同意してください';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setLoading(true);
        setSubmitError('');

        try {
            // 1. Prepare data for DB (convert to snake_case)
            const dbData = {
                work_type: formData.workType,
                building_type: formData.buildingType,
                floors: formData.floors,
                structure: formData.structure,
                area: formData.area,
                timing: formData.timing,
                prefecture: formData.prefecture,
                city: formData.city,
                customer_type: formData.customerType,
                name: formData.name,
                name_kana: formData.nameKana,
                phone: formData.phone,
                email: formData.email,
                status: 'pending'
            };

            // 2. Insert into Supabase DB (流入元トラッキング付き)
            let { data, error: dbError } = await supabase
                .from('estimates')
                .insert([{ ...dbData, ...getAttributionData() }])
                .select();

            // DB側に流入元カラムが未追加の場合は従来形式で再送信
            if (dbError && isMissingColumnError(dbError)) {
                console.warn('Attribution columns missing, retrying without them:', dbError.message);
                ({ data, error: dbError } = await supabase
                    .from('estimates')
                    .insert([dbData])
                    .select());
            }

            if (dbError) throw dbError;

            // 3. Call Edge Function to send email
            try {
                const { error: funcError } = await supabase.functions.invoke('send-estimate-mail', {
                    body: { record: data[0] }
                });

                if (funcError) {
                    console.warn('Mail send failed but data saved:', funcError);
                }
            } catch (mailErr) {
                console.warn('Mail invoke error:', mailErr);
            }

            setSubmitted(true);
            window.scrollTo(0, 0);

        } catch (error) {
            console.error('Submission error:', error);
            setSubmitError('申し訳ありません。送信中にエラーが発生しました。時間をおいて再度お試しいただくか、お電話にてお問い合わせください。');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <>
                <PageHeader
                    title="お見積もり"
                    subtitle="ESTIMATE"
                    image="/assets/images/header_estimate_clean_v2.png"
                />
                <section className="section">
                    <div className="container" style={{ maxWidth: '800px', textAlign: 'center', padding: '80px 20px' }}>
                        <div style={{ fontSize: '4rem', color: 'var(--color-accent)', marginBottom: '30px' }}>
                            <CheckCircle2 size={80} style={{ margin: '0 auto' }} />
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>
                            お見積もり依頼を受け付けました
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '40px', lineHeight: '1.8' }}>
                            この度は、お見積もり依頼をいただきありがとうございます。<br />
                            担当者より2営業日以内にご連絡させていただきます。<br />
                            しばらくお待ちくださいませ。
                        </p>
                        <a href="/" className="btn btn-primary">トップページに戻る</a>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <PageHeader
                title="お見積もり"
                subtitle="ESTIMATE"
                image="/assets/images/header_estimate_clean_v2.png"
            />

            <section className="section" style={{ background: '#f8f9fa' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>

                    {/* Introduction */}
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>
                            簡単3分！お見積もりフォーム
                        </h2>
                        <p style={{ color: '#666', lineHeight: '1.8' }}>
                            画像をクリックして選んでいくだけで、簡単にお見積もり依頼ができます。<br />
                            お気軽にご利用ください。
                        </p>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', marginTop: '20px', padding: '15px 30px', background: '#e8f4f8', borderRadius: '50px' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>✓ 無料</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>✓ 営業電話なし</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>✓ 最短3分</span>
                        </div>
                    </div>

                    {submitError && (
                        <div style={{
                            background: '#fee2e2',
                            border: '1px solid #ef4444',
                            borderRadius: '8px',
                            padding: '15px',
                            marginBottom: '30px',
                            color: '#b91c1c',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <AlertCircle size={24} />
                            <div>{submitError}</div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
                        {loading && (
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(255,255,255,0.7)',
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '12px'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <Loader2 className="animate-spin" size={50} color="var(--color-primary)" />
                                    <p style={{ marginTop: '15px', fontWeight: 'bold', color: 'var(--color-primary)' }}>送信中...</p>
                                </div>
                            </div>
                        )}

                        {/* 工事の種類 */}
                        <FormSection
                            title="工事の種類"
                            required
                            error={errors.workType}
                        >
                            <ImageChoiceGrid>
                                <ImageChoice
                                    image="/assets/images/estimate/icon_demolition_full.png"
                                    label="建物全体の解体"
                                    selected={formData.workType === 'full'}
                                    onClick={() => handleChange('workType', 'full')}
                                />
                                <ImageChoice
                                    image="/assets/images/estimate/icon_demolition_partial.png"
                                    label="建物の一部の解体"
                                    selected={formData.workType === 'partial'}
                                    onClick={() => handleChange('workType', 'partial')}
                                />
                                <ImageChoice
                                    image="/assets/images/estimate/icon_interior.png"
                                    label="内装のみ"
                                    selected={formData.workType === 'interior'}
                                    onClick={() => handleChange('workType', 'interior')}
                                />
                                <ImageChoice
                                    icon="📋"
                                    label="その他"
                                    selected={formData.workType === 'other'}
                                    onClick={() => handleChange('workType', 'other')}
                                />
                            </ImageChoiceGrid>
                        </FormSection>

                        {/* 建物の種類 */}
                        <FormSection
                            title="建物の種類"
                            required
                            error={errors.buildingType}
                        >
                            <ImageChoiceGrid>
                                <ImageChoice
                                    image="/assets/images/estimate/icon_house.png"
                                    label="一戸建て住宅"
                                    selected={formData.buildingType === 'house'}
                                    onClick={() => handleChange('buildingType', 'house')}
                                />
                                <ImageChoice
                                    image="/assets/images/estimate/icon_apartment.png"
                                    label="アパート"
                                    selected={formData.buildingType === 'apartment'}
                                    onClick={() => handleChange('buildingType', 'apartment')}
                                />
                                <ImageChoice
                                    icon="🏢"
                                    label="マンション"
                                    selected={formData.buildingType === 'mansion'}
                                    onClick={() => handleChange('buildingType', 'mansion')}
                                />
                                <ImageChoice
                                    icon="🏛️"
                                    label="ビル"
                                    selected={formData.buildingType === 'building'}
                                    onClick={() => handleChange('buildingType', 'building')}
                                />
                                <ImageChoice
                                    icon="📋"
                                    label="その他"
                                    selected={formData.buildingType === 'other'}
                                    onClick={() => handleChange('buildingType', 'other')}
                                />
                            </ImageChoiceGrid>
                        </FormSection>

                        {/* 建物の階数 */}
                        <FormSection
                            title="建物の階数"
                            required
                            error={errors.floors}
                        >
                            <ButtonChoiceGrid>
                                <ButtonChoice
                                    label="1階建"
                                    selected={formData.floors === '1'}
                                    onClick={() => handleChange('floors', '1')}
                                />
                                <ButtonChoice
                                    label="2階建"
                                    selected={formData.floors === '2'}
                                    onClick={() => handleChange('floors', '2')}
                                />
                                <ButtonChoice
                                    label="3階建"
                                    selected={formData.floors === '3'}
                                    onClick={() => handleChange('floors', '3')}
                                />
                                <ButtonChoice
                                    label="4階建以上"
                                    selected={formData.floors === '4+'}
                                    onClick={() => handleChange('floors', '4+')}
                                />
                            </ButtonChoiceGrid>
                        </FormSection>

                        {/* 建物の構造 */}
                        <FormSection
                            title="建物の構造"
                            required
                            error={errors.structure}
                        >
                            <ImageChoiceGrid>
                                <ImageChoice
                                    icon="🌲"
                                    label="木造"
                                    selected={formData.structure === 'wood'}
                                    onClick={() => handleChange('structure', 'wood')}
                                />
                                <ImageChoice
                                    icon="🏗️"
                                    label="鉄骨造"
                                    selected={formData.structure === 'steel'}
                                    onClick={() => handleChange('structure', 'steel')}
                                />
                                <ImageChoice
                                    icon="🧱"
                                    label="RC造"
                                    description="鉄筋コンクリート"
                                    selected={formData.structure === 'rc'}
                                    onClick={() => handleChange('structure', 'rc')}
                                />
                                <ImageChoice
                                    icon="❓"
                                    label="わからない"
                                    selected={formData.structure === 'unknown'}
                                    onClick={() => handleChange('structure', 'unknown')}
                                />
                            </ImageChoiceGrid>
                        </FormSection>

                        {/* 延床面積 */}
                        <FormSection
                            title="延床面積"
                            required
                            error={errors.area}
                        >
                            <ButtonChoiceGrid columns={3}>
                                {['1〜10坪', '11〜20坪', '21〜30坪', '31〜40坪', '41〜50坪', '51〜60坪',
                                    '61〜70坪', '71〜80坪', '81〜90坪', '91〜100坪', '101坪以上', 'わからない'].map((label) => (
                                        <ButtonChoice
                                            key={label}
                                            label={label}
                                            selected={formData.area === label}
                                            onClick={() => handleChange('area', label)}
                                            small
                                        />
                                    ))}
                            </ButtonChoiceGrid>
                        </FormSection>

                        {/* 工事希望時期 */}
                        <FormSection
                            title="工事希望時期"
                            required
                            error={errors.timing}
                        >
                            <ButtonChoiceGrid columns={3}>
                                <ButtonChoice
                                    label="できるだけ早く"
                                    selected={formData.timing === 'asap'}
                                    onClick={() => handleChange('timing', 'asap')}
                                />
                                <ButtonChoice
                                    label="3ヶ月以内"
                                    selected={formData.timing === '3months'}
                                    onClick={() => handleChange('timing', '3months')}
                                />
                                <ButtonChoice
                                    label="半年以内"
                                    selected={formData.timing === '6months'}
                                    onClick={() => handleChange('timing', '6months')}
                                />
                                <ButtonChoice
                                    label="1年以内"
                                    selected={formData.timing === '1year'}
                                    onClick={() => handleChange('timing', '1year')}
                                />
                                <ButtonChoice
                                    label="1年以上先"
                                    selected={formData.timing === '1year+'}
                                    onClick={() => handleChange('timing', '1year+')}
                                />
                                <ButtonChoice
                                    label="未定"
                                    selected={formData.timing === 'undecided'}
                                    onClick={() => handleChange('timing', 'undecided')}
                                />
                            </ButtonChoiceGrid>
                        </FormSection>

                        {/* 工事予定地 */}
                        <FormSection
                            title="工事予定地"
                            required
                            error={errors.prefecture}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <select
                                        value={formData.prefecture}
                                        onChange={(e) => handleChange('prefecture', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            border: '2px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                            background: 'white'
                                        }}
                                    >
                                        <option value="">都道府県を選択</option>
                                        <option value="北海道">北海道</option>
                                        <option value="京都府">京都府</option>
                                        <option value="大阪府">大阪府</option>
                                        <option value="滋賀県">滋賀県</option>
                                        <option value="兵庫県">兵庫県</option>
                                        <option value="奈良県">奈良県</option>
                                        {/* 他の都道府県も追加可能 */}
                                    </select>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => handleChange('city', e.target.value)}
                                        placeholder="市区町村（任意）"
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            border: '2px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                            </div>
                        </FormSection>

                        {/* お客様の属性 */}
                        <FormSection
                            title="お客様の属性"
                            required
                            error={errors.customerType}
                        >
                            <ButtonChoiceGrid columns={3}>
                                <ButtonChoice
                                    label="所有者・親族"
                                    selected={formData.customerType === 'owner'}
                                    onClick={() => handleChange('customerType', 'owner')}
                                />
                                <ButtonChoice
                                    label="購入検討者"
                                    selected={formData.customerType === 'buyer'}
                                    onClick={() => handleChange('customerType', 'buyer')}
                                />
                                <ButtonChoice
                                    label="不動産業者"
                                    selected={formData.customerType === 'realtor'}
                                    onClick={() => handleChange('customerType', 'realtor')}
                                />
                                <ButtonChoice
                                    label="建設業者"
                                    selected={formData.customerType === 'constructor'}
                                    onClick={() => handleChange('customerType', 'constructor')}
                                />
                                <ButtonChoice
                                    label="その他"
                                    selected={formData.customerType === 'other'}
                                    onClick={() => handleChange('customerType', 'other')}
                                />
                            </ButtonChoiceGrid>
                        </FormSection>

                        {/* お客様情報 */}
                        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', marginTop: '40px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', fontFamily: 'var(--font-serif)', borderBottom: '2px solid var(--color-accent)', paddingBottom: '10px' }}>
                                お客様情報
                            </h3>

                            <FormField
                                label="お名前"
                                required
                                error={errors.name}
                            >
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder="例）山田 太郎"
                                    style={inputStyle}
                                />
                            </FormField>

                            <FormField
                                label="お名前（ふりがな）"
                                required
                                error={errors.nameKana}
                            >
                                <input
                                    type="text"
                                    value={formData.nameKana}
                                    onChange={(e) => handleChange('nameKana', e.target.value)}
                                    placeholder="例）やまだ たろう"
                                    style={inputStyle}
                                />
                            </FormField>

                            <FormField
                                label="携帯電話番号"
                                required
                                error={errors.phone}
                            >
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    placeholder="例）09012345678（ハイフンなし）"
                                    style={inputStyle}
                                />
                            </FormField>

                            <FormField
                                label="メールアドレス"
                                error={errors.email}
                            >
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    placeholder="例）example@msworks.com"
                                    style={inputStyle}
                                />
                            </FormField>
                        </div>

                        {/* 同意 */}
                        <div style={{ marginTop: '40px', padding: '30px', background: '#f8f9fa', borderRadius: '12px' }}>
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.agreed}
                                    onChange={(e) => handleChange('agreed', e.target.checked)}
                                    style={{ marginTop: '5px', width: '20px', height: '20px', cursor: 'pointer' }}
                                />
                                <span style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
                                    個人情報保護方針に同意の上、送信します。<br />
                                    <span style={{ fontSize: '0.85rem', color: '#666' }}>
                                        ※お預かりした個人情報は、お見積もり作成および今後のご連絡にのみ使用いたします。
                                    </span>
                                </span>
                            </label>
                            {errors.agreed && <p className="error-message" style={{ color: '#d00', marginTop: '10px', fontSize: '0.9rem' }}>{errors.agreed}</p>}
                        </div>

                        {/* Submit Button */}
                        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                                style={{
                                    minWidth: '300px',
                                    fontSize: '1.2rem',
                                    padding: '18px 40px',
                                    boxShadow: '0 4px 15px rgba(212, 165, 116, 0.3)',
                                    opacity: loading ? 0.7 : 1,
                                    cursor: loading ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {loading ? '送信中...' : 'この内容で見積もりを依頼する'}
                            </button>
                        </div>
                    </form>

                </div>
            </section>
        </>
    );
}

// Helper Components
function FormSection({ title, required, error, children }) {
    return (
        <div style={{ marginBottom: '50px' }}>
            <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '20px',
                fontFamily: 'var(--font-serif)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                {title}
                {required && <span style={{ color: '#d00', fontSize: '0.8em', fontWeight: 'normal' }}>必須</span>}
            </h3>
            {children}
            {error && <p className="error-message" style={{ color: '#d00', marginTop: '15px', fontSize: '0.95rem', fontWeight: '500' }}>⚠ {error}</p>}
        </div>
    );
}

function FormField({ label, required, error, children }) {
    return (
        <div style={{ marginBottom: '25px' }}>
            <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                fontSize: '1rem'
            }}>
                {label} {required && <span style={{ color: '#d00', fontSize: '0.8em' }}>必須</span>}
            </label>
            {children}
            {error && <p className="error-message" style={{ color: '#d00', marginTop: '8px', fontSize: '0.9rem' }}>{error}</p>}
        </div>
    );
}

function ImageChoiceGrid({ children }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '20px'
        }}>
            {children}
        </div>
    );
}

function ImageChoice({ image, icon, label, description, selected, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                background: 'white',
                border: `3px solid ${selected ? 'var(--color-accent)' : '#ddd'}`,
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxShadow: selected ? '0 4px 20px rgba(212, 165, 116, 0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
                transform: selected ? 'scale(1.03)' : 'scale(1)',
            }}
            onMouseEnter={(e) => {
                if (!selected) {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                }
            }}
            onMouseLeave={(e) => {
                if (!selected) {
                    e.currentTarget.style.borderColor = '#ddd';
                    e.currentTarget.style.transform = 'scale(1)';
                }
            }}
        >
            {image ? (
                <img
                    src={image}
                    alt={label}
                    style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'contain',
                        marginBottom: '15px'
                    }}
                />
            ) : (
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{icon}</div>
            )}
            <div style={{ fontWeight: '600', fontSize: '1rem', color: selected ? 'var(--color-primary)' : '#333' }}>
                {label}
            </div>
            {description && (
                <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '5px' }}>
                    {description}
                </div>
            )}
        </div>
    );
}

function ButtonChoiceGrid({ columns = 4, children }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${columns === 3 ? '140px' : '120px'}, 1fr))`,
            gap: '15px'
        }}>
            {children}
        </div>
    );
}

function ButtonChoice({ label, selected, onClick, small }) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={{
                background: selected ? 'var(--color-primary)' : 'white',
                color: selected ? 'white' : '#333',
                border: `2px solid ${selected ? 'var(--color-primary)' : '#ddd'}`,
                borderRadius: '8px',
                padding: small ? '12px 15px' : '15px 20px',
                fontSize: small ? '0.9rem' : '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: selected ? '0 4px 15px rgba(44, 95, 122, 0.3)' : 'none',
            }}
            onMouseEnter={(e) => {
                if (!selected) {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.background = '#f0f7fa';
                }
            }}
            onMouseLeave={(e) => {
                if (!selected) {
                    e.currentTarget.style.borderColor = '#ddd';
                    e.currentTarget.style.background = 'white';
                }
            }}
        >
            {label}
        </button>
    );
}

const inputStyle = {
    width: '100%',
    padding: '15px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease'
};
