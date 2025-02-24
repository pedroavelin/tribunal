<template>
   <AppBar/>
   <NavigationDrawer/>
  <v-main class="style-1">
    <div class="content-container-process">
      <ListProcess />
    </div>
  </v-main>

  <!-- Modal para Adicionar Processo -->
  <AddProcesso/>
  <!-- Modal para Adicionar Processo -->

  <AppFooter />
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import AddProcesso from "@/components/dialogs/AddProcesso.vue";
</script>

<style>

.btn-add-processo {
  cursor: pointer;
}

.img-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.content-container-process {
  position: relative;
  z-index: 1;
  color: white;
}
</style>
