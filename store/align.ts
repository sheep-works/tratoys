import { defineStore } from "pinia";
import { executor } from "~/core/src/executor/executor";
import { computed } from "vue";

export const useAlign = defineStore("align", () => {
    const raw = ref<{ srcs: OfficeContent[], tgts: OfficeContent[] }>({
        srcs: [],
        tgts: []
    })
    const data = ref<Array<[string[][], string[][]]>>([]);
    const fx = ref(0)

    function setRaw(rawData: OfficeResult) {
        raw.value.srcs = rawData.srcs
        raw.value.tgts = rawData.tgts
        setData()
    }

    function setData() {
        for (let i = 0; i < raw.value.srcs.length; i++) {
            const tempSrc = raw.value.srcs[i]
            const tempTgt = raw.value.tgts[i]
            const inFileSrc: string[][] = []
            const inFileTgt: string[][] = []
            tempSrc.exts.forEach(val => {
                inFileSrc.push(val.value)
            })
            tempTgt.exts.forEach(val => {
                inFileTgt.push(val.value)
            })
            data.value.push([inFileSrc, inFileTgt])
        }
    }

    const currentFile = computed((): [string[][], string[][]] => {
        return [data.value[fx.value][0], data.value[fx.value][1]]

    })

    return {
        data, fx, currentFile,
        setRaw
    }
})