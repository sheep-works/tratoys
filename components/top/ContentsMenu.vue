<template>
    <v-card elevation="20">
        <v-card-title class="text-h3 pt-10 text-center">機能一覧</v-card-title>
        <v-card-text class="pa-6 text-center">
            <v-list :items="contents">
                <template v-slot:subtitle="{ item }">
                    <div class="text-body-1">{{ item.desc }}</div>
                </template>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
const contents: Array<{ title: string, desc: string }> = [
    {
        title: "Officeファイルの抽出・対訳・カウント",
        desc: "各種MS Officeのファイルからテキストを抽出したり、対訳表を作成したり、文字数をカウントしたりできます",
    },
    {
        title: "テキスト差分",
        desc: "２つのテキストを文字単位で比較できます。原文・訳文それぞれ別個に差分の確認が可能です",
    },
    {
        title: "簡易QA",
        desc: "用語が正しく使用されているか、数字の誤りはないかなどを簡単にチェックできます"
    }
]

</script>