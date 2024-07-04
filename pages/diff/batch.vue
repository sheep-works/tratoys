<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDifftext } from '../../store/difftext';
import ExportBtn from '../../components/diff/ExportBtn.vue';

const texts = useDifftext()
const isChecked = ref(false)
const errmessage = ref("")

const checkDiff = () => {
    errmessage.value = ""
    if (srcLines.value !== tgtLines.value) {
        errmessage.value = `左右で行数が異なります ${srcLines.value} vs ${tgtLines.value}`
    }
    else {
        texts.batchCheck()
        isChecked.value = true
    }
}

const srcLines = computed(() => {
    return texts.src1.split('\n').length
})
const tgtLines = computed(() => {
    return texts.tgt1.split('\n').length
})

</script>

<template>
    <v-container>
        <v-alert type="success" class="my-6">
            <p>左右で行数が違うと実行できません</p>
            <p>Excelから貼り付ける際は、以下の点にご注意ください</p>
            <p class="ml-3">セル内改行を含まないこと（置換ダイアログで Ctrl+J で検索できます）</p>
            <p class="ml-3">セル内のテキストに「\n」を含まないこと（|などに置換しておいてください）</p>
        </v-alert>
        <v-card elevation="20">
            <v-card-title class="text-h5">一括差分抽出</v-card-title>
            <v-card-text class="pa-3">
                <v-row>
                    <v-col>
                        <label>旧テキスト：{{ srcLines }} 行</label>
                        <v-textarea v-model="texts.src1" />
                        <p> </p>
                    </v-col>
                    <v-col>
                        <label>新テキスト：{{ tgtLines }} 行</label>
                        <v-textarea v-model="texts.tgt1" :hint="texts.src2.split('\n').length" persistent-hint />
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-divider class="my-6" />
        <v-btn @click="checkDiff" block size="large" color="teal">差分確認</v-btn>
        <p class="text-red">{{ errmessage }}</p>
        <v-divider class="my-6" />
        <v-row v-if="isChecked">
            <table width="100%">
                <thead>
                    <tr>
                        <th width="4%">No.</th>
                        <th width="32%">旧</th>
                        <th width="32%">新</th>
                        <th width="32%">比較</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item, idx in texts.batchDiff" :key="item.name" style="border: 2px #000 solid;">
                        <td>{{ idx + 1 }}</td>
                        <td>{{ item.s }}</td>
                        <td>{{ item.t }}</td>
                        <td>
                            <p v-html="item.d" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <ExportBtn mode="batch" />
        </v-row>
    </v-container>
</template>

<style>
ins {
    color: blue;
    font-size: 1.3rem;
}

del {
    color: red;
    font-size: 0.8rem;
}

td,
th {
    border: 1px #000 solid;
    padding: 0.5em 1em;
}
</style>