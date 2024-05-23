<template>
    <v-container>
        <!-- <QaTextCard />
        <TermTextCard />
        <KanjiHanzi /> -->
        <QaContainer />
        <QaExecBtn />
        <ResultCard />

    </v-container>
</template>

<script setup lang="ts">
// import QaTextCard from '~/components/qa/QaTextCard.vue'
// import TermTextCard from '~/components/qa/TermTextCard.vue';
// import KanjiHanzi from '~/components/qa/KanjiHanzi.vue';
import ResultCard from '~/components/qa/result/ResultCard.vue';

import QaContainer from '~/components/qa/QaSettingContainer.vue';
import QaExecBtn from '~/components/qa/QaExecBtn.vue';
</script>
