<script setup>

import { ref } from 'vue'


const searchInput = ref('')
const emit = defineEmits(['rechercher'])
const suggestions = ref([]);


const emitSearch = () => {
  emit('rechercher', searchInput.value)
}

const selectSuggestion = (suggestion) => {
  searchInput.value = suggestion;
  suggestions.value = []; // cacher les suggestions
  emitSearch(); // lancer la recherche
};


const fetchSuggestions = async () => {
  try {
    // rappel: construire l'URL en fonction de ce que tape l'utilisateur avec le encodeURIComponent
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchInput.value)}`;

    // ensuite je dois faire la requête vers l'API
    const response = await fetch(url);
    const data = await response.json();

    // Obtenir les 5 premiers résultats (docs) et extraire uniquement les titres
    suggestions.value = data.docs
      .slice(0, 5)
      .map(book => book.title);

  } catch (error) {
    console.error("Erreur lors de la récupération des suggestions :", error);
  }
};



</script>

<template>
  <div class="flex justify-center mb-8 mt-8">
    <div class="relative w-1/2">
      <input v-model="searchInput" @input="fetchSuggestions" type="text" placeholder="Search for a book..."
        class="border border-gray-300 p-2 rounded-l w-full" />

      <!-- Suggestions -->
      <div v-if="suggestions.length" class="absolute z-10 bg-white border border-gray-300 rounded-b shadow w-full mt-1">
        <ul>
          <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)"
            class="px-4 py-2 hover:bg-blue-100 cursor-pointer">
            {{ suggestion }}
          </li>
        </ul>
      </div>
    </div>

    <button @click="emitSearch" class="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded-r">
      Search
    </button>
  </div>
</template>



<style scoped></style>