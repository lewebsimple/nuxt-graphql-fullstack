import { type Session } from "lucia";

export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event);
  event.context.auth = await authRequest.validate();
});

declare module "h3" {
  interface H3EventContext {
    auth: Session | null;
  }
}
