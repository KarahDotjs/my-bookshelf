<script setup>
import SearchBar from "./SearchBar.vue";
import BookCard from "./BookCard.vue";

import { ref } from "vue";

const searchQuery = ref("");

const isSearchEmpty = ref(false);
const isSearching = ref(false); // Optionnel, si tu veux un loader plus tard


const handleSearch = (userInput) => {
  searchQuery.value = userInput;
  fetchBooks();
};
const books = ref([]);

const booksOfTheMonth = ref([]);

const fetchBooksOfTheMonth = async () => {
  try {
    const response = await fetch(
      "https://openlibrary.org/search.json?q=bestseller"
    );
    const data = await response.json();
    // On récupère seulement ceux qui ont une couverture
    booksOfTheMonth.value = data.docs
      .filter((book) => book.cover_i)
      .slice(0, 3); // max 5 livres
  } catch (error) {
    console.error("Erreur lors du chargement des livres du mois :", error);
  }
};

import { onMounted } from "vue";

onMounted(() => {
  fetchBooksOfTheMonth();
});

// const myLibrary = ref([]);

async function fetchBooks() {
  isSearching.value = true;
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery.value)}`
    );
    const data = await response.json();

    const results = data.docs.filter(book => book.cover_i);

    books.value = results;
    isSearchEmpty.value = results.length === 0;
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    books.value = [];
    isSearchEmpty.value = true;
  } finally {
    isSearching.value = false;
  }
}





</script>
<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-screen-lg mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mt-10 mb-10">My BookShelf - Mon étagère de livres</h1>


      <SearchBar @rechercher="handleSearch" />

      <!-- Résultats de recherche -->
      <div class="mt-8">
        <div v-if="books.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <BookCard v-for="book in books" :key="book.key" :title="book.title" :author="book.author_name"
            :coverId="book.cover_i" />
        </div>

        <div v-else-if="isSearchEmpty" class="text-gray-500 text-center mt-4">
          Aucun résultat trouvé pour « {{ searchQuery }} »
        </div>
      </div>


      <!-- Livres du mois -->
      <div class="mt-12 bg-gray-200 rounded-xl shadow px-6 py-10">
        <h2 class="text-2xl font-bold mb-4 text-center">📚 Livres du mois</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <BookCard v-for="book in booksOfTheMonth" :key="book.key" :title="book.title" :author="book.author_name"
            :coverId="book.cover_i" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
