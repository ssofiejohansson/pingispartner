<template>
  <div class="">
    <site-breadcrumbs :doc="doc" />
    <slices :doc="doc" />
  </div>
</template>

<script setup>
const { uid } = useUid();
const lang = useLang();
const customType = useCustomType();
const prismic = usePrismic();

const { data: doc, refresh } = await useAsyncData(
  `${uid.value}-${lang}`,
  async () => {
    return await prismic.client.getByUID(customType, uid.value, {
      lang,
    });
  },
  {
    watch: [uid],
    server: true,
    lazy: false,
  }
);

if (!doc?.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Sidan kunde inte hittas | Den här sidan kan inte visas just nu.",
    fatal: true,
  });
}

useSeo({ doc });
</script>
