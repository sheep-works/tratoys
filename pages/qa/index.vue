<template>
    <v-container fluid>
        <QaTextCard />
        <TermTextCard />
        <KanjiHanzi />
        <ResultCard />

    </v-container>
</template>

<script setup lang="ts">
import QaTextCard from '~/components/qa/QaTextCard.vue'
import TermTextCard from '~/components/qa/TermTextCard.vue';
import ResultCard from '~/components/qa/ResultCard.vue';
import KanjiHanzi from '~/components/qa/KanjiHanzi.vue';
</script>

