import { createRequire } from "module";

// @see https://github.com/prisma/prisma/issues/12504#issuecomment-1365267088
const require = createRequire(import.meta.url);
const pathName = require.resolve("@prisma/client").replace("@prisma/client/index.js", "");

export default defineNuxtConfig({
  vite: { resolve: { alias: { ".prisma/client/index-browser": `${pathName}.prisma/client/index-browser.js` } } },
});
