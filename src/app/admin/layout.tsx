import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Doğrulama Paneli | Tek Çatı BT",
  description: "Entoksis case study test kayıtları doğrulama ekranı.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
