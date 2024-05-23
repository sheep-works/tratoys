<template>
    <div>
        <v-card elevation="20">
            <v-card-title class="text-h5 pa-3">オプション</v-card-title>
            <v-card-text>
                <v-tabs v-model="tab" align-tabs="center" bg-color="grey">
                    <v-tab :value="1">一般</v-tab>
                    <v-divider vertical />
                    <v-tab :value="2" bg-color="indigo">Word</v-tab>
                    <v-divider vertical />
                    <v-tab :value="3" color="green">Excel</v-tab>
                    <v-divider vertical />
                    <v-tab :value="4" color="orange">PPT</v-tab>
                </v-tabs>
                <v-window v-model="tab" class="px-10">
                    <v-window-item :key="1" :value="1">
                        <v-container fluid>
                            <v-form>
                                <v-container>
                                    <v-row>
                                        <v-col cols="2">
                                            <div class="text-h6">出力ファイル名</div>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field v-model="outputName" required hide-details></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-select :items="props.extentions" v-model="extention"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="2">
                                            <div class="text-h6">文区切り</div>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-checkbox label="文で区切る"
                                                v-model="opt.exopt.opt.common.segmentation"></v-checkbox>
                                        </v-col>
                                        <v-col>
                                            <v-text-field label="文の切れ目" v-model="opt.exopt.opt.common.delimiters"
                                                hide-details></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="2">
                                            <div class="text-h6">テキスト除外</div>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-checkbox label="設定する"
                                                v-model="opt.exopt.opt.common.excluding"></v-checkbox>
                                        </v-col>
                                        <v-col>
                                            <v-text-field label="除外パターン" v-model="opt.exopt.opt.common.excludePattern"
                                                hide-details></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="2">
                                            <div class="text-h6">ページ区切り</div>
                                        </v-col>
                                        <v-col>
                                            <v-checkbox label="挿入する"
                                                v-model="opt.exopt.opt.common.withSeparator"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-container>
                    </v-window-item>
                    <v-window-item :key="2" :value="2">
                        <v-container fluid>
                            <v-form>
                                <v-container>
                                    <v-row>
                                        <v-col cols="2">
                                            <div class="text-h6">修正履歴</div>
                                        </v-col>
                                        <v-col>
                                            <v-checkbox label="修正後を読み込む（原文）"
                                                v-model="opt.exopt.opt.office.word.afterRev"></v-checkbox>
                                        </v-col>
                                        <v-col>
                                            <v-checkbox label="修正後を読み込む（訳文）"
                                                v-model="opt.exopt.opt.office.word.afterRev2"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-container>
                    </v-window-item>
                    <v-window-item :key="3" :value="3">
                        <v-container fluid>
                            <v-form>
                                <v-container>
                                    <v-row>
                                        <v-col cols="2">
                                            <div class="text-h6">非表示シート</div>
                                        </v-col>
                                        <v-col>
                                            <v-checkbox label="読み込む"
                                                v-model="opt.exopt.opt.office.excel.readHiddenSheet"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="2">
                                            <div class="text-h6">色付きセル</div>
                                        </v-col>
                                        <v-col>
                                            <v-checkbox label="読み込む"
                                                v-model="opt.exopt.opt.office.excel.readFilledCell"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-container>
                    </v-window-item>
                    <v-window-item :key="4" :value="4">
                        <v-container fluid>
                            <v-form>
                                <v-container>
                                    <v-row>
                                        <v-col cols="2">
                                            <div class="text-h6">スライド</div>
                                        </v-col>
                                        <v-col>
                                            <v-checkbox label="読み込む"
                                                v-model="opt.exopt.opt.office.ppt.readSlide"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="2">
                                            <div class="text-h6">ノート</div>
                                        </v-col>
                                        <v-col>
                                            <v-checkbox label="読み込む"
                                                v-model="opt.exopt.opt.office.ppt.readNote"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-container>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
        <v-divider class="my-6" />
        <v-btn block size="large" @click="execute" color="teal">実行</v-btn>
    </div>
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