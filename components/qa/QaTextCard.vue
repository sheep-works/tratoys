<template>
    <v-card class="ma-2">
        <v-card-title>対訳の貼り付け</v-card-title>
        <v-card-item>
            <v-textarea v-model="qa.dataText" hint="tsv形式で貼り付け"></v-textarea>
        </v-card-item>
    </v-card>
</template>

<script setup lang="ts">
import { useQAData } from "../../store/qaData"

const qa = useQAData()


</script>