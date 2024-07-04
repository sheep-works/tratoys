<template>
    <v-btn @click="execExport" class="my-6" block size="large" color="teal">エクスポート</v-btn>
</template>


<script setup lang="ts">
import { useDifftext } from '../../store/difftext';

interface Props {
    mode: "1vs1" | "2vs2" | "batch"
}
const props = defineProps<Props>()

const execExport = () => {
    const texts = useDifftext()
    const result = texts.exportDiff(props.mode)
    const blob = new Blob([result], { type: 'html/plain' })
    const url = window.URL.createObjectURL(blob); // ダウンロード用のURLを生成
    const a = document.createElement('a'); // ダウンロード用のリンクを作成
    a.href = url;
    a.download = "result.html"
    a.click()
    window.URL.revokeObjectURL(url)
}
</script>