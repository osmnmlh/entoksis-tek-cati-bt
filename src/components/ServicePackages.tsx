"use client";

import { SERVICE_PACKAGES, PackageId } from "@/lib/schema";

interface ServicePackagesProps {
  onSelectPackage?: (packageId: PackageId) => void;
}

export default function ServicePackages({ onSelectPackage }: ServicePackagesProps) {
  const handleSelect = (pkgId: PackageId) => {
    if (onSelectPackage) {
      onSelectPackage(pkgId);
    }
    const formEl = document.getElementById("talep-formu");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hizmet-paketleri" className="py-20 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400 bg-cyan-950/70 px-3 py-1 rounded-full border border-cyan-800/60">
            Modüler & Entegre
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            4 Temel Hizmet Paketi
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            İhtiyacınıza göre tek bir paketi seçebilir veya tüm operasyonunuzu tek çatı
            altında birleştiren entegre çözümü tercih edebilirsiniz.
          </p>
        </div>

        {/* 4 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICE_PACKAGES.filter((p) => p.id !== "tek-cati-hepsi").map((pkg, idx) => (
            <div
              key={pkg.id}
              className="rounded-2xl p-8 bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between group shadow-lg hover:shadow-cyan-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                    Paket 0{idx + 1} • {pkg.badge}
                  </span>
                  <span className="text-xs text-slate-400">14 Gün Ücretsiz Pilot</span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {pkg.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {pkg.desc}
                </p>

                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Öne Çıkan Özellikler:
                  </h4>
                  <ul className="space-y-2.5 text-sm text-slate-300">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <svg
                          className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => handleSelect(pkg.id as PackageId)}
                  className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-slate-800 hover:bg-cyan-600 border border-slate-700 hover:border-cyan-500 transition-all flex items-center justify-center gap-2"
                >
                  <span>Bu Paketi Seç ve Pilot Talep Et</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured "All-in-One" Banner */}
        <div className="mt-12 rounded-2xl p-8 sm:p-10 bg-gradient-to-r from-cyan-950/60 via-blue-950/40 to-slate-900 border border-cyan-500/40 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500 text-slate-950 inline-block mb-3">
                ⭐ En Popüler Çözüm
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Tüm Paketler: Tek Çatı Entegre BT Yönetimi
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                4 paketin tamamı tek bir hafif ajan ve merkezi yönetim konsolunda birleşir.
                Öncelikli 7/24 SLA desteği, atanmış BT Güvenlik Uzmanı ve mevcut araçlarınızdan
                tek tıkla veri göçü dahildir.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-cyan-300 font-medium">
                <span>✓ %40 Toplam Lisans Tasarrufu</span>
                <span>✓ 50 Cihaza Kadar 14 Gün Ücretsiz</span>
                <span>✓ 1 Günde Sıfır Kesintiyle Canlıya Alma</span>
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => handleSelect("tek-cati-hepsi")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/30 transition-all text-center"
              >
                Tüm Paketler İçin Pilot Başlat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
