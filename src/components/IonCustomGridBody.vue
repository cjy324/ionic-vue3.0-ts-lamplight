<template>
  <div class="grid min-h-full bg-gray-600 text-white">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'IonCustomGridBody',
})
</script> 