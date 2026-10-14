import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tek Çatı BT | Kurumsal Cihaz, Yazılım ve İletişim Yönetimi – Entoksis",
  description:
    "Cihaz envanteri ve izleme, uzaktan yazılım dağıtımı, kurumsal parola kasası ve güvenli iç iletişimi tek bir platformda birleştirin. 14 günlük ücretsiz kurumsal pilot.",
  keywords: [
    "Tek Çatı BT",
    "Entoksis",
    "cihaz envanteri",
    "yazılım dağıtımı",
    "parola kasası",
    "şirket içi iletişim",
    "güvenli dosya paylaşımı",
    "BT yönetimi"
  ],
  authors: [{ name: "Entoksis Candidate" }],
  openGraph: {
    title: "Tek Çatı BT | Kurumsal Cihaz, Yazılım ve İletişim Yönetimi",
    description:
      "Cihaz envanteri, yazılım dağıtımı, parola kasası ve güvenli şirket içi iletişim tek çatı altında. 14 günlük ücretsiz pilot.",
    type: "website",
    locale: "tr_TR"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100">{children}</body>
    </html>
  );
}
