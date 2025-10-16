<script setup lang="ts">
const { data, resetData, downloadQRCode } = useQRCode();
</script>
<template>
  <form class="w-full flex flex-col gap-3 md:aspect-square">
    <h1 class="text-white text-4xl text-center font-bold mb-3">
      Create your <span class="text-primary">QR Code!</span>
    </h1>

    <label for="default-range" class="text-white"
      >Code value (e.g. URL - https://www.google.com/)</label
    >
    <textarea
      v-model="data.value"
      class="block w-full rounded-md border border-neutral-800 p-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
      placeholder="Paste text or URL to encode..."
    />

    <aside class="flex justify-between gap-3">
      <label class="text-white">Background color</label>
      <input
        v-model="data.background"
        type="color"
        class="size-8 aspect-square rounded-full outline-none focus:ring-2 focus:ring-primary"
      />
    </aside>

    <aside class="flex justify-between gap-3">
      <label class="text-white">Foreground color</label>
      <input
        v-model="data.foreground"
        type="color"
        class="size-8 aspect-square rounded-full outline-none focus:ring-2 focus:ring-primary"
      />
    </aside>

    <aside class="flex justify-center items-center gap-3">
      <label class="text-white whitespace-nowrap">Image size</label>
      <input
        v-model="data.size"
        type="range"
        min="50"
        max="400"
        class="w-full h-2 bg-primary hover:bg-primary/80 rounded-lg appearance-none cursor-pointer focus:outline-none focus:bg-primary/80"
      />
    </aside>

    <aside class="md:mt-auto grid grid-cols-2 gap-3">
      <GenericButton @click.prevent="resetData">
        <IconReset />
        Reset
      </GenericButton>
      <GenericButton @click.prevent="downloadQRCode">
        <IconDownload />
        Download
      </GenericButton>
    </aside>
  </form>
</template>
