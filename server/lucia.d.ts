// server/lucia.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./utils/auth.ts").Auth;
  type UserAttributes = {
    email: string;
  };
  type UserSession = {
    created_at: Date;
  };
}
