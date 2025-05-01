<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  title: String,
  author: Array,
  coverId: Number,
  comment: String,
  rating: Number
})

const emit = defineEmits(['updateBook'])

const localComment = ref(props.comment || '')
const localRating = ref(props.rating || 0)

const saveReview = () => {
  emit('updateBook', {
    comment: localComment.value,
    rating: localRating.value
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

    <!-- Étoiles cliquables -->
    <div class="flex justify-center gap-1 mt-4">
      <font-awesome-icon v-for="n in 5" :key="n" icon="star"
        :class="n <= localRating ? 'text-yellow-400' : 'text-gray-300'" class="w-5 h-5 cursor-pointer transition"
        @click="localRating = n" />
    </div>

    <!-- Champ commentaire -->
    <textarea v-model="localComment" rows="2" placeholder="Ton avis sur ce livre..."
      class="w-full mt-4 border rounded px-2 py-1 text-sm" />

    <!-- Bouton sauvegarder -->
    <button @click="saveReview" class="mt-2 bg-purple-500 text-white py-1 px-3 rounded hover:bg-purple-600 text-sm">
      💾 Sauvegarder
    </button>
  </div>
</template>

<style scoped></style>
