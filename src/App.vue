<template>
  <Card class="items-center gap-4">
    <template #title>
      <h1 class="text-3xl font-bold underline">Build a Color Swatch Grid!</h1>
    </template>
    <template #content>
      <div class="flex flex-col gap-4 mb-4">
        <div class="mb-4">
          <label for="saturation" class="block mb-4">Saturation:</label>
          <InputNumber suffix="%" v-model.number="saturation" class="mb-4" />

          <Slider name="saturation" :min="0" :max="100" v-model="saturation" />
        </div>
        <Divider />
        <div class="mb-4">
          <label for="lightness" class="block mb-4">Lightness:</label>
          <InputNumber suffix="%" v-model.number="lightness" class="mb-4" />

          <Slider name="lightness" :min="0" :max="100" v-model="lightness" />
        </div>
      </div>

      <Button label="Submit" @click="getSwatches()" v-if="!swatches.length" :loading="loading" />
      <Button
        :label="limit < 360 ? 'Get More Swatches' : 'No more swatches'"
        @click="
          () => {
            start = limit + 1;
            limit = start + 49;
            getSwatches();
          }
        "
        v-if="swatches.length"
        :loading="loading"
        :disabled="limit > 360"
      />
    </template>
  </Card>
  <DataView :value="swatches" v-if="swatches.length > 0" layout="grid">
    <template #header>
      <div class="flex justify-start">
        <h2>Color Swatches based on {{ saturation }}% Saturation and {{ lightness }}% Lightness</h2>
      </div>
    </template>
    <template #grid="slotProps">
      <div class="grid grid-cols-12 gap-4 px-3">
        <div
          v-for="(item, index) in slotProps.items"
          :key="index"
          class="col-span-12 sm:col-span-3 lg:col-span-2 p-2"
        >
          <div class="swatch mx-auto" :style="{ backgroundColor: item.hex.value }"></div>
          <div class="text-center pt-1">{{ item.name.value }}</div>
          <div class="text-center pt-1">{{ item.rgb.value }}</div>
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
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import API from './util/api.const';

const saturation = ref(0);
const lightness = ref(0);
const swatches = ref([]);
const loading = ref(false);
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
  loading.value = true;
  try {
    const response = await API.getSwatches(saturation.value, lightness.value);
    const requests = [];
    for (let i = start; i <= limit; i++) {
      requests.push(API.getSwatches(i, saturation.value, lightness.value));
    }
    const responses = await Promise.all(requests);
    const newSwatches = Array.from(new Set(responses.map((a) => a.name.value)))
      .map((name) => {
        return responses.find((a) => a.name.value === name);
      })
      .filter((item) => !swatches.value.some((swatch) => swatch.name.value === item.name.value));
    swatches.value = [...swatches.value, ...newSwatches];
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
<style lang="css" scoped>
.swatch {
  width: 100%;
  height: 100px;
  max-width: 100px;
}
</style>
