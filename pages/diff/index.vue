<template>
    <v-container fluid>
        <p>文字単位での差分を確認するためのページです</p>
        <v-list>
            <v-list-item class="ml-6" to="/diff/one_one">1 vs 1</v-list-item>
            <v-list-item class="ml-6" to="/diff/two_two">2 vs 2</v-list-item>
            <v-list-item class="ml-6" to="/diff/batch">一括比較</v-list-item>
        </v-list>
    </v-container>
</template>