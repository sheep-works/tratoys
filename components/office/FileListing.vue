<template>
    <v-list>
        <v-list-item v-for="file, fx in infiles">
            <v-row>
                <v-col>
                    {{ fx }}
                </v-col>
                <v-col>
                    {{ file.name }}
                </v-col>
                <v-col>
                    <v-btn type="text" size="small" @click="() => handleUp(fx)">↑</v-btn>
                    <v-btn type="text" size="small" @click="() => handleDown(fx)">↓</v-btn>
                    <v-btn type="text" size="small" @click="() => handleRemove(fx)">×</v-btn>
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
