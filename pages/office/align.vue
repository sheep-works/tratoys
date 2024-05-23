<template>
    <v-container>
        <FileCard :is-src="true" />
        <v-divider class="my-6" />
        <FileCard :is-src="false" />
        <!-- <v-card width="90%">
            <v-card-title>ファイル選択</v-card-title>
            <v-card-text>
                <FileDrop :is-src="true" filetype="Office" class="pa-3" />
                <v-divider class="my-6" />
                <FileListing :is-src="true" />
            </v-card-text>
        </v-card>
        <v-card width="90%">
            <v-card-title>ファイル選択</v-card-title>
            <v-card-text>
                <FileDrop :is-src="false" filetype="Office" class="pa-3" />
                <v-divider class="my-6" />
                <FileListing :is-src="false" />
            </v-card-text>
        </v-card> -->
        <v-divider class="my-6" />
        <OptionCard :extentions="['tsv', 'json']" redirect="/office/results/align" />
    </v-container>
</template>

<script setup lang="ts">
// import FileDrop from '~/components/office/FileDrop.vue';
// import FileListing from '~/components/office/FileListing.vue';
import FileCard from '~/components/office/FileCard.vue';
import OptionCard from '~/components/office/OptionCard.vue';
import { useOptions } from '~/store/options';

onMounted(() => {
    const exopt = useOptions()
    exopt.setDefaultMode("OFFICE", "ALIGN")
})
</script>