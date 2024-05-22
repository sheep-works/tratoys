<template>
    <VitePwaManifest />
    <v-layout>
        <v-app-bar color="teal" class="mb-20">
            <template v-slot:prepend>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title>TraToys</v-app-bar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer">
            <v-list>
                <v-list-item prepend-icon="mdi-home-circle-outline" to="/">トップ</v-list-item>
                <v-list-item prepend-icon="mdi-home-account" href="https://transheep.biz">Webサイト</v-list-item>
                <v-divider class="my-6" />
                <v-list-item prepend-icon="mdi-file-document-outline" to="/office">Office</v-list-item>
                <v-divider />
                <v-list-item class="ml-6" to="/office/extract">抽出</v-list-item>
                <v-list-item class="ml-6" to="/office/align">対訳</v-list-item>
                <v-list-item class="ml-6" to="/office/count">カウント</v-list-item>
                <v-divider class="my-6" />
                <v-list-item prepend-icon="mdi-ab-testing" to="/diff">差分</v-list-item>
                <v-divider />
                <v-list-item class="ml-6" to="/diff/one_one">1 vs 1</v-list-item>
                <v-list-item class="ml-6" to="/diff/two_two">2 vs 2</v-list-item>
                <v-divider class="my-6" />
                <v-list-item prepend-icon="mdi-bug-check-outline" to="/qa">QA</v-list-item>
                <v-divider />
                <v-list-item prepend-icon="mdi-github" href="https://github.com/sheep-works/tratoys">リポジトリ</v-list-item>
            </v-list>
            <!-- <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <v-icon icon="mdi-file-document-outline"></v-icon>
                        <p class="text-left ml-3">Office</p>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-list>
                            <v-list-item to="/office/extract">抽出</v-list-item>
                            <v-list-item to="/office/align">対訳</v-list-item>
                            <v-list-item to="/office/count">カウント</v-list-item>
                        </v-list>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <v-icon icon="mdi-ab-testing"></v-icon>
                        <p class="text-left ml-3">差分</p>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-list>
                            <v-list-item to="/diff/one_one">1 vs 1</v-list-item>
                            <v-list-item to="/diff/two_two">2 vs 2</v-list-item>
                        </v-list>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels> -->
        </v-navigation-drawer>

        <v-main class="align-center justify-center">
            <slot />
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">
const drawer = ref(false)
</script>