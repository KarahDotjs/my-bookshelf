<script setup>
import SearchBar from './SearchBar.vue'
import { ref } from 'vue'


const searchTerm = ref('')

const handleSearch = (userInput) => {
  searchTerm.value = userInput
}
const books = ref([])

async function fetchBook() {
  const response = await fetch('')
  const data = await response.json();
  return data;
}

</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-3xl font-bold  flex justify-center mt-10">
      My BookShelf 📚
    </h1>
    <SearchBar @rechercher="handleSearch" />

  </div>


</template>

<style scoped></style>