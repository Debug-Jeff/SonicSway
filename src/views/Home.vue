<!-- src/components/PlaylistDisplay.vue -->
<template>
  <div class="max-w-4xl mx-auto p-6">
    <div v-if="isLoading" class="text-center">
      <div
        class="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto"
      ></div>
      <p class="text-white mt-4 text-xl">{{ loadingMessage }}</p>
    </div>

    <div v-else-if="playlist" class="space-y-4">
      <h3 class="text-2xl font-bold text-white mb-6">Your Mood Playlist</h3>
      <div
        v-for="track in playlist"
        :key="track.id"
        class="bg-white/10 p-4 rounded-lg backdrop-blur-sm flex items-center space-x-4"
      >
        <img :src="track.image" :alt="track.name" class="w-16 h-16 rounded" />
        <div>
          <h4 class="text-white font-semibold">{{ track.name }}</h4>
          <p class="text-white/80">{{ track.artist }}</p>
        </div>
      </div>
    </div>

    <button
      @click="shufflePlaylist"
      class="mt-8 px-6 py-3 bg-white/20 rounded-full text-white font-semibold hover:bg-white/30 transition-colors"
    >
      Shuffle Playlist
    </button>
  </div>
</template>
  
  <script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDeviceMotion } from "@vueuse/core";

interface Track {
  id: string;
  name: string;
  artist: string;
  image: string;
}

const props = defineProps<{
  moodGenres?: string[];
}>();

const isLoading = ref(true);
const playlist = ref<Track[]>([]);
const loadingMessages = [
  "Channeling the vibes...",
  "Searching for soulful tunes...",
  "Creating your perfect playlist...",
  "Mining musical gems...",
];
const loadingMessage = ref(loadingMessages[0]);

const { accelerometer } = useDeviceMotion();

// Simulate playlist fetching (replace with actual Spotify API call)
async function fetchPlaylist() {
  isLoading.value = true;
  loadingMessage.value =
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock data (replace with Spotify API response)
  playlist.value = [
    {
      id: "1",
      name: "Happy Vibes",
      artist: "Artist 1",
      image: "/api/placeholder/64/64",
    },
    {
      id: "2",
      name: "Sunny Day",
      artist: "Artist 2",
      image: "/api/placeholder/64/64",
    },
  ];

  isLoading.value = false;
}

function shufflePlaylist() {
  fetchPlaylist();
}

// Watch for device shake
watch(accelerometer, (newValue) => {
  if (newValue.x && newValue.y && newValue.z) {
    const acceleration = Math.sqrt(
      Math.pow(newValue.x, 2) +
        Math.pow(newValue.y, 2) +
        Math.pow(newValue.z, 2)
    );

    if (acceleration > 20) {
      shufflePlaylist();
    }
  }
});

onMounted(() => {
  fetchPlaylist();
});
</script>