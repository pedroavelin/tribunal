<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import AppBar from '@/components/AppBar.vue';
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import { onMounted } from 'vue';
import { useUtilizadorStore } from '@/stores/utilizador';
import { useAuth } from '@/stores/auth.js'

const utilizadorStore = useUtilizadorStore();

const auth = useAuth(); 
// Buscar os dados do utilizador ao carregar o componente
onMounted(() => {
  utilizadorStore.detalhesUtilizador(); // Chamada correta da função
});
</script>

<template>
  <AppBar />
  <NavigationDrawer />
  <br>
  <br>
  <br>
  <div v-if="auth.isAuthenticated" class="mt-5 mx-4">
    <h1 v-if="utilizadorStore.carregando">Carregando...</h1>
    <h1 v-else-if="utilizadorStore.erro">{{ utilizadorStore.erro }}</h1>

    <div v-else-if="utilizadorStore.isAutenticado">
      <h1>Bem-vindo, {{ utilizadorStore.getNome }}</h1>
      <p>Email: {{ utilizadorStore.getEmail }}</p>
      <p>Telefone: {{ utilizadorStore.getTelefone }}</p>
      <p>ID do Tribunal: {{ utilizadorStore.utilizador?.idTribunal }}</p>
      <p>ID do Secção: {{ utilizadorStore.utilizador?.idSeccao }}</p>
      <p>Genero: {{ utilizadorStore.getGenero }}</p>
      <p>Data de nascimento: {{ utilizadorStore.getDataNascimento }}</p>
      <p>Data de Criação: {{ new Date(utilizadorStore.utilizador?.created_at).toLocaleDateString() }}</p>
      <p>Data de Actualização: {{ new Date(utilizadorStore.utilizador?.updated_at).toLocaleDateString() }}</p>
    </div>

    <p v-else>Usuário não autenticado</p>
  </div>
  <AppFooter />
</template>
