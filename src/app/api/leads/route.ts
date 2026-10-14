import { NextRequest, NextResponse } from "next/server";
import { leadSchema, SERVICE_PACKAGES } from "@/lib/schema";
import { insertLead, getLeads } from "@/lib/db";
import { checkRateLimit } from "@/lib/rateLimit";
import { sanitizeString } from "@/lib/sanitize";

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction and Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || undefined;

    const rateResult = checkRateLimit(ip, 5, 60 * 1000);
    if (!rateResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Çok fazla talep gönderildi. Lütfen ${rateResult.resetInSec} saniye sonra tekrar deneyin.`
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateResult.resetInSec)
          }
        }
      );
    }

    // 2. Body parsing
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Geçersiz istek gövdesi (JSON formatı bekleniyor)."
        },
        { status: 400 }
      );
    }

    // 3. Honeypot check
    if (body.website_url && body.website_url.trim().length > 0) {
      // Return 200 to mislead automated spam bots without persisting
      return NextResponse.json(
        {
          success: true,
          message: "Talebiniz başarıyla iletildi.",
          data: { trackingCode: "TCB-SPAM-OK" }
        },
        { status: 200 }
      );
    }

    // 4. Schema Validation
    const validation = leadSchema.safeParse(body);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const fieldName = issue.path[0]?.toString() || "form";
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }

      return NextResponse.json(
        {
          success: false,
          message: "Form doğrulama hatası. Lütfen alanları kontrol ediniz.",
          errors: fieldErrors
        },
        { status: 400 }
      );
    }

    const { name, email, package: packageId, description } = validation.data;

    // 5. Look up readable package name
    const selectedPkg = SERVICE_PACKAGES.find((p) => p.id === packageId);
    const packageName = selectedPkg ? selectedPkg.title : packageId;

    // 6. Sanitization
    const cleanName = sanitizeString(name);
    const cleanDesc = sanitizeString(description);

    // 7. Persistent storage insertion
    const record = await insertLead({
      name: cleanName,
      email: email.toLowerCase().trim(),
      package_id: packageId,
      package_name: packageName,
      description: cleanDesc,
      ip_address: ip,
      user_agent: userAgent
    });

    // 8. Success Response (Only returned when DB insert succeeds!)
    return NextResponse.json(
      {
        success: true,
        message: "Talebiniz sistemimize başarıyla kaydedildi.",
        data: {
          id: record.id,
          trackingCode: record.tracking_code,
          name: record.name,
          packageName: record.package_name,
          createdAt: record.created_at
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/leads] Sunucu Hatası:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Sunucuda beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit") || 50), 100);

    const leads = await getLeads(limit);

    return NextResponse.json({
      success: true,
      count: leads.length,
      data: leads
    });
  } catch (error) {
    console.error("[GET /api/leads] Hata:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Kayıtlar listelenirken sunucu hatası oluştu."
      },
      { status: 500 }
    );
  }
}
