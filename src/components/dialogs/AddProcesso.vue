<script setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useModalStore } from '@/stores/modalStore';

const modalStore = useModalStore();
const display = useDisplay();

const cols = computed(() => {
  return display.lg.value ? [6, 6]
    : display.sm.value ? [6, 6]
    : display.md.value ? [6, 6]
      : [6, 6];
});
</script>

<template>
    <v-dialog v-model="modalStore.isOpen" transition="dialog-top-transition" max-width="756px" persistent>
    <v-card  color="border-0" subtitle="Novo processo [Letra - CD]" prepend-icon="mdi-folder-open">
      <v-card-text>
        <!-- Lista dinâmica -->
            <v-row no-gutters>
              <v-col :cols="cols[0]"><v-sheet class="pa-1"><v-text-field class="text-caption" label="Número" density="compact"/></v-sheet></v-col>
              <v-col :cols="cols[0]"><v-sheet class="pa-1"><v-text-field class="text-caption" label="Ano" density="compact" /></v-sheet></v-col>
            </v-row>
            <v-text-field class="text-caption ma-0 pa-0" label="Crime" density="compact" />
            <v-list>
              <div class="d-flex justify-space-between">
                <div class=""><span class="text-caption mx-4">Arguido(s)</span></div>
                <div class=""><span class="text-caption"> Adicionar </span></div>
              </div>
              <v-card class="overflow-y-auto text-caption" elevation="0" max-height="175">
              <div>
                  <v-list-item class="p-0 mb-0" :key="i">
                    <v-list-item-title>
                      <v-row no-gutters>
                        <v-col cols="10">
                          <v-text-field class="text-caption mx-1" label="Nome" density="compact" />
                        </v-col>
                        <v-col cols="2">
                          <div class="mt-1">
                            <v-btn density="compact" variant="tonal" class="text-caption mx-1" color="red"
                              icon="mdi-delete"></v-btn>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col :cols="cols[1]">
                          <v-text-field class="text-caption mx-1" label="Julgamento" density="compact" />
                        </v-col>
                        <v-col :cols="cols[1]">
                          <v-text-field class="text-caption mx-1" label="Estado" density="compact" />
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col :cols="[0]">
                          <v-text-field class="text-caption" label="Pena" density="compact" />
                        </v-col>
                        <v-col :cols="[0]">
                          <v-textarea class="mx-1" clear-icon="mdi-close-circle" label="Descrição" rows="1" clearable></v-textarea>
                        </v-col>
                      </v-row>
                    </v-list-item-title>
                  </v-list-item>
                </div>
                <!-- <div>
                  <v-card color="" height="300">
                    <div class="text-center">
                      <div class="mt-5">
                        <span class="text-h6">Nenhum arguido adicionado ao <br> processo</span>
                        <div class="">
                          <v-btn class="text-caption" text="ADICIONAR" variant="flat" color="success" density="compact" rounded="0"></v-btn>
                        </div>
                      </div>
                    </div>
                  </v-card>
                </div> -->
              </v-card>
            </v-list>
        <!-- Lista dinâmica -->
        <div class="d-flex justify-end">
          <div class="">
            <v-btn @click="modalStore.closseModal()" class="text-caption" text="Fechar" variant="flat" color="red" density="compact" rounded="0"></v-btn>
          </div>
          <div class="">
            <v-btn class="text-caption" text="Salvar" variant="flat" color="success" density="compact" rounded="0"></v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
