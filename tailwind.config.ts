import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
    },
  },
};
