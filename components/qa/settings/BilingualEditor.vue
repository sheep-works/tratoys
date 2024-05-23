<template>
    <v-data-iterator :items="data" :items-per-page="-1">
        <template v-slot:default="{ items }">
    <template
      v-for="(item, i) in items"
      :key="i"
    >
    <v-row>
        <v-col cols="1">
            <div>{{ i + 1 }}</div>
    </v-col>
        <v-col cols="5">
            <v-text-field v-model="item.raw[0]" density="compact" hide-details/>
        </v-col>
    <v-col cols="5">
        <v-text-field v-model="item.raw[1]" density="compact" hide-details/>
    </v-col>
    <v-col>
        <v-btn @click="() => emits('add-line')" class="mx-1" variant="text" size="small">+</v-btn>
        <v-btn @click="() => emits('remove-line', i)" class="mx-1" variant="text" size="small">x</v-btn>
    </v-col>
    </v-row>

    </template>
  </template><!-- <template v-slot:item.errs="{ item }">
                <div class="text-body">
                    <v-list>
                        <v-list-item v-for="err in item.errs">
                            {{ err }}
                        </v-list-item>
                    </v-list>
                </div>
            </template> -->
    </v-data-iterator>
</template>

<script setup lang="ts">
interface Props {
    target: "text" | "term"
    data: Array<[string, string]>
}
interface Emits {
    (e: "add-line"): void
    (e: "remove-line", idx: number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
</script>