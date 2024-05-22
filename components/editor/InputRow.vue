<template>
    <v-row>
        <v-col>
            <InputCell :row="row" :col="0" :text="data" />
        </v-col>
        <v-col>
            <InputCell :row="row" :col="1" :text="data" />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import InputCell from './InputCell.vue';
const data = ref("test")

interface Props {
    row: number
}
const props = defineProps<Props>()
</script>