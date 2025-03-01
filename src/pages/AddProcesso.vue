<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import { ref, computed } from 'vue';

const processo = ref({
  numeroProcesso: '',
  ano: '',
  idTribunal: null,
  idEstadoProcesso: null,
  descricao: '',
  arguidos: [
    { nome: '', bi: '', morada: '', pena: '', dataJulgamento: '', datasoltura: '', crime: '', descricao: '', idEstadoArguido: null }
  ]
});

const tribunais = ref([
  { id: 1, nome: 'Tribunal de Luanda' },
  { id: 2, nome: 'Tribunal de Benguela' }
]);

const estadosProcesso = ref([
  { id: 1, nome: 'Em andamento' },
  { id: 2, nome: 'Encerrado' }
]);

const estadosArguido = ref([
  { id: 1, nome: 'Preso' },
  { id: 2, nome: 'Em liberdade condicional' },
  { id: 3, nome: 'Absolvido' },
  { id: 4, nome: 'Solto' }
]);

const erros = ref({});

const validarCampo = (campo, valor) => {
  if (!valor) {
    erros.value[campo] = 'Campo obrigatório';
  } else {
    delete erros.value[campo];
  }
};

const adicionarArguido = () => {
  processo.value.arguidos.push({ nome: '', bi: '', morada: '', pena: '', dataJulgamento: '', datasoltura: '', crime: '', descricao: '', idEstadoArguido: null });
};

const removerArguido = (index) => {
  processo.value.arguidos.splice(index, 1);
};

const salvarProcesso = () => {
  console.log("Processo salvo:", processo.value);
};

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

</script>

<template>
  <AppBar></AppBar>
  <NavigationDrawer></NavigationDrawer>
  <br>
  <br>
  <v-breadcrumbs class="text-caption" :items="items">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
  <AppFooter></AppFooter>
  <v-container>
    <v-card class="pa-0 elevation-10">
      <v-card-title>Cadastro de Processo</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="salvarProcesso">
          <v-row no-gutters>
            <v-col cols="12" md="2">
              <v-text-field class="mx-1" density="compact" v-model="processo.numeroProcesso" label="Nº"
                :error-messages="erros.numeroProcesso" @blur="validarCampo('numeroProcesso', processo.numeroProcesso)"
                dense></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="mx-1" density="compact" v-model="processo.ano" label="Ano" type="number"
                :error-messages="erros.ano" dense @blur="validarCampo('ano', processo.ano)"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="mx-1" density="compact" v-model="processo.ano" label="Crime" type="number"
                :error-messages="erros.crime" dense @blur="validarCampo('ano', processo.ano)"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-select density="compact" v-model="processo.idTribunal" :items="tribunais" label="Tribunal"
                item-title="nome" item-value="id" dense></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select class="mx-1" density="compact" v-model="processo.idEstadoProcesso" :items="estadosProcesso"
                label="Estado" item-title="nome" item-value="id" dense></v-select>
            </v-col>
          </v-row>
          <v-textarea rows="2" density="compact" v-model="processo.descricao" label="Descrição do Processo"
            dense></v-textarea>
          <v-divider class="my-1"></v-divider>
          <div class="scrollable-arguidos">
          <v-row no-gutters v-for="(arguido, index) in processo.arguidos" :key="index" class="align-center">
            <v-col cols="12" md="3">
              <v-sheet class="pa-0 ma-0">
                <v-text-field density="compact" v-model="arguido.nome" label="Nome" dense></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="12" md="3">
              <v-sheet class="pa-1 ma-0">
                <v-text-field density="compact" v-model="arguido.bi" label="Crime" dense></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="12" md="3">
              <v-sheet class="pa-1 ma-0">
                <v-text-field density="compact" v-model="arguido.morada" label="Morada" dense></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="12" md="2">
              <v-sheet class="pa-1 ma-0">
                <v-btn density="compact" icon="mdi-delete" color="red" @click="removerArguido(index)"></v-btn>
              </v-sheet>
            </v-col>
          </v-row>
        </div>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="6" class="d-flex justify-start">
              <v-btn density="compact" color="primary" @click="adicionarArguido">
                <v-icon left>mdi-plus</v-icon> Adicionar Arguido
              </v-btn>
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
                <v-btn density="compact" type="submit" color="success">Salvar Processo</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<style scoped>
.scrollable-arguidos {
  max-height: 200px;
  overflow-y: auto;
}
</style>
