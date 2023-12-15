<script setup lang="ts">
import back from "../assets/back.svg";
import { ref, onMounted } from "vue";
import { createNote, changeNote, getCategory, getAllCategory, Category, Text, deleteNote } from "../store/repository";
import { notif, addNote, tags, category } from "../assets";
import deleteSym from "../assets/icon-cross.svg";
import { useRouter, useRoute } from "vue-router";
import { v4 as uuidv4 } from "uuid";
const text = ref<string | undefined>("");
const dataInput = ref<Text>({
  id: "",
  teks: "",
  postscript: "",
  remind_date: "",
  status: false,
  category: "",
  category_id: "",
  tag: [],
  userId: "",
});
const dataCategory = ref<Category>({
  id: "",
  image: "",
  name: "",
  list: [],
  userId: "",
});
const idNameCategory = ref({
  id: "",
  name: "",
});
const router = useRouter();
const route = useRoute();
const handleTags = ref<string[]>([]);
const handleInputTags = ref("");
const dataAllCategory = ref<Category[]>([]);
const id = route.params.id;
const showSelect = ref(false);
const showTags = ref(false);
const t = ref();
const getData = async (): Promise<void> => {
  dataCategory.value = await getCategory(route.params.id.toString());
  text.value = dataCategory.value.list.find((note) => note.id == route.query.idNote)?.teks;
  t.value = dataCategory.value.list.find((note) => note.id == route.query.idNote)?.remind_date;
  handleTags.value = dataCategory.value.list.find((note) => note.id == route.query.idNote)?.tag ?? [];
};
const getAllDataCategory = async () => {
  dataAllCategory.value = await getAllCategory();
  dataAllCategory.value = dataAllCategory.value.filter((item) => (item?.userId ? item.userId == localStorage.getItem("idUser") : item));
};
onMounted(() => {
  getAllDataCategory();
  getData();
});
const handleSubmit = async () => {
  dataInput.value = {
    id: uuidv4(),
    teks: text.value,
    postscript: "",
    remind_date: new Date().toLocaleString(),
    status: false,
    category: idNameCategory.value.name || dataCategory.value.name,
    category_id: idNameCategory.value.id || dataCategory.value.id,
    tag: handleTags.value,
    userId: localStorage.getItem("idUser") ?? "",
  };
  if (idNameCategory.value.id) {
    await createNote(idNameCategory.value.id, dataInput.value);
    router.go(-1);
    return;
  }
  await createNote(id.toString(), dataInput.value);
  router.go(-1);
};
const handleEdit = async () => {
  let index = dataCategory.value.list.findIndex((list) => list.id == route.query.idNote);
  let targetList = dataCategory.value.list[index];
  console.log(targetList);
  dataCategory.value.list[index] = { ...targetList, teks: text.value, category: idNameCategory.value.name || targetList.category, category_id: idNameCategory.value.id || targetList.category_id, tag: handleTags.value };
  await changeNote(id.toString(), targetList, dataCategory.value.list[index]);
  if (idNameCategory.value.id && idNameCategory.value.id != id) {
    await deleteNote(id.toString(), dataCategory.value.list[index]);
    await createNote(idNameCategory.value.id.toString(), dataCategory.value.list[index]);
    router.push("/");
    return;
  }
  router.go(-1);
};
const selectCategory = (idSelect: string, name: string) => {
  idNameCategory.value = {
    id: idSelect,
    name,
  };
  showSelect.value = !showSelect.value;
};
const handleRemoveTag = (index: string) => {
  handleTags.value = handleTags.value.filter((tag) => tag != index);
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
    <div class="flex flex-col gap-4 mb-4">
      <div v-if="route.query.idNote" class="flex items-center gap-3">
        <img :src="notif" alt="notif" />
        <p v-if="$route.query.idNote">{{ t }}</p>
      </div>
      <div v-if="route.query.idNote" class="flex items-center gap-3 border-b">
        <img :src="addNote" alt="notif" />
        <div class="flex flex-col">
          <p @click="router.push(`/create-postscript/${id}?idNote=${route.query.idNote}`)">Add Note</p>
          <p class="text-xs" @click="router.push(`/create-postscript/${id}?idNote=${route.query.idNote}`)" v-if="dataCategory.list.find((note) => note.id == route.query.idNote)?.postscript">
            {{ dataCategory.list.find((note) => note.id == route.query.idNote)?.postscript?.slice(0, 20) }}....
          </p>
        </div>
      </div>
      <div v-if="$route.query.idNote || id" class="relative flex items-center gap-3">
        <img :src="category" alt="notif" />
        <div>
          <p @click="showSelect = !showSelect">Category</p>
          <p class="text-xs" @click="showSelect = !showSelect">{{ idNameCategory.name || dataCategory.name }}</p>
        </div>
        <div class="w-1/2 z-10 shadow-lg rounded-md top-full bg-white flex flex-col absolute p-3" v-if="showSelect">
          <p v-for="category in dataAllCategory" @click="selectCategory(category.id, category.name)">{{ category.name }}</p>
        </div>
      </div>
      <div class="relative flex items-center gap-3">
        <div>
          <p v-if="!$route.query.idNote && id" @click="showTags = !showTags">Add Tags</p>
          <p v-else>Tags</p>
          <div class="flex flex-wrap gap-3 mt-4">
            <div class="flex items-center gap-1" v-for="tag in handleTags">
              <img class="w-4 h-4" :src="tags" alt="notif" />
              <p class="text-xs" v-if="!$route.query.idNote && id" @click="showTags = !showTags">{{ tag }}</p>
              <p class="text-xs" v-else>{{ tag }}</p>
              <img v-if="!$route.query.idNote && id" @click="handleRemoveTag(tag)" class="w-3 h-3 ml-3" :src="deleteSym" alt="delete" />
            </div>
          </div>
        </div>
        <div class="w-1/2 shadow-lg rounded-md top-full bg-white flex flex-col gap-4 absolute p-3" v-if="showTags">
          <input placeholder="Add here" type="text" v-model="handleInputTags" />
          <button @click="handleTags.push(handleInputTags)" class="p-3 bg-VeryLightGrayishBlue w-full rounded-lg shadow-lg">Add</button>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-8">
      <button v-if="$route.query.idNote" @click="handleEdit" class="bg-white p-4 border rounded-lg w-2/4">Edit</button>
      <button v-else @click="handleSubmit" class="bg-white p-4 border rounded-lg w-2/4">Create</button>
    </div>
  </div>
</template>
