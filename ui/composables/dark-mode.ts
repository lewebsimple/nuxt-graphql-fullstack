export function useDarkMode() {
  const colorMode = useColorMode();
  return {
    isDarkMode: computed({
      get: () => colorMode.value === "dark",
      set: (newIsDark) => (colorMode.preference = newIsDark ? "dark" : "light"),
    }),
  };
}
