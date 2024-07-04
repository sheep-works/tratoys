<template>
    <v-container>
        <v-btn @click="download" block size="large" color="teal">ダウンロード</v-btn>
        <v-btn @click="toEdit" block size="large" color="teal">編集へ</v-btn>
    </v-container>
</template>

<script setup lang="ts">
import { useOptions } from '~/store/options';
import { useResults } from '~/store/results';
import { useAlign } from "~/store/align"


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

const toEdit = () => {
    const align = useAlign()
    if (results.result?.office) {
        align.setRaw(results.result.office)
        const router = useRouter()
        router.push("./edit")
    }
    else {
        return
    }
}

onMounted(() => {
    download()
})
</script>