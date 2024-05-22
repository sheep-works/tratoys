import { defineStore } from "pinia";
import { executor } from "~/core/src/executor/executor";

export const useResults = defineStore("reults", () => {
    const result = ref<ProceedResult>()

    async function execute(exec: ExecutableOption) {
        return new Promise((resolve, reject) => {
            executor(exec)
                .then(res => {
                    result.value = res
                    resolve(true)
                })
                .catch(err => {
                    reject(err)
                })

        })

    }

    return { result, execute }
})