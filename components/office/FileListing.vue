<template>
    <v-list>
        <v-list-item v-for="file, fx in infiles" :class="(file.name.endsWith('.docx') || file.name.endsWith('.docm')) ? 'file-word'
            : (file.name.endsWith('.xlsx') || file.name.endsWith('.xlsm')) ? 'file-excel' : 'file-ppt'">
            <v-row>
                <v-col cols="1">
                    {{ fx + 1 }}
                </v-col>
                <v-col>
                    {{ file.name }}
                </v-col cols="8">
                <v-col cols="3">
                    <v-btn class="mx-1" variant="text" size="small" @click="() => handleUp(fx)">↑</v-btn>
                    <v-btn class="mx-1" variant="text" size="small" @click="() => handleDown(fx)">↓</v-btn>
                    <v-btn class="mx-1" variant="text" size="small" @click="() => handleRemove(fx)">×</v-btn>
                </v-col>
            </v-row>
        </v-list-item>

    </v-list>
</template>

<script setup lang="ts">
import { useFilelist } from "../../store/filelist"

const files = useFilelist()
const props = defineProps<{
    isSrc: boolean,
}>()

const { srcs, tgts } = storeToRefs(files)

const infiles = props.isSrc ? srcs : tgts

const handleUp = (fx: number) => {
    files.handleMove(props.isSrc, fx, -1)
}

const handleDown = (fx: number) => {
    files.handleMove(props.isSrc, fx, 1)
}

const handleRemove = (fx: number) => {
    files.handleRemove(props.isSrc, fx)
}

</script>

<style>
.file-word {
    background-color: #3F51B5;
    color: white;
}

.file-excel {
    background-color: #388E3C;
    color: white;
}

.file-ppt {
    background-color: #EF6C00;
    color: white;
}
</style>