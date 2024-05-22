<template>
    <textarea @keyup="(ev) => handleKeyup(ev)" v-model="data.textset[row][col]"></textarea>
    <!-- <v-textarea v-model="text"></v-textarea> -->
</template> 

<script setup lang="ts">
import { useText } from '~/store/textData';

interface Props {
    col: number
    row: number
}

interface Emits {
    (e: "move-up"): void
    (e: "move-down"): void
    (e: "move-right"): void
    (e: "move-left"): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const data = useText()


const handleKeyup = (ev: KeyboardEvent) => {
    if (ev.ctrlKey) {
        console.log(ev.key)
    }
    // ev.preventDefault()

}
</script>