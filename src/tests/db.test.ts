import { describe, it, expect } from "vitest";
import { insertLead, getLeads, getLeadByTrackingCode, generateTrackingCode } from "@/lib/db";
import { sanitizeString } from "@/lib/sanitize";
import { checkRateLimit } from "@/lib/rateLimit";

describe("Database & Persistence Unit Tests", () => {
  it("tracking code TCB- formatında üretilmelidir", () => {
    const code = generateTrackingCode();
    expect(code).toMatch(/^TCB-\d{2}[A-Z0-9]{3}-\d{4}$/);
  });

  it("yeni talep başarıyla kaydedilmeli ve okunabilmelidir", async () => {
    const newLead = await insertLead({
      name: "Mehmet Demir",
      email: "mehmet@kurum.com",
      package_id: "parola-kasasi",
      package_name: "Parola ve Sır Kasası",
      description: "Şirket içi parola paylaşımı ve API sırları için demo istiyoruz.",
      ip_address: "192.168.1.10"
    });

    expect(newLead.id).toBeGreaterThan(0);
    expect(newLead.tracking_code).toBeDefined();
    expect(newLead.tracking_code.startsWith("TCB-")).toBe(true);
    expect(newLead.name).toBe("Mehmet Demir");

    // Okuma kontrolü
    const allLeads = await getLeads(10);
    const found = allLeads.find((l) => l.tracking_code === newLead.tracking_code);
    expect(found).toBeDefined();
    expect(found?.email).toBe("mehmet@kurum.com");

    // Tekil kodla okuma kontrolü
    const single = await getLeadByTrackingCode(newLead.tracking_code);
    expect(single).not.toBeNull();
    expect(single?.name).toBe("Mehmet Demir");
  });

  it("HTML etiketlerini sanitize etmelidir", () => {
    const dirty = "<b>Ahmet</b> <script>alert('xss')</script>";
    const cleaned = sanitizeString(dirty);
    expect(cleaned).not.toContain("<");
    expect(cleaned).not.toContain(">");
    expect(cleaned).toContain("Ahmet");
  });

  it("rate limiter belirlenen limitten sonra istekleri engellemelidir", () => {
    const testIp = `test-ip-${Date.now()}`;
    // Limit: 3
    expect(checkRateLimit(testIp, 3, 1000).allowed).toBe(true);
    expect(checkRateLimit(testIp, 3, 1000).allowed).toBe(true);
    expect(checkRateLimit(testIp, 3, 1000).allowed).toBe(true);
    // 4. istek engellenmelidir
    const overLimit = checkRateLimit(testIp, 3, 1000);
    expect(overLimit.allowed).toBe(false);
    expect(overLimit.remaining).toBe(0);
  });
});
