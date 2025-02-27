<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify';

const display = useDisplay();
const scrollInvoked = ref(0);


const items = ref([
  {
    title: 'Processos',
    disabled: false,
    to: '/processo',
  },
  {
    title: 'Novo Processo',
    disabled: true,
    href: 'breadcrumbs_link_1',
  },
])
const cols = computed(() => {
  return display.lg.value ? [6, 6]
    : display.sm.value ? [6, 6]
      : display.md.value ? [6, 6]
        : [6, 6];
});

const onScroll = () => {
  this.scrollInvoked++;
};
</script>

<template>
  <AppBar />
  <NavigationDrawer />
  <br />
  <br />
  <v-sheet>
    <v-breadcrumbs class="text-caption" :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <!-- Lista dinâmica -->

    <!-- <v-sheet class="ma-0 pa-2">Preencha o formulário para adicionar um novo processo</v-sheet> -->
    <v-list lines="three" select-strategy="classic">
      <v-container>
        <v-row no-gutters>
          <v-col cols="3">
            <v-sheet class="mx-1">
              <v-text-field variant="underlined" color="primary" density="compact" label="Nº"></v-text-field>
            </v-sheet>
          </v-col>

          <v-col cols="3">
            <v-sheet class="">
              <v-text-field variant="underlined" color="primary" density="compact" label="Ano"></v-text-field>
            </v-sheet>
          </v-col>

          <v-col cols="3">
            <v-sheet class="mx-1">
              <v-text-field variant="underlined" color="primary" density="compact" label="Crime"></v-text-field>
            </v-sheet>
          </v-col>
          <v-col cols="3">
            <v-sheet class="mx-1">
              <v-text-field variant="underlined" color="primary" density="compact"
                label="Estado do processo"></v-text-field>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="6">
            <v-sheet class="mx-1">
              <v-text-field variant="underlined" color="primary" density="compact"
                label="Nome do arguido"></v-text-field>
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet class="mx-1">
              <v-text-field variant="underlined" color="primary" density="compact" label="Crime"></v-text-field>
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet class="mx-1">
              <v-text-field variant="underlined" color="primary" density="compact" label="Detenção"></v-text-field>
            </v-sheet>
          </v-col>

          <v-col cols="6">
            <v-sheet class="mx-1">
              <v-text-field variant="underlined" color="primary" density="compact" label="Julgamento"></v-text-field>
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet class="mx-1">
              <v-text-field variant="underlined" color="primary" density="compact" label="Soltura"></v-text-field>
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet class="mx-1">
              <v-text-field class="text-caption" variant="underlined" color="primary" density="compact"
                label="Estado"></v-text-field>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <v-row align="start" justify="center">
        <v-col cols="auto">
          <v-btn
          class="text-none"
            color="blue-darken-4"
            rounded="0"
            variant="outlined"
          size="small" elevation="16">Adicionar +</v-btn>
        </v-col>
      </v-row>

      <v-card elevation="0" class="overflow-y-auto" max-height="250" v-scroll.self="onScroll">
        <v-list-item class="p-0 m-0" v-for="p in 4" :key="p">
          <v-list-item-title> Processo <br> <v-icon color="success" icon="mdi mdi-calendar" size="15" /> Julgamento
            <v-icon color="warning" icon="mdi mdi-calendar" size="15" /> Soltura</v-list-item-title>
          <v-list-item-subtitle>Descrição do Processo</v-list-item-subtitle>
          <template v-slot:append>
            <!-- START - MENU -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn color="grey-lighten-1" icon="mdi-dots-vertical" variant="text" v-bind="props">
                </v-btn>
              </template>

              <v-list>
                <v-list-item value="1">
                  <v-list-item-title>Editar</v-list-item-title>
                  <v-divider />
                </v-list-item>
                <v-list-item value="2">
                  <v-list-item-title>Eliminar</v-list-item-title>
                </v-list-item>
              </v-list>

            </v-menu>
          </template>
        </v-list-item>
      </v-card>

    </v-list>
  </v-sheet>
  <!-- Lista dinâmica -->
  <AppFooter />
</template>

