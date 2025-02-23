<template>
    <v-navigation-drawer v-model="drawerStore.drawer" temporary>
    <v-img src="https://picsum.photos/1920/1080?random" gradient="to top right, rgba(19,84,122,.90), rgba(128,208,199,.90)" height="80" cover class="pt-2">
      <v-list>
        <v-list-item
          prepend-avatar="https://media.licdn.com/dms/image/C4D03AQF7jP4O_1Dh1Q/profile-displayphoto-shrink_400_400/0/1630611358440?e=1718236800&v=beta&t=aQkK_GYU9_nrDrrO3Adzq2_E1YI0Tz7rngwdHLJG900"
          :subtitle="utilizadorStore.getEmail" :title="auth.fullName">
        </v-list-item>
      </v-list>
    </v-img>

    <v-divider></v-divider>

    <v-list :lines="false" density="compact" nav>
      <RouterLink v-for="(item, i) in items" :key="i" color="primary" :to="item.to">
        <v-list-item :value="item"  >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title :textContent="item.text">Liquidação de pena</v-list-item-title>
        </v-list-item>
      </RouterLink>

    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
// import { ref } from "vue";
import { useAuth } from '@/stores/auth.js'
import { onMounted } from 'vue';
// import AppBar from "@/components/AppBar.vue";
import { useDrawerStore } from '@/stores/useDrawerStore';
import { useUtilizadorStore } from '@/stores/utilizador';

const utilizadorStore = useUtilizadorStore();
const drawerStore = useDrawerStore();

// const modalAddProcesso = ref(false);
const auth = useAuth();

// const addProceso = () => {
//   modalAddProcesso.value = true;
// }

onMounted(async () => {
  await auth.getUserDetails();
  await utilizadorStore.detalhesUtilizador();
});

const items = [
  { text: "Secções", icon: "mdi-folder", to: "/seccoes" },
  { text: "Processos", icon: "mdi-folder", to: "/processo" },
  // { text: "Documentos", icon: "mdi-folder", to: "/documento" },
  // { text: "Auditoria", icon: "mdi-account-multiple", to: "/auditoria"},
  // { text: "Utilizadores", icon: "mdi-account-multiple", to: "/utilizador"},
  // { text: "Permissões", icon: "mdi-account-multiple", to: "/permissoes" },
  // { text: "Sobre", icon: "mdi-account-multiple", to: "/sobre"},
];
</script>
