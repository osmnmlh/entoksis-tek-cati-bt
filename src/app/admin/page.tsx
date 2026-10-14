"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LeadRecord } from "@/lib/schema";

export default function AdminPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastRefreshed, setLastRefreshed] = useState<string>("");

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads?limit=100");
      if (!res.ok) {
        throw new Error(`Sunucu yanıtı: ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        setLeads(data.data || []);
        setLastRefreshed(new Date().toLocaleTimeString("tr-TR"));
      } else {
        setError(data.message || "Kayıtlar alınamadı.");
      }
    } catch (err) {
      console.error("Kayıtlar çekilemedi:", err);
      setError("Veritabanından kayıtlar alınırken bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.tracking_code.toLowerCase().includes(q) ||
      lead.package_name.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                ← Landing Page'e Dön
              </Link>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Canlı PostgreSQL Denetimi
              </span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Kalıcı Talep Kayıtları (Admin / Değerlendirici Paneli)
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Landing page üzerinden gönderilen test kayıtlarının veritabanında kalıcı olarak saklandığını
              buradan anlık olarak inceleyebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={fetchLeads}
              disabled={loading}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <svg
                className={`w-4 h-4 ${loading ? "animate-spin-custom" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{loading ? "Yenileniyor..." : "Listeyi Yenile"}</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase font-semibold">Toplam Kayıt</span>
            <p className="text-2xl font-bold text-white mt-1">{leads.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase font-semibold">Aktif Veritabanı Modu</span>
            <p className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {process.env.NEXT_PUBLIC_DB_PROVIDER || "PostgreSQL (Neon) / Fallback Destekli"}
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase font-semibold">Son Senkronizasyon</span>
            <p className="text-sm font-bold text-slate-200 mt-1">{lastRefreshed || "Bağlanıyor..."}</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="mt-8">
          <div className="relative">
            <input
              type="text"
              placeholder="İsim, e-posta, takip kodu veya paket ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-cyan-500 transition-colors"
            />
            <svg
              className="w-5 h-5 text-slate-500 absolute left-3 top-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Content Table / Card view */}
        <div className="mt-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-sm mb-6">
              {error}
            </div>
          )}

          {loading && leads.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <svg className="w-8 h-8 animate-spin-custom mx-auto mb-4 text-cyan-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Veritabanından kayıtlar yükleniyor...</span>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-20 rounded-2xl bg-slate-900/40 border border-slate-800 p-8">
              <p className="text-slate-300 font-medium">Henüz eşleşen bir talep kaydı bulunmuyor.</p>
              <p className="text-xs text-slate-500 mt-2">
                Landing page'deki pilot başvuru formunu doldurarak hemen canlı bir test kaydı oluşturabilirsiniz.
              </p>
              <Link
                href="/#talep-formu"
                className="mt-4 inline-block px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500"
              >
                Forma Git ve Test Kaydı Gönder
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-5 py-4">Takip Kodu</th>
                    <th className="px-5 py-4">Ad Soyad</th>
                    <th className="px-5 py-4">Kurumsal E-posta</th>
                    <th className="px-5 py-4">Seçilen Hizmet Paketi</th>
                    <th className="px-5 py-4">Açıklama</th>
                    <th className="px-5 py-4">IP / Kayıt Tarihi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredLeads.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-emerald-400 whitespace-nowrap">
                        {item.tracking_code}
                      </td>
                      <td className="px-5 py-4 font-semibold text-white whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-5 py-4 text-cyan-300 whitespace-nowrap">
                        {item.email}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 whitespace-nowrap">
                          {item.package_name}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-300 max-w-xs truncate" title={item.description}>
                        {item.description}
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400 whitespace-nowrap">
                        <div>{new Date(item.created_at).toLocaleString("tr-TR")}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{item.ip_address}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
