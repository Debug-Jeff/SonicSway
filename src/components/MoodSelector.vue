<!-- src/components/MoodSelector.vue -->
<template>
    <div class="flex flex-col items-center space-y-8 p-6">
      <h2 class="text-3xl font-bold text-white">How are you feeling today?</h2>
      
      <!-- Emoji Selector -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          v-for="mood in moods"
          :key="mood.emoji"
          @click="selectMood(mood)"
          :class="[
            'p-6 rounded-lg transition-transform hover:scale-110',
            selectedMood?.emoji === mood.emoji ? 'bg-white/20' : 'bg-white/10'
          ]"
        >
          <span class="text-4xl">{{ mood.emoji }}</span>
          <p class="mt-2 text-white">{{ mood.name }}</p>
        </button>
      </div>
  
      <!-- Color Wheel (simplified version) -->
      <div class="mt-8">
        <input
          type="color"
          v-model="selectedColor"
          class="w-24 h-24 rounded-full cursor-pointer"
          @change="updateMoodColor"
        >
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  interface Mood {
    emoji: string
    name: string
    genres: string[]
  }
  
  const moods: Mood[] = [
    { emoji: '😃', name: 'Happy', genres: ['pop', 'dance', 'happy'] },
    { emoji: '😔', name: 'Sad', genres: ['blues', 'soul', 'sad'] },
    { emoji: '😡', name: 'Angry', genres: ['rock', 'metal', 'intense'] },
    { emoji: '😎', name: 'Chill', genres: ['lofi', 'ambient', 'chill'] }
  ]
  
  const selectedMood = ref<Mood | null>(null)
  const selectedColor = ref('#000000')
  
  const emit = defineEmits(['mood-selected'])
  
  function selectMood(mood: Mood) {
    selectedMood.value = mood
    emit('mood-selected', { mood, color: selectedColor.value })
  }
  
  function updateMoodColor() {
    if (selectedMood.value) {
      emit('mood-selected', { mood: selectedMood.value, color: selectedColor.value })
    }
  }
  </script>