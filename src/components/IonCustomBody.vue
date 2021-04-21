<template>
  <div class="dark_back flex flex-col min-h-full bg-gray-600 text-white">
    <slot></slot>
  </div>
</template>

<style>
@media (prefers-color-scheme: dark) {
    .dark {
        color: white;
    }
    .dark_b{
      border-color: rgb(212, 212, 212);
    }
    .dark_back{
      background-color: black;
    }
    .dark_logo{
      display: block;
    }
    .light_logo{
      display: none;
    }
}
</style>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'IonCustomBody',
})
</script> 