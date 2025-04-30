<script setup>
import SearchBar from './SearchBar.vue'
import BookCard from './BookCard.vue'

import { ref } from 'vue'


const searchQuery = ref('')

const handleSearch = (userInput) => {
  searchQuery.value = userInput
  fetchBooks()

}
const books = ref([])

const myLibrary = ref([])

async function fetchBooks() {
  const response = await fetch(`https://openlibrary.org/search.json?q=${searchQuery.value}`)
  const data = await response.json();
  console.log(data);
  books.value = data.docs
}

const addToLibrary = (book) => {
  myLibrary.value.push(book)
}


</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-3xl font-bold  flex justify-center mt-10">
      My BookShelf 📚
    </h1>
    <SearchBar @rechercher="handleSearch" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
      <BookCard v-for="book in books" :key="book.key" :title="book.title" :author="book.author_name" :coverId="book.cover_i
        " @add="addToLibrary" />
    </div>
  </div>


</template>

<style scoped></style>