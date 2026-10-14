import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST, GET } from "@/app/api/leads/route";
import { NextRequest } from "next/server";
import { getLeads } from "@/lib/db";

describe("API Route & Production Guard Tests (/api/leads)", () => {
  const validPayload = {
    name: "Kemal Öztürk",
    email: "kemal.ozturk@kurumsal.com.tr",
    package: "parola-kasasi",
    description: "Şirket içi parola kasası ve API sır yönetimi için pilot talep ediyoruz.",
    website_url: ""
  };

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("Honeypot Koruması", () => {
    it("honeypot alanı (website_url) dolu geldiğinde 400 Bad Request dönmeli ve DB'ye yazılmamalıdır", async () => {
      vi.stubEnv("NODE_ENV", "test");
      const initialLeads = await getLeads(100);
      const initialCount = initialLeads.length;

      const req = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validPayload,
          website_url: "https://spam-bot.online"
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toBe("Geçersiz istek tespit edildi.");

      // DB'ye yeni kayıt eklenmediğini doğrula
      const afterLeads = await getLeads(100);
      expect(afterLeads.length).toBe(initialCount);
    });
  });

  describe("Production Veritabanı Hatası Koruması", () => {
    it("production ortamında (NODE_ENV=production) DATABASE_URL yoksa 500 dönmeli, 201 ve takip kodu dönmemelidir", async () => {
      vi.stubEnv("NODE_ENV", "production");
      vi.stubEnv("DATABASE_URL", "");

      const req = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload)
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(response.status).not.toBe(201);
      expect(data.success).toBe(false);
      expect(data.data?.trackingCode).toBeUndefined();
      expect(data.message).toBe("Sunucuda beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
    });

    it("production ortamında geçersiz DATABASE_URL ile sorgu hata verdiğinde fallback'e düşmeyip 500 dönmelidir", async () => {
      vi.stubEnv("NODE_ENV", "production");
      vi.stubEnv("DATABASE_URL", "postgresql://invalid_user:invalid_pass@127.0.0.1:9999/nonexistent?sslmode=require");

      const req = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload)
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(response.status).not.toBe(201);
      expect(data.success).toBe(false);
      expect(data.data?.trackingCode).toBeUndefined();
    });
  });

  describe("GET /api/leads Sunucu Taraflı Maskeleme", () => {
    it("GET endpoint'i dönen verilerdeki hassas kişisel verileri sunucuda maskelemelidir", async () => {
      vi.stubEnv("NODE_ENV", "test");

      // Önce geçerli bir talep gönder
      const postReq = new NextRequest("http://localhost:3000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload)
      });
      const postRes = await POST(postReq);
      expect(postRes.status).toBe(201);

      // GET ile listele
      const getReq = new NextRequest("http://localhost:3000/api/leads");
      const getRes = await GET(getReq);
      const getData = await getRes.json();

      expect(getRes.status).toBe(200);
      expect(getData.success).toBe(true);
      expect(Array.isArray(getData.data)).toBe(true);
      expect(getData.data.length).toBeGreaterThan(0);

      // Listenin en başındaki kaydın maskelenmiş olduğunu doğrula
      const firstItem = getData.data[0];
      expect(firstItem.email).toContain("***@");
      expect(firstItem.name).toMatch(/^[A-Za-zçğıöşüÇĞİÖŞÜ\s]+\s[A-ZÇĞİÖŞÜ]\.$/);
      expect(firstItem.ip_address).toContain("*");
    });
  });
});
