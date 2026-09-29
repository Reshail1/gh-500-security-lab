/**
 * INTENTIONALLY INSECURE — GH-500 PRACTICE ONLY.
 * This file is excluded from the app build and is never imported by src/.
 * Do not copy this query construction into application code.
 */
type QueryClient = { query(sql: string): Promise<unknown> };

export function findUserUnsafe(db: QueryClient, id: string): Promise<unknown> {
  return db.query(`SELECT id, name FROM users WHERE id = '${id}'`);
}
