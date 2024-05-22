<template>
    <v-sheet width="100%" class="pa-6 ma-auto border text-center" :color="isDragin ? 'teal-lighten-3' : ''" max-width="800"
        height="200" @drop.prevent="(ev) => handleDrop(ev)" @dragover="ev => ev.preventDefault()"
        @dragenter="handleDragStart" @dragend="handleDragEnd" @dragleave="handleDragEnd" @click="handleClick">
        <label>クリックしてファイルを選択 または ファイルをドロップ</label>
        <input type="file" :id="isSrc ? 'file-input-src' : 'file-input-tgt'" multiple style="display: none"
            @change="ev => handleInput(ev)" />

    </v-sheet>
</template>

<script setup lang="ts">
import { useFilelist } from "../../store/filelist"

const files = useFilelist()
const isDragin = ref(false)

const props = defineProps<{
    isSrc: boolean,
    filetype: 'Office' | 'CAT'
}>()

const checkFiles = () => {
    console.log(files)
}

const handleClick = () => {
    const inputTagId = props.isSrc ? "file-input-src" : "file-input-tgt"
    document.getElementById(inputTagId)?.click()
}

const handleDrop = (ev: DragEvent) => {
    isDragin.value = false;
    ev.preventDefault()
    if (ev.dataTransfer !== undefined && ev.dataTransfer !== null) {
        console.log(ev.dataTransfer.files)
        files.addList([...ev.dataTransfer.files], props.filetype, props.isSrc)
    }
}

const handleInput = (ev: Event) => {
    if (ev.target !== null) {
        const target = ev.target as HTMLInputElement
        if (target.files !== null) {
            files.addList([...target.files], props.filetype, props.isSrc)
        }
    }
}

const handleDragStart = () => {
    isDragin.value = true
}

const handleDragEnd = () => {
    isDragin.value = false
}

</script>


<style>
.drop_zone {
    display: block;
    width: 90%;
    height: 120px;
    border: 5px dotted black;
    border-radius: 1rem;
    margin: 0 auto;
    padding: auto;
    font-weight: bolder;
    background: #F5F5F5;
    text-align: center;
    padding-top: 0.5rem;
}

.enter {
    background: lightblue;
}

.drop_label {
    margin-top: 50px;
    vertical-align: middle;
}
</style>