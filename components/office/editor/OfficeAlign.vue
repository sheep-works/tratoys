<template>
    <div>
        <v-list>
            <v-list-item v-for="i in blockLength">
                <InBlockEditor :block="i - 1" />
            </v-list-item>
        </v-list>

    </div>
</template>

<script setup lang="ts">
import InBlockEditor from './InBlockEditor.vue';
// interface Props {
//     srcFile: string[][],
//     tgtFile: string[][]
// }
interface Props {
    blockLength: number
}
const props = defineProps<Props>()

</script>