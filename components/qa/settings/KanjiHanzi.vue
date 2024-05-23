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
    <v-card class="ma-2" elevation="20">
        <v-card-title class="text-h5 pa-3">日本語・中国語翻訳用 漢字チェッカー</v-card-title>
        <v-card-item>
            <v-row>
                <v-col class="align-items-center justify-content-center">
                    <v-select label="翻訳の言語種別" v-model="qa.selectedLang" :items="langs" />
                </v-col>
                <v-col class="align-items-center justify-content-center">
                    <v-checkbox label="ひらがな・カタカナ" v-model="qa.isCheckKana"></v-checkbox>
                </v-col>
                <v-col class="align-items-center justify-content-center">
                    <v-checkbox label="康熙部首" v-model="qa.isCheckBushu"></v-checkbox>
                </v-col>
                <v-col>
                    <div>
                <p>漢字の詳細については<a
                        href="https://transheep.larksuite.com/base/MgLhbPNdOas15zskCePukL0GsWM?table=tblqFgjSot9iuKEs&view=vewIZJdIsY"
                        target="_blank">こちら</a></p>
                <p>また、漢字の追加希望は<a href="https://transheep.larksuite.com/share/base/form/shruszQABirwUrnC3CWUImoN6Bb"
                        target="_blank">こちら</a>から</p>
            </div>
        </v-col>
            </v-row>
            <v-divider />
            
        </v-card-item>
    </v-card>
</template>
