<script setup lang="ts">
// import background from "./assets/bg-desktop-light.jpg";
// import deleteSym from "./assets/icon-cross.svg";
// import { ref } from "vue";
import { RouterView } from "vue-router";

// type Text = {
//   id: number;
//   teks: string;
//   status: boolean;
// };
// const text = ref<string>("");
// const dataInput = ref<Text[]>([]);

// const myFilter = (cb: (item: Text) => boolean): Text[] => {
//   let arr: Text[] = [];
//   for (let i = 0; i < dataInput.value.length; i++) {
//     if (cb(dataInput.value[i])) {
//       arr.push(dataInput.value[i]);
//     }
//   }
//   return arr;
// };
// const handleStatus = (id: number) => {
//   dataInput.value[id] = { ...dataInput.value[id], status: !dataInput.value[id].status };
// };
// const handleDelete = (id: number) => {
//   dataInput.value = myFilter((val) => val.id != id);
// };
// const handleSubmit = () => {
//   dataInput.value.push({
//     id: dataInput.value.length,
//     teks: text.value,
//     status: false,
//   });
// };
</script>

<template>
  <RouterView> </RouterView>
  <!-- <div class="min-h-screen w-screen relative flex justify-center">
    <div>
      <img :src="background" alt="bg" />
    </div>
    <div class="absolute w-2/4 flex top-24 flex-col">
      <p class="text-4xl font-black text-white mb-8">TODO</p>
      <p class="text-white">{{ new Date().toLocaleDateString() }}</p>
      <div class="flex flex-col">
        <div class="flex gap-2 mb-2">
          <input v-model="text" name="text" type="text" placeholder="Currently Typing" class="w-full rounded-md bg-white p-2 text-black" />
          <button @click="handleSubmit" class="p-2 bg-LightGrayishBlue w-2/4 rounded-md">Add</button>
        </div>
        <div class="w-full rounded-md bg-white min-h-heightMin shadow-2xl">
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
      </div>
    </div>
  </div> -->
</template>

<style scoped></style>
