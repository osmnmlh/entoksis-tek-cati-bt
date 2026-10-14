"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Örnek pilot süreci nasıl işler?",
      a: "Bu kurgusal senaryoda pilot süresi 14 gün ve 50 cihaza kadar hedeflenen kapsam olarak planlanmıştır. Amaç, şirketlerin çoklu araç karmaşasını tek çatı altında toplama ihtiyacını değerlendirmektir."
    },
    {
      q: "Mevcut araçlardan geçiş süreci nasıl planlanır?",
      a: "Veri aktarımı ve kullanıcı listelerinin entegrasyonu pilot aşamasında teknik gereksinimlere göre adım adım planlanır; öncelikli hedef iş akışının kesintiye uğramamasıdır."
    },
    {
      q: "Ajan mimarisi cihaz performansını nasıl etkiler?",
      a: "Hedeflenen hafif ajan konseptinin arka planda minimum sistem kaynağı ile çalışması, kullanıcıların günlük işlerini etkilememesi hedeflenir."
    },
    {
      q: "Veri güvenliği ve gizlilik nasıl ele alınıyor?",
      a: "Form üzerinden toplanan talep verileri sunucu tarafında doğrulanır, şifrelenmiş TLS bağlantıları üzerinden aktarılır ve sunucuda güvenli şekilde saklanır."
    },
    {
      q: "Bu projenin gerçek dünyadaki kapsamı nedir?",
      a: "Bu bir değerlendirme projesi için kurgulanmış hizmet modelidir. Hizmet paketleri konsepttir; bu repoda yalnızca talep toplama ve veri kalıcılığı mimarisi uygulanmıştır."
    }
  ];

  return (
    <section id="sss" className="py-20 bg-slate-900/30 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400 bg-cyan-950/70 px-3 py-1 rounded-full border border-cyan-800/60">
            Merak Edilenler
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Kurgusal pilot modeli, geçiş hedefleri ve teknik detaylar hakkında bilgiler.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-white">
                    {faq.q}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
