<script setup lang="ts">
import { ref, onMounted } from "vue";
import back from "../assets/back.svg";
import { useRouter, useRoute } from "vue-router";
import { getCategory, Category, changeNote } from "../store/repository";

const router = useRouter();
const route = useRoute();

const dataCategory = ref<Category>({
  id: "",
  image: "",
  name: "",
  list: [],
  userId: "",
});
const text = ref<string | undefined>("");
const getData = async () => {
  dataCategory.value = await getCategory(route.params.id.toString());
  text.value = dataCategory.value.list.find((item) => item.id == route.query.idNote)?.postscript;
  console.log(dataCategory.value.list.find((item) => item.id == route.query.idNote));
};
const handleAddPostscript = async () => {
  let index = dataCategory.value.list.findIndex((list) => list.id == route.query.idNote);
  let targetList = dataCategory.value.list[index];
  dataCategory.value.list[index] = { ...targetList, postscript: text.value };
  await changeNote(route.params.id.toString(), targetList, dataCategory.value.list[index]);
  router.go(-1);
};
onMounted(() => {
  getData();
});
</script>
<template>
  <div class="relative w-screen min-h-screen p-4">
    <div class="flex mb-8 gap-4">
      <img @click="router.go(-1)" class="cursor-pointer" :src="back" alt="back" />
      <p>{{ dataCategory.list.find((item) => item.id == route.query.idNote)?.teks }}</p>
    </div>
    <div class="mb-8">
      <span>add additional notes ?</span>
      <input v-model="text" class="p-4 pb-12 border-b border-black w-full bg-VeryLightGrayishBlue" placeholder="Text Here" type="text" autofocus />
    </div>
    <div class="flex justify-center">
      <button @click="handleAddPostscript" class="bg-white p-4 border rounded-lg w-2/4">Add</button>
    </div>
  </div>
</template>
