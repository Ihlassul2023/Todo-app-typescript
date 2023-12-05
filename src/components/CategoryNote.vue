<script setup lang="ts">
import { useRouter } from "vue-router";
import note from "../assets/note.svg";
import work from "../assets/work.svg";
import music from "../assets/music.svg";
import travel from "../assets/travel.svg";
import book from "../assets/book.svg";
import home from "../assets/home.svg";

const router = useRouter();
</script>

<template>
  <div class="p-4">
    <div class="w-5 h-5 flex flex-col gap-1 mb-8">
      <span class="w-full h-1 bg-black"></span>
      <span class="w-full h-1 bg-black"></span>
      <span class="w-2/4 h-1 bg-black"></span>
    </div>
    <p class="text-black text-2xl font-bold">Lists</p>
    <div class="flex flex-col md:flex-row md:gap-4">
      <div class="flex gap-4">
        <div @click="router.push('/list-note')" class="flex flex-col justify-center gap-3 cursor-pointer w-2/4 md:w-32 h-32 border rounded-lg mt-4 bg-white p-2">
          <img style="width: 40px; height: 40px" :src="note" alt="note" />
          <div>
            <p class="text-xl">All</p>
            <p class="text-sm">23 Task</p>
          </div>
        </div>
        <div class="flex flex-col justify-center gap-3 cursor-pointer w-2/4 md:w-32 h-32 border rounded-lg mt-4 bg-white p-2">
          <img style="width: 40px; height: 40px" :src="work" alt="note" />
          <div>
            <p class="text-xl">Work</p>
            <p class="text-sm">14 Task</p>
          </div>
        </div>
      </div>
      <div class="flex gap-4">
        <div class="flex flex-col justify-center gap-3 cursor-pointer w-2/4 md:w-32 h-32 border rounded-lg mt-4 bg-white p-2">
          <img style="width: 40px; height: 40px" :src="music" alt="note" />
          <div>
            <p class="text-xl">Music</p>
            <p class="text-sm">6 Task</p>
          </div>
        </div>
        <div class="flex flex-col justify-center gap-3 cursor-pointer w-2/4 md:w-32 h-32 border rounded-lg mt-4 bg-white p-2">
          <img style="width: 40px; height: 40px" :src="travel" alt="note" />
          <div>
            <p class="text-xl">Travel</p>
            <p class="text-sm">1 Task</p>
          </div>
        </div>
      </div>
      <div class="flex gap-4">
        <div class="flex flex-col justify-center gap-3 cursor-pointer w-2/4 md:w-32 h-32 border rounded-lg mt-4 bg-white p-2">
          <img style="width: 40px; height: 40px" :src="book" alt="note" />
          <div>
            <p class="text-xl">Study</p>
            <p class="text-sm">2 Task</p>
          </div>
        </div>
        <div class="flex flex-col justify-center gap-3 cursor-pointer w-2/4 md:w-32 h-32 border rounded-lg mt-4 bg-white p-2">
          <img style="width: 40px; height: 40px" :src="home" alt="note" />
          <div>
            <p class="text-xl">Home</p>
            <p class="text-sm">14 Task</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
