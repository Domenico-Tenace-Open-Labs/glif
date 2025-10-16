<template>
  <main
    class="grow-1 relative flex font-sans flex-col items-center justify-center gap-4 md:gap-6 px-8 md:px-64 py-16"
  >
    <aside class="absolute inset-0 opacity-30">
      <section
        class="relative w-full h-full [&>pre]:absolute [&>pre]:w-full md:[&>pre]:w-1/2 [&>pre]:h-1/2 md:[&>pre]:h-1/2 [&>pre]:translate-y-1/2 md:[&>pre]:translate-x-1/2 [&>pre]:mb-8 [&>pre]:bg-[radial-gradient(var(--color-primary)_1px,transparent_1px)] [&>pre]:[background-size:20px_20px] [&>pre]:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_30%,transparent_100%)] z-0"
      >
        <pre></pre>
      </section>
    </aside>
    <h1 class="text-3xl sm:text-5xl text-white font-black text-center z-10">
      Create and download your <span class="text-primary">QR Codes</span>
    </h1>
    <p class="text-lg text-neutral-500 text-center z-10">
      Smartly organized generated links with easily customization.
    </p>
    <NuxtLink to="/create" class="z-10"><GenericButton>Get started</GenericButton></NuxtLink>
  </main>
</template>
