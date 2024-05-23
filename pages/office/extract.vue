<template>
    <v-container>
        <FileCard :is-src="true" />
        <v-divider class="my-6" />
        <OptionCard :extentions="['txt', 'json']" redirect="/office/results/extract" />
    </v-container>
</template>

<script setup lang="ts">
import FileCard from '~/components/office/FileCard.vue';
import OptionCard from '~/components/office/OptionCard.vue';
import { useOptions } from '~/store/options';

onMounted(() => {
    const exopt = useOptions()
    exopt.setDefaultMode("OFFICE", "EXTRACT")
})
</script>