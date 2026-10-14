"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Pilot süresi gerçekten ücretsiz ve taahhütsüz mü?",
      a: "Evet, kesinlikle. 14 gün boyunca 50 cihaza kadar hiçbir ücret veya kredi kartı bilgisi talep edilmez. Pilot süresi sonunda devam etmek zorunda değilsiniz; dilediğiniz an tüm verilerinizi dışa aktarabilirsiniz."
    },
    {
      q: "Şirketimizdeki mevcut araçlardan (Slack, Bitwarden vb.) geçiş nasıl sağlanır?",
      a: "Tek Çatı BT veri göçü asistanımız sayesinde tüm parolalarınız, kanal arşivleriniz ve kullanıcı yetkileriniz tek tıkla yeni ortama aktarılır. Bu süreçte hiçbir operasyon durmaz."
    },
    {
      q: "Ajan kurulumu çalışan bilgisayarlarını yavaşlatır mı?",
      a: "Hayır. Geliştirdiğimiz hafif ajan (Native Agent) sistem kaynağının %0.5'inden az CPU ve ortalama 35MB RAM tüketir. Kullanıcıların günlük çalışmasını kesinlikle etkilemez."
    },
    {
      q: "Veri güvenliği ve KVKK uyumluluğu nasıl garanti ediliyor?",
      a: "Tüm veriler dinlenme ve iletim anında (At-Rest and In-Transit) AES-256 ve TLS 1.3 ile şifrelenir. Veri tabanımız ve sunucularımız Türkiye Cumhuriyeti KVKK mevzuatına ve ISO 27001 standartlarına tam uyumludur."
    },
    {
      q: "50'den fazla cihazımız varsa pilot yapabilir miyiz?",
      a: "Elbette. 50'den fazla cihazı olan kurumsal şirketler için talebiniz incelendikten sonra genişletilmiş özel pilot ortamı tahsis edilebilmektedir."
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
            Geçiş süreci, pilot koşulları ve teknik detaylar hakkında bilmek istedikleriniz.
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
