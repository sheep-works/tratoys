<template>
    <v-sheet>
        <v-list>
            <v-list-item v-for="i in align.data[align.fx][0][block].length">
                <DualEditor :indices="{ block, line: i - 1 }" />
            </v-list-item>
        </v-list>
        <v-divider class="my-3" />
    </v-sheet>
</template>

<script setup lang="ts">
import { useAlign } from "~/store/align";
import DualEditor from "./DualEditor.vue"

interface Props {
    block: number
}
const props = defineProps<Props>()
const align = useAlign()

</script>