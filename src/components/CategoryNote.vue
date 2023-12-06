<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import note from "../assets/note.svg";
import work from "../assets/work.svg";
import music from "../assets/music.svg";
import travel from "../assets/travel.svg";
import book from "../assets/book.svg";
import home from "../assets/home.svg";
import desc from "../assets/desc.svg";
import deleteSym from "../assets/icon-cross.svg";
import CreateCategory from "./CreateCategory.vue";

type Category = {
  name: string;
};

const click = ref(false);
const check = ref(false);
const listCategory = ref<Category[]>([]);
const router = useRouter();
const checkHandle = () => {
  check.value = !check.value;
};
const handleSideBar = () => {
  click.value = !click.value;
};
const handleSubmit = (text: string) => {
  listCategory.value.push({
    name: text,
  });
  checkHandle();
};
</script>

<template>
  <div v-if="check == true">
    <CreateCategory @check="checkHandle" @submit="handleSubmit" />
  </div>
  <div v-if="check == false" class="relative">
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
      <div class="relative flex flex-wrap mt-4 gap-4 md:flex-row">
        <div @click="router.push('/list-note?name=All&img=note')" class="flex flex-col justify-center gap-3 cursor-pointer w-2/5 md:w-32 h-32 border rounded-lg bg-white p-2">
          <img class="h-sizeImg w-sizeImg" :src="note" alt="note" />
          <div>
            <p class="text-xl">All</p>
            <p class="text-sm">23 Task</p>
          </div>
        </div>
        <div @click="router.push('/list-note?name=Work&img=work')" class="flex flex-col justify-center gap-3 cursor-pointer w-2/5 md:w-32 h-32 border rounded-lg bg-white p-2">
          <img class="h-sizeImg w-sizeImg" :src="work" alt="note" />
          <div>
            <p class="text-xl">Work</p>
            <p class="text-sm">14 Task</p>
          </div>
        </div>
        <div @click="router.push('/list-note?name=Music&img=music')" class="flex flex-col justify-center gap-3 cursor-pointer w-2/5 md:w-32 h-32 border rounded-lg bg-white p-2">
          <img class="h-sizeImg w-sizeImg" :src="music" alt="note" />
          <div>
            <p class="text-xl">Music</p>
            <p class="text-sm">6 Task</p>
          </div>
        </div>
        <div @click="router.push('/list-note?name=Travel&img=travel')" class="flex flex-col justify-center gap-3 cursor-pointer w-2/5 md:w-32 h-32 border rounded-lg bg-white p-2">
          <img class="h-sizeImg w-sizeImg" :src="travel" alt="note" />
          <div>
            <p class="text-xl">Travel</p>
            <p class="text-sm">1 Task</p>
          </div>
        </div>
        <div @click="router.push('/list-note?name=Study&img=book')" class="flex flex-col justify-center gap-3 cursor-pointer w-2/5 md:w-32 h-32 border rounded-lg bg-white p-2">
          <img class="h-sizeImg w-sizeImg" :src="book" alt="note" />
          <div>
            <p class="text-xl">Study</p>
            <p class="text-sm">2 Task</p>
          </div>
        </div>
        <div @click="router.push('/list-note?name=Home&img=home')" class="flex flex-col justify-center gap-3 cursor-pointer w-2/5 md:w-32 h-32 border rounded-lg bg-white p-2">
          <img class="h-sizeImg w-sizeImg" :src="home" alt="note" />
          <div>
            <p class="text-xl">Home</p>
            <p class="text-sm">14 Task</p>
          </div>
        </div>
        <div v-for="list in listCategory" @click="router.push(`/list-note?name=${list.name}&img=desc`)" class="flex flex-col justify-center gap-3 cursor-pointer w-2/5 md:w-32 h-32 border rounded-lg bg-white p-2">
          <img class="h-sizeImg w-sizeImg" :src="desc" alt="note" />
          <div>
            <p class="text-xl">{{ list.name }}</p>
            <p class="text-sm">1 Task</p>
          </div>
        </div>
        <div @click="checkHandle" class="fixed w-20 h-20 rounded-full top-floatButton left-72 cursor-pointer bg-white flex justify-center items-center"><p class="text-black text-3xl">+</p></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  transition: 2s;
}
</style>
