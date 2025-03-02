<script setup>
import AppBar from '@/components/AppBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify';

const display = useDisplay();

const cols = computed(() => {
  return display.lg.value ? [3, 9] : display.sm.value ? [9, 3] : [6, 6];
});

const itemsPerPage = ref(5);
const search = ref('');
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

const headers = [
  { title: 'Nome', align: 'start', sortable: false, key: 'name' },
  { title: 'Categoria', key: 'categoria', align: 'end' },
  { title: 'Tribunal', key: 'tribunal', align: 'end' },
  { title: 'Secção', key: 'seccao', align: 'end' },
  { title: 'Letra', key: 'letra', align: 'end' },
  { title: 'Estado', key: 'estado', align: 'end' },
];

const desserts = [
  { name: 'Pedro Avelino Epalanga', categoria: 'Secretário Judicial', tribunal: 'Tribunal da comarca de Luanda', seccao: '15ª Secção', letra: 'CA', estado: 'Activo' },
  { name: 'Ismael Gunza', categoria: 'Secretário Judicial', tribunal: 'Tribunal da comarca de Luanda', seccao: '15ª Secção', letra: 'CA', estado: 'Activo' },
  { name: 'Leila Fieta', categoria: 'Secretário Judicial', tribunal: 'Tribunal da comarca de Luanda', seccao: '15ª Secção', letra: 'CA', estado: 'Activo' },
  { name: 'Osório Palhais', categoria: 'Secretário Judicial', tribunal: 'Tribunal da comarca de Luanda', seccao: '15ª Secção', letra: 'CA', estado: 'Activo' },
  { name: 'Diana da Costa', categoria: 'Secretário Judicial', tribunal: 'Tribunal da comarca de Luanda', seccao: '15ª Secção', letra: 'CA', estado: 'Activo' },
  { name: 'Victória Lutero Saraiva', categoria: 'Secretário Judicial', tribunal: 'Tribunal da comarca de Luanda', seccao: '15ª Secção', letra: 'CA', estado: 'Activo' },
  { name: 'Yander Lopes', categoria: 'Secretário Judicial', tribunal: 'Tribunal da comarca de Luanda', seccao: '15ª Secção', letra: 'CA', estado: 'Activo' },
  { name: 'Vanilson Gonga', categoria: 'Secretário Judicial', tribunal: 'Tribunal da comarca de Luanda', seccao: '15ª Secção', letra: 'CA', estado: 'Activo' },
  { name: 'Manuel Octávio', categoria: 'Secretário Judicial', tribunal: 'Tribunal da comarca de Luanda', seccao: '15ª Secção', letra: 'CA', estado: 'Activo' },
  { name: 'Luquênia Neves Pereira', categoria: 'Secretário Judicial', tribunal: 'Tribunal da comarca de Luanda', seccao: '15ª Secção', letra: 'CA', estado: 'Activo' },
];

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = [...desserts];

        if (sortBy.length) {
          const { key: sortKey, order: sortOrder } = sortBy[0];
          items.sort((a, b) => (sortOrder === 'desc' ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]));
        }

        resolve({ items: items.slice(start, end), total: items.length });
      }, 500);
    });
  },
};

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  const { items, total } = await FakeAPI.fetch({ page, itemsPerPage, sortBy });
  serverItems.value = items;
  totalItems.value = total;
  loading.value = false;
};

</script>
<template>
  <AppBar/>
  <NavigationDrawer/>
  <AppFooter/>
  <br>
  <br>
  <main>
    <v-container fluid>
      <v-row class="mb-6" no-gutters>
        <v-col :cols="cols[0]">
          <v-sheet class="pa-2 ma-2">
            ADD Fomulário de cadastro
          </v-sheet>
        </v-col>

        <v-col :cols="cols[1]">
          <v-sheet class="pa-2 ma-2">
            <v-data-table-server
            class="border"
            fixed-footer="true"
            fixed-header="true"
            density="compact"
            show-select="true"
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="serverItems"
            :items-length="totalItems"
            :loading="loading"
            :search="search"
            item-value="name"
            @update:options="loadItems"
          ></v-data-table-server>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
