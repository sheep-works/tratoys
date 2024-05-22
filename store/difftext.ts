import { defineStore } from "pinia"
import { SequenceMatcher } from "../core/difflib/src/sequenceMatcher"

export const useDifftext = defineStore("difftext", () => {
    const src1 = ref("")
    const src2 = ref("")
    const src3 = ref("")
    const tgt1 = ref("")
    const tgt2 = ref("")
    const tgt3 = ref("")

    function checkDiff() {
        const sm = new SequenceMatcher()
        sm.setSeqs(src1.value, src2.value)
        src3.value = sm.applyOpcodes(false)
        sm.setSeqs(tgt1.value, tgt2.value)
        tgt3.value = sm.applyOpcodes(false)
    }

    return { src1, src2, src3, tgt1, tgt2, tgt3, checkDiff }
})