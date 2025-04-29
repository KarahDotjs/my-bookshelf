<script setup>
defineProps({
  title: String,
  author: Array,
  coverId: Number
})
</script>

<template>
  <div class="p-4 bg-white shadow rounded text-center">
    <h2 class="text-lg font-bold">{{ title }}</h2>
    <p class="text-sm text-gray-700">
      {{ author?.[0] || "Auteur inconnu" }}
    </p>
    <img v-if="coverId" :src="`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`" alt="Couverture"
      class="mx-auto mt-4 h-48 object-cover" />
  </div>
</template>

<style scoped></style>
