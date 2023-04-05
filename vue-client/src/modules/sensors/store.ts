import { defineStore } from "pinia";
import { ref } from "vue";
import type { Reading } from "./interfaces";


export const useReadingStore = defineStore('readings', () => {
    const readings = ref<Reading[]>([])

    return {
        readings,
        set(news:Reading[]){ readings.value = news }
    }
})