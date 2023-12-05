<script setup lang="ts">
import deleteSym from "../assets/icon-cross.svg";
import notif from "../assets/notif.svg";
import addNote from "../assets/addNote.svg";
import category from "../assets/category.svg";
import { ref } from "vue";
const text = ref<string>("");
const isCheck = ref(false);
const emit = defineEmits<{
  (e: "check", isCheck: boolean): void;
  (e: "submit", text: string): void;
}>();
//
</script>

<template>
  <div class="w-screen h-screen absolute p-4 z-10">
    <div class="mx-auto flex justify-between items-center w-2/4">
      <p class="text-lg">New Task</p>
      <div @click="emit('check', isCheck)" class="w-4 h-4 cursor-pointer">
        <img :src="deleteSym" alt="del" />
      </div>
    </div>
    <div class="mt-16 mb-8">
      <span>What are you planning ?</span>
      <input v-model="text" class="p-4 pb-12 border-b border-black w-full bg-VeryLightGrayishBlue" placeholder="Text Here" type="text" autofocus />
    </div>
    <div class="flex flex-col gap-4 mb-8">
      <div class="flex items-center gap-4">
        <img :src="notif" alt="notif" />
        <p>May 29, 14:00</p>
      </div>
      <div class="flex items-center gap-4">
        <img :src="addNote" alt="addnote" />
        <p>Add note</p>
      </div>
      <div class="flex items-center gap-4">
        <img :src="category" alt="addnote" />
        <p>Category</p>
      </div>
    </div>
    <div class="flex justify-center">
      <button @click="emit('submit', text)" class="bg-white p-4 border rounded-lg w-2/4">Create</button>
    </div>
  </div>
</template>

<style scoped></style>
