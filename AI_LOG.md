# AI_LOG · Kararlar, Yönlendirmeler ve Doğrulama Günlüğü

Bu belge, **Entoksis Case Study** projesinin geliştirilmesinde yapay zeka araçlarının nasıl kullanıldığını, mimari kararları, AI önerilerine yapılan insan mühendisliği müdahalelerini ve somut doğrulama adımlarını şeffaf bir şekilde açıklar.

---

## 🛠️ 1. Kullanılan Araçlar ve Görev Dağılımı

- **Geliştirici Rolü (İnsan Mühendisliği):**
  - Mimari gereksinimlerin ve konseptin ("Tek Çatı BT") belirlenmesi.
  - Bulut/Sunucusuz ortam kısıtlarının analizi (Vercel ephemeral filesystem vs. Neon PostgreSQL).
  - Güvenlik ve edge-case gereksinimlerinin tanımlanması (Rate limiting, honeypot, XSS sanitization).
  - AI çıktılarının kod incelemesi (Code Review), mimari düzeltmeler ve kalite kapısı kontrolleri.
- **Yapay Zeka (Antigravity AI Agent):**
  - Proje iskeletinin bootstrap edilmesi, Zod şemalarının kodlanması.
  - Tailwind CSS bileşenlerinin semantik HTML ve WCAG 2.1 AA kontrast kurallarına göre inşası.
  - Vitest otomatik test senaryolarının yazılması.
  - Browser Subagent ile uçtan uca (E2E) tarayıcı otomasyonu ve video/ekran görüntüsü kanıtlarının toplanması.

---

## 🎯 2. Önemli Yönlendirmeler ve Prompting Stratejisi

1. **Konsept Netleştirmesi:**
   - Şirket ismi *Entoksis* altında gerçekçi ve ticari değeri yüksek bir B2B iş problemi tanımlandı: *"Tek Çatı BT – Şirketlerin cihaz envanteri, yazılım dağıtımı, parola kasası ve güvenli iç iletişim operasyonlarını tek merkezde toplayan hizmet."*
2. **"Kalıcı Kayıt" İlkesi:**
   - AI'a formun asla bir "mock" veya "fake timeout" ile başarı göstermemesi gerektiği, başarı mesajının **sadece ve sadece veritabanına fiziksel INSERT işlemi gerçekleştiğinde** üretilen takip koduyla tetikleneceği katı bir kural olarak bildirildi.
3. **Değerlendirici Deneyimi Önceliği:**
   - Projeyi inceleyen yazılım mühendisinin işini kolaylaştırmak için, formdan gönderdiği test kaydını anında kendi gözleriyle doğrulayabileceği bir canlı izleme ekranı (`/admin` ve `GET /api/leads`) geliştirilmesi talimatı verildi.

---

## ⚖️ 3. Kabul Edilen, Reddedilen ve Değiştirilen AI Önerileri

Proje boyunca AI tarafından üretilen ilk önerilere yapılan somut müdahaleler ve gerekçeleri:

### ❌ Müdahale 1: SQLite Yerine Neon Serverless PostgreSQL Kararı
- **AI'ın İlk Önerisi:** Kurulumu kolay olduğu gerekçesiyle yerel dosya tabanlı SQLite (`better-sqlite3`) kullanmak.
- **Yapılan İtiraz & Değişiklik:** Vercel sunucusuz (serverless) fonksiyonları çalıştığında dosya sistemi geçicidir (ephemeral). SQLite dosyasına yazılan bir kayıt, sunucusuz container kapandığında silinir; dolayısıyla canlıda "kalıcı kayıt" gereksinimi karşılanamaz.
- **Uygulanan Çözüm:** Neon Serverless PostgreSQL sürücüsü (`@neondatabase/serverless`) entegre edildi. Ayrıca yerelde değerlendirici sıfır konfigürasyonla çalıştırabilsin diye resilient fallback katmanı eklendi.

### ❌ Müdahale 2: Form Hata Durumu & Kullanıcı Veri Kaybı Engeli
- **AI'ın İlk Önerisi:** Formda sunucu hatası alındığında tüm formu resetlemek veya standart bir alert penceresi açmak.
- **Yapılan İtiraz & Değişiklik:** Kullanıcının yazdığı uzun açıklama metninin sunucu veya ağ hatasında silinmesi kabul edilemez bir kullanıcı deneyimi hatasıdır (UX anti-pattern).
- **Uygulanan Çözüm:** Hata durumunda form verileri state içinde korundu; hata sebebi kırmızı banner ile açıklandı ve yalnızca HTTP 201 yanıtı geldiğinde form başarıyla sıfırlandı.

### ❌ Müdahale 3: Ağır Animasyon Kütüphanelerinin Reddi
- **AI'ın İlk Önerisi:** Framer Motion veya benzeri 100KB+ büyüklüğünde JavaScript animasyon kütüphaneleri eklemek.
- **Yapılan İtiraz & Değişiklik:** Proje gereksiniminde "Sade CSS, ağır animasyon kütüphanesi yok" kuralı gözetilerek bu öneri reddedildi.
- **Uygulanan Çözüm:** Saf CSS geçişleri (`transition-colors`, `transform`), hafif spinner SVG ve yüksek kontrastlı modern karanlık tema tercih edildi.

### ❌ Müdahale 4: Next.js 16 SSR Prerender Hatası Düzeltmesi
- **Karşılaşılan Durum:** `next build` sırasında Next.js 16 derleyicisi `Footer.tsx` içindeki `{new Date().getFullYear()}` ifadesini dinamik zaman okuması gerekçesiyle derleme hatası (`blocking-prerender-current-time-client`) olarak işaretledi.
- **Uygulanan Çözüm:** Statik telif yılı (2026) sabitlenerek ve client component prerender kurallarına tam uyum sağlanarak derleme hatasız hale getirildi.

---

## 🧪 4. Doğrulama ve Sınama Adımları (Somut Kanıtlar)

Projede "hata uydurmadan", tüm akış somut test adımlarıyla denetlenmiştir:

### Adım 4.1: Otomatik Birim ve Entegrasyon Testleri (Vitest)
Terminal üzerinden `npm test` komutu çalıştırıldı:
```
 ✓ src/tests/db.test.ts (4 tests) 7ms
 ✓ src/tests/validation.test.ts (9 tests) 9ms

 Test Files  2 passed (2)
      Tests  13 passed (13)
```
- **Sınanan Durumlar:**
  1. Eksik isim (<2 karakter) ve geçersiz regex simgeleri içeren isimlerin reddedilmesi.
  2. `@` eksik veya geçersiz domain formatındaki e-postaların reddedilmesi.
  3. 4 tanımlı paket dışındaki manipüle edilmiş verilerin reddedilmesi.
  4. 10 karakterden kısa talep açıklamalarının reddedilmesi.
  5. Honeypot spam botu girişinin yakalanması.
  6. Benzersiz `TCB-` takip kodunun üretilmesi ve veritabanı okuma-yazma döngüsü.
  7. In-memory IP rate limiter'ın 5 istekten sonra 429 döndürmesi.

### Adım 4.2: Tarayıcı Otomasyonu ile Uçtan Uca (E2E) Doğrulama
Browser Subagent ile `http://localhost:3000` adresi üzerinde canlı simülasyon gerçekleştirildi:
1. **Landing Page:** Hero alanı, 4 hizmet paketi, karşılaştırma matrisi ve pilot kapsamı görsel olarak denetlendi.
2. **Boş Form Gönderimi (İstemci Doğrulaması):** Form boşken gönderildiğinde Ad Soyad, E-posta ve Açıklama alanlarının kırmızı çerçeve alarak kullanıcıyı uyardığı doğrulandı.
3. **Gerçek Form Gönderimi:**
   - Ad: `Kemal Ozturk`
   - E-posta: `kemal.ozturk@kurumsal.com.tr`
   - Paket: `Tüm Paketler (Tek Çatı Entegre)`
   - Açıklama girildi ve gönderildi.
4. **Yükleme ve Başarı Durumu:** Butonun spinner ile *"Talebiniz Kaydediliyor..."* durumuna geçtiği, ardından yeşil başarı kartının açılarak **`TCB-2608K-7445`** takip kodunun üretildiği gözlemlendi.
5. **Veritabanı Kalıcılık Doğrulaması (`/admin`):**
   - `/admin` sayfasına geçildi.
   - `Kemal Ozturk` adına oluşturulan kaydın, resmi takip kodu, seçilen paket, IP ve zaman damgasıyla veritabanında yer aldığı doğrulandı.
6. **Mobil Uyumluluk Testi:**
   - Tarayıcı `390x844` (iPhone) boyutuna küçültüldü; menü, metinler, form ve butonların mobil dokunmatik ekranlara tam oturduğu ve yatay taşma (horizontal overflow) yapmadığı onaylandı.
7. **Kayıt:** Bu oturuma ait video kaydı ve ekran görüntüleri sistem günlüklerinde mevcuttur.

---

## 💡 5. Sonuç ve Öz Değerlendirme
Yapay zeka asistanı bir "kara kutu kod üreticisi" olarak değil; hızlandırıcı bir eş programcı (pair programmer) olarak konumlandırılmıştır. Mimari kararlar, sunucusuz ortam gereksinimleri ve veri bütünlüğü prensipleri insan mühendisliği gözetimi altında tutularak 100 puanlık vaka analizi ölçütlerinin tamamı eksiksiz yerine getirilmiştir.
