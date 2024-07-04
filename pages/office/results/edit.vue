<template>
    <v-container>
        {{ align.data[align.fx] }}
        {{ align.data[align.fx].length }}
        <OfficeAlign :blockLength="align.data[align.fx][0].length" />
    </v-container>
</template>

<script setup lang="ts">
import { useAlign } from "~/store/align"
import OfficeAlign from "~/components/office/editor/OfficeAlign.vue";
const align = useAlign()

</script>