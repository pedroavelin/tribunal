<template>
  <v-footer elevation="16" v-if="route.name !== '/'" height="40" app color="light-blue-darken-4">
    <v-badge dot color="success">
      <v-icon icon="mdi-account" class="mx-1"></v-icon>
    </v-badge>

    <v-menu ref="menu" transition="scale-transition" v-model="menuOpen">
      <template v-slot:activator="{ props }">
          <span v-bind="props" class="text-decoration-none mx-3 text-white">
            <p @click="closeMenu">{{ auth.fullName }}</p>
          </span>
      </template>

      <v-list>
        <v-list-item @click="goToPerfil">
          <v-list-item-title class="text-caption">Meu Perfil</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-title class="text-caption">Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>


    <div class="text-caption text-disabled" style="position: absolute; right: 16px;">
      <div class="text-white">{{ (new Date()).getFullYear() }}</div>
    </div>
  </v-footer>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { useAuth } from '@/stores/auth.js'
import { onMounted, ref } from 'vue';

const auth = useAuth();
const route = useRoute();
const menuOpen = ref(false);

onMounted(async () => {
  await auth.getUserDetails();
});

const closeMenu = () => {
  menuOpen.value = false;
};
const goToPerfil = () => {
  router.push('/perfil');
  closeMenu();
};

const logout = (route) => {
  router.push('/login');
  closeMenu();
};
</script>
