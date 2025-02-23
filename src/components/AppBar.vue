<script setup lang="ts">
import { useDrawerStore } from '@/stores/useDrawerStore';

const drawerStore  = useDrawerStore();
</script>

<template>
 <v-app-bar class="bg-gradient" density="compact" elevation="10">
    <v-app-bar-nav-icon @click="drawerStore.toggleDrawer()"></v-app-bar-nav-icon>
    <v-app-bar-title>PLANETAs</v-app-bar-title>

    <v-combobox prepend-inner-icon="mdi-magnify"  :items="['101', '312', '413', '114', '65', '216']" density="compact" label="Pesquisar processo ..." class="mt-5 text-caption"></v-combobox>
    <v-spacer></v-spacer>

    <v-sheet class="" max-height="210">
      <div class="row">
        <div class="text-center">
          <div class="bg-success btn-add-processo">
            <v-btn elevation="0" density="compact" class="text-caption" rounded="0">Novo Processo</v-btn>
          </div>
          <div>
            <v-btn density="compact" class="text-caption border-0" color="red" rounded="0" variant="flat">Preso(100)</v-btn>
            <v-btn density="compact" class="text-caption border-0" color="yellow-darken-4" variant="flat" rounded="0">Solto (999)</v-btn>
          </div>
        </div>
      </div>
    </v-sheet>
  </v-app-bar>
</template>
