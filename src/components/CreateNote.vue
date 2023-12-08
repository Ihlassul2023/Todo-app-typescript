<script setup lang="ts">
import back from "../assets/back.svg";
import { ref, onMounted } from "vue";
import { createNote, changeNote, getCategory, Category, Text } from "../store/repository";
import { useRouter, useRoute } from "vue-router";
import { v4 as uuidv4 } from "uuid";

const text = ref<string | undefined>("");
const dataInput = ref<Text>({
  id: "",
  teks: "",
  status: false,
});
const dataCategory = ref<Category>({
  id: "",
  image: "",
  name: "",
  list: [],
});
const getData = async (): Promise<void> => {
  dataCategory.value = await getCategory(route.params.id.toString());
  text.value = dataCategory.value.list.find((note) => note.id == route.query.idNote)?.teks;
};
onMounted(() => {
  getData();
});
const router = useRouter();
const route = useRoute();
const id = route.params.id;
const handleSubmit = async () => {
  dataInput.value = {
    id: uuidv4(),
    teks: text.value,
    status: false,
  };
  await createNote(id.toString(), dataInput.value);
  router.go(-1);
};
const handleEdit = async () => {
  let index = dataCategory.value.list.findIndex((list) => list.id == route.query.idNote);
  let targetList = dataCategory.value.list[index];
  dataCategory.value.list[index] = { ...targetList, teks: text.value };
  await changeNote(id.toString(), targetList, dataCategory.value.list[index]);
  router.go(-1);
};
</script>

<template>
  <div class="w-screen h-screen absolute p-4 z-10">
    <div class="flex justify-between items-center w-2/4">
      <div @click="router.go(-1)" class="w-4 h-4 cursor-pointer">
        <img :src="back" alt="del" />
      </div>
      <p v-if="$route.query.idNote" class="text-lg">Edit Task</p>
      <p v-else class="text-lg">New Task</p>
    </div>
    <div class="mt-16 mb-8">
      <span>What are you planning ?</span>
      <input v-model="text" class="p-4 pb-12 border-b border-black w-full bg-VeryLightGrayishBlue" placeholder="Text Here" type="text" autofocus />
    </div>
    <div class="flex justify-center">
      <button v-if="$route.query.idNote" @click="handleEdit" class="bg-white p-4 border rounded-lg w-2/4">Edit</button>
      <button v-else @click="handleSubmit" class="bg-white p-4 border rounded-lg w-2/4">Create</button>
    </div>
  </div>
</template>

<style scoped></style>
