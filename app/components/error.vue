<template>
  <section class="my-12 lg:my-24 xl:my-32">
    <div class="container rich-text">
      <h1>
        {{ error?.statusCode === 404
          ? "Sidan kunde inte hittas"
          : "Ett fel inträffade" }}
      </h1>

      <p v-if="error?.statusMessage">
        {{ error.statusMessage }}
      </p>
    </div>
  </section>
</template>

<script setup>
const error = useError()
</script>
