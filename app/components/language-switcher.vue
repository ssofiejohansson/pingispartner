<template>
  <div class="relative group" v-if="langs && langs.length > 1">
    <ul class="flex items-center relative z-10">
      <li v-for="(lang, index) in langs" :key="`lang-${index}`">
        <a
          v-if="lang.url"
          :href="formatLang(lang.url)"
          class="uppercase block mr-3 text-sm leading-none text-zinc-400 hover:text-white"
        >
          {{ formatLang(lang.lang) }}
        </a>
        <span
          v-else
          class="uppercase block mr-3 text-sm leading-none underline underline-offset-4"
        >
          {{ formatLang(langString) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { uid } = useUid();
const home = useHome();
const route = useRoute();
const langString = useLang();
const customType = useCustomType();
const { client } = usePrismic();

const { data: altLangs } = await useAsyncData(
  `alternateIds-${langString}-${uid}-${customType}`,
  async () => {
    try {
      const params = { lang: langString };
      let mainDoc = {};
      if (route.path === home) {
        mainDoc = await client.getSingle("homepage", params);
      } else {
        mainDoc = await client.getByUID(customType, uid.value, params);
      }

      const alternateIds = [];

      mainDoc.alternate_languages.forEach((lang) => {
        alternateIds.push(lang.id);
      });

      const altLangs = await client.getAllByIDs(alternateIds, { lang: "*" });

      return altLangs;
    } catch {
      throw createError({
        statusCode: 404,
        message: "Langswitcher: Page not found",
        fatal: true,
      });
    }
  }
);

const langs = computed(() => {
  const al = altLangs.value ?? [];
  const cur = [{ lang: langString, url: false }];
  return (al.length ? [...al, ...cur] : cur).sort((a, b) =>
    a.lang > b.lang ? 1 : -1
  );
});

function formatLang(string) {
  return string
    .replace("en-gb", "en")
    .replace("de-de", "de")
    .replace("sv-se", "sv");
}
</script>

<style></style>
