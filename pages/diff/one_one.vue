<script setup lang="ts">
import { useDifftext } from '../../store/difftext';
import ExportBtn from '../../components/diff/ExportBtn.vue';

const texts = useDifftext()
const isChecked = ref(false)

const checkDiff = () => {
    texts.checkDiff()
    isChecked.value = true
}
</script>

<template>
    <v-container>
        <v-card elevation="20">
            <v-card-title class="text-h5">差分抽出</v-card-title>
            <v-card-text class="pa-3">
                <v-row>
                    <v-col>
                        <label>旧テキスト</label>
                        <v-textarea v-model="texts.src1" />
                    </v-col>
                    <v-col>
                        <label>新テキスト</label>
                        <v-textarea v-model="texts.src2" />
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-divider class="my-6" />
        <v-btn @click="checkDiff" block size="large" color="teal">差分確認</v-btn>
        <v-divider class="my-6" />
        <v-row v-if="isChecked">
            <v-col>
                <v-card>
                    <p v-html=texts.src3 />
                </v-card>
            </v-col>
            <ExportBtn mode="1vs1" />
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
</style>