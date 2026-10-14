"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#090d16]/85 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">
                  Tek Çatı <span className="text-cyan-400">BT</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                  Entoksis
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Kurumsal Cihaz, Yazılım & İletişim Yönetimi
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#sorun-ve-cozum" className="hover:text-cyan-400 transition-colors">
              Neden Tek Çatı?
            </a>
            <a href="#hizmet-paketleri" className="hover:text-cyan-400 transition-colors">
              4 Hizmet Paketi
            </a>
            <a href="#pilot-kapsami" className="hover:text-cyan-400 transition-colors">
              Pilot Kapsamı
            </a>
            <a href="#sss" className="hover:text-cyan-400 transition-colors">
              SSS
            </a>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Değerlendirici için canlı veritabanı kayıt listesi"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Admin / Canlı Kayıtlar
            </Link>
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#talep-formu"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Pilot Talep Et
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/admin"
              className="px-2.5 py-1 text-xs font-medium rounded bg-slate-800 text-slate-200 border border-slate-700"
            >
              Kayıtlar
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Menüyü Aç/Kapat"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 flex flex-col gap-3 text-sm">
            <a
              href="#sorun-ve-cozum"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800 text-slate-200"
            >
              Neden Tek Çatı?
            </a>
            <a
              href="#hizmet-paketleri"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800 text-slate-200"
            >
              4 Hizmet Paketi
            </a>
            <a
              href="#pilot-kapsami"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800 text-slate-200"
            >
              Pilot Kapsamı
            </a>
            <a
              href="#sss"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800 text-slate-200"
            >
              SSS
            </a>
            <a
              href="#talep-formu"
              onClick={() => setMobileMenuOpen(false)}
              className="mx-3 text-center py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600"
            >
              14 Günlük Pilot Başlat
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
