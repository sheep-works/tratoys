import { defineStore } from "pinia";

export const useFilelist = defineStore("filelist", () => {
    const srcs = ref<File[]>([])
    const tgts = ref<File[]>([])

    function addList(files: File[], filetype: "Office" | "CAT", isSrc = true): void {
        const validFiles = files.filter(file => {
            if (filetype === "Office") {
                const isOffice = new RegExp("\.(docx|docm|xlsx|xlsm|pptx|pptm)$")
                return isOffice.test(file.name)
            }
            else if (filetype === "CAT") {
                const isCat = new RegExp("\.(xliff|mxliff|tmx|tbx)$")
                return isCat.test(file.name)
            }
            else {
                return false
            }
        })
        if (isSrc) {
            srcs.value.push(...validFiles)
        }
        else {
            tgts.value.push(...validFiles)
        }
    }

    function handleMove(isSrc: boolean, index: number, moveDirection: 1 | -1) {
        const target = isSrc ? srcs : tgts
        if (moveDirection === 1) {
            if (index === target.value.length - 1) {
                return
            }
            else {
                const element = target.value.splice(index, 1)[0]
                target.value.splice(index + 1, 0, element)
                console.log(target.value)
            }
        }
        else {
            if (index === 0) {
                return
            }
            else {
                const element = target.value.splice(index, 1)[0]
                target.value.splice(index - 1, 0, element)
                console.log(target.value)
            }
        }
    }

    function handleRemove(isSrc: boolean, index: number) {
        const target = isSrc ? srcs : tgts
        target.value.splice(index, 1)
    }

    return { srcs, tgts, addList, handleMove, handleRemove }
})