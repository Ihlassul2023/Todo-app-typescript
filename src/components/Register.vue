<script setup lang="ts">
import { auth, createUserWithEmailAndPassword } from "../store/firestore";
import { email, open, hide, password } from "../assets";
import { ref } from "vue";

const visibility = ref(false);
const emailInput = ref("");
const passwordInput = ref("");
const handleSubmit = (e: any) => {
  e.preventDefault();
  createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`user ${user.email} success create account`);
    })
    .catch((error: any) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
};
</script>
<template>
  <div class="h-screen flex items-center justify-center">
    <div class="w-3/4 bg-white p-4 rounded-lg shadow-lg">
      <p class="text-3xl mb-8 text-center">REGISTER</p>
      <p class="mb-4">Create Your Account</p>
      <form @submit="handleSubmit">
        <div class="flex flex-col gap-1 mb-4">
          <label for="">Email</label>
          <div class="relative">
            <img class="absolute top-1/4 left-0" :src="email" alt="email" />
            <input class="py-3 pl-8 border-b w-full" v-model="emailInput" placeholder="Email" type="email" />
          </div>
        </div>
        <div class="flex flex-col gap-1 mb-4">
          <label for="">Password</label>
          <div class="relative">
            <img class="absolute top-1/4 left-0" :src="password" alt="password" />
            <img @click="visibility = !visibility" v-if="visibility" class="absolute top-1/4 right-0" :src="open" alt="visibility" />
            <img @click="visibility = !visibility" v-else class="absolute top-1/4 right-0" :src="hide" alt="visibility" />
            <input v-if="visibility" class="py-3 pl-8 border-b w-full" v-model="passwordInput" type="text" placeholder="Password" />
            <input v-else class="py-3 pl-8 border-b w-full" v-model="passwordInput" type="password" placeholder="Password" />
          </div>
        </div>
        <button class="bg-VeryLightGrayishBlue mt-4 p-4 w-full rounded-lg shadow-sm text-center">REGISTER</button>
      </form>
    </div>
  </div>
</template>
<style scoped></style>
