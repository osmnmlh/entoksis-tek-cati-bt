import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Decorative gradient glow (pure CSS, lightweight) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[650px] md:h-[650px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/20 to-indigo-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-cyan-400 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Kurumsal BT Konsolidasyonu & Sıfır Güvenlik Açığı</span>
        </div>

        {/* Main Heading (H1) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
          Şirketinizin Tüm BT Operasyonları{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Tek Çatı Altında.
          </span>
        </h1>

        {/* Problem and Value Proposition Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Cihaz takibi, yazılım dağıtımı, parola kasası ve kurum içi iletişimi 4 farklı
          araca dağıtıp hem güvenlik zafiyeti hem de bütçe israfı yaşamayın.{" "}
          <strong className="text-white font-semibold">Tek Çatı BT</strong>, tüm bu ihtiyaçları tek bir
          akredite yönetim çatısında toplar.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#talep-formu"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
          >
            14 Günlük Ücretsiz Pilotu Başlat
          </a>
          <a
            href="#hizmet-paketleri"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors text-center"
          >
            4 Hizmet Paketini İncele
          </a>
        </div>

        {/* 4 Trust Badges */}
        <div className="mt-14 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400">Taahhütsüz</p>
              <p className="text-sm font-semibold text-slate-200">14 Gün Ücretsiz Pilot</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-950 text-blue-400 shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400">Geniş Kapsam</p>
              <p className="text-sm font-semibold text-slate-200">50 Cihaza Kadar Ücretsiz</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400">Sıfır Kesinti</p>
              <p className="text-sm font-semibold text-slate-200">1 Günde Canlıya Alma</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400">Yasal Güvence</p>
              <p className="text-sm font-semibold text-slate-200">KVKK & ISO 27001 Uyumlu</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
