<template>
    <v-card elevation="20">
        <v-card-title class="text-h5">ファイル選択</v-card-title>
        <v-card-text>
            <FileDrop :is-src="isSrc" filetype="Office" class="pa-3" />
            <v-divider class="my-6" />
            <FileListing :is-src="isSrc" />
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import FileDrop from './FileDrop.vue';
import FileListing from './FileListing.vue';

const props = defineProps<{
    isSrc: boolean,
}>()
</script>