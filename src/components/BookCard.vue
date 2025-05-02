<script setup>

import { Plus } from 'lucide-vue-next';


defineProps({
  title: String,
  author: Array,
  coverId: Number,
  bookData: Object, // tous les livres
  onAdd: Function    //
});
</script>



<template>
  <div class="p-4 bg-white shadow rounded flex flex-col justify-between h-full min-h-[400px]">
    <h2 class="text-lg font-bold">{{ title }}</h2>
    <p class="text-sm text-gray-700">
      {{ author?.[0] || "Auteur inconnu" }}
    </p>
    <img v-if="coverId" :src="`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`" alt="Couverture"
      class="mx-auto mt-4 h-48 object-cover" />
    <!-- BOUTON ➕ -->
    <button v-if="onAdd" @click="onAdd(bookData)"
      class="mt-4 mx-auto bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded transition duration-200 flex items-center justify-center gap-2">
      <Plus class="w-4 h-4" />
      <span>Ajouter à ma bibliothèque</span>
    </button>


  </div>
</template>

<style scoped></style>

<style scoped></style>
