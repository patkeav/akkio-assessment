<script setup lang="ts"></script>

<template>
  <Card class="items-center gap-4">
    <template #title
      ><h1 class="text-3xl font-bold underline">Build a Color Swatch Grid!</h1></template
    >
    <template #content>
      <label for="saturation">Choose Saturation:</label>
      <Slider name="saturation" :min="0" :max="100" v-model="saturation" />
      <label for="lightness">Choose Lightness:</label>
      <Slider name="lightness" :min="0" :max="100" v-model="lightness" />
      <p>You saturation: {{ saturation }}</p>
      <p>You lightness: {{ lightness }}</p>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Slider from 'primevue/slider';
import Card from 'primevue/card';

const saturation = ref(0);
const lightness = ref(0);
</script>
