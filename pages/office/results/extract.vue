<template>
    <v-container fluid>
        <v-btn @click="download" block color="teal">ダウンロード</v-btn>
    </v-container>
</template>

<script setup lang="ts">
import { useOptions } from '~/store/options';
import { useResults } from '~/store/results';

const results = useResults()
const options = useOptions()

const download = () => {
    const texts: string[] = results.result?.result || []
    const blob = new Blob([texts.join("\n")], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob); // ダウンロード用のURLを生成
    const a = document.createElement('a'); // ダウンロード用のリンクを作成
    a.href = url;
    a.download = options.exopt.output;
    a.click()
    window.URL.revokeObjectURL(url)
}
</script>