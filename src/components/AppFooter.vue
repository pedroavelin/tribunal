<template>
  <v-footer elevation="16" v-if="route.name !== '/'" height="40" app class="bg-gradient">
    <v-badge dot color="success">
      <v-icon icon="mdi-account" class="mx-1"></v-icon>
    </v-badge>

    <router-link to="/perfil" class="text-decoration-none mx-3 text-white" href="#!" rel="noopener noreferrer">
      <span v-if="auth.isAuthenticated()">
        <p>Utilizador: {{ auth.fullName }}</p>
      </span>
      </router-link>
    <div
      class="text-caption text-disabled" style="position: absolute; right: 16px;">
      <span class="text-white">&copy; 2024-{{ (new Date()).getFullYear() }}</span> <span class="d-none d-sm-inline-block text-white">15ª - Cacuaco</span>
      —
      <a
        class="text-decoration-none on-surfaces"
        href="#!"
        rel="noopener noreferrer"
        target="_blank"
      >
        Documentação
      </a>
    </div>
  </v-footer>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { useAuth } from '@/stores/auth.js'
import { onMounted } from 'vue';

const auth = useAuth();
const route = useRoute();

onMounted(async () => {
  await auth.getUserDetails();
});
</script>
