<script setup lang="ts">
import { ref, onMounted } from "vue";
import back from "../assets/back.svg";
import more from "../assets/more.svg";
import { book, work, note, music, travel, home, desc, tags } from "../assets/index";
import deleteSym from "../assets/icon-cross.svg";
import { useRouter, useRoute } from "vue-router";
import { getAllCategory, Category, changeNote, deleteNote, deleteCategory, Text } from "../store/repository";

const router = useRouter();
const route = useRoute();

const identyImg: Record<string, string> = {
  work,
  music,
  travel,
  book,
  home,
  desc,
  note,
};
const category = ref<Category[]>([]);
let dataCategory = ref<Text[]>([]);
const inputText = ref("");
const click = ref(false);
const getData = async () => {
  category.value = await getAllCategory();
  for (let i = 0; i < category.value.length; i++) {
    for (let j = 0; j < category.value[i].list.length; j++) {
      dataCategory.value.push(category.value[i].list[j]);
    }
  }
  dataCategory.value = dataCategory.value.filter((item) => (item?.userId ? item.userId == localStorage.getItem("idUser") : item));
  const list = dataCategory.value.map((item) => {
    let t = new Date(item.remind_date);
    return { ...item, remind_date: t };
  });
  list.sort((a: any, b: any) => b.remind_date - a.remind_date);
  let listAfter = list.map((item: any) => {
    return { ...item, remind_date: item.remind_date.toLocaleString() };
  });
  dataCategory.value = listAfter;
  console.log(dataCategory.value);
};
const handleStatus = async (id: string) => {
  let index = dataCategory.value.findIndex((list) => list.id == id);
  let targetList = dataCategory.value[index];
  dataCategory.value[index] = { ...targetList, status: !targetList.status };
  await changeNote(dataCategory.value[index].category_id, targetList, dataCategory.value[index]);
};
const handleDelete = async (id: string) => {
  let index = dataCategory.value.findIndex((list) => list.id == id);
  let targetList = dataCategory.value[index];
  console.log(targetList);

  await deleteNote(dataCategory.value[index].category_id, targetList);
  dataCategory.value = [];
  getData();
};
const handleDeleteCategory = async () => {
  await deleteCategory(route.params.id.toString());
  router.push("/");
};
const handleMenu = () => {
  click.value = !click.value;
};
const arr = ref<Text[]>(dataCategory.value);
const handleSearch = () => {
  if (inputText.value.length == 1) {
    dataCategory.value = [];
  } else if (inputText.value.length == 0) {
    getData();
  }
  dataCategory.value.push(...arr.value.filter((item) => item.tag.includes(inputText.value)));
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
        <img v-if="route.params.id != 'ypf3iKUQQXeBmZvV0fFi'" @click="handleMenu" :src="more" alt="more" />
        <div v-if="click" class="absolute top-10 left-1/2 w-2/5 bg-white">
          <p @click="router.push(`/add-category?id=${route.params.id}`)" class="p-2 border-b">Edit</p>
          <p @click="handleDeleteCategory" class="p-2 border-b">Delete</p>
        </div>
      </div>
      <div class="flex flex-col justify-center gap-4">
        <div class="w-14 h-14 p-2 bg-white rounded-full">
          <img class="h-sizeImg w-sizeImg" :src="identyImg['note']" alt="note" />
        </div>
        <div>
          <p class="text-3xl font-bold text-black">All Todos</p>
          <p class="text-black">{{ dataCategory.length }} Task</p>
        </div>
      </div>
    </div>
    <div class="w-full min-h-screen bg-white rounded-3xl absolute top-64 p-4">
      <input @input="handleSearch" class="bg-VeryLightGrayishBlue p-2 rounded-lg" placeholder="Search by Tag" v-model="inputText" type="text" />
      <div v-for="data in dataCategory" :key="data.id" class="w-full p-6 border-b-2 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div v-if="data.status" @click="handleStatus(data.id)" class="w-4 h-4 border bg-BrightBlue rounded-full"></div>
          <div v-if="data.status == false" @click="handleStatus(data.id)" class="w-4 h-4 border border-black rounded-full"></div>
          <div>
            <p v-if="data.status" class="line-through">{{ data.teks }}</p>
            <p v-if="data.status == false" @click="router.push(`/create-note/${data.category_id}?idNote=${data.id}`)">{{ data.teks }}</p>
            <div class="flex gap-3 items-center">
              <p class="p-1 rounded-sm bg-VeryLightGrayishBlue text-xs">{{ data.category }}</p>
              <img class="w-5 h-5" v-if="data.postscript" :src="desc" alt="desc" />
            </div>
            <div class="flex flex-wrap gap-2 items-center mt-3">
              <div v-for="allTag in data.tag" class="flex gap-1 items-center">
                <img class="w-4 h-4" :src="tags" alt="notif" />
                <p class="text-xs">{{ allTag }}</p>
              </div>
            </div>
          </div>
        </div>
        <div @click="handleDelete(data.id)" class="w-4 h-4 cursor-pointer">
          <img :src="deleteSym" alt="del" />
        </div>
      </div>
    </div>
    <div @click="router.push(`/create-note/${route.params.id}`)" class="fixed w-20 h-20 rounded-full top-floatButton left-72 cursor-pointer bg-VeryLightGrayishBlue flex justify-center items-center">
      <p class="text-black text-3xl">+</p>
    </div>
  </div>
</template>
