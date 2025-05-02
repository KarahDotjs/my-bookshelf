<script setup>
/* -------------------- 📦 IMPORTS -------------------- */
import { ref, onMounted } from "vue";
import SearchBar from "./SearchBar.vue";
import BookCard from "./BookCard.vue";

/* -------------------- 🧠 ÉTAT (reactivité) -------------------- */
const searchQuery = ref("");
const books = ref([]);
const booksOfTheMonth = ref([]);
const myLibrary = ref([]);
const isSearchEmpty = ref(false);
const isSearching = ref(false);

/* -------------------- 🔍 LOGIQUE DE RECHERCHE -------------------- */
const handleSearch = (userInput) => {
  searchQuery.value = userInput;
  fetchBooks();
};

async function fetchBooks() {
  isSearching.value = true;
  const startTime = Date.now();

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery.value)}`
    );
    const data = await response.json();

    const results = data.docs.filter((book) => book.cover_i);
    books.value = results;
    isSearchEmpty.value = results.length === 0;
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    books.value = [];
    isSearchEmpty.value = true;
  } finally {
    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, 800 - elapsed); // spinner visible au moins 800ms
    setTimeout(() => {
      isSearching.value = false;
    }, delay);
  }
}

/* -------------------- 📚 LIVRES DU MOIS -------------------- */
const fetchBooksOfTheMonth = async () => {
  try {
    const response = await fetch(
      "https://openlibrary.org/search.json?q=bestseller"
    );
    const data = await response.json();
    booksOfTheMonth.value = data.docs
      .filter((book) => book.cover_i)
      .slice(0, 3);
  } catch (error) {
    console.error("Erreur lors du chargement des livres du mois :", error);
  }
};

onMounted(() => {
  fetchBooksOfTheMonth();
});

/* -------------------- ➕ AJOUT À LA BIBLIOTHÈQUE -------------------- */
const addToLibrary = (book) => {
  const existeDeja = myLibrary.value.some((b) => b.key === book.key);
  if (!existeDeja) {
    myLibrary.value.push({
      ...book,
      note: null,
      commentaire: "",
    });
  } else {
    alert("Ce livre est déjà dans ta bibliothèque !");
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-screen-lg mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mt-10 mb-10">My BookShelf - Mon étagère de livres</h1>

      <!-- 🔎 BARRE DE RECHERCHE -->
      <SearchBar @rechercher="handleSearch" />

      <!-- ⏳ LOADER -->
      <div v-if="isSearching" class="flex items-center justify-center gap-2 mt-6 transition-opacity duration-300">
        <svg class="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span class="text-blue-600 text-sm font-medium">Recherche en cours...</span>
      </div>

      <!-- 📚 RÉSULTATS DE RECHERCHE -->
      <div class="mt-8">
        <div v-if="books.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <BookCard v-for="book in books" :key="book.key" :title="book.title" :author="book.author_name"
            :coverId="book.cover_i" :bookData="book" :onAdd="addToLibrary" />
        </div>

        <div v-else-if="isSearchEmpty" class="text-gray-500 text-center mt-4">
          Aucun résultat trouvé pour « {{ searchQuery }} »
        </div>
      </div>

      <!-- 🏆 LIVRES DU MOIS -->
      <div class="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 h-fit">
        <h2 class="text-lg font-semibold mb-4 text-center text-gray-700">🏆 Livres du mois</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <BookCard v-for="book in booksOfTheMonth" :key="book.key" :title="book.title" :author="book.author_name"
            :coverId="book.cover_i" :bookData="book" />
        </div>


        <!-- 📘 MA BIBLIOTHÈQUE PERSO -->
        <div v-if="myLibrary.length" class="mt-12">
          <h2 class="text-2xl font-bold mb-4 text-center">📘 Ma bibliothèque</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <BookCard v-for="book in myLibrary" :key="book.key" :title="book.title" :author="book.author_name"
              :coverId="book.cover_i" :bookData="book" />
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped></style>
