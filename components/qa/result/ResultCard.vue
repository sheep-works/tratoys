<template>
    <v-card class="ma-2" elevation="20">
        <v-card-title>結果</v-card-title>
        <v-card-item v-if="qa.results.length > 0">
            <ResultTable />
        </v-card-item>
    </v-card>
</template>

<script setup lang="ts">
import { useQAData } from "../../../store/qaData"
import ResultTable from "./ResultTable.vue"
const qa = useQAData()

</script>
