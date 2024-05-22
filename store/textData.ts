import { defineStore } from "pinia";

export const useText = defineStore("text", () => {
    const text = ref("")
    const textset = ref<string[][]>([["source", "target"]])
    return { text, textset }
})