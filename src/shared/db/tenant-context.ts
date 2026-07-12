import { sql, type SQL } from "drizzle-orm";

export const tenantContextSetting = "mesaflow.tenant_id";

interface TransactionExecutor {
  execute(query: SQL): Promise<unknown>;
}

interface TransactionRunner<TTransaction extends TransactionExecutor> {
  transaction<TResult>(callback: (tx: TTransaction) => Promise<TResult>): Promise<TResult>;
}

export async function withTenantContext<TTransaction extends TransactionExecutor, TResult>(
  db: TransactionRunner<TTransaction>,
  tenantId: string,
  callback: (tx: TTransaction) => Promise<TResult>,
): Promise<TResult> {
  const normalizedTenantId = tenantId.trim();

  if (normalizedTenantId.length === 0) {
    throw new Error("Tenant context is required.");
  }

  return db.transaction(async (tx) => {
    await tx.execute(sql`SELECT set_config(${tenantContextSetting}, ${normalizedTenantId}, true)`);

    return callback(tx);
  });
}
