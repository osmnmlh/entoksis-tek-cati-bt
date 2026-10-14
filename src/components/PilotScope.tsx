export default function PilotScope() {
  const steps = [
    {
      step: "01",
      title: "Örnek Talep İncelemesi",
      desc: "Aşağıdaki form üzerinden iletilen örnek talep bilgileri sunucu tarafında doğrulanır ve veri tabanına kalıcı olarak işlenir."
    },
    {
      step: "02",
      title: "Hedeflenen Test Ortamı Kurulumu",
      desc: "50 cihaza kadar hedeflenen test filosu için hafif yerel ajan devreye alma planı hazırlanır."
    },
    {
      step: "03",
      title: "14 Günlük Kurgusal Deneme Süreci",
      desc: "Dört temel hizmet paketinin özellikleri kurgusal pilot kapsamında simüle edilir ve değerlendirilir."
    },
    {
      step: "04",
      title: "Değerlendirme ve Raporlama Hedefi",
      desc: "Test süreci sonunda sistem durumunu ve optimizasyon fırsatlarını gösteren bir yönetici özeti hedeflenir."
    }
  ];

  return (
    <section id="pilot-kapsami" className="py-20 bg-slate-950/70 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400 bg-cyan-950/70 px-3 py-1 rounded-full border border-cyan-800/60">
            Kurgusal Senaryo • Vaka Analizi
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Örnek Pilot Kapsamı (Kurgusal)
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Bu bölüm bir değerlendirme projesi için kurgulanmış örnek pilot sürecini temsil eder.
            Hizmet paketleri konsepttir; bu repoda yalnızca talep toplama ve veri kalıcılığı mimarisi uygulanmıştır.
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
            Hedeflenen Pilot İnceleme Kapsamı (Kurgusal)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>50 adede kadar hedeflenen test cihazı filosu</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Merkezi kurumsal parola ve sır kasası mimarisi</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Kurum sınırları içinde anlık mesajlaşma ortamı</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Otomatik yama ve yetkisiz yazılım tespit konsepti</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Mevzuata uyumlu denetim loglama hedefi</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Teknik danışmanlık ve geçiş destek planı</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
