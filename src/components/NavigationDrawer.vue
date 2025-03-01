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
      <Routerlink v-for="(item, i) in items" :key="i" >
        <v-list-item variant="flat" rounded="0" :value="item" color="primary" :to="item.to" >
          <template v-slot:prepend>
            <v-icon  :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title :textContent="item.text">Liquidação de pena</v-list-item-title>
        </v-list-item>
      </Routerlink>

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
  { text: "Tribunal", icon: "mdi-home-analytics", to: "/tribunal"},
  { text: "Secção", icon: "mdi-home-city", to: "/seccoes"},
  { text: "Processo", icon: "mdi-file-document", to: "/processo" },
  { text: "Documento", icon: "mdi-folder-open", to: "/documento" },
  { text: "Auditoria", icon: "mdi-sitemap", to: "/auditoria"},
  { text: "Utilizador", icon: "mdi-account-group", to: "/utilizador"},
  { text: "Acessos", icon: "mdi-account-lock", to: "/permissoes" },
  { text: "Meu perfil", icon: "mdi-account-multiple", to: "/perfil"},
];
</script>
