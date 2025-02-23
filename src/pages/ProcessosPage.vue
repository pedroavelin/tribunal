<template>
   <AppBar/>
   <NavigationDrawer/>
  <v-main class="style-1">
    <div class="content-container-process">
      <ListProcess />
    </div>
  </v-main>

  <!-- Modal para Adicionar Processo -->
  <v-dialog transition="dialog-top-transition" v-model="modalAddProcesso" max-width="756px" persistent>
    <v-card  color="border-0" subtitle="Preencha os campos abaixo para adicionar um novo processo" prepend-icon="mdi-folder-open">
      <v-card-text>
        <!-- Lista dinâmica -->
        <v-row class="mb-0" no-gutters>
          <v-col cols="4">
            <v-card elevation="0">
              <v-text-field class="text-caption" label="Número do processo" density="compact" />
              <v-text-field class="text-caption" label="Ano" density="compact" />
              <v-textarea clear-icon="mdi-close-circle" label="Crime" rows="6" clearable></v-textarea>
            </v-card>
          </v-col>

          <v-col cols="8">
            <v-list>
              <div class="d-flex justify-space-between">
                <div class=""><span class="text-caption mx-4">Arguido(s)</span></div>
                <div class=""><span class="text-caption"> Adicionar arguido </span></div>
              </div>
              <v-card class="overflow-y-auto text-caption" elevation="0" max-height="275">
                <div v-if="mostrarListaDeArguidos">
                  <v-list-item class="p-0 mb-0" v-for="i in 2" :key="i">
                    <v-list-item-title class="border">
                      <v-row no-gutters class="mt-1">
                        <v-col cols="11">
                          <v-text-field class="text-caption mx-1" label="Nome" density="compact" />
                        </v-col>
                        <v-col cols="1">
                          <div class="mt-1">
                            <v-btn density="compact" variant="elevated" class="text-caption mx-1" color="red"
                              icon="mdi-delete"></v-btn>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row no-gutters class="mx-1">
                        <v-col cols="4">
                          <v-text-field class="text-caption mx-1" label="Julgamento" density="compact" />
                        </v-col>
                        <v-col cols="4">
                          <v-text-field class="text-caption mx-1" label="Estado" density="compact" />
                        </v-col>
                        <v-col cols="4">
                          <v-text-field class="text-caption" label="Pena" density="compact" />
                        </v-col>
                        <v-textarea clear-icon="mdi-close-circle" label="Descrição" rows="1" clearable></v-textarea>
                      </v-row>
                    </v-list-item-title>
                  </v-list-item>
                </div>
                <div v-else>
                  <v-card color="" height="300">
                    <div class="text-center">
                      <div class="mt-5">
                        <span class="text-h6">Nenhum arguido adicionado ao <br> processo</span>
                      </div>
                    </div>
                  </v-card>
                </div>
              </v-card>
            </v-list>
          </v-col>
        </v-row>
        <!-- Lista dinâmica -->
      </v-card-text>
      <v-divider></v-divider>
      <div class="d-flex justify-end">
        <div class="">
          <v-btn class="text-caption" text="Fechar" variant="flat" color="red" density="compact" rounded="0"
            @click="modalAddProcesso = false"></v-btn>
        </div>
        <div class="">
          <v-btn class="text-caption" text="Salvar" variant="flat" color="success" density="compact" rounded="0"
            @click="modalAddProcesso = false"></v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
  <!-- Modal para Adicionar Processo -->

  <AppFooter />
</template>

<script setup>
import { ref } from "vue";
import AppBar from "@/components/AppBar.vue";

const mostrarListaDeArguidos = ref(true);

const modalAddProcesso = ref(false);

const addProceso = () => {
  modalAddProcesso.value = true;
}

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
