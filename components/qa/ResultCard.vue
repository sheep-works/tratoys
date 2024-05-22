<template>
    <v-card class="ma-2">
        <v-card-title>結果</v-card-title>
        <v-card-item>
            <v-btn block @click="handleExec">実行</v-btn>
        </v-card-item>
        <v-divider />
        <v-card-item v-if="qa.results.length > 0">
            <v-data-table :headers="headers" :items="qa.results">
                <template v-slot:item.errs="{ item }">
                    <div class="text-body">
                        <v-list>
                            <v-list-item v-for="err in item.errs">
                                {{ err }}
                            </v-list-item>
                        </v-list>
                    </div>
                </template>
            </v-data-table>
        </v-card-item>
    </v-card>
</template>

<script setup lang="ts">
import { useQAData } from "../../store/qaData"

const qa = useQAData()

const headers = [
    {
        title: "原文",
        key: "src"
    },
    {
        title: "訳文",
        key: "tgt"
    },
    {
        title: "エラー",
        key: "errs"
    }
]

const handleExec = () => {
    qa.exec()
}
</script>

