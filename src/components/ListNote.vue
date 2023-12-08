<script setup lang="ts">
import { ref, onMounted } from "vue";
import back from "../assets/back.svg";
import more from "../assets/more.svg";
import { book, work, note, music, travel, home, desc } from "../assets/index";
import deleteSym from "../assets/icon-cross.svg";
import { useRouter, useRoute } from "vue-router";
import { getCategory, IdentyImg, Category, changeNote, deleteNote, deleteCategory } from "../store/repository";

const router = useRouter();
const route = useRoute();

const identyImg: IdentyImg = {
  work,
  music,
  travel,
  book,
  home,
  desc,
  note,
};

const dataCategory = ref<Category>({
  id: "",
  image: "",
  name: "",
  list: [],
});
const click = ref(false);
const getData = async () => {
  dataCategory.value = await getCategory(route.params.id.toString());
};
const handleStatus = async (id: string) => {
  let index = dataCategory.value.list.findIndex((list) => list.id == id);
  let targetList = dataCategory.value.list[index];
  dataCategory.value.list[index] = { ...targetList, status: !targetList.status };
  await changeNote(route.params.id.toString(), targetList, dataCategory.value.list[index]);
};
const handleDelete = async (id: string) => {
  let index = dataCategory.value.list.findIndex((list) => list.id == id);
  let targetList = dataCategory.value.list[index];
  await deleteNote(route.params.id.toString(), targetList);
  getData();
};
const handleDeleteCategory = async () => {
  await deleteCategory(route.params.id.toString());
  router.push("/");
};
const handleMenu = () => {
  click.value = !click.value;
};
onMounted(() => {
  getData();
});
</script>
<template>
  <div class="relative w-screen min-h-screen">
    <div class="h-72 p-4">
      <div class="flex justify-between mb-8">
        <img @click="router.go(-1)" class="cursor-pointer" :src="back" alt="back" />
        <img @click="handleMenu" :src="more" alt="more" />
        <div v-if="click" class="absolute top-10 left-1/2 w-2/5 bg-white">
          <p @click="handleDeleteCategory" class="p-2 border-b">Delete</p>
        </div>
      </div>
      <div class="flex flex-col justify-center gap-4">
        <div class="w-14 h-14 p-2 bg-white rounded-full">
          <img class="h-sizeImg w-sizeImg" :src="identyImg[dataCategory.image]" alt="note" />
        </div>
        <div>
          <p class="text-3xl font-bold text-black">{{ dataCategory.name }}</p>
          <p class="text-black">{{ dataCategory.list.length }} Task</p>
        </div>
      </div>
    </div>
    <div class="w-full min-h-screen bg-white rounded-3xl absolute top-64 p-4">
      <div v-for="data in dataCategory.list" :key="data.id" class="w-full p-6 border-b-2 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div v-if="data.status" @click="handleStatus(data.id)" class="w-4 h-4 border bg-BrightBlue rounded-full"></div>
          <div v-if="data.status == false" @click="handleStatus(data.id)" class="w-4 h-4 border border-black rounded-full"></div>

          <p v-if="data.status" class="line-through">{{ data.teks }}</p>
          <p v-if="data.status == false" @click="router.push(`/create-note/${route.params.id}?idNote=${data.id}`)">{{ data.teks }}</p>
        </div>
        <div @click="handleDelete(data.id)" class="w-4 h-4 cursor-pointer">
          <img :src="deleteSym" alt="del" />
        </div>
      </div>
    </div>
    <div @click="router.push(`/create-note/${route.params.id}`)" class="fixed w-20 h-20 rounded-full top-floatButton left-72 cursor-pointer bg-VeryLightGrayishBlue flex justify-center items-center"><p class="text-black text-3xl">+</p></div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
../store/firestore
