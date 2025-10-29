<template>
  <div class="">
    <slices :doc="doc" />
  </div>
</template>

<script setup>
const lang = useLang();
const prismic = usePrismic();

const { data: doc } = await useAsyncData(`homepage-${lang}`, async () => {
  return await prismic.client.getSingle("homepage", {
    lang,
    server: true,
    lazy: false,
  });
});

if (!doc?.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Sidan kunde inte hittas | Den här sidan kan inte visas just nu.",
    fatal: true,
  });
}

useSeo({ doc });
</script>
