  <template>
    <div class="list-process">
      <v-container fluid>
        <v-row>
          <v-col v-for="n in 30" :key="n" cols="2" class="col-sm-2 col-md-3 col-lg-3 text-caption">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-card v-bind="props" :color="isHovering ? 'primary' : undefined" class="card-process"
                  subtitle="11/2012" elevation="16" @click="modalInfoProcess" prepend-icon="mdi-folder-open"
                  height="150">
                  <v-card-subtitle class="text-caption"><span>Roubo Qualificado concorrido com
                      furto</span></v-card-subtitle>
                  <v-card-text class="text-caption">
                    Julgamento: 12/10/2025 <br>
                    Arguído(s): 3 <br>
                    Solto(s): 2
                  </v-card-text>
                  <template v-slot:append>
                    <v-icon color="success" icon="mdi-search"></v-icon>
                  </template>
                </v-card>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </div>
    
    <!-- Modal ver informações do Processo -->
    <v-dialog transition="dialog-top-transition" class="text-caption" v-model="isAddModalOpen" max-width="800px">
      <v-card title="Proc. Nº: 21/2021" subtitle="Roubo Qualificado concorrido com furto" prepend-icon="mdi-folder-open">
        <v-list lines="three" select-strategy="classic">
          <v-card elevation="16" class="overflow-y-auto" max-height="250">
            <v-list-item class="p-0 mt-0" v-for="i in 10" :key="i" link>

              <v-list-item-title class="text-caption">
                Pedro Avelino Epalanga <br>
                Crime: Tipo de crime <br>
                Estado: Preso | <v-icon color="warning" icon="mdi mdi-calendar" size="15" /> 11/12/2004<br>
                Julgamento: <v-icon color="success" icon="mdi mdi-calendar" size="15" /> 12/12/2024 <br>
                Pena: 8 anos
              </v-list-item-title>

              <v-list-item-subtitle class="text-caption">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Iste non illum, eaque alias culpa, vero error esse provident ipsum totam
                qui odio tempore eveniet dolores ex aliquid eos? Commodi, enim.
              </v-list-item-subtitle>
              <template v-slot:append>
                <!-- START - MENU -->
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn class="" key="1" color="red" icon="$delete" density="compact"></v-btn>
                    <v-btn class="mx-1" key="2" @click="updateProcess = true" color="success" icon="$edit" density="compact"></v-btn>
                  </template>
                </v-menu>
              </template>
            </v-list-item>
          </v-card>
        </v-list>
        <template v-slot:actions>
          <v-btn class="text-caption" text="+ Arguido" variant="outlined" color="success" density="compact" rounded="0" @click="modalInfoProcess"></v-btn>
          <v-btn class="text-caption" text="Fechar" variant="outlined" color="red" density="compact" rounded="0"></v-btn>
        </template>
      </v-card>
    </v-dialog>
    <!-- Modal ver informações do Processo -->

    <!-- Modal update Process -->
    <v-dialog v-model="updateProcess" max-width="400px">
      <v-card title="Pedro A. Epalanga">
        <v-container>
          <v-row no-gutters>

            <v-col>
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Nome"></v-text-field>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="4">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact"
                  label="Crime"></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="4">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Detenção"></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="4">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Julgamento"></v-text-field>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="2">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Pena"></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="5">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Soltura"></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="5">
              <v-sheet class="mx-1">
                <v-text-field class="text-caption" variant="underlined" color="primary" density="compact"
                  label="Estado"></v-text-field>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="text-caption" color="red" density="compact" text="Cancelar" variant="flat"
            @click="updateProcess = false"></v-btn>
          <v-btn class="text-caption" color="success" density="compact" text="Actualizar" variant="flat"
            @click="updateProcess = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Modal update Process -->

    <!-- Modal add arguido Process -->
    <v-dialog v-model="addArguido" max-width="400px">
      <v-card title="Pedro A. Epalanga">
        <v-container>
          <v-row no-gutters>

            <v-col>
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Nome"></v-text-field>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="4">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact"
                  label="Crime"></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="4">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Detenção"></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="4">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Julgamento"></v-text-field>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="2">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Pena"></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="5">
              <v-sheet class="mx-1">
                <v-text-field variant="underlined" color="primary" density="compact" label="Soltura"></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="5">
              <v-sheet class="mx-1">
                <v-text-field class="text-caption" variant="underlined" color="primary" density="compact"
                  label="Estado"></v-text-field>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="text-caption" color="red" density="compact" text="Cancelar" variant="flat" ></v-btn>
          <v-btn class="text-caption" color="success" density="compact" text="Actualizar" variant="flat" ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Modal add arguido Process -->

  </template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const isAddModalOpen = ref(false);
    const updateProcess = ref(false);
    const addArguido = ref(false);

    const modalInfoProcess = () => {
      isAddModalOpen.value = true;
    }

    const modalAddArguido = () => {
      addArguido.value = true;
    }

    return {
      isAddModalOpen,
      updateProcess,
      addArguido,
      modalAddArguido,
      modalInfoProcess
    }
  },
}
</script>
<style scoped>
span.changeColor {
  color: #fff;
}
</style>
