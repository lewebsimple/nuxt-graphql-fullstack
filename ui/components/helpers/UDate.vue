<script setup lang="ts">
import { DateTime } from "luxon";

const props = defineProps<{ date: Date | string; format?: "date" | "datetime" | "month-year" | "time" | "relative" }>();
const dt = computed(() => (props.date instanceof Date ? DateTime.fromJSDate(props.date) : DateTime.fromISO(props.date)));
const formatted = computed(() => {
  switch (props.format) {
    default:
    case "date":
      return dt.value.toLocaleString({ year: "numeric", month: "2-digit", day: "2-digit" });
    case "datetime":
      return dt.value.toLocaleString(DateTime.DATETIME_MED);
    case "month-year":
      return dt.value.toLocaleString({ year: "numeric", month: "long" });
    case "time":
      return dt.value.toLocaleString(DateTime.TIME_SIMPLE);
    case "relative":
      return dt.value.toRelative();
  }
});
</script>

<template>
  <template v-if="dt.isValid">
    <UTooltip v-if="format === 'relative'" :text="dt.toLocaleString(DateTime.DATETIME_MED)">
      <time v-bind="$attrs" :datetime="dt.toISO()!">{{ formatted }}</time>
    </UTooltip>
    <time v-else v-bind="$attrs" :datetime="dt.toISO()!">{{ formatted }}</time>
  </template>
</template>
