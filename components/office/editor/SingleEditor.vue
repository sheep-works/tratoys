<template>
    <div>
        <v-textarea v-model="align.data[align.fx][indices.which][indices.block][indices.line]" :rows="1" auto-grow
            density="comfortable" @keyup="(ev: KeyboardEvent) => handleKeydown(ev)" />
    </div>
</template>

<script setup lang="ts">
import { useAlign } from '~/store/align';

const align = useAlign()
const props = defineProps<{
    indices: AlignTextIndice
}>()

interface AlignTextIndice {
    which: number
    block: number
    line: number
}
interface Emits {
    (e: "to-left", indices: AlignTextIndice): void
}
const emits = defineEmits<Emits>()
const handleKeydown = (ev: KeyboardEvent) => {
    if (ev.ctrlKey) {
        switch (ev.code) {
            case "AllowUp":
                break

            case "AllowDown":
                break

            case "AllowRight":
                break

            case "AllowLeft":
                break

            default:
                break
        }
    }
}
</script>