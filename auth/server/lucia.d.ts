// server/lucia.d.ts
/// <reference types="lucia" />

declare namespace Lucia {
  type Auth = import("./utils/auth.js").Auth;
  type DatabaseUserAttributes = {
    email: string;
    role: import("~/graphql/utils/graphql").AuthRole;
  };
  type DatabaseSessionAttributes = {
    created_at: Date;
  };
}
