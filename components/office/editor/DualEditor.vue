<template>
    <v-row>
        <v-col>
            <SingleEditor :indices="{ which: 0, ...indices }" />
        </v-col>
        <v-col>
            <SingleEditor :indices="{ which: 1, ...indices }" />
        </v-col>
    </v-row>

</template>

<script setup lang="ts">
import SingleEditor from './SingleEditor.vue';
const props = defineProps<{
    indices: {
        block: number
        line: number
    }
}>()
</script>