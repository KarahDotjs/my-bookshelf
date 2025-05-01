<script setup>
import SearchBar from "./SearchBar.vue";
import BookCard from "./BookCard.vue";


import { ref } from "vue";

const searchQuery = ref("");

const handleSearch = (userInput) => {
  searchQuery.value = userInput;
  fetchBooks();
};
const books = ref([]);

const booksOfTheMonth = ref([]);

const fetchBooksOfTheMonth = async () => {
  try {
    const response = await fetch('https://openlibrary.org/search.json?q=bestseller');
    const data = await response.json();
    // On récupère seulement ceux qui ont une couverture
    booksOfTheMonth.value = data.docs
      .filter(book => book.cover_i)
      .slice(0, 5); // max 5 livres
  } catch (error) {
    console.error("Erreur lors du chargement des livres du mois :", error);
  }
};

import { onMounted } from 'vue';

onMounted(() => {
  fetchBooksOfTheMonth();
});



// const myLibrary = ref([]);

async function fetchBooks() {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${searchQuery.value}`
  );
  const data = await response.json();
  books.value = data.docs;
}

const addTolibray = (book) => { };
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-screen-lg mx-auto px-4">

      <h1 class="text-3xl font-bold text-center mt-10">
        My BookShelf 📚
      </h1>

      <SearchBar @rechercher="handleSearch" />

      <!-- Résultats de recherche -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        <BookCard v-for="book in books" :key="book.key" :title="book.title" :author="book.author_name"
          :coverId="book.cover_i" />
      </div>

      <!-- Livres du mois -->
      <div class="mt-12 bg-white rounded-xl shadow px-6 py-10">
        <h2 class="text-2xl font-bold mb-4 text-center">📚 Livre(s) du mois</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <BookCard v-for="book in booksOfTheMonth" :key="book.key" :title="book.title" :author="book.author_name"
            :coverId="book.cover_i" />
        </div>
      </div>


    </div>
  </div>
</template>


<style scoped></style>
