# AI_LOG · Kararlar, Yönlendirmeler ve Doğrulama Günlüğü

Bu belge, **Entoksis Case Study** projesinin geliştirilmesinde yapay zeka araçlarının nasıl kullanıldığını, mimari kararları, AI önerilerine yapılan insan mühendisliği müdahalelerini ve somut doğrulama adımlarını şeffaf bir şekilde açıklar.

---

## 🛠️ 1. Kullanılan Araçlar ve Görev Dağılımı

- **Geliştirici Rolü (İnsan Mühendisliği):**
  - Mimari gereksinimlerin ve konseptin ("Tek Çatı BT") belirlenmesi.
  - Bulut/Sunucusuz ortam kısıtlarının analizi (Vercel ephemeral filesystem vs. Neon PostgreSQL).
  - Güvenlik ve edge-case gereksinimlerinin tanımlanması (Rate limiting, honeypot, XSS sanitization, PII maskeleme).
  - AI çıktılarının kod incelemesi (Code Review), mimari düzeltmeler ve kalite kapısı kontrolleri.
- **Yapay Zeka (Antigravity AI Agent):**
  - Proje iskeletinin bootstrap edilmesi, Zod şemalarının kodlanması.
  - Tailwind CSS bileşenlerinin semantik HTML kurallarına göre inşası.
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

Projede varsayımlarla değil, somut test adımlarıyla ilerlenmiştir:

### Adım 4.1: Otomatik Birim ve Entegrasyon Testleri (Vitest)
Terminal üzerinden `npm test` komutu çalıştırıldı:
```
 ✓ src/tests/mask.test.ts (13 tests) 8ms
 ✓ src/tests/db.test.ts (5 tests) 9ms
 ✓ src/tests/validation.test.ts (9 tests) 10ms
 ✓ src/tests/api.test.ts (4 tests) 27ms

 Test Files  4 passed (4)
      Tests  31 passed (31)
```

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

## 🔍 5. Teslim Öncesi Gözden Geçirme

Teslim öncesinde sistem güvenilirliği ve şeffaflığı artırmak adına aşağıdaki ek mimari düzenlemeler yapılmıştır:

1. **Fallback Kapsamının Sınırlandırılması:**
   - `src/lib/db.ts` içerisindeki in-memory fallback mekanizması yalnızca geliştirme ve test ortamlarıyla (`process.env.NODE_ENV !== 'production'`) sınırlandırıldı.
   - `process.env.NODE_ENV` ve `process.env.DATABASE_URL` kontrolleri dosya başında statik değil, doğrudan fonksiyon çağrısı anında dinamik okunacak şekilde düzenlendi; böylece Vitest `vi.stubEnv` ile ortam değişimleri tam izole şekilde test edilebilir hale geldi.
2. **Production Veri Kalıcılığı Güvencesi:**
   - Production modunda `DATABASE_URL` eksikse veya sorgu hata verirse sistemin asla in-memory belleğe düşmeyip hata fırlatması ve API'nin `500 Internal Server Error` dönmesi sağlandı. Canlıda hiçbir zaman sahte başarı veya sahte takip numarası dönülmez.
3. **Honeypot Davranışı Düzenlemesi:**
   - Botlar tarafından doldurulan `website_url` alanı için sahte 200 yerine doğrudan `400 Bad Request` ("Geçersiz istek tespit edildi.") dönülerek veritabanı yazımı engellendi.
4. **Sunucu Taraflı PII Maskeleme:**
   - `/admin` paneli ve `GET /api/leads` yanıtında ad, e-posta, IP ve açıklama bilgileri sunucu tarafında maskelendi (`ke***@domain.com.tr`, `192.168.*.*`, `Kemal Ö.`, 40 karakter + `…`).
   - `/admin` rotasına `robots: { index: false, follow: false }` metadata'sı ve istek için `cache: 'no-store'` eklendi.
5. **Metin ve İddia Düzeltmeleri:**
   - Doğrulanamayan iddialar ("%40 tasarruf garantisi", "uçtan uca şifreleme garantisi", "sıfır güvenlik açığı") yumuşatıldı; süreç "Örnek pilot kapsamı (kurgusal)" olarak çerçevelendi ve footer ile README'ye projenin bir değerlendirme projesi olduğunu belirten net beyan eklendi.
6. **Rate Limiting Ayarı:**
   - Makul kurumsal kullanım ve değerlendirici testleri gözetilerek IP başına istek sınırı dakikada 20'ye yükseltildi.

---

## 💡 6. Sonuç ve Objektif Kapanış

Bu çalışma sürecinde yapay zeka asistanı bir "kara kutu kod üreticisi" olarak değil; hızlandırıcı bir eş programcı (pair programmer) olarak konumlandırılmıştır. 

**Neler Yapıldı:**
- Kullanıcıya değer önerisini ve kurgusal pilot kapsamını net aktaran mobil uyumlu landing page.
- İstemci ve sunucu katmanında Zod ile çift taraflı doğrulanan, durum kontrollü (loading/hata/başarı) talep formu.
- Neon Serverless PostgreSQL ile sunucu tarafında kalıcı kayıt saklama ve gerçek takip kodu üretimi.
- Production ortamında veritabanı yoksa veya hata verirse fallback'e düşmeyip 500 dönen katı veri bütünlüğü kuralı.
- Değerlendiricinin kaydı anlık doğrulaması için sunucu taraflı PII maskeli `/admin` paneli.
- 31 testlik kapsamlı Vitest test paketi ve GitHub Actions CI hattı.

**Neler Bilinçli Olarak Kapsam Dışı Bırakıldı:**
- Kullanıcı giriş/üyelik sistemi (Auth),
- Gerçek SMTP e-posta gönderimi,
- Harici Redis cluster bağımlılığı,
- Ağır animasyon ve UI kütüphaneleri.

Tüm teknik kararlar projenin yalınlığını, çalıştırılabilirliğini ve güvenlik standartlarını koruyacak şekilde alınmıştır.
