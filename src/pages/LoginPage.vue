<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-sheet rounded>
      <v-card elevation="10" class="mx-auto px-6 py-8" width="350">
        <v-form @submit.prevent="login()">

          <v-text-field
            v-model="user.email"
            class="mb-2"
            label="Seu Email"
            clearable
            placeholder="Digite o seu email"
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            label="Palavra passe"
            placeholder="Digite a sua palavra passe"
            clearable
          ></v-text-field>
<br>
          <v-btn
            color="success"
            size="large"
            type="submit"
            variant="flat"
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
