<template>
    <v-btn class="my-6" block size="large" color="teal" @click="handleExec">実行</v-btn>
</template>

<script setup lang="ts">
import { useQAData } from "../../store/qaData"

const qa = useQAData()

const handleExec = () => {
    qa.exec()
}
</script>
