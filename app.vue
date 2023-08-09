<script setup lang="ts">
const { siteName } = useRuntimeConfig().public;
const head = useLocaleHead({ addSeoAttributes: true });
useHead({ titleTemplate: (title) => (title ? `${title} | ${siteName}` : siteName) });
</script>

<template>
  <Html :lang="head.htmlAttrs?.lang">
    <Head>
      <template v-for="link in head.link" :key="link.hid">
        <Link :id="link.hid" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.hid">
        <Meta :id="meta.hid" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body class="antialiased font-sans text-gray-700 bg-white">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
