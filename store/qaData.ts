import { defineStore } from "pinia";
import {
    jaNotInCs, jaNotInCt,
    csNotInJa, csNotInCt,
    ctNotInJa, ctNotInCs,
    kana,
    kokiBushu, kokiDict
} from './charaData'

interface ResultData {
    src: string
    tgt: string
    errs: string[]
}

type TargetOption = "text" | "term"
type DoubleStringArray = Array<[string, string]>

export const useQAData = defineStore("qa", () => {
    const textPlain = ref("")
    const termPlain = ref("")
    const results = ref<ResultData[]>([])
    const textSet = ref<DoubleStringArray>([["", ""]])
    const termSet = ref<DoubleStringArray>([["", ""]])
    const regNums = new RegExp("[0-9.,]+", "g")

    const textToUsePlain = ref(true)
    const termsToUsePlain = ref(true)

    const selectedLang = ref('簡体字 → 日本語')
    const isCheckKana = ref(true)
    const isCheckBushu = ref(false)
    const isSingle = ref(false)

    const dict = {
        jaNotInCs: new RegExp(`[${jaNotInCs}]`, 'g'),
        jaNotInCt: new RegExp(`[${jaNotInCt}]`, 'g'),
        csNotInJa: new RegExp(`[${csNotInJa}]`, 'g'),
        csNotInCt: new RegExp(`[${csNotInCt}]`, 'g'),
        ctNotInJa: new RegExp(`[${ctNotInJa}]`, 'g'),
        ctNotInCs: new RegExp(`[${ctNotInCs}]`, 'g'),
        kana: new RegExp(`[${kana}]`, 'g'),
        kokiBushu: new RegExp(`[${kokiBushu}]`, 'g'),
        kokiDict
    }

    function defineTarget(target: TargetOption): {
        sw: Ref<boolean>
        one: Ref<string>
        two: Ref<DoubleStringArray>
    } {
        const sw = target === "text" ? textToUsePlain : termsToUsePlain
        const one = target === "text" ? textPlain : termPlain
        const two = target === "text" ? textSet : termSet
        return { sw, one, two }
    }

    function splitData(target: TargetOption) {
        const { sw, one, two } = defineTarget(target)
        if (!sw.value) {
            return
        }
        else {
            two.value.length = 0
            const lines = one.value.split("\n")
            lines.forEach(line => {
                const val = line.replaceAll("    ", "\t").split("\t")
                two.value.push([val[0]?.trim() || "", val[1]?.trim() || ""])
            })
            if (two.value.length === 0) {
                two.value.push(["", ""])
            }
            sw.value = false
        }
    }

    function mergeData(target: TargetOption) {
        const { sw, one, two } = defineTarget(target)
        if (sw.value) {
            return
        }
        else {
            const inText: string[] = []
            two.value.forEach(val => {
                if (val[0] !== "" && val[1] !== "") {
                    inText.push(val.join("\t"))
                }
            })
            one.value = inText.join("\n")
            sw.value = true
        }
    }

    function addLine(target: TargetOption) {
        const { two } = defineTarget(target)
        two.value.push(["", ""])
    }

    function removeLine(target: TargetOption, idx: number) {
        const { two } = defineTarget(target)
        if (idx > two.value.length) {
            return
        }
        else if (two.value.length === 1) {
            two.value[0][0] = ""
            two.value[0][1] = ""
        }
        else {
            two.value.splice(idx, 1)
        }
    }



    function exec(termQA: boolean = true, numQA: boolean = true) {
        splitData("text")
        splitData("term")
        // splitTexts()
        // splitTerms()
        // dataText.value = dataText.value.replaceAll("    ", "\t")
        // const lines = dataText.value.split("\n")
        const crts: Array<[string, string]> = []
        results.value.length = 0
        textSet.value.forEach(line => {
            const [s, t] = line
            if (s !== "") {
                if (isSingle.value) {
                    crts.push(["", s.trim()])
                }
                else if (t !== undefined) {
                    crts.push([s.trim(), t.trim()])
                }
                else {
                    crts.push([s.trim(), ""])
                }
            }
        })
        crts.forEach(line => {
            const inlineResult: string[] = []
            if (termQA && !isSingle.value) {
                const result = checkTerm(line[0], line[1])
                if (result !== null) {
                    inlineResult.push(...result)
                }
            }
            if (numQA && !isSingle.value) {
                const result = checkNum(line[0], line[1])
                if (result !== null) {
                    inlineResult.push(...result)
                }
            }
            if (selectedLang.value !== "チェックしない") {
                const result = checkKanji(line[1])
                if (result !== null) {
                    inlineResult.push(...result)
                }
            }
            if (isCheckKana.value) {
                const result = checkKana(line[1])
                if (result !== null) {
                    inlineResult.push(...result)
                }
            }
            if (isCheckBushu.value) {
                const result = checkBushu(line[1])
                if (result !== null) {
                    inlineResult.push(...result)
                }
            }
            if (inlineResult.length === 0) {
                inlineResult.push("なし")
            }
            results.value.push({
                src: line[0],
                tgt: line[1],
                errs: [...inlineResult]
            })

        })
    }

    const onlyCheck = computed(() => {
        return results.value.filter(val => val.errs[0] !== "なし")
    })

    function checkTerm(src: string, tgt: string): string[] {
        const termRes: string[] = []
        termSet.value.forEach(term => {
            const [term1, term2] = term
            const regTerm1 = new RegExp(term1, "g")
            const matches1 = src.match(regTerm1)?.length || 0
            if (matches1 > 0) {
                const regTerm2 = new RegExp(term2, "g")
                const matches2 = tgt.match(regTerm2)?.length || 0
                if (matches1 !== matches2) {
                    termRes.push(`訳語の不一致 ${term1}*${matches1} vs ${term2}*${matches2}`)
                }
            }
        })
        return termRes
    }

    function checkNum(src: string, tgt: string): string[] {
        const numRes: string[] = []
        const numInSrc = src.match(regNums)?.map(val => val.toString()) || []
        const numInTgt = tgt.match(regNums)?.map(val => val.toString()) || []
        if (numInSrc.length > 0) {
            numInSrc.forEach(n => {
                const index = numInTgt.indexOf(n)
                if (index !== -1) {
                    numInTgt.splice(index, 1)
                }
                else {
                    numRes.push(`数字の不一致 原文：${n}`)
                }
            })
        }
        if (numInTgt.length > 0) {
            numInTgt.forEach(n => {
                numRes.push(`数字の不一致 訳文: ${n}`)
            })
        }

        return numRes
    }

    function checkKanji(tgt: string): string[] {
        const kanjiRes: string[] = []
        let rx: RegExp | undefined
        switch (selectedLang.value) {
            case '簡体字 → 日本語':
                rx = dict.csNotInJa
                break;

            case '日本語 → 簡体字':
                rx = dict.jaNotInCs
                break;

            case '繁体字 → 日本語':
                rx = dict.ctNotInJa
                break

            case '日本語 → 繁体字':
                rx = dict.jaNotInCt
                break

            case '簡体字 → 繁体字':
                rx = dict.csNotInCt
                break

            case '繁体字 → 簡体字':
                rx = dict.ctNotInCs
                break

            default:
                break;
        }
        if (rx === undefined) {
            return []
        }
        const matches = tgt.match(rx)?.map(val => val.toString()) || []
        if (matches.length > 0) {
            kanjiRes.push(`漢字-要確認(${matches.length}個)：${matches.join(', ')}`)
        }
        return kanjiRes
    }


    function checkKana(tgt: string): string[] {
        const kanaRes: string[] = []
        if (selectedLang.value.endsWith('日本語')) {
            // pass
        }
        else {
            const matches = tgt.match(dict.kana)?.map(val => val.toString()) || []
            if (matches.length > 0) {
                kanaRes.push(`かな-要確認(${matches.length}個)：${matches.join(', ')}`)
            }
        }
        return kanaRes
    }

    function checkBushu(tgt: string): string[] {
        const bushuRes: string[] = []
        const matches = tgt.match(dict.kokiBushu)?.map(val => val.toString()) || []
        if (matches.length > 0) {
            bushuRes.push(`康煕部首-要確認(${matches.length}個)：${matches.join(', ')}`)
        }
        return bushuRes
    }


    return {
        textPlain, termPlain, textSet, termSet,
        splitData, mergeData, addLine, removeLine,
        selectedLang, isSingle, isCheckKana, isCheckBushu,
        results, exec, onlyCheck
    }
})

