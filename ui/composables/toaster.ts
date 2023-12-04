export function useToaster() {
  const { add } = useToast();
  const success = (description: string) => add({ title: "Succès", description, color: "green", icon: "i-heroicons-check-circle" });
  const error = (description: string) => add({ title: "Erreur", description, color: "red", icon: "i-heroicons-x-circle" });
  const info = (title: string, description: string) => add({ title, description, color: "primary", icon: "i-heroicons-info-circle" });
  return { success, error, info };
}
