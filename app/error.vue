<script setup>
defineProps(["error"]);

const handleError = () => clearError({ redirect: "/" });

useSeoMeta({
  title: "404 - Sidan kunde inte hittas",
  description: document?.data?.metaDescription ?? "",
  robots: "noindex, nofollow",
});
</script>

<template>
  <NuxtLayout>
    <section class="py-20">
      <div class="container rich-text">
        <h1>{{ error?.statusCode || "500" }} - {{ error?.statusMessage.split("|")[0] || "Internal Server Error" }}</h1>
        <p class="mt-4 text-lg">
          {{ error?.statusMessage.split("|")[1] || "" }} Kontrollera webbadressen eller gå tillbaka till
          <button class="inline appearance-none underline text-darkest" @click="handleError">startsidan</button>.
        </p>
      </div>
    </section>
  </NuxtLayout>
</template>
