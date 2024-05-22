<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="text-h1 pa-6 text-center">ようこそ Tratoys へ</v-card-title>
      <v-card-text>
        <v-img src="/TRANSHEEP-with-slogan.png" cover />
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
      <v-card-actions>
        <v-btn to="/test">テスト</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
