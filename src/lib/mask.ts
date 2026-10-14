import { LeadRecord } from "./schema";

/**
 * Masks an email address: ke***@domain.com.tr
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "***";
  const [user, domain] = email.split("@");
  if (!user || !domain) return "***";
  const visible = user.length <= 2 ? user.slice(0, 1) : user.slice(0, 2);
  return `${visible}***@${domain}`;
}

/**
 * Masks an IP address:
 * IPv4: masks last two octets (e.g., 192.168.1.1 -> 192.168.*.*)
 * IPv6: masks everything after the first section (e.g., 2001:db8:: -> 2001:*)
 */
export function maskIp(ip: string): string {
  if (!ip) return "***";
  const cleanIp = ip.trim();

  // IPv4
  if (cleanIp.includes(".")) {
    const parts = cleanIp.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.*.*`;
    }
    return `${parts.slice(0, 2).join(".")}.*.*`;
  }

  // IPv6
  if (cleanIp.includes(":")) {
    const firstSection = cleanIp.split(":")[0];
    return `${firstSection || "2001"}:*`;
  }

  return "***";
}

/**
 * Masks name into 'Kemal O.' format (First name(s) + last initial + '.')
 */
export function maskName(name: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) return parts[0] || "";
  const lastName = parts[parts.length - 1];
  const firstNames = parts.slice(0, -1).join(" ");
  const initial = lastName.charAt(0).toUpperCase();
  return `${firstNames} ${initial}.`;
}

/**
 * Masks description to first 40 characters + '…'
 */
export function maskDescription(desc: string): string {
  if (!desc) return "";
  const trimmed = desc.trim();
  if (trimmed.length <= 40) return trimmed;
  return trimmed.slice(0, 40) + "…";
}

/**
 * Returns a PII-masked version of a LeadRecord for safe public/admin viewing
 */
export function maskLeadRecord(lead: LeadRecord): LeadRecord {
  return {
    ...lead,
    name: maskName(lead.name),
    email: maskEmail(lead.email),
    description: maskDescription(lead.description),
    ip_address: maskIp(lead.ip_address)
  };
}
