// src/store/index.ts
import { defineStore } from 'pinia'

export const useMoodStore = defineStore('mood', {
  state: () => ({
    mood: '' as string,
    playlist: [] as Array<string>,
  }),
  actions: {
    setMood(mood: string) {
      this.mood = mood
    },
    setPlaylist(playlist: Array<string>) {
      this.playlist = playlist
    },
  },
})
