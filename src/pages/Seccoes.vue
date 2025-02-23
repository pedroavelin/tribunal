<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import AppBar from '@/components/AppBar.vue';
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import { onMounted } from 'vue';
import { useSeccaoStore } from '@/stores/seccao';
const seccaoStore = useSeccaoStore();

// Buscar os dados do utilizador ao carregar o componente
onMounted(() => {
  seccaoStore.listarSeccao();
});

</script>

<template>
  <AppBar />
  <NavigationDrawer />
  <br v-for="i in 3" :key="i">
   <h1 v-if="seccaoStore.carregando">Carregando...</h1>
    <h1 v-else-if="seccaoStore.erro">{{ seccaoStore.erro }}</h1>
    <v-container fluid>
      <v-row>
        <v-col v-for="(item, index) in seccaoStore.seccao" :key="index" cols="2" >
          <v-card  class="mx-auto" max-width="250" elevation="10" height="260">
            <v-img class="align-end text-white" height="200" gradient="to top right, rgba(100,111,112,.900),  rgba(2,3,1,.1)" src="@/assets/imgSeccao.webp" cover>
              <v-card-title>15ª Secção</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-1">
              {{ item.numero }}
            </v-card-subtitle>

            <v-card-text>
              <div>{{ item.nome }}</div>
              <div>Letra(s): 11</div>
            </v-card-text>


          </v-card>
        </v-col>
      </v-row>
    </v-container>

  <AppFooter />
</template>
