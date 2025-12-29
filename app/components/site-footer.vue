<template>
  <div class="w-full py-20 bg-light mt-10">
    <div class="container">
      <div class="flex flex-col items-center justify-center gap-8">
        <nuxt-link :to="home">
          <prismic-image
            :field="settings?.data?.logo"
            class="h-20 w-auto block"
          />
        </nuxt-link>
        
        <!-- <pre>{{ footer?.data }}</pre> -->
        

        <!-- links -->
        <!-- <ul>
          <li
            v-for="(link, index) in footer?.data?.links || []"
            :key="`footer-link-${index}`"
            class="text-center"
          >
            <PrismicLink :field="primary.link">
              {{ primary.link.text }}
            </PrismicLink>
          </li>
        </ul> -->

        <!-- <SliceZone
          v-if="footer?.data?.slices?.length"
          :slices="footer.data.slices"
          :components="components"
        /> -->

        <div class="flex items-center gap-2">
          <p class="text-base">I samarbete med</p>
          <Icon name="stiga" class="h-10 w-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { components } from "~/slices";

const home = useHome();
const { data: settings } = await useSettings();
const { data: footer } = await useFooter();
</script>
