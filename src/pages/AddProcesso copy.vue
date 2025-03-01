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
</script>

<template>
  <AppBar />
  <NavigationDrawer />
  <br />
  <br />
  <v-container fluid>
    <v-breadcrumbs class="text-caption" :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <!-- Lista dinâmica -->

    <!-- <v-sheet class="ma-0 pa-2">Preencha o formulário para adicionar um novo processo</v-sheet> -->
    <v-stepper
      editable
      prev-text="Retoceder"
      next-text="Avançar"
      :items="['Novo processo', 'Adicionar arguido', 'Salvar']"
    >
      <template v-slot:item.1>
        <v-card subtitle="Preencha os campos abaixo para adicionar um novo processo" flat>
          <v-row no-gutters>
            <v-col cols="6">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Nº"></v-text-field>
              </v-sheet>
            </v-col>

            <v-col cols="6">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Ano"></v-text-field>
              </v-sheet>
            </v-col>

            <v-col cols="6">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Crime"></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="6">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact"
                  label="Estado do processo"></v-text-field>
              </v-sheet>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card title="Adicionar arguido" flat>
          <v-row no-gutters>
            <v-col cols="4">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact"
                  label="Nome do arguido"></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="4">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Crime"></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="4">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Detenção"></v-text-field>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="4">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Julgamento"></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="4">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Soltura"></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="4">
              <v-sheet class="mx-1">
                <v-text-field class="text-caption" variant="underlined" color="primary" density="compact"
                  label="Estado"></v-text-field>
              </v-sheet>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-card title="Terminar" flat>...</v-card>
      </template>
    </v-stepper>
  </v-container>
  <!-- Lista dinâmica -->
  <AppFooter />
</template>

