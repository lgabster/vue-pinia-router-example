<template>
  <nav class="p-3 hstack gap-4 divide-x font-bold">
    <router-link to="/">Home</router-link>
    <router-link to="/products">Products</router-link>
  </nav>
  <main class="container">
    <Suspense>
      <router-view />
    </Suspense>
  </main>
</template>

<script setup></script>

<style lang="scss">
nav {
  a {
    color: color.$black;

    &.router-link-exact-active {
      color: color.$green-500;
    }
  }
}
// main {
//   @include breakpoint.media(sm) {}
//   @include breakpoint.media(md) {}
//   @include breakpoint.media(lg) {}
// }
</style>
