<template>
    <v-card elevation="20">
        <v-card-title><v-img src="/tratoys2.png" cover max-width="300" class="ma-auto" /></v-card-title>
        <v-card-text>
            <div class="text-h2 pa-6 text-center">
                ようこそ Tratoys へ
            </div>
            <div class="text-body-1 text-center">
                <p class=" my-5">
                    TraToys は CATOVIS の各機能を引き継いだまま、ひつじの翻訳室で開発しているツール群です。
                </p>
                <p class=" my-5">
                    主に Office ファイルからのテキスト抽出やカウント、文字単位での差分確認など、翻訳作業中にあると便利な機能をまとめました。
                </p>
                <p class=" my-5">
                    TraToys という名前も、ヘビーユーザー向けの十徳ナイフツールとして有名な「PowerToys」や「DevToys」にあやかったものです。
                </p>
                <p class=" my-5">
                    なお、コードはWeb版、CLI版ともにGithubで完全に公開しています。
                </p>

            </div>
        </v-card-text>
        <v-card-subtitle class="text-right mr-10">
            Ver. {{ env.version }}
        </v-card-subtitle>
        <v-card-actions>
            <!-- <v-btn to="/test">テスト</v-btn> -->
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">

const { public: env } = useRuntimeConfig()

</script>