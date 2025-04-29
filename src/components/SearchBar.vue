<script setup>
import { ref } from 'vue'


const searchInput = ref('')
const emit = defineEmits(['rechercher'])

const emitSearch = () => {
  emit('rechercher', searchInput.value)
}

</script>

<template>
  <div class="flex justify-center mb-8 mt-8">
    <input v-model="searchInput" type="text" placeholder="Search for a book..."
      class="border border-gray-300 p-2 rounded-l w-1/2" />
    <button @click="emitSearch" class="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded-r">
      Search
    </button>
  </div>
</template>



<style scoped></style>
