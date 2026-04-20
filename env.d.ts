declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ADMIN_PASSWORD?: string;
    }
  }
}

interface CloudflareEnv {
  DB: D1Database;
}
