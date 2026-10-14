"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { SERVICE_PACKAGES, PackageId, leadSchema } from "@/lib/schema";

interface LeadFormProps {
  selectedPackage?: PackageId;
  onPackageChange?: (pkgId: PackageId) => void;
}

export default function LeadForm({ selectedPackage = "tek-cati-hepsi", onPackageChange }: LeadFormProps) {
  // Form fields state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pkg, setPkg] = useState<PackageId>(selectedPackage);
  const [description, setDescription] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    trackingCode: string;
    packageName: string;
    name: string;
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Accessible IDs
  const nameId = useId();
  const emailId = useId();
  const pkgId = useId();
  const descId = useId();

  // Keep local package in sync if parent changes it
  if (selectedPackage !== pkg && onPackageChange) {
    // handled via props
  }

  const handlePackageSelect = (newPkg: PackageId) => {
    setPkg(newPkg);
    if (onPackageChange) {
      onPackageChange(newPkg);
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPkg("tek-cati-hepsi");
    setDescription("");
    setHoneypot("");
    setFieldErrors({});
    setServerError(null);
    setSuccessData(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});

    // 1. Client-side Zod validation
    const clientValidation = leadSchema.safeParse({
      name,
      email,
      package: pkg,
      description,
      website_url: honeypot
    });

    if (!clientValidation.success) {
      const errors: Record<string, string> = {};
      for (const issue of clientValidation.error.issues) {
        const field = issue.path[0]?.toString() || "form";
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    // 2. Submitting state
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          package: pkg,
          description,
          website_url: honeypot
        })
      });

      const data = await res.json();

      // 3. Server-side validation or error handling
      if (!res.ok || !data.success) {
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        setServerError(data.message || "Talebiniz kaydedilirken bir hata oluştu. Lütfen tekrar deneyiniz.");
        setIsSubmitting(false);
        return;
      }

      // 4. Success State (ONLY shown when database insert is confirmed by server)
      setSuccessData({
        trackingCode: data.data.trackingCode,
        packageName: data.data.packageName,
        name: data.data.name
      });
      setIsSubmitting(false);
    } catch (err) {
      console.error("Form gönderim hatası:", err);
      setServerError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="talep-formu" className="py-20 relative bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400 bg-cyan-950/70 px-3 py-1 rounded-full border border-cyan-800/60">
            Kalıcı Kayıt & Güvenilir Form
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            14 Günlük Pilot Başvuru Formu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Formu doldurun; talebiniz sunucumuzda kalıcı olarak saklansın ve anında gerçek
            bir başvuru takip kodu üretilsin.
          </p>
        </div>

        {/* Success Card (Shown ONLY when confirmed by server) */}
        {successData ? (
          <div
            className="rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-slate-900 to-emerald-950/30 border-2 border-emerald-500/50 shadow-2xl text-center"
            role="status"
            aria-live="polite"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60">
              ✓ Veritabanı Kaydı Başarılı
            </span>

            <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white">
              Talebiniz Başarıyla Alındı, Sayın {successData.name}!
            </h3>

            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Başvurunuz <strong className="text-white">{successData.packageName}</strong> için
              veritabanımıza kalıcı olarak kaydedilmiştir. BT danışmanımız 1 saat içinde sizinle iletişime geçecektir.
            </p>

            {/* Tracking Code Box */}
            <div className="mt-8 p-6 rounded-2xl bg-slate-950 border border-emerald-900/50 max-w-md mx-auto">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Resmi Talep Takip Numaranız
              </p>
              <div className="flex items-center justify-center gap-3">
                <code className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tracking-wider">
                  {successData.trackingCode}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopyCode(successData.trackingCode)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  title="Takip kodunu kopyala"
                >
                  {copiedCode ? "Kopyalandı!" : "Kopyala"}
                </button>
              </div>
              <p className="mt-3 text-[11px] text-slate-400">
                Bu numarayla talebinizi dilediğiniz an inceleyebilir veya BT destek hattımızdan sorgulayabilirsiniz.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/admin"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                Kayıtlar Panelinde Görüntüle (/admin) →
              </Link>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/80 border border-cyan-800/60 transition-colors"
              >
                Yeni Bir Talep Gönder
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Form */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl p-6 sm:p-10 bg-slate-900/90 border border-slate-800 shadow-2xl relative"
          >
            {/* Global Server Error Banner */}
            {serverError && (
              <div
                className="mb-8 p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-200 text-sm flex items-start gap-3"
                role="alert"
              >
                <svg className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong className="font-semibold">İşlem Tamamlanamadı:</strong> {serverError}
                </div>
              </div>
            )}

            {/* Honeypot Spam Field (Hidden from real users, filled by bots) */}
            <div style={{ display: "none" }} aria-hidden="true">
              <label htmlFor="website_url">Lütfen bu alanı boş bırakın</label>
              <input
                type="text"
                id="website_url"
                name="website_url"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Field 1: Name */}
              <div>
                <label htmlFor={nameId} className="block text-sm font-semibold text-slate-200 mb-2">
                  Ad Soyad <span className="text-cyan-400">*</span>
                </label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  disabled={isSubmitting}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Melih Can"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? `${nameId}-error` : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                    fieldErrors.name
                      ? "border-rose-500 focus:border-rose-500"
                      : "border-slate-800 focus:border-cyan-500"
                  } text-white placeholder-slate-500 text-sm transition-colors disabled:opacity-50`}
                />
                {fieldErrors.name && (
                  <p id={`${nameId}-error`} className="mt-1.5 text-xs text-rose-400 flex items-center gap-1" role="alert">
                    <span>⚠️</span> {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Field 2: Email */}
              <div>
                <label htmlFor={emailId} className="block text-sm font-semibold text-slate-200 mb-2">
                  Kurumsal E-posta <span className="text-cyan-400">*</span>
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Örn: ad@sirketiniz.com"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? `${emailId}-error` : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                    fieldErrors.email
                      ? "border-rose-500 focus:border-rose-500"
                      : "border-slate-800 focus:border-cyan-500"
                  } text-white placeholder-slate-500 text-sm transition-colors disabled:opacity-50`}
                />
                {fieldErrors.email && (
                  <p id={`${emailId}-error`} className="mt-1.5 text-xs text-rose-400 flex items-center gap-1" role="alert">
                    <span>⚠️</span> {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Field 3: Package Selection */}
            <div className="mt-6">
              <label htmlFor={pkgId} className="block text-sm font-semibold text-slate-200 mb-2">
                Hizmet Paketi Seçimi <span className="text-cyan-400">*</span>
              </label>
              <select
                id={pkgId}
                name="package"
                disabled={isSubmitting}
                value={pkg}
                onChange={(e) => handlePackageSelect(e.target.value as PackageId)}
                aria-invalid={Boolean(fieldErrors.package)}
                aria-describedby={fieldErrors.package ? `${pkgId}-error` : undefined}
                className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                  fieldErrors.package
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-800 focus:border-cyan-500"
                } text-white text-sm transition-colors disabled:opacity-50`}
              >
                {SERVICE_PACKAGES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.badge})
                  </option>
                ))}
              </select>
              {fieldErrors.package && (
                <p id={`${pkgId}-error`} className="mt-1.5 text-xs text-rose-400 flex items-center gap-1" role="alert">
                  <span>⚠️</span> {fieldErrors.package}
                </p>
              )}
            </div>

            {/* Field 4: Description */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={descId} className="block text-sm font-semibold text-slate-200">
                  Talep Detayı ve İhtiyaç Açıklaması <span className="text-cyan-400">*</span>
                </label>
                <span className="text-xs text-slate-500">
                  {description.length} / 1500 (min 10)
                </span>
              </div>
              <textarea
                id={descId}
                name="description"
                rows={4}
                disabled={isSubmitting}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Şirketinizdeki cihaz adedi (örn. 35 dizüstü), mevcut araçlarınız veya pilotta test etmek istediğiniz özel gereksinimleri belirtiniz..."
                aria-invalid={Boolean(fieldErrors.description)}
                aria-describedby={fieldErrors.description ? `${descId}-error` : undefined}
                className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                  fieldErrors.description
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-800 focus:border-cyan-500"
                } text-white placeholder-slate-500 text-sm transition-colors disabled:opacity-50`}
              />
              {fieldErrors.description && (
                <p id={`${descId}-error`} className="mt-1.5 text-xs text-rose-400 flex items-center gap-1" role="alert">
                  <span>⚠️</span> {fieldErrors.description}
                </p>
              )}
            </div>

            {/* Security and Evaluation Note */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
              <svg className="w-5 h-5 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>
                Bu bir değerlendirme projesi için kurgulanmış hizmet modelidir. İlettiğiniz talep
                bilgileri doğrulanarak sunucu veritabanına kalıcı olarak işlenir.
              </span>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-3 text-base"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin-custom text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Talebiniz Kaydediliyor & Takip Kodu Üretiliyor...</span>
                  </>
                ) : (
                  <>
                    <span>14 Günlük Pilot Başvurusunu Tamamla</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
