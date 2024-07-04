import { defineStore } from "pinia"
import { SequenceMatcher } from "../core/difflib/src/sequenceMatcher"
import { htmlOpen, htmlClose, htmlTabelHead, htmlTableClose } from "./html"

export const useDifftext = defineStore("difftext", () => {
    const src1 = ref("")
    const src2 = ref("")
    const src3 = ref("")
    const tgt1 = ref("")
    const tgt2 = ref("")
    const tgt3 = ref("")

    const batchDiff = ref<Array<{ s: string, t: string, d: string }>>([])

    function checkDiff() {
        const sm = new SequenceMatcher()
        sm.setSeqs(cleanString(src1.value), cleanString(src2.value))
        src3.value = sm.applyOpcodes(false)
        sm.setSeqs(cleanString(tgt1.value), cleanString(tgt2.value))
        tgt3.value = sm.applyOpcodes(false)
    }

    function cleanString(text: string): string {
        return text.replaceAll("<", "＜").replaceAll(">", "＞").trim()
    }

    function batchCheck() {
        batchDiff.value.length = 0
        const srcs = src1.value.split("\n")
        const tgts = tgt1.value.split("\n")
        const sm = new SequenceMatcher()
        srcs.forEach((_, idx) => {
            const s = cleanString(srcs[idx])
            const t = cleanString(tgts[idx])
            if (s === t) {

            }
            else {
                sm.setSeqs(s, t)
                const d = sm.applyOpcodes(false)
                batchDiff.value.push({ s, t, d })
            }
        })
    }

    function exportDiff(mode: "1vs1" | "2vs2" | "batch"): string {
        const html: string[] = [htmlOpen, htmlTabelHead]
        switch (mode) {
            case "1vs1":
                html.push(`<tr><td>1</td><td>${src1.value}</td><td>${src2.value}</td><td>${src3.value}</td></tr>`)
                break

            case "2vs2":
                html.push(`<tr><td>1</td><td>${src1.value}</td><td>${src2.value}</td><td>${src3.value}</td></tr>`)
                html.push(`<tr><td>2</td><td>${tgt1.value}</td><td>${tgt2.value}</td><td>${tgt3.value}</td></tr>`)
                break

            case "batch":
                batchDiff.value.forEach((item, idx) => {
                    html.push(`<tr><td>${idx + 1}</td><td>${item.s}</td><td>${item.t}</td><td>${item.d}</td></tr>`)
                })
                break

            default:
                break
        }
        html.push(htmlTableClose)
        html.push(htmlClose)
        return html.join("\n")
    }

    return {
        src1, src2, src3, tgt1, tgt2, tgt3, batchDiff,
        checkDiff, batchCheck, exportDiff,
    }
})