import { z } from "zod";

export const SERVICE_PACKAGES = [
  {
    id: "cihaz-envanteri",
    title: "Cihaz Envanteri ve İzleme",
    badge: "Altyapı & İzleme",
    desc: "Şirket bilgisayarları ve kurumsal cihazların donanım/yazılım sağlık takibi, uzaktan destek ve güvenlik analitiği.",
    features: [
      "Donanım & işletim sistemi takibi (pilotta değerlendirilir)",
      "CPU, RAM, disk ve sistem sağlık raporları",
      "Cihaz envanteri ve durum kontrolü",
      "Otomatik donanım envanter defteri"
    ]
  },
  {
    id: "yazilim-dagitimi",
    title: "Yazılım Dağıtımı ve Sürüm Takibi",
    badge: "Otomasyon & Lisans",
    desc: "Hedeflenen cihazlara uzaktan paket kurulumu, güvenlik yamaları, lisans optimizasyonu ve yetkisiz yazılım tespiti.",
    features: [
      "Toplu yazılım ve yama dağıtımı konsepti",
      "Kullanıcı işini aksatmadan planlanan güncellemeler",
      "Lisans uyumluluğu ve atıl lisans analiz desteği",
      "İzinli ve kısıtlı yazılım politikaları belirleme"
    ]
  },
  {
    id: "parola-kasasi",
    title: "Parola ve Sır Kasası",
    badge: "Erişim & Kimlik",
    desc: "Merkezi yönetilen kurumsal kimlik bilgileri, API anahtarları, rol tabanlı erişim kontrolü ve şifre rotasyonu.",
    features: [
      "Merkezi şifreli kurumsal kasa mimarisi",
      "Rol ve departman bazlı erişim paylaşımı",
      "Zayıf ve mükerrer parolaların raporlanması",
      "Kapsamlı erişim ve kullanım denetim kütükleri (Audit Log)"
    ]
  },
  {
    id: "sirket-ici-iletisim",
    title: "Şirket İçi İletişim ve Güvenli Dosya Paylaşımı",
    badge: "Veri Yönetimi",
    desc: "Kurum sınırları içinde kalan kontrollü mesajlaşma, süreli dosya paylaşımı ve siber tehdit filtreleme.",
    features: [
      "Şirket sınırları içinde kalan anlık mesajlaşma ortamı",
      "Süreli, parolalı ve indirme limitli dosya paylaşımı",
      "Yetkilendirilmiş dosya aktarımı ve ek kontrolü",
      "Kurumsal regülasyonlara uyumlu süreç yönetimi"
    ]
  },
  {
    id: "tek-cati-hepsi",
    title: "Tüm Paketler (Tek Çatı Entegre)",
    badge: "En Kapsamlı Çözüm",
    desc: "4 hizmetin tamamının tek bir çatı altında birleştirilmesini hedefleyen entegre kurumsal paket konsepti.",
    features: [
      "Tek ajan ve tek yönetim konsolu hedefi",
      "Öncelikli SLA ve teknik danışmanlık desteği",
      "Mevcut araçlardan planlı geçiş desteği",
      "Konsolidasyon ile maliyet ve lisans optimizasyonu"
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
