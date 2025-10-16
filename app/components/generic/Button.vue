<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean;
  bgColor?: string;
}>();

const style = computed(() => {
  if (props.bgColor === "secondary") {
    return "bg-secondary hover:bg-secondary/80 focus:bg-secondary/80";
  }

  return "bg-primary hover:bg-primary/80 focus:bg-primary/80";
});
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      'font-medium rounded-lg transition-all duration-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 text-base cursor-pointer',
      'flex justify-center items-center gap-1 text-background',
      style,
    ]"
  >
    <slot />
  </button>
</template>
