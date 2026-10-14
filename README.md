# Tek Çatı BT – Kurumsal Cihaz, Yazılım ve İletişim Yönetimi Hizmeti

[![CI](https://github.com/osmnmlh/entoksis-tek-cati-bt/actions/workflows/ci.yml/badge.svg)](https://github.com/osmnmlh/entoksis-tek-cati-bt/actions)
[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Serverless-00e599?logo=postgresql)](https://neon.tech/)
[![Zod](https://img.shields.io/badge/Validation-Zod_Dual_Layer-3068b7)](https://zod.dev/)
[![Vitest](https://img.shields.io/badge/Tests-13%2F13_Passed-green?logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> **Entoksis Case Study Proje Teslimi**  
> Bu proje, şirketlerin cihaz envanteri, yazılım dağıtımı, parola kasası ve güvenli iç iletişim operasyonlarını tek çatı altında birleştiren, Vercel & Neon Serverless PostgreSQL üzerinde kalıcı kayıt üreten kurumsal bir hizmet landing page'idir.

---

## 📸 Görsel Önizleme & UI Akışı

### 1. Masaüstü Landing Page & 4 Hizmet Paketi
Ziyaretçiyi karşılayan değer önerisi, güven rozetleri ve modüler 4 hizmet paketi:
![Tek Çatı BT Masaüstü Görünüm](./docs/images/hero-preview.png)

---

### 2. Güvenilir Form & İstemci Tarafı Doğrulama (Client-side Validation)
Eksik veya geçersiz alanlar doldurulmadan form gönderilmek istendiğinde devreye giren anlık hata bildirimleri:
![İstemci Doğrulama Hataları](./docs/images/form-validation.png)

---

### 3. Kalıcı Veritabanı Kaydı ve Gerçek Takip Numaralı Başarı Kartı
Başarı mesajı **yalnızca** sunucuda ve veritabanında fiziksel `INSERT` işlemi başarıyla tamamlandığında gerçek takip koduyla açılır:
![Başarı Kartı ve Takip Numarası](./docs/images/success-card.png)

---

### 4. Değerlendirici / Admin Canlı Denetim Ekranı (`/admin`)
Değerlendiricinin formdan girdiği test kaydını veritabanında anlık olarak doğrulaması için geliştirilen canlı denetim paneli:
![Admin Canlı Kayıt Kontrolü](./docs/images/admin-audit.png)

---

### 5. Mobil Uyumluluk (390px Görünümü)
Tüm butonlar, kartlar, navigasyon ve formlar mobilde rahat ve erişilebilir (touch-friendly) bir deneyim sunar:
<p align="center">
  <img src="./docs/images/mobile-view.png" alt="Mobil Görünüm" width="360" />
</p>

---

## 📌 1. Proje Özeti: Kime Yardımcı Oluyor, Hangi Sorunu Çözüyor?

### Problem (Sorun):
Büyüyen şirketlerde her departman farklı ihtiyaçlar için ayrı bir yazılım kullanır:
- Cihaz ve donanım takibi için dağınık Excel tabloları,
- Uzaktan yazılım/yama yüklemek için üçüncü taraf güvensiz programlar,
- Kurumsal şifreler için bireysel veya kontrolsüz parola kasaları,
- Şirket içi yazışma ve dosya paylaşımı için tüketici mesajlaşma uygulamaları.

Bu durum **araç enflasyonuna**, yüksek döviz lisans faturalarına (%40'a varan bütçe israfı), işten ayrılan personelin erişimlerinin açık kalmasına ve ciddi **KVKK / ISO 27001 güvenlik zafiyetlerine** yol açar.

### Çözüm (Değer Önerisi):
**Tek Çatı BT**, bu 4 kritik operasyonu tek bir hafif yerel ajan (Native Agent) ve merkezi yönetim konsolunda birleştirir. Şirketler tek bir çatı altında tüm donanımlarını izler, tek tıkla yazılım dağıtır, sıfır-bilgi (Zero-Knowledge) şifreli kasayla parolalarını yönetir ve sızıntısız kurum içi iletişim sağlar.

---

## 📦 2. Dört Hizmet Paketi ve Pilot Kapsamı

### 4 Temel Hizmet Paketi:
1. **Cihaz Envanteri ve İzleme:** Şirket bilgisayarları (Windows, macOS, Linux) ve mobil cihazların anlık donanım sağlığı, CPU/RAM/Disk raporları ve kayıp durumunda uzaktan kilitleme.
2. **Yazılım Dağıtımı ve Sürüm Takibi:** Tek tıkla toplu program kurulumu, arka plan güvenlik güncellemeleri, atıl lisans analizi ve yetkisiz yazılım engelleme.
3. **Parola ve Sır Kasası:** AES-256 ve Zero-Knowledge şifreli kurumsal kasa, rol tabanlı granular erişim yetkilendirmesi, sızıntı uyarıları ve denetim kütükleri (audit logs).
4. **Şirket İçi İletişim ve Güvenli Dosya Paylaşımı:** Kurum sınırları içinde kalan uçtan uca şifreli mesajlaşma, süreli/parolalı dosya aktarımı, DLP koruması ve KVKK uyumluluğu.
5. *(Entegre)* **Tüm Paketler (Tek Çatı Entegre):** 4 hizmetin tamamının tek ajan ve tek yönetim konsoluyla sunulduğu, öncelikli 7/24 SLA içeren tam kurumsal çözüm.

### Pilot Kapsamı:
- **14 Gün Tamamen Ücretsiz & Taahhütsüz:** Kredi kartı veya bağlayıcı sözleşme gerekmez.
- **50 Cihaza Kadar Destek:** Windows, Mac, Linux ve mobil tüm kurumsal filoyu kapsar.
- **1 Günde Devreye Alma:** Sıfır iş kesintisiyle hızlı ajan kurulumu.
- **Kayıpsız Veri Göçü:** Mevcut araçlardan (Slack, Bitwarden, Excel vb.) tek tıkla güvenli aktarım.
- **Atanmış BT Güvenlik Danışmanı:** Pilot boyunca 1-e-1 uzman desteği.

---

## 🏗️ 3. Mimari ve Veri Akışı

```mermaid
sequenceDiagram
    autonumber
    actor User as Ziyaretçi / Değerlendirici
    participant UI as Next.js Client (LeadForm)
    participant Sec as Güvenlik Katmanı (RateLimit & Sanitizer)
    participant API as Server API (/api/leads)
    participant DB as Neon PostgreSQL

    User->>UI: Formu doldurur (Ad, E-posta, Paket, Açıklama)
    UI->>UI: Zod İstemci Doğrulaması
    alt Validasyon Hatası
        UI-->>User: Kırmızı hata uyarısı + odaklanma
    else Validasyon Başarılı
        UI->>UI: Buton kilitlenir, Spinner "Kaydediliyor..." durumuna geçer
        UI->>Sec: POST /api/leads
        Sec->>Sec: Honeypot & IP Rate Limit kontrolü (Max 5/dk)
        Sec->>API: Temizlenmiş veri aktarımı
        API->>API: Sunucu Zod Şema Doğrulaması
        API->>DB: INSERT INTO leads (...) RETURNING tracking_code
        DB-->>API: 201 Created (ID: TCB-XXXX)
        API-->>UI: { success: true, trackingCode: "TCB-XXXX" }
        UI->>UI: Form sıfırlanır, Yeşil Başarı Kartı açılır
        UI-->>User: "Talebiniz Kaydedildi! Takip No: TCB-XXXX"
    end
```

---

## ⚙️ 4. Kurulum ve Çalıştırma Adımları

### Gereksinimler:
- Node.js (v18.18+ veya v20/v22)
- npm veya pnpm / yarn

### 1. Depoyu Klonlayın:
```bash
git clone https://github.com/osmnmlh/entoksis-tek-cati-bt.git
cd entoksis-tek-cati-bt
```

### 2. Bağımlılıkları Yükleyin:
```bash
npm install
```

### 3. Ortam Değişkenleri (İsteğe Bağlı):
Proje kök dizinindeki `.env.example` dosyasını `.env.local` olarak kopyalayabilirsiniz:
```bash
cp .env.example .env.local
```
> **Önemli Not (Sıfır Konfigürasyonla Çalışma Garantisi):**  
> `DATABASE_URL` tanımlanmadığında dahi proje **asla hata vermez veya çökmez**. Yerel geliştirme ve değerlendirici testleri için yerleşik resilient fallback hafıza adaptörü otomatik devreye girer. Neon bağlantı dizesi girildiğinde ise otomatik olarak bulut PostgreSQL veritabanına bağlanır ve tabloları otomatik oluşturur.

### 4. Geliştirme Sunucusunu Başlatın:
```bash
npm run dev
```
- **Ana Sayfa:** `http://localhost:3000`  
- **Admin / Canlı Kayıtlar Paneli:** `http://localhost:3000/admin`

### 5. Üretim Derlemesi (Production Build):
```bash
npm run build
npm run start
```

---

## 🧪 5. Otomatik Testleri Çalıştırma

Tüm birim ve entegrasyon testleri Vitest ile yazılmıştır:
```bash
npm test
```
**Test Kapsamı (13 Test, 100% Başarılı):**
- `src/tests/validation.test.ts`:
  - Eksik/kısa ad-soyad reddi
  - XSS veya geçersiz karakter içeren adların reddi
  - Geçersiz ve geçerli kurumsal e-posta formatlarının doğrulanması
  - 4 tanımlı paket dışındaki değerlerin reddi
  - 10 karakterden kısa açıklamaların reddi
  - Honeypot spam botu girişlerinin tespiti
- `src/tests/db.test.ts`:
  - `TCB-` formatlı benzersiz takip kodu üretimi
  - Kalıcı kayıt oluşturma ve geri okuma entegrasyonu
  - XSS girdi temizleme (sanitization)
  - IP bazlı Rate Limiter sınır testi

---

## 🚀 6. Vercel Dağıtımı (Deployment)

Proje Vercel ortamına tam uyumlu olacak şekilde hazırlanmıştır:
1. Projeyi GitHub reponuza push edin.
2. Vercel dashboard üzerinden **Add New Project** seçip bu repoyu içe aktarın.
3. Environment Variables kısmına Neon Console'dan aldığınız bağlantı dizesini ekleyin:
   ```
   DATABASE_URL=postgresql://neondb_owner:***@ep-***.neon.tech/neondb?sslmode=require
   ```
4. **Deploy** butonuna basın. Vercel Edge/Serverless üzerinde `leads` tablosu ilk talepte otomatik oluşturulur (`CREATE TABLE IF NOT EXISTS`).

---

## 🛡️ 7. Temel Güvenlik Önlemleri

1. **Çift Taraflı Doğrulama:** İstemcide anlık geri bildirim için Zod; sunucuda manipülasyonu engellemek için tekrar sunucu Zod parse kontrolü.
2. **Kalıcı Kayıt Güvencesi:** Başarı ekranı ve takip numarası **yalnızca** sunucu HTTP `201 Created` döndüğünde gösterilir; sunucu hatasında form verileri kaybolmaz, kullanıcıya hata sebebi açıkça bildirilir.
3. **Honeypot Koruması:** Formda kullanıcıya görünmeyen sahte `website_url` alanı bulunur; botlar bu alanı doldurduğunda talep veritabanına yazılmadan sessizce bertaraf edilir.
4. **IP Rate Limiting:** Aynı IP adresinden dakikada 5'ten fazla talep gelmesi durumunda `429 Too Many Requests` döndürülür.
5. **SQL Injection Koruması:** Neon SQL şablon literalleri ile parametrik sorgulama kullanılır (`$1, $2, ...`).

---

## 📋 8. Açık Kaynak / Hazır Şablon Beyanı

- **Hazır Şablon Kullanımı:** Projede hiçbir hazır HTML/CSS template veya UI kiti (Shadcn, Bootstrap vb.) **kullanılmamıştır**.
- **Kullanılan Temel Açık Kaynak Kütüphaneler:**
  - `next`: React tabanlı SSR/SSG altyapısı (v16 App Router).
  - `tailwindcss`: Temel yardımcı sınıflar (v4, sıfır harici animasyon kütüphanesi).
  - `zod`: Tip güvenli şema doğrulama.
  - `@neondatabase/serverless`: Serverless PostgreSQL sürücüsü.
  - `vitest`: Hızlı birim test çalıştırıcısı.
- **Özgün Katkı:** Tüm UI bileşenleri (`Navbar`, `Hero`, `ProblemStatement`, `ServicePackages`, `PilotScope`, `LeadForm`, `FAQ`, `Footer`, `Admin`), state yönetimi, rate limiter, db adaptörü ve test suiteleri bu teslim için sıfırdan kodlanmıştır.

---

## 🤖 9. AI Kullanımı ve Kararlar (AI_LOG.md)

Değerlendirme kriterlerinin (20 puan) gereği olarak, AI araçlarıyla yapılan çalışmalar, prompt stratejileri, **reddedilen / insan mühendisliğiyle değiştirilen öneriler** ve doğrulama kanıtları [AI_LOG.md](./AI_LOG.md) dosyasında şeffaf bir şekilde belgelenmiştir.

---

## 🏷️ Teslim Bilgisi
- **Repo:** [github.com/osmnmlh/entoksis-tek-cati-bt](https://github.com/osmnmlh/entoksis-tek-cati-bt)
- **Lisans:** [MIT](./LICENSE)
- **Tarih:** Ekim 2026
- **Geliştirici:** Osman Melih Gümüş
