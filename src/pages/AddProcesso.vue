<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify';

const display = useDisplay();
const scrollInvoked = ref(0);
const items = ref([
  {
    title: 'Processos',
    disabled: false,
    href: '#!',
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
  <br>
  <br>
  <v-breadcrumbs :items="items">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>

  <!-- Lista dinâmica -->
  <v-container>
  <v-list lines="three" select-strategy="classic">
      <v-row class="pa-1">
        <v-col><v-list-subheader>Total - 12</v-list-subheader></v-col>
      <v-col cols="auto">
        <v-btn icon="mdi-size-xl" color="success"  size="small"></v-btn>
      </v-col>
      </v-row>
      <v-card elevation="16" class="overflow-y-auto" max-height="350" v-scroll.self="onScroll">
        <v-list-item class="p-0 m-0" v-for="p in 4" :key="p">
          <v-list-item-title> 1122/2024 <br> <v-icon color="success" icon="mdi mdi-calendar" size="15"/> data  <v-icon color="warning" icon="mdi mdi-calendar" size="15"/> WWWWWW</v-list-item-title>
          <v-list-item-subtitle>Descrição do Processo</v-list-item-subtitle>
          <template v-slot:append>
            <!-- START - MENU -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  color="grey-lighten-1"
                  icon="mdi-dots-vertical"
                  variant="text"
                  v-bind="props"
                >
                </v-btn>
              </template>

              <v-list>
                <v-list-item value="1" >
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
    </v-container>
  <!-- Lista dinâmica -->
  <AppFooter />
</template>
