<template>
  <v-container fluid class="d-flex justify-center align-center bg-light-blue-darken-4" style="height: 100vh;">
    <v-sheet rounded>
      <v-card elevation="10" class="mx-auto px-6 py-8" width="350">
        <h3 class="text-subtitle-2 mb-4">Seja Bem vindo, preencha os campos abaixo para aceder a sua conta.</h3>
        <v-form @submit.prevent="login()">

          <v-text-field
            v-model="user.email"
            prepend-inner-icon="mdi-email-outline"
            class="mb-2"
            label="Seu Email"
            clearable
            placeholder="Digite o seu email"
            variant="underlined"
            color="primary"
            density="compact"
          ></v-text-field>

          <v-text-field
            v-model="user.password"
             prepend-inner-icon="mdi-lock-outline"
            label="Palavra passe"
            placeholder="Digite a sua palavra passe"
            variant="underlined"
            color="primary"
            density="compact"
            clearable
          ></v-text-field>
          <br>
          <v-btn
            color="success"
            size="large"
            type="submit"
            variant="flat"
            density="compact"
            block
          >
            Entrar
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script setup>
import https from '@/services/https.js';
import { reactive } from "vue";
import { useAuth } from '@/stores/auth.js'
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuth();
const user = reactive({
  email: 'filipe@gmail.com',
  password: '0043sdjasd'
})

  async function login(){
    try {
      const { data } = await https.post('/auth/login', user);
      console.log(data);
      auth.setToken(data.access_token);
      auth.setUser(data.user)

      router.push({ name: 'processos' });
    } catch (error) {
      console.log(error?.response?.data);
    }
  }
</script>
