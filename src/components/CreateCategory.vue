<script setup lang="ts">
import back from "../assets/back.svg";
import { ref } from "vue";
const text = ref<string>("");
const isCheck = ref(false);
</script>

<template>
  <div class="w-screen h-screen absolute p-4 z-10">
    <div class="flex justify-between items-center w-2/4">
      <div @click="$emit('check', isCheck)" class="w-4 h-4 cursor-pointer">
        <img :src="back" alt="del" />
      </div>
      <p class="text-lg">Add Category</p>
    </div>
    <div class="mt-16 mb-8">
      <span>Create New Category</span>
      <input v-model="text" class="p-4 pb-12 border-b border-black w-full bg-VeryLightGrayishBlue" placeholder="Text Here" type="text" autofocus />
    </div>
    <div class="flex justify-center">
      <button @click="$emit('submit', text)" class="bg-white p-4 border rounded-lg w-2/4">Create</button>
    </div>
  </div>
</template>

<style scoped></style>
