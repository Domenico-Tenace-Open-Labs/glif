<script setup lang="ts">
import QRCode from "qrcode.vue";

const { data } = useQRCode();
</script>
<template>
  <main
    class="grow-1 md:flex md:justify-center md:items-center px-4 md:px-64 py-4 overflow-y-scroll"
  >
    <section
      class="w-full h-fit flex flex-col md:grid md:grid-cols-2 gap-3 p-3 rounded-xl bg-background-muted border border-neutral-800"
    >
      <FormCreateQRCode />
      <aside
        class="relative w-full h-full flex justify-center items-center rounded-lg border border-neutral-800 aspect-square"
      >
        <section
          class="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,var(--color-neutral-800)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-neutral-800)_1px,transparent_1px)] bg-[size:6rem_6rem] bg-center opacity-40 z-0"
        ></section>
        <p class="absolute inset-y-0 text-md text-neutral-500/50 mt-2">Preview</p>
        <QRCode
          :value="data.value"
          :level="data.level"
          :render-as="data.renderAs"
          :background="data.background"
          :foreground="data.foreground"
          :size="data.size"
          class="z-10"
        />
      </aside>
    </section>
  </main>
</template>
