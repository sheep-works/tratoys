<template>
    <v-card class="ma-2" elevation="20">
        <v-card-title class="text-h5 pa-3">対訳の貼り付け</v-card-title>
        <v-card-item>
            <v-row>
                <v-col cols="10">
                    <v-textarea v-if="!bilingualMode" v-model="qa.textPlain" clearable tile
                        :hint="qa.isSingle ? 'テキスト貼り付け' : 'tsv形式で貼り付け'" />
                    <bilingual-editor v-else :data="qa.textSet" target="text" @add-line="handleAdd"
                        @remove-line="(idx) => handleRemove(idx)" />
                </v-col>
                <v-col>
                    <v-checkbox label="対訳形式で編集" v-model="bilingualMode" @update:model-value="toggleMode" />
                    <v-checkbox label="単独言語でチェック" v-model="qa.isSingle"></v-checkbox>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
</template>

<script setup lang="ts">
import { useQAData } from "../../../store/qaData"
import BilingualEditor from "./BilingualEditor.vue";
const qa = useQAData()

const bilingualMode = ref(false)
const target = "text"

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