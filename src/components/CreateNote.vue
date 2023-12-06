<script setup lang="ts">
import back from "../assets/back.svg";
// import notif from "../assets/notif.svg";
// import addNote from "../assets/addNote.svg";
// import category from "../assets/category.svg";
import { ref, defineProps, onMounted } from "vue";
const text = ref<string>("");
const isCheck = ref(false);
const props = defineProps(["datafromParent"]);
onMounted(() => {
  text.value = props.datafromParent.teks;
});
</script>

<template>
  <!-- <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
    <div class="flex">
      <div class="py-1">
        <svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
        </svg>
      </div>
      <div>
        <p class="font-bold">Our privacy policy has changed</p>
        <p class="text-sm">Make sure you know how these changes affect you.</p>
      </div>
    </div>
  </div> -->
  <div class="w-screen h-screen absolute p-4 z-10">
    <div class="flex justify-between items-center w-2/4">
      <div @click="$emit('check', isCheck)" class="w-4 h-4 cursor-pointer">
        <img :src="back" alt="del" />
      </div>
      <p v-if="$props.datafromParent.id" class="text-lg">Edit Task</p>
      <p v-else class="text-lg">New Task</p>
    </div>
    <div class="mt-16 mb-8">
      <span>What are you planning ?</span>
      <input v-model="text" class="p-4 pb-12 border-b border-black w-full bg-VeryLightGrayishBlue" placeholder="Text Here" type="text" autofocus />
    </div>
    <!-- <div class="flex flex-col gap-4 mb-8">
      <div  class="flex items-center gap-4">
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
    </div> -->
    <div class="flex justify-center">
      <button v-if="$props.datafromParent.id" @click="$emit('edit', $props.datafromParent.id, text)" class="bg-white p-4 border rounded-lg w-2/4">Edit</button>
      <button v-else @click="$emit('submit', text)" class="bg-white p-4 border rounded-lg w-2/4">Create</button>
    </div>
  </div>
</template>

<style scoped></style>
