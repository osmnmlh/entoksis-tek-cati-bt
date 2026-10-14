import { z } from "zod";

export const SERVICE_PACKAGES = [
  {
    id: "cihaz-envanteri",
    title: "Cihaz Envanteri ve İzleme",
    badge: "Altyapı & İzleme",
    desc: "Şirket bilgisayarları, mobil cihazlar ve sunucuların anlık donanım/yazılım sağlık takibi, uzaktan destek ve güvenlik analitiği.",
    features: [
      "Gerçek zamanlı donanım & işletim sistemi takibi",
      "CPU, RAM, disk ve batarya sağlık raporları",
      "Kayıp / çalıntı durumunda uzaktan kilitleme ve silme",
      "Otomatik donanım envanter defteri"
    ]
  },
  {
    id: "yazilim-dagitimi",
    title: "Yazılım Dağıtımı ve Sürüm Takibi",
    badge: "Otomasyon & Lisans",
    desc: "Tüm kurumsal cihazlara uzaktan sessiz kurulum, otomatik güvenlik yamaları, lisans optimizasyonu ve yetkisiz yazılım tespiti.",
    features: [
      "Tek tıkla toplu yazılım ve yama dağıtımı",
      "Sıfır kullanıcı müdahalesiyle arka plan güncellemeleri",
      "Lisans uyumluluğu ve atıl lisans tasarruf analizi",
      "İzinli ve yasaklı yazılım politikaları uygulama"
    ]
  },
  {
    id: "parola-kasasi",
    title: "Parola ve Sır Kasası",
    badge: "Sıfır Güven (Zero-Trust)",
    desc: "Kurumsal düzeyde uçtan uca şifreli kimlik bilgileri, API anahtarları, rol tabanlı erişim kontrolü ve şifre rotasyonu.",
    features: [
      "AES-256 ve Zero-Knowledge şifreli kurumsal kasa",
      "Rol ve departman bazlı granular erişim paylaşımı",
      "Zayıf ve mükerrer parolaların otomatik uyarısı",
      "Kapsamlı erişim ve kullanım denetim kütükleri (Audit Log)"
    ]
  },
  {
    id: "sirket-ici-iletisim",
    title: "Şirket İçi İletişim ve Güvenli Dosya Paylaşımı",
    badge: "Veri Güvenliği & KVKK",
    desc: "Dışarıya sızıntı riski olmayan uçtan uca şifreli kurum içi mesajlaşma, süreli dosya paylaşımı ve siber tehdit filtreleme.",
    features: [
      "Şirket sınırları içinde kalan şifreli anlık mesajlaşma",
      "Süreli, parolalı ve indirme limitli dosya paylaşımı",
      "DLP (Veri Sızıntısı Önleme) ve zararlı ek taraması",
      "KVKK ve kurumsal regülasyonlara %100 uyumluluk"
    ]
  },
  {
    id: "tek-cati-hepsi",
    title: "Tüm Paketler (Tek Çatı Entegre)",
    badge: "En Popüler / Tam Çözüm",
    desc: "4 hizmetin tamamının tek bir panelden, entegre ajan ve merkezi yönetim konsoluyla çalıştırıldığı eksiksiz kurumsal paket.",
    features: [
      "Tek ajan, tek yönetim konsolu, sıfır entegrasyon yükü",
      "Öncelikli 7/24 SLA ve atanmış BT Güvenlik Uzmanı",
      "Mevcut araçlardan (Slack, Bitwarden vb.) 1 günde geçiş",
      "%40'a varan konsolidasyon ve lisans tasarrufu"
    ]
  }
] as const;

export const packageIds = [
  "cihaz-envanteri",
  "yazilim-dagitimi",
  "parola-kasasi",
  "sirket-ici-iletisim",
  "tek-cati-hepsi"
] as const;

export type PackageId = (typeof packageIds)[number];

// Form Validation Schema
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "İsim en az 2 karakter olmalıdır." })
    .max(100, { message: "İsim en fazla 100 karakter olabilir." })
    .regex(/^[a-zA-ZçğıöşüÇĞİÖŞÜ\s.'-]+$/, {
      message: "İsim yalnızca harfler ve temel noktalama işaretleri içerebilir."
    }),

  email: z
    .string()
    .trim()
    .min(5, { message: "E-posta adresi gereklidir." })
    .max(120, { message: "E-posta çok uzun." })
    .email({ message: "Lütfen geçerli bir e-posta adresi giriniz." })
    .refine(
      (val) => {
        // Kurumsal e-posta tavsiyesi kontrolü veya standart geçerlilik
        const domain = val.split("@")[1]?.toLowerCase();
        return domain && domain.includes(".");
      },
      { message: "Lütfen geçerli bir kurumsal e-posta formatı giriniz (örn: ad@sirketiniz.com)." }
    ),

  package: z.enum(packageIds, {
    message: "Lütfen geçerli bir hizmet paketi seçiniz."
  }),

  description: z
    .string()
    .trim()
    .min(10, { message: "Talep açıklaması en az 10 karakter olmalıdır." })
    .max(1500, { message: "Talep açıklaması en fazla 1500 karakter olabilir." }),

  // Honeypot spam tuzağı: Kullanıcı bu alanı boş bırakmalıdır, botlar doldurur
  website_url: z.string().max(0, { message: "Spam koruması tetiklendi." }).optional().or(z.literal(""))
});

export type LeadInput = z.infer<typeof leadSchema>;

export interface LeadRecord {
  id: number;
  tracking_code: string;
  name: string;
  email: string;
  package_id: string;
  package_name: string;
  description: string;
  ip_address: string;
  user_agent?: string;
  created_at: string;
}
