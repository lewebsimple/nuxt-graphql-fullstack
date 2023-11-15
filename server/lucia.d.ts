// server/lucia.d.ts
/// <reference types="lucia" />

declare namespace Lucia {
  type Auth = import("./lib/auth.js").Auth;
  type DatabaseUserAttributes = {
    email: string;
    role: import("@prisma/client").AuthRole;
  };
  type DatabaseSessionAttributes = {
    created_at: Date;
  };
}
