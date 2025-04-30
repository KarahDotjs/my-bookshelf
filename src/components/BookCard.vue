<script setup>
defineProps({
  title: String,
  author: Array,
  coverId: Number
})

const emit = defineEmits(['addToLibrary'])


const addThisBook = () => {
  emit('addToLibrary', {
    title,
    author,
    coverId
  })
}


</script>

<template>
  <div class="p-4 bg-white shadow rounded text-center">
    <h2 class="text-lg font-bold">{{ title }}</h2>
    <p class="text-sm text-gray-700">
      {{ author?.[0] || "Auteur inconnu" }}
    </p>
    <img v-if="coverId" :src="`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`" alt="Couverture"
      class="mx-auto mt-4 h-48 object-cover" />
    <button @click="addThisBook"
      class="mt-4 bg-blue-400 text-white py-1 px-3 rounded hover:bg-green-600 text-sm font-bold">
      <font-awesome-icon icon="plus"" />
      Ajouter à ma bibliothèque
    </button>

  </div>

</template>

<style scoped></style>
