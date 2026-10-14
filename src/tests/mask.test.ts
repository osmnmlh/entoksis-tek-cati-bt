import { describe, it, expect } from "vitest";
import { maskEmail, maskIp, maskName, maskDescription, maskLeadRecord } from "@/lib/mask";
import { LeadRecord } from "@/lib/schema";

describe("PII Masking Utilities (mask.ts)", () => {
  describe("maskEmail", () => {
    it("e-posta adresini ke***@domain.com.tr biçiminde maskelemelidir", () => {
      expect(maskEmail("kemal.ozturk@kurumsal.com.tr")).toBe("ke***@kurumsal.com.tr");
      expect(maskEmail("ahmet@sirket.com")).toBe("ah***@sirket.com");
    });

    it("kısa kullanıcı isimli e-postaları güvenle maskelemelidir", () => {
      expect(maskEmail("a@domain.com")).toBe("a***@domain.com");
      expect(maskEmail("ab@domain.com")).toBe("a***@domain.com");
    });

    it("geçersiz veya boş e-posta için '***' dönmelidir", () => {
      expect(maskEmail("")).toBe("***");
      expect(maskEmail("gecersiz")).toBe("***");
    });
  });

  describe("maskIp", () => {
    it("IPv4 adreslerinin son iki oktetini maskelemelidir", () => {
      expect(maskIp("192.168.1.1")).toBe("192.168.*.*");
      expect(maskIp("10.0.4.15")).toBe("10.0.*.*");
      expect(maskIp("127.0.0.1")).toBe("127.0.*.*");
    });

    it("IPv6 adreslerinde ilk bölüm dışını maskelemelidir", () => {
      expect(maskIp("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe("2001:*");
      expect(maskIp("fe80::1ff:fe23:4567:890a")).toBe("fe80:*");
    });

    it("boş veya geçersiz IP durumunu güvenle ele almalıdır", () => {
      expect(maskIp("")).toBe("***");
    });
  });

  describe("maskName", () => {
    it("adı 'Kemal O.' biçimine dönüştürmelidir", () => {
      expect(maskName("Kemal Öztürk")).toBe("Kemal Ö.");
      expect(maskName("Ahmet Yılmaz")).toBe("Ahmet Y.");
      expect(maskName("Mehmet Ali Kaya")).toBe("Mehmet Ali K.");
    });

    it("tek kelimelik isimleri olduğu gibi bırakmalıdır", () => {
      expect(maskName("Kemal")).toBe("Kemal");
    });

    it("boş isim durumunda boş string dönmelidir", () => {
      expect(maskName("")).toBe("");
    });
  });

  describe("maskDescription", () => {
    it("40 karakterden uzun açıklamaları ilk 40 karakter + '…' yapmalıdır", () => {
      const longDesc = "Şirketimizdeki tüm bilgisayarların envanter ve uzaktan yama yönetimi için pilot talep ediyoruz.";
      const masked = maskDescription(longDesc);
      expect(masked.length).toBe(41); // 40 chars + '…'
      expect(masked.endsWith("…")).toBe(true);
      expect(masked).toBe(longDesc.slice(0, 40) + "…");
    });

    it("40 karakter veya daha kısa açıklamaları olduğu gibi bırakmalıdır", () => {
      const shortDesc = "Kısa talep açıklaması.";
      expect(maskDescription(shortDesc)).toBe(shortDesc);
    });

    it("boş açıklamada boş string dönmelidir", () => {
      expect(maskDescription("")).toBe("");
    });
  });

  describe("maskLeadRecord", () => {
    it("LeadRecord nesnesindeki tüm hassas alanları aynı anda maskelemelidir", () => {
      const record: LeadRecord = {
        id: 1,
        tracking_code: "TCB-26AB-1234",
        name: "Kemal Öztürk",
        email: "kemal.ozturk@kurumsal.com.tr",
        package_id: "parola-kasasi",
        package_name: "Parola ve Sır Kasası",
        description: "Şirketimizdeki tüm bilgisayarların envanter ve uzaktan yama yönetimi için pilot talep ediyoruz.",
        ip_address: "192.168.1.50",
        created_at: "2026-10-14T10:00:00Z"
      };

      const masked = maskLeadRecord(record);

      expect(masked.id).toBe(1);
      expect(masked.tracking_code).toBe("TCB-26AB-1234");
      expect(masked.package_id).toBe("parola-kasasi");
      expect(masked.created_at).toBe("2026-10-14T10:00:00Z");

      // Masked fields
      expect(masked.name).toBe("Kemal Ö.");
      expect(masked.email).toBe("ke***@kurumsal.com.tr");
      expect(masked.ip_address).toBe("192.168.*.*");
      expect(masked.description.endsWith("…")).toBe(true);
    });
  });
});
