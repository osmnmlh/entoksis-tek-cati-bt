export default function PilotScope() {
  const steps = [
    {
      step: "01",
      title: "Hızlı Talep & Kapsam Belirleme",
      desc: "Aşağıdaki formu doldurduktan sonra 1 saat içinde BT danışmanımız sizinle iletişime geçer ve şirketinizin cihaz adedine göre pilot ortamını hazırlar."
    },
    {
      step: "02",
      title: "1 Günde Sıfır Kesintiyle Kurulum",
      desc: "50 cihaza kadar tek tıkla kurulabilen hafif ajanımız devreye alınır. Çalışanlarınızın mesaisi veya mevcut sistemler asla kesintiye uğramaz."
    },
    {
      step: "03",
      title: "14 Gün Canlı Kullanım & Destek",
      desc: "Tüm özellikleri (envanter, yazılım dağıtımı, parola kasası, güvenli iletişim) tam yetkiyle test edin. 7/24 atanmış uzmanınız yanınızdadır."
    },
    {
      step: "04",
      title: "Raporlama & Karar Serbestliği",
      desc: "14 gün sonunda güvenlik açıklarınızı ve tasarruf analizinizi gösteren Yönetici Özeti sunulur. Taahhüt yoktur; dilediğiniz an verilerinizi alıp ayrılabilirsiniz."
    }
  ];

  return (
    <section id="pilot-kapsami" className="py-20 bg-slate-950/70 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400 bg-cyan-950/70 px-3 py-1 rounded-full border border-cyan-800/60">
            Sıfır Risk, Tam Şeffaflık
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Pilot Programı Neleri İçerir?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Tek Çatı BT'yi şirketinizde test etmek tamamen ücretsizdir. Kredi kartı veya
            uzun vadeli taahhüt gerekmez.
          </p>
        </div>

        {/* 4 Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-black text-cyan-500/40 font-mono mb-4 block">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pilot Features Checklist */}
        <div className="mt-12 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-6 text-center">
            Pilot Programına Dahil Olan Haklarınız
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>50 adede kadar Windows, Mac, Linux ve Mobil cihaz</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Sınırsız kurumsal parola ve API sır kasası</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Uçtan uca şifreli şirket içi sohbet ve dosya aktarımı</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Otomatik yama ve yetkisiz yazılım tespit motoru</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>KVKK & ISO 27001 Denetim loglama modülü</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Atanmış Kıdemli BT Uzmanı ile 1-e-1 Danışmanlık</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
