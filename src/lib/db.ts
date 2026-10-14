import { neon } from "@neondatabase/serverless";
import { LeadRecord } from "./schema";

// Generate clean, professional tracking codes like: TCB-2601-9842
export function generateTrackingCode(): string {
  const yearSuffix = new Date().getFullYear().toString().slice(-2);
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  const randomAlpha = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `TCB-${yearSuffix}${randomAlpha}-${randomPart}`;
}

// Local fallback store for offline tests and dev without internet/db credentials
const localLeads: LeadRecord[] = [];
let localIdCounter = 1;

/**
 * Helper to get fresh environment configuration at call time
 * (Allows Vitest vi.stubEnv to dynamically change behavior in tests)
 */
function getDbConfig() {
  const isProduction = process.env.NODE_ENV === "production";
  const dbUrl = process.env.DATABASE_URL;
  const isNeonConfigured = Boolean(
    dbUrl && (dbUrl.startsWith("postgres://") || dbUrl.startsWith("postgresql://"))
  );
  return { isProduction, dbUrl, isNeonConfigured };
}

/**
 * Initializes table schema in Neon Postgres if connected.
 * In production, throws if DATABASE_URL is missing or query fails.
 */
export async function initDatabase(): Promise<void> {
  const { isProduction, dbUrl, isNeonConfigured } = getDbConfig();

  if (isProduction && !isNeonConfigured) {
    throw new Error("Production database configuration (DATABASE_URL) is missing or invalid.");
  }

  if (!isNeonConfigured) {
    return;
  }

  try {
    const sql = neon(dbUrl!);
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
    await sql`
      CREATE INDEX IF NOT EXISTS idx_leads_tracking_code ON leads (tracking_code);
    `;
  } catch (error) {
    console.error("[Database] Error ensuring leads table exists:", error);
    throw error;
  }
}

/**
 * Inserts a new lead into Neon PostgreSQL (or fallback store in dev/test).
 * In production: NEVER falls back to in-memory store. Throws on error.
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
  const { isProduction, dbUrl, isNeonConfigured } = getDbConfig();
  const trackingCode = generateTrackingCode();

  if (isProduction) {
    if (!isNeonConfigured) {
      throw new Error("Production database configuration missing: DATABASE_URL must be a valid PostgreSQL connection string.");
    }

    const sql = neon(dbUrl!);
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

  // Non-production (development or test environment)
  if (isNeonConfigured) {
    try {
      const sql = neon(dbUrl!);
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
    } catch (error) {
      console.warn("[Database] Neon insert failed in dev/test, using local in-memory fallback:", error);
    }
  }

  // Local fallback (only for dev/test when DATABASE_URL is not available or reachable)
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
 * Retrieves latest leads ordered by created_at DESC.
 * In production: NEVER falls back to in-memory store. Throws on error.
 */
export async function getLeads(limit: number = 50): Promise<LeadRecord[]> {
  const { isProduction, dbUrl, isNeonConfigured } = getDbConfig();

  if (isProduction) {
    if (!isNeonConfigured) {
      throw new Error("Production database configuration missing: DATABASE_URL must be a valid PostgreSQL connection string.");
    }

    const sql = neon(dbUrl!);
    await initDatabase();

    const rows = await sql`
      SELECT id, tracking_code, name, email, package_id, package_name, description, ip_address, user_agent, created_at
      FROM leads
      ORDER BY created_at DESC, id DESC
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

  // Non-production (development or test environment)
  if (isNeonConfigured) {
    try {
      const sql = neon(dbUrl!);
      await initDatabase();

      const rows = await sql`
        SELECT id, tracking_code, name, email, package_id, package_name, description, ip_address, user_agent, created_at
        FROM leads
        ORDER BY created_at DESC, id DESC
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
    } catch {
      // fallback in dev/test
    }
  }

  return [...localLeads.slice(0, limit)];
}

/**
 * Retrieves lead by tracking code.
 */
export async function getLeadByTrackingCode(trackingCode: string): Promise<LeadRecord | null> {
  const { isProduction, dbUrl, isNeonConfigured } = getDbConfig();

  if (isProduction) {
    if (!isNeonConfigured) {
      throw new Error("Production database configuration missing.");
    }

    const sql = neon(dbUrl!);
    await initDatabase();

    const rows = await sql`
      SELECT id, tracking_code, name, email, package_id, package_name, description, ip_address, user_agent, created_at
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
