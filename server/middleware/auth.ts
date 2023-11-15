import { type Session } from "lucia";

import { auth } from "~/server/lib/auth";

export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event);
  event.context.session = await authRequest.validate();
});

declare module "h3" {
  interface H3EventContext {
    session: Session | null;
  }
}
