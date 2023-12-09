<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import deleteSym from "../assets/icon-cross.svg";
import { getAllCategory } from "../store/repository";
import { book, work, note, music, travel, home, desc } from "../assets";
import { Category } from "../store/repository";

const identyImg: any = {
  work,
  music,
  travel,
  book,
  home,
  desc,
  note,
};

const click = ref(false);
let listCategory = ref<Category[]>([]);
const router = useRouter();
const handleSideBar = () => {
  click.value = !click.value;
};
const getData = async () => {
  listCategory.value = await getAllCategory();
};
onMounted(() => {
  getData();
});
</script>
<template>
  <div class="relative">
    <div v-if="click" class="absolute z-10 h-screen bg-white sidebar w-52 p-4 flex flex-col gap-4">
      <div @click="handleSideBar" class="flex justify-end">
        <img :src="deleteSym" alt="delete" />
      </div>
      <div class="flex flex-col gap-3">
        <p class="border-b-2">Menu</p>
        <p class="border-b-2">Logout</p>
      </div>
    </div>
    <div class="p-4 min-h-screen">
      <div @click="handleSideBar" class="w-5 h-5 flex flex-col gap-1 mb-8">
        <span class="w-full h-1 bg-black"></span>
        <span class="w-full h-1 bg-black"></span>
        <span class="w-2/4 h-1 bg-black"></span>
      </div>
      <p class="text-black text-2xl font-bold">Lists</p>
      <Transition>
        <div class="relative flex flex-wrap mt-4 gap-4 md:flex-row">
          <div v-for="category in listCategory" @click="router.push(`/list-note/${category.id}`)" class="flex flex-col justify-center gap-3 cursor-pointer w-2/5 md:w-32 h-32 border rounded-lg bg-white p-2">
            <img class="h-sizeImg w-sizeImg" :src="identyImg[category.image]" alt="note" />
            <div>
              <p class="text-xl">{{ category.name }}</p>
              <p class="text-sm">{{ category.list.length }} Task</p>
            </div>
          </div>
          <div @click="router.push('/add-category')" class="fixed w-20 h-20 rounded-full top-floatButton left-72 cursor-pointer bg-white flex justify-center items-center"><p class="text-black text-3xl">+</p></div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
../store/repository
