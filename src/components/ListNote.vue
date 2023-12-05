<script setup lang="ts">
import { ref } from "vue";
import back from "../assets/back.svg";
import more from "../assets/more.svg";
import note from "../assets/note.svg";
import deleteSym from "../assets/icon-cross.svg";
import { useRouter } from "vue-router";
import CreateNote from "./CreateNote.vue";

const router = useRouter();
const check = ref(false);
const checkHandle = () => {
  check.value = !check.value;
};
type Text = {
  id: number;
  teks: string;
  status: boolean;
};
const dataInput = ref<Text[]>([]);

const myFilter = (cb: (item: Text) => boolean): Text[] => {
  let arr: Text[] = [];
  for (let i = 0; i < dataInput.value.length; i++) {
    if (cb(dataInput.value[i])) {
      arr.push(dataInput.value[i]);
    }
  }
  return arr;
};
const handleStatus = (id: number) => {
  dataInput.value[id] = { ...dataInput.value[id], status: !dataInput.value[id].status };
};
const handleDelete = (id: number) => {
  dataInput.value = myFilter((val) => val.id != id);
};
const handleSubmit = (i: string) => {
  dataInput.value.push({
    id: dataInput.value.length,
    teks: i,
    status: false,
  });
};
// defineProps<{ msg: string }>();

// const count = ref(0);
</script>
<template>
  <div v-if="check == true">
    <CreateNote @check="checkHandle" @submit="handleSubmit" />
  </div>
  <div v-if="check == false" class="relative w-screen min-h-screen">
    <div class="h-72 p-4">
      <div class="flex justify-between mb-8">
        <img @click="router.go(-1)" class="cursor-pointer" :src="back" alt="back" />
        <img :src="more" alt="more" />
      </div>
      <div class="flex flex-col justify-center gap-4">
        <div class="w-14 h-14 p-2 bg-white rounded-full">
          <img style="width: 40px; height: 40px" :src="note" alt="note" />
        </div>
        <div>
          <p class="text-3xl font-bold text-black">All</p>
          <p class="text-black">23 Task</p>
        </div>
      </div>
    </div>
    <div class="w-full min-h-screen bg-white rounded-3xl absolute top-64 p-4">
      <div v-for="data in dataInput" :key="data.id" class="w-full p-6 border-b-2 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div v-if="data.status" @click="handleStatus(data.id)" class="w-4 h-4 border bg-BrightBlue rounded-full"></div>
          <div v-if="data.status == false" @click="handleStatus(data.id)" class="w-4 h-4 border border-black rounded-full"></div>

          <p v-if="data.status" class="line-through">{{ data.teks }}</p>
          <p v-if="data.status == false">{{ data.teks }}</p>
        </div>
        <div @click="handleDelete(data.id)" class="w-4 h-4 cursor-pointer">
          <img :src="deleteSym" alt="del" />
        </div>
      </div>
    </div>
    <div @click="checkHandle" class="fixed w-20 h-20 rounded-full top-96 left-72 cursor-pointer bg-VeryLightGrayishBlue flex justify-center items-center"><p class="text-black text-3xl">+</p></div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
