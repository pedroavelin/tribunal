<template>
  <v-footer elevation="16" v-if="route.name !== '/'" height="40" app color="light-blue-darken-4">
    <v-badge dot color="success">
      <v-icon icon="mdi-account" class="mx-1"></v-icon>
    </v-badge>

    <router-link to="/perfil" class="text-decoration-none mx-3 text-white" href="#!" rel="noopener noreferrer">
      <span v-if="auth.isAuthenticated()">
        <p> {{ auth.fullName }}</p>
      </span>
      </router-link>
    <div
      class="text-caption text-disabled text-white" style="position: absolute; right: 16px;">
      {{ (new Date()).getFullYear() }}
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
