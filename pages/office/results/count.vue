<template>
    <v-container>
        <v-card>
            <v-card-text>
                <v-table>
                    <thead>
                        <tr>
                            <th>ファイル名</th>
                            <th>文字数</th>
                            <th>ワード数</th>
                        </tr>
                    </thead>
                    <tbody v-if="results.result?.count !== undefined">
                        <tr v-for="file in results.result?.count">
                            <td>{{ file.name }}</td>
                            <td>{{ file.charas }}</td>
                            <td>{{ file.words }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="download" block size="large" color="teal">ダウンロード</v-btn>
            </v-card-actions>
        </v-card>

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

onMounted(() => {
    download()
})
</script>