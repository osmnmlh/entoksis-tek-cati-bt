import { describe, it, expect } from "vitest";
import { leadSchema, packageIds } from "@/lib/schema";

describe("Form Validation Schema (leadSchema)", () => {
  const validData = {
    name: "Ahmet Yılmaz",
    email: "ahmet@sirketiniz.com",
    package: "cihaz-envanteri" as const,
    description: "Şirketimizdeki 45 adet dizüstü bilgisayarın takibi ve uzaktan yönetimi için pilot istiyoruz.",
    website_url: ""
  };

  it("geçerli verileri başarıyla doğrulamalıdır", () => {
    const result = leadSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Ahmet Yılmaz");
      expect(result.data.email).toBe("ahmet@sirketiniz.com");
      expect(result.data.package).toBe("cihaz-envanteri");
    }
  });

  it("isim 2 karakterden kısa olduğunda hata vermelidir", () => {
    const result = leadSchema.safeParse({ ...validData, name: "A" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("en az 2 karakter");
    }
  });

  it("isimde geçersiz simgeler olduğunda reddetmelidir", () => {
    const result = leadSchema.safeParse({ ...validData, name: "Ahmet<script>alert(1)</script>" });
    expect(result.success).toBe(false);
  });

  it("geçersiz e-posta formatlarını reddetmelidir", () => {
    const invalidEmails = [
      "ahmet",
      "ahmet@",
      "@sirket.com",
      "ahmet@sirket",
      "ahmet sirket.com"
    ];

    for (const email of invalidEmails) {
      const result = leadSchema.safeParse({ ...validData, email });
      expect(result.success).toBe(false);
    }
  });

  it("geçerli kurumsal e-posta formatlarını kabul etmelidir", () => {
    const validEmails = [
      "ahmet.yilmaz@teknoloji.com.tr",
      "bilgi@entoksis.com",
      "it-admin@holding.net"
    ];

    for (const email of validEmails) {
      const result = leadSchema.safeParse({ ...validData, email });
      expect(result.success).toBe(true);
    }
  });

  it("tanımsız paket seçimlerini reddetmelidir", () => {
    const result = leadSchema.safeParse({ ...validData, package: "bilinmeyen-paket" });
    expect(result.success).toBe(false);
  });

  it("tanımlı 4 ana paket ve tam paketi kabul etmelidir", () => {
    for (const pkgId of packageIds) {
      const result = leadSchema.safeParse({ ...validData, package: pkgId });
      expect(result.success).toBe(true);
    }
  });

  it("açıklama 10 karakterden kısa olduğunda hata vermelidir", () => {
    const result = leadSchema.safeParse({ ...validData, description: "Kısa" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("en az 10 karakter");
    }
  });

  it("honeypot alanı doldurulduğunda hata vermelidir", () => {
    const result = leadSchema.safeParse({ ...validData, website_url: "https://spam.bot.net" });
    expect(result.success).toBe(false);
  });
});
