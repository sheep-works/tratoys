<template>
    <v-card class="ma-2" elevation="20">
        <v-card-title class="text-h5 pa-3">用語の貼り付け</v-card-title>
        <v-card-item v-if="!qa.isSingle">
            <v-row>
                <v-col cols="10">
                    <v-textarea v-if="!bilingualMode" v-model="qa.termPlain" hint="tsv形式で貼り付け"></v-textarea>
                    <bilingual-editor v-else :data="qa.termSet" target="term" @add-line="handleAdd"
                        @remove-line="(idx) => handleRemove(idx)" />
                </v-col>
                <v-col>
                    <v-checkbox label="対訳形式で編集" v-model="bilingualMode" @update:model-value="toggleMode" />
                </v-col>
            </v-row>

        </v-card-item>
    </v-card>
</template>

<script setup lang="ts">
import { useQAData } from "~/store/qaData"
import BilingualEditor from "./BilingualEditor.vue";
const qa = useQAData()

const bilingualMode = ref(false)
const target = "term"

const toggleMode = () => {
    if (bilingualMode.value === false) {
        qa.mergeData(target)
    }
    else {
        qa.splitData(target)
    }
}

const handleAdd = () => {
    qa.addLine(target)
}

const handleRemove = (idx: number) => {
    qa.removeLine(target, idx)
}

</script>