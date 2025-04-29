<script setup>
import SearchBar from './SearchBar.vue'
import { ref } from 'vue'


const searchQuery = ref('')

const handleSearch = (userInput) => {
  searchQuery.value = userInput
}
const books = ref([])

async function fetchBook() {
  const response = await fetch(`https://openlibrary.org/search.json?q=${searchQuery.value}`)
  const data = await response.json();
  books.value = data.docs
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