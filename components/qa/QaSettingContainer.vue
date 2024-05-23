<template>
    <v-sheet class="pa-1">
        <QaTextCard />
        <TermTextCard />
        <KanjiHanzi />
    </v-sheet>

</template>

<script setup lang="ts">
import QaTextCard from './settings/QaTextCard.vue';
import TermTextCard from './settings/TermTextCard.vue';
import KanjiHanzi from './settings/KanjiHanzi.vue';

</script>