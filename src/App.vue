<script setup lang="ts"></script>

<template>
  <Card class="items-center gap-4">
    <template #title>
      <h1 class="text-3xl font-bold underline">Build a Color Swatch Grid!</h1>
    </template>
    <template #content>
      <div class="flex flex-col gap-4 mb-4">
        <div class="mb-4">
          <label for="saturation" class="block mb-4">Saturation:</label>
          <InputText v-model.number="saturation" class="mb-4" />

          <Slider name="saturation" :min="0" :max="100" v-model="saturation" />
        </div>
        <Divider />
        <div class="mb-4">
          <label for="lightness" class="block mb-4">Lightness:</label>
          <InputText v-model.number="lightness" class="mb-4" />

          <Slider name="lightness" :min="0" :max="100" v-model="lightness" />
        </div>
      </div>

      <Button label="Submit" @click="getSwatches()" v-if="!swatches.length" />
      <Button
        label="Get More Swatches"
        @click="
          () => {
            start = limit + 1;
            limit = start + 49;
            getSwatches();
          }
        "
        v-if="swatches.length"
      />
    </template>
  </Card>
  <DataView :value="swatches" v-if="swatches.length > 0">
    <template #list="slotProps">
      <div class="flex flex-col">
        <div v-for="(item, index) in slotProps.items" :key="index">
          <div
            class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
            :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }"
          >
            <div class="swatch" :style="{ backgroundColor: item.hex.value }"></div>
            {{ item.name.value }}
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import Slider from 'primevue/slider';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import API from './util/api.const';

const saturation = ref(0);
const lightness = ref(0);
const swatches = ref([]);
let start = 0;
let limit = 50;

watch(saturation, (newValue, oldValue) => {
  // When saturation changes, reset the start and limit values
  reset();
});

watch(lightness, (newValue, oldValue) => {
  // When saturation changes, reset the start and limit values
  reset();
});

const reset = () => {
  start = 0;
  limit = 50;
  swatches.value = [];
};

const getSwatches = async () => {
  console.log('getSwatches');
  const response = await API.getSwatches(saturation.value, lightness.value);
  const requests = [];
  console.log(response);
  for (let i = start; i <= limit; i++) {
    requests.push(API.getSwatches(i, saturation.value, lightness.value));
  }
  const responses = await Promise.all(requests);
  const newSwatches = Array.from(new Set(responses.map((a) => a.name.value)))
    .map((name) => {
      return responses.find((a) => a.name.value === name);
    })
    .filter((item) => !swatches.value.some((swatch) => swatch.name.value === item.name.value));
    debugger;
  swatches.value = [...swatches.value, ...newSwatches];
};
</script>
<style lang="css" scoped>
.swatch {
  width: 100px;
  height: 100px;
}
</style>
