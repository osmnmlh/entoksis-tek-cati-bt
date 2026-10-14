import { neon } from "@neondatabase/serverless";
import { LeadRecord } from "./schema";

// Generate clean, professional tracking codes like: TCB-2601-9842
export function generateTrackingCode(): string {
  const yearSuffix = new Date().getFullYear().toString().slice(-2);
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  const randomAlpha = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `TCB-${yearSuffix}${randomAlpha}-${randomPart}`;
}

const isNeonConfigured = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres"));

// Local fallback store for offline tests and dev without internet/db credentials
const localLeads: LeadRecord[] = [];
let localIdCounter = 1;

/**
 * Initializes table schema in Neon Postgres if connected
 */
export async function initDatabase(): Promise<void> {
  if (!isNeonConfigured) {
    return;
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        tracking_code VARCHAR(32) UNIQUE NOT NULL,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(160) NOT NULL,
        package_id VARCHAR(64) NOT NULL,
        package_name VARCHAR(120) NOT NULL,
        description TEXT NOT NULL,
        ip_address VARCHAR(64),
        user_agent TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    // Create index on tracking_code for fast lookup
    await sql`
      CREATE INDEX IF NOT EXISTS idx_leads_tracking_code ON leads (tracking_code);
    `;
  } catch (error) {
    console.error("[Database] Error ensuring leads table exists:", error);
    throw error;
  }
}

/**
 * Inserts a new lead into Neon PostgreSQL (or fallback store)
 */
export async function insertLead(data: {
  name: string;
  email: string;
  package_id: string;
  package_name: string;
  description: string;
  ip_address: string;
  user_agent?: string;
}): Promise<LeadRecord> {
  const trackingCode = generateTrackingCode();

  if (isNeonConfigured) {
    const sql = neon(process.env.DATABASE_URL!);
    
    // Ensure table exists on first insert
    await initDatabase();

    const rows = await sql`
      INSERT INTO leads (
        tracking_code,
        name,
        email,
        package_id,
        package_name,
        description,
        ip_address,
        user_agent
      ) VALUES (
        ${trackingCode},
        ${data.name},
        ${data.email},
        ${data.package_id},
        ${data.package_name},
        ${data.description},
        ${data.ip_address},
        ${data.user_agent || null}
      )
      RETURNING id, tracking_code, name, email, package_id, package_name, description, ip_address, user_agent, created_at;
    `;

    const row = rows[0];
    return {
      id: Number(row.id),
      tracking_code: String(row.tracking_code),
      name: String(row.name),
      email: String(row.email),
      package_id: String(row.package_id),
      package_name: String(row.package_name),
      description: String(row.description),
      ip_address: String(row.ip_address),
      user_agent: row.user_agent ? String(row.user_agent) : undefined,
      created_at: new Date(row.created_at).toISOString()
    };
  }

  // Local fallback (when DATABASE_URL is not provided)
  const newRecord: LeadRecord = {
    id: localIdCounter++,
    tracking_code: trackingCode,
    name: data.name,
    email: data.email,
    package_id: data.package_id,
    package_name: data.package_name,
    description: data.description,
    ip_address: data.ip_address,
    user_agent: data.user_agent,
    created_at: new Date().toISOString()
  };

  localLeads.unshift(newRecord);
  return newRecord;
}

/**
 * Retrieves latest leads for admin / evaluation audit
 */
export async function getLeads(limit: number = 50): Promise<LeadRecord[]> {
  if (isNeonConfigured) {
    const sql = neon(process.env.DATABASE_URL!);
    await initDatabase();

    const rows = await sql`
      SELECT id, tracking_code, name, email, package_id, package_name, description, ip_address, user_agent, created_at
      FROM leads
      ORDER BY id DESC
      LIMIT ${limit};
    `;

    return rows.map((row) => ({
      id: Number(row.id),
      tracking_code: String(row.tracking_code),
      name: String(row.name),
      email: String(row.email),
      package_id: String(row.package_id),
      package_name: String(row.package_name),
      description: String(row.description),
      ip_address: String(row.ip_address),
      user_agent: row.user_agent ? String(row.user_agent) : undefined,
      created_at: new Date(row.created_at).toISOString()
    }));
  }

  return [...localLeads.slice(0, limit)];
}

/**
 * Retrieves lead by tracking code
 */
export async function getLeadByTrackingCode(trackingCode: string): Promise<LeadRecord | null> {
  if (isNeonConfigured) {
    const sql = neon(process.env.DATABASE_URL!);
    await initDatabase();

    const rows = await sql`
      SELECT id, tracking_code, name, email, package_id, package_name, description, ip_address, user_agent, created_at
      FROM leads
      WHERE tracking_code = ${trackingCode}
      LIMIT 1;
    `;

    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: Number(row.id),
      tracking_code: String(row.tracking_code),
      name: String(row.name),
      email: String(row.email),
      package_id: String(row.package_id),
      package_name: String(row.package_name),
      description: String(row.description),
      ip_address: String(row.ip_address),
      user_agent: row.user_agent ? String(row.user_agent) : undefined,
      created_at: new Date(row.created_at).toISOString()
    };
  }

  const found = localLeads.find((l) => l.tracking_code === trackingCode);
  return found || null;
}
