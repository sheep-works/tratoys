<template>
    <v-container fluid>
        <v-card width="90%">
            <v-card-title>ファイル選択</v-card-title>
            <v-card-text>
                <FileDrop :is-src="true" filetype="Office" class="pa-3" />
                <v-divider class="my-6" />
                <FileListing :is-src="true" />
            </v-card-text>
        </v-card>
        <v-divider class="my-6" />
        <OptionCard :extentions="['txt', 'json']" redirect="/office/results/extract" />
    </v-container>
</template>

<script setup lang="ts">
import FileDrop from '~/components/office/FileDrop.vue';
import FileListing from '~/components/office/FileListing.vue';
import OptionCard from '~/components/office/OptionCard.vue';
import { useOptions } from '~/store/options';

onMounted(() => {
    const exopt = useOptions()
    exopt.setDefaultMode("OFFICE", "EXTRACT")
})
</script>