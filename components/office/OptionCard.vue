<template>
    <v-card width="90%">
        <v-card-title>オプション</v-card-title>
        <v-card-text>
            <v-tabs v-model="tab" color="teal" align-tabs="center">
                <v-tab :value="1">一般</v-tab>
                <v-tab :value="2">Word</v-tab>
                <v-tab :value="3">Excel</v-tab>
                <v-tab :value="4">PPT</v-tab>
            </v-tabs>
            <v-window v-model="tab">
                <v-window-item :key="1" :value="1">
                    <v-container fluid>
                        <v-form>
                            <v-container>
                                <v-text-field label="出力ファイル名" v-model="outputName" required hide-details></v-text-field>
                                <v-select :items="props.extentions" v-model="extention"></v-select>
                                <v-checkbox label="文区切り" v-model="opt.exopt.opt.common.segmentation"></v-checkbox>
                                <v-text-field label="文の切れ目" v-model="opt.exopt.opt.common.delimiters"
                                    hide-details></v-text-field>
                                <v-checkbox label="テキスト除外" v-model="opt.exopt.opt.common.excluding"></v-checkbox>
                                <v-text-field label="除外パターン" v-model="opt.exopt.opt.common.excludePattern"
                                    hide-details></v-text-field>
                                <v-checkbox label="区切り文字" v-model="opt.exopt.opt.common.withSeparator"></v-checkbox>
                            </v-container>
                        </v-form>
                    </v-container>
                </v-window-item>
                <v-window-item :key="2" :value="2">
                    <v-container fluid>
                        <v-form>
                            <v-container>
                                <v-checkbox label="修正後" v-model="opt.exopt.opt.office.word.afterRev"></v-checkbox>
                                <v-checkbox label="修正後（訳文）" v-model="opt.exopt.opt.office.word.afterRev2"></v-checkbox>
                            </v-container>
                        </v-form>
                    </v-container>
                </v-window-item>
                <v-window-item :key="3" :value="3">
                    <v-container fluid>
                        <v-form>
                            <v-container>
                                <v-checkbox label="非表示スライド読み取り"
                                    v-model="opt.exopt.opt.office.excel.readHiddenSheet"></v-checkbox>
                                <v-checkbox label="色付きセル読み取り"
                                    v-model="opt.exopt.opt.office.excel.readFilledCell"></v-checkbox>
                            </v-container>
                        </v-form>
                    </v-container>
                </v-window-item>
                <v-window-item :key="4" :value="4">
                    <v-container fluid>
                        <v-form>
                            <v-container>
                                <v-checkbox label="スライド読み取り" v-model="opt.exopt.opt.office.ppt.readSlide"></v-checkbox>
                                <v-checkbox label="ノート読み取り" v-model="opt.exopt.opt.office.ppt.readNote"></v-checkbox>
                            </v-container>
                        </v-form>
                    </v-container>
                </v-window-item>
            </v-window>
        </v-card-text>
        <v-card-actions>
            <v-btn block @click="execute">実行</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { useOptions } from '~/store/options';
import { useFilelist } from '~/store/filelist';
import { useResults } from '~/store/results';

const tab = ref(1)
const opt = useOptions()
const props = defineProps<{ extentions: string[], redirect: string }>()
const outputName = ref("result")
const extention = ref(props.extentions[0] || "")

// const execute = () => {
//     console.log("under construction")
// }

const execute = async () => {
    opt.exopt.output = `${outputName.value}.${extention.value}`
    const filelist = useFilelist()
    const srcFiles = await blobToReadData(filelist.srcs)
    const tgtFiles = await blobToReadData(filelist.tgts)
    const executable: ExecutableOption = {
        ...opt.exopt,
        isExecutable: true,
        srcs: [filelist.srcs[0].name],
        srcFiles, tgtFiles
    }
    const results = useResults()
    results.execute(executable)
        .then(() => {
            // console.log(results.result?.office)
            const router = useRouter()
            router.push(props.redirect)
        })
        .catch(err => {
            console.log(err)
        })
}

const blobToReadData = async (files: File[]): Promise<ReadData[]> => {
    const results: ReadData[] = []
    for (const file of files) {
        const data = await blobContentsReader(file)
        results.push({
            name: file.name,
            data,
        })
    }
    return results
}

const blobContentsReader = async (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        file.arrayBuffer()
            .then(arraybuffer => {
                resolve(arraybuffer)
            })
            .catch(err => {
                reject(err)
            })
    })
}
</script>