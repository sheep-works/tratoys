<script lang="ts" setup>
import { useQAData } from '~/store/qaData';
const qa = useQAData()

const langs = [
    "簡体字 → 日本語",
    "日本語 → 簡体字",
    "繁体字 → 日本語",
    "日本語 → 繁体字",
    "簡体字 → 繁体字",
    "繁体字 → 簡体字",
    "チェックしない",
]

// const langs = [
//     { name: "簡体字 → 日本語", dictName: 'csNotInJa' },
//     { name: '日本語 → 簡体字', dictName: 'jaNotInCs' },
//     { name: '繁体字 → 日本語', dictName: 'ctNotInJa' },
//     { name: '日本語 → 繁体字', dictName: 'jaNotInCt' },
//     { name: '簡体字 → 繁体字', dictName: 'csNotInCt' },
//     { name: '繁体字 → 簡体字', dictName: 'ctNotInCs' },
//     { name: 'チェックしない', dictName: 'noCheck' },
// ]


// const colored = ref('')
// const setColor = () => {
//     let tempText = toCheck.value
//     tempText = subsetColor(tempText, kanjiMatches.value)
//     tempText = subsetColor(tempText, kanaMatches.value)
//     tempText = subsetColor(tempText, bushuMatches.value)
//     colored.value = tempText
// }

const subsetColor = (text: string, matches: RegExpMatchArray | null): string => {
    if (matches === null) {
        return text
    }
    let tempText = text
    const checked: string[] = ['']
    for (const m of matches) {
        if (checked.includes(m)) {
            continue
        }
        else {
            tempText = tempText.replaceAll(m, `<span class="hit">${m}</span>`)
            checked.push(m)
        }
    }
    return tempText
}

</script>

<template>
    <v-card class="ma-2">
        <v-card-title>日本語・中国語翻訳用 漢字チェッカー</v-card-title>
        <v-card-item>
            <v-row>
                <v-col class="align-items-center justify-content-center">
                    <v-select label="翻訳の言語種別" v-model="qa.selectedLang" :items="langs" />
                </v-col>
                <v-col class="col-2">
                    <v-divider vertical />
                </v-col>
                <v-col class=" align-items-center justify-content-center">
                    <v-sheet>
                        <h3>その他の設定</h3>
                        <v-list density="compact">
                            <v-list-item>
                                <v-checkbox label="単独言語" v-model="qa.isSingle"></v-checkbox>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox label="ひらがな・カタカナ" v-model="qa.isCheckKana"></v-checkbox>
                            </v-list-item>
                            <v-list-item>
                                <v-checkbox label="康熙部首" v-model="qa.isCheckBushu"></v-checkbox>
                            </v-list-item>
                        </v-list>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-divider />
            <div>
                <p>漢字の詳細については<a
                        href="https://xfitddzavf.larksuite.com/base/QXzNbimgjaHhELsOpkeu7jsKsUe?table=tblMW8jCj6gKJ2St&view=vewIZJdIsY"
                        target="_blank">こちら</a></p>
                <p>また、漢字の追加希望は<a
                        href="https://xfitddzavf.larksuite.com/base/QXzNbimgjaHhELsOpkeu7jsKsUe?table=tbl0c0cmHcMgjcxh&view=vewFff8PKA"
                        target="_blank">こちら</a>から</p>
            </div>
        </v-card-item>
    </v-card>
</template>
