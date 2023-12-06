<script setup lang="ts">
import { ref } from "vue";
import back from "../assets/back.svg";
import more from "../assets/more.svg";
import note from "../assets/note.svg";
import work from "../assets/work.svg";
import music from "../assets/music.svg";
import travel from "../assets/travel.svg";
import book from "../assets/book.svg";
import home from "../assets/home.svg";
import desc from "../assets/desc.svg";
import deleteSym from "../assets/icon-cross.svg";
import { useRouter, useRoute } from "vue-router";
import CreateNote from "./CreateNote.vue";

const router = useRouter();
const check = ref(false);
const route = useRoute();
type Text = {
  id: number;
  teks: string;
  status: boolean;
};
type IdentyImg = {
  work: string;
  music: string;
  travel: string;
  book: string;
  home: string;
  desc: string;
  note: string;
};
const identyImg: IdentyImg = {
  work,
  music,
  travel,
  book,
  home,
  desc,
  note,
};
type UpdateNote = {
  id: number;
  teks: string;
};
const dataInput = ref<Text[]>([]);
const textUpdate = ref<UpdateNote>({
  id: 0,
  teks: "",
});
const myFilter = (cb: (item: Text) => boolean): Text[] => {
  let arr: Text[] = [];
  for (let i = 0; i < dataInput.value.length; i++) {
    if (cb(dataInput.value[i])) {
      arr.push(dataInput.value[i]);
    }
  }
  return arr;
};
const checkHandle = () => {
  check.value = !check.value;
  textUpdate.value = {
    id: 0,
    teks: "",
  };
};
const handleStatus = (id: number) => {
  dataInput.value[id - 1] = { ...dataInput.value[id - 1], status: !dataInput.value[id - 1].status };
};
const handleDelete = (id: number) => {
  dataInput.value = myFilter((val) => val.id != id);
};
const handleSubmit = (i: string) => {
  dataInput.value.push({
    id: dataInput.value.length + 1,
    teks: i,
    status: false,
  });
  checkHandle();
};
const handleEditInput = (id: number, text: string) => {
  textUpdate.value = {
    id,
    teks: text,
  };
  check.value = !check.value;
};
const handleEditSubmit = (id: number, text: string) => {
  dataInput.value[id - 1] = { ...dataInput.value[id - 1], teks: text };
  checkHandle();
};
</script>
<template>
  <div v-if="check == true">
    <CreateNote @check="checkHandle" @submit="handleSubmit" @edit="handleEditSubmit" :datafromParent="textUpdate" />
  </div>
  <div v-if="check == false" class="relative w-screen min-h-screen">
    <div class="h-72 p-4">
      <div class="flex justify-between mb-8">
        <img @click="router.go(-1)" class="cursor-pointer" :src="back" alt="back" />
        <img :src="more" alt="more" />
      </div>
      <div class="flex flex-col justify-center gap-4">
        <div class="w-14 h-14 p-2 bg-white rounded-full">
          <img class="h-sizeImg w-sizeImg" :src="identyImg[route.query.img]" alt="note" />
        </div>
        <div>
          <p class="text-3xl font-bold text-black">{{ route.query.name }}</p>
          <p class="text-black">{{ dataInput.length }} Task</p>
        </div>
      </div>
    </div>
    <div class="w-full min-h-screen bg-white rounded-3xl absolute top-64 p-4">
      <div v-for="data in dataInput" :key="data.id" class="w-full p-6 border-b-2 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div v-if="data.status" @click="handleStatus(data.id)" class="w-4 h-4 border bg-BrightBlue rounded-full"></div>
          <div v-if="data.status == false" @click="handleStatus(data.id)" class="w-4 h-4 border border-black rounded-full"></div>

          <p v-if="data.status" class="line-through">{{ data.teks }}</p>
          <p v-if="data.status == false" @click="handleEditInput(data.id, data.teks)">{{ data.teks }}</p>
        </div>
        <div @click="handleDelete(data.id)" class="w-4 h-4 cursor-pointer">
          <img :src="deleteSym" alt="del" />
        </div>
      </div>
    </div>
    <div @click="checkHandle" class="fixed w-20 h-20 rounded-full top-floatButton left-72 cursor-pointer bg-VeryLightGrayishBlue flex justify-center items-center"><p class="text-black text-3xl">+</p></div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
