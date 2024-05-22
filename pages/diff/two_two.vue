<script setup lang="ts">
import { useDifftext } from '../../store/difftext';

const texts = useDifftext()
const isChecked = ref(false)

const checkDiff = () => {
    texts.checkDiff()
    isChecked.value = true
}

</script>


<template>
    <v-container>
        <v-row>
            <v-col>
                <label>旧原文</label>
                <v-textarea v-model="texts.src1" />
            </v-col>
            <v-col>
                <label>旧訳文</label>
                <v-textarea v-model="texts.tgt1" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <label>新原文</label>
                <v-textarea v-model="texts.src2" />
            </v-col>
            <v-col>
                <label>新訳文</label>
                <v-textarea v-model="texts.tgt2" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn @click="checkDiff" block color="teal">差分確認</v-btn>
            </v-col>
        </v-row>
        <v-row v-if="isChecked">
            <v-col>
                <v-card>
                    <p v-html=texts.src3 />
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <p v-html=texts.tgt3 />
                </v-card>
            </v-col>
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