export default function ProblemStatement() {
  return (
    <section id="sorun-ve-cozum" className="py-20 bg-slate-950/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400 bg-cyan-950/70 px-3 py-1 rounded-full border border-cyan-800/60">
            Kime Yardımcı Oluyoruz & Hangi Sorunu Çözüyoruz?
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Şirketinizde Kaç Farklı BT Aracı Çalışıyor?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Büyüyen şirketlerde her departman ayrı bir yazılım seçer; sonuç ise kontrolsüz
            maliyetler, unutulan şifreler ve güvenlik kör noktalarıdır.
          </p>
        </div>

        {/* 2-Column Comparison: Old vs New */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Problem Card (Geleneksel Dağınık Yaklaşım) */}
          <div className="rounded-2xl p-8 bg-rose-950/20 border border-rose-900/40 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2.5 rounded-xl bg-rose-900/50 text-rose-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl font-bold text-rose-200">
                    Geleneksel Dağınık BT Yönetimi
                  </h3>
                  <p className="text-xs text-rose-300/80">Parçalı araçlar & kontrolsüz riskler</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span>
                    <strong className="text-white">Araç Enflasyonu:</strong> Envanter için Excel, parola için ayrı kasa, yama için farklı program; ayrı faturalar ve entegrasyon yükü.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span>
                    <strong className="text-white">Ayrılan Personel Riski:</strong> Şirketten ayrılan çalışanın kurumsal şifrelere ve dosyalara erişiminin kontrolsüz kalabilmesi.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span>
                    <strong className="text-white">Görünmeyen Donanımlar:</strong> Hangi cihazda hangi işletim sistemi sürümü ve lisanssız yazılımların çalıştığının bilinmemesi.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span>
                    <strong className="text-white">Yüksek Lisans Maliyeti:</strong> Her kullanıcı için ayrı ayrı abonelik ödemeleri ve kontrolsüz bütçe yükü.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-900/30 text-xs text-rose-400 font-medium">
              Sonuç: Parçalı araçlar, artan riskler ve yüksek operasyonel efor.
            </div>
          </div>

          {/* Solution Card (Tek Çatı BT) */}
          <div className="rounded-2xl p-8 bg-cyan-950/20 border border-cyan-800/60 relative overflow-hidden flex flex-col justify-between shadow-lg shadow-cyan-950/40">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2.5 rounded-xl bg-cyan-900/60 text-cyan-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl font-bold text-cyan-200">
                    Tek Çatı BT Hizmet Modeli
                  </h3>
                  <p className="text-xs text-cyan-300/80">Merkezi konsol, hedef odaklı denetim</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong className="text-white">Merkezi Konsol Hedefi:</strong> Cihaz izleme, yama dağıtımı, şifre kasası ve dosya paylaşımını tek bir arayüzde buluşturma hedefi.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong className="text-white">Hızlı Yetki Yönetimi:</strong> Ayrılan çalışanın erişim yetkilerinin tek merkezden planlı şekilde sonlandırılması.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong className="text-white">Otomatik Donanım & Yazılım Envanteri:</strong> Cihazların temel sağlık, disk ve yama durumlarının merkezi takibi.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong className="text-white">Maliyet Optimizasyonu:</strong> Çoklu lisans karmaşası yerine konsolide edilmiş kurumsal yönetim modeli.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-cyan-800/40 text-xs text-cyan-300 font-medium">
              Sonuç: Merkezi kontrol, sadeleştirilmiş operasyon ve kolaylaştırılmış denetim.
            </div>
          </div>
        </div>

        {/* Target Audience Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-base font-bold text-white mb-2">🏢 Büyüyen KOBİ & Şirketler</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              10 ile 500+ çalışanı olan, şirket cihazlarını kontrol altına almak ve dağınık araçlardan kurtulmak isteyen işletmeler.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-base font-bold text-white mb-2">👨‍💻 BT Yöneticileri & Mühendisleri</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Manuel kurulum ve destek yükünü azaltıp, cihaz ve yazılım yönetimini tek merkezden organize etmek isteyen teknik liderler.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-base font-bold text-white mb-2">⚖️ Uyum & Finans Sorumluları</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mevzuat ve güvenlik standartlarına uyumu kolaylaştırmak, lisans maliyetlerini optimize etmek isteyen yöneticiler.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
