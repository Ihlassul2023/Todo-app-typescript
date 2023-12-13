<script setup lang="ts">
import back from "../assets/back.svg";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
const text = ref<string>("");
import { postCategory, editCategory, getCategory } from "../store/repository";
const router = useRouter();
const route = useRoute();
const addCategory = async () => {
  postCategory(text.value);
  router.push("/");
};
const handleEditCategory = async () => {
  if (route.query.id) {
    await editCategory(route.query.id.toString(), text.value);
  }
  router.push("/");
};
onMounted(async () => {
  if (route.query.id) {
    text.value = (await getCategory(route.query.id.toString())).name;
  }
});
</script>
<template>
  <div class="w-screen h-screen absolute p-4 z-10">
    <div class="flex justify-between items-center w-2/4">
      <div @click="$router.go(-1)" class="w-4 h-4 cursor-pointer">
        <img :src="back" alt="del" />
      </div>
      <p v-if="route.query.id" class="text-lg">Edit Category</p>
      <p v-else class="text-lg">Add Category</p>
    </div>
    <div class="mt-16 mb-8">
      <span v-if="route.query.id">Edit Category</span>
      <span v-else>Create New Category</span>
      <input v-model="text" class="p-4 pb-12 border-b border-black w-full bg-VeryLightGrayishBlue" placeholder="Text Here" type="text" autofocus />
    </div>
    <div class="flex justify-center">
      <button v-if="route.query.id" @click="handleEditCategory" class="bg-white p-4 border rounded-lg w-2/4">Edit</button>
      <button v-else @click="addCategory" class="bg-white p-4 border rounded-lg w-2/4">Create</button>
    </div>
  </div>
</template>
