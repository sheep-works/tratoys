<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <v-text-field density="compact" v-model="search" label="Search" prepend-inner-icon="mdi-magnify"
                    variant="outlined" hide-details single-line></v-text-field>
            </v-col>
            <v-col>
                <v-checkbox label="エラーありのみ表示" v-model="onlyCheck" />
            </v-col>
        </v-row>

        <v-data-table :headers="headers" :items="onlyCheck ? qa.onlyCheck : qa.results" :search="search">

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
    </v-container>
</template>

<script setup lang="ts">
import { useQAData } from "../../../store/qaData"
const qa = useQAData()

const onlyCheck = ref(true)
const search = ref("")

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

</script>
