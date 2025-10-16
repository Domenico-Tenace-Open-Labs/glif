<template>
  <nav class="w-full flex items-center justify-between px-4 md:px-64 py-4 bg-primary z-20">
    <NuxtLink to="/" class="w-full md:w-fit flex justify-center items-center gap-2">
      <IconLogo class="size-10 md:size-6" />
      <h1 class="text-4xl md:text-2xl font-heading font-bold tracking-wide">Glif</h1>
    </NuxtLink>

    <ul class="hidden md:flex gap-8 items-center font-sans">
      <li>
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-surface fill-surface transition-colors"
        >
          <IconHome />
          Home
        </NuxtLink>
      </li>

      <li>
        <NuxtLink
          to="/create"
          class="flex items-center gap-2 text-surface fill-surface transition-colors"
        >
          <IconCreate />
          Create
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
