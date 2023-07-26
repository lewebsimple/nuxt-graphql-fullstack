// server/lucia.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./utils/auth.ts").Auth;
  type DatabaseUserAttributes = {
    email: string;
  };
  type DatabaseSessionAttributes = {
    created_at: Date;
  };
}
