import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                Tek Çatı <span className="text-cyan-400">BT</span>
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                Entoksis
              </span>
            </div>
            <p className="text-slate-400 max-w-md text-xs sm:text-sm leading-relaxed mb-4">
              Cihaz envanteri, yazılım dağıtımı, parola kasası ve kurum içi güvenli
              dosya paylaşımını tek merkezde toplayan akredite BT yönetim platformu.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Sistemler Aktif & Güvenli
              </span>
              <span>•</span>
              <span>TLS 1.3 / AES-256</span>
              <span>•</span>
              <span>KVKK Uyumlu</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Hızlı Gezinme
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#sorun-ve-cozum" className="hover:text-cyan-400 transition-colors">
                  Neden Tek Çatı?
                </a>
              </li>
              <li>
                <a href="#hizmet-paketleri" className="hover:text-cyan-400 transition-colors">
                  4 Hizmet Paketi
                </a>
              </li>
              <li>
                <a href="#pilot-kapsami" className="hover:text-cyan-400 transition-colors">
                  Pilot Programı Detayları
                </a>
              </li>
              <li>
                <a href="#sss" className="hover:text-cyan-400 transition-colors">
                  Sıkça Sorulan Sorular
                </a>
              </li>
              <li>
                <a href="#talep-formu" className="hover:text-cyan-400 transition-colors">
                  Pilot Talep Formu
                </a>
              </li>
            </ul>
          </div>

          {/* Evaluation & Tech Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Değerlendirme & Mimari
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <span>→ Admin / Canlı Kayıtlar</span>
                </Link>
              </li>
              <li className="text-xs text-slate-500 pt-2">
                Tech Stack: Next.js 16 + Neon PostgreSQL + Zod + Vitest
              </li>
              <li className="text-xs text-slate-500">
                Deploy: Vercel Serverless Production
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Tek Çatı BT • Entoksis Proje Teslimi. Tüm hakları saklıdır.</p>
          <p className="text-slate-400">
            Güvenilir Form • Kalıcı Veritabanı Kaydı • Gerçek Takip Numarası
          </p>
        </div>
      </div>
    </footer>
  );
}
