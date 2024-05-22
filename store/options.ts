import { defineStore } from "pinia";
import { createExecuteOptionTemplate } from "~/core/src/util/option";

export const useOptions = defineStore("options", () => {
    const exopt = ref(createExecuteOptionTemplate())

    function setDefaultMode(mode1: "OFFICE" | "CAT", mode2: "EXTRACT" | "COUNT" | "ALIGN") {
        exopt.value.mode1 = mode1
        exopt.value.mode2 = mode2
    }
    return { exopt, setDefaultMode }
})