<template>
  <div v-if="isOpen" class="modal-backdrop-x fade show" @click.self="closeModal" style="display: blocks;">
    <div class="modal fadex" :class="{ show: isOpen }" tabindex="-1">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Processo {{ processo?.numero }}/{{ processo?.ano }} | Crime: {{ processo?.crime }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="info-container">
                  <ul class="list-unstyled">
                    <li>
                      <div class="col-md">
                        <label class="form-check-label me-1">Seleccione uma opção para associar um: </label>
                        <div class="form-check form-check-inline mt-4">
                          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                          <label class="form-check-label" for="inlineRadio1">Arguido</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                          <label class="form-check-label" for="inlineRadio2">Declarante</label>
                        </div>
                      </div>
                    </li>
                    <div class="row g-2">
                      <div class="col-md-5">
                        <label class="form-label" for="multicol-username">Nome</label>
                        <input type="text" id="multicol-username" class="form-control form-control-sm" placeholder="Nome">
                      </div>
                      <div class="col-md-4">
                        <label class="form-label" for="multicol-username">Apelido</label>
                        <input type="text" id="multicol-username" class="form-control form-control-sm" placeholder="Apelido">
                      </div>
                      <div class="col-md-2">
                        <label class="form-label" for="multicol-username">Idade</label>
                        <input type="number" id="multicol-username" class="form-control form-control-sm">
                      </div>
                      <div class="col-md-2">
                        <label class="form-label" for="multicol-username">Sexo</label>
                        <input type="text" id="multicol-username" class="form-control form-control-sm">
                      </div>
                      <div class="col-md-3">
                        <label class="form-label form-label-sm" for="multicol-username">Nascido aos</label>
                        <input type="text" id="multicol-username" class="form-control form-control-sm">
                      </div>
                      <div class="col-md-3">
                        <label class="form-label form-label-sm" for="multicol-username">Nome do pai</label>
                        <input type="text" id="multicol-username" class="form-control form-control-sm" placeholder="Pai">
                      </div>
                      <div class="col-md-3">
                        <label class="form-label form-label-sm" for="multicol-username">Nome da mãe</label>
                        <input type="text" id="multicol-username" class="form-control form-control-sm" placeholder="Mãe">
                      </div>
                      <div class="col-md-3">
                        <label class="form-label form-label-sm" for="multicol-username">Província</label>
                        <input type="text" id="multicol-username" class="form-control form-control-sm">
                      </div>
                      <div class="col-md-3">
                        <label class="form-label form-label-sm" for="multicol-username">Município</label>
                        <input type="text" id="multicol-username" class="form-control form-control-sm">
                      </div>
                      <div class="col-md-3">
                        <label class="form-label form-label-sm" for="multicol-username">Bairro</label>
                        <input type="text" id="multicol-username" class="form-control form-control-sm">
                      </div>
                      <div class="col-md-2">
                        <label class="form-label form-label-sm" for="multicol-username">Rua nº</label>
                        <input type="text" id="multicol-username" class="form-control form-control-sm">
                      </div>
                      <div class="col-md-2">
                        <label class="form-label form-label-sm" for="multicol-username">Casa</label>
                        <input type="text" id="multicol-username" class="form-control form-control-sm">
                      </div>
                      <div class="col-md-3">
                        <div class="mt-6">
                          <button type="submit" class="btn btn-primary btn-sm waves-effect waves-light">Associar</button>
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
              <div class="col-md-6">
                <div class="my-scroll" >
                  <div class="accordion accordion-without-arrow mt-0">
                    <div class="accordion-item" v-for="(arguido, index) in processo.arguidos" :key="arguido.idArguido">
                      <h2 class="accordion-header d-flex align-items-center">
                        <button type="button" class="accordion-button" data-bs-toggle="collapse"
                          data-bs-target="#accordionWithIcon-1" aria-expanded="true">
                          <i class="icon-base ti tabler-user me-2"></i>
                          <div class="mx-2"><input class="form-check-input form-input-sm" type="checkbox"></div>
                          <span class="badge bg-danger mb-4 mb-sm-0 me-2"> {{ arguido.arguido.nome }} </span>
                          Estado: {{ arguido.arguido.estado.descricao }} | Crime: {{ arguido.crime }} | Julgamento: {{
                          arguido.dataDeJulgamento }}
                        </button>
                      </h2>
                      <div id="accordionWithIcon-1">
                        <div class="accordion-body">
                          {{ arguido.arguido.nome }} t.c.p "apelido",
                          {{ arguido.arguido.profissao }} de profissão,
                          nascido(a) aos {{ arguido.arguido.dataDeNascimento }}
                          filho de {{ arguido.arguido.pai }}
                          e de {{ arguido.arguido.mae }}
                          natudal da província de(o) {{ arguido.arguido.endereco.municipio.provincia.nome }} ,
                          município de(o) {{ arguido.arguido.endereco.municipio.nome }},
                          bairro {{ arguido.arguido.endereco.bairro }},
                          rua {{ arguido.arguido.endereco.rua }},
                          rua {{ arguido.arguido.endereco.casa }}.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion mt-2">
                    <div class="accordion-item" v-for="(declarante, index) in processo.declarantes"
                      :key="declarante.idDeclarante">
                      <h2 class="accordion-header d-flex align-items-center">
                        <button type="button" class="accordion-button" data-bs-toggle="collapse"
                          data-bs-target="#accordionWithIcon-1" aria-expanded="true">
                          <i class="icon-base ti tabler-user me-2"></i>
                          <div class="mx-2"><input class="form-check-input form-input-sm" type="checkbox"></div>
                          <span class="badge bg-success mb-4 mb-sm-0 me-2"> {{ declarante.declarante.nome }} </span>
                        </button>
                      </h2>
                      <div id="accordionWithIcon-1">
                        <div class="accordion-body">
                          {{ declarante.declarante.nome }} t.c.p "apelido",
                          {{ declarante.declarante.profissao }} de profissão,
                          nascido(a) aos {{ declarante.declarante.dataDeNascimento }}
                          filho de "Fulano de tal"
                          e de "Fulana de tal"
                          natudal da província de(o) {{ declarante.declarante.endereco.municipio.provincia.nome }} ,
                          município de(o) {{ declarante.declarante.endereco.municipio.nome }},
                          bairro {{ declarante.declarante.endereco.bairro }},
                          rua {{ declarante.declarante.endereco.rua }},
                          rua {{ declarante.declarante.endereco.casa }}.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  processo: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'update:modelValue',
  'save',
  'close'
])

const isOpen = ref(false)

watch(() => props.modelValue, (val) => {
  isOpen.value = val
})

watch(isOpen, (val) => {
  emit('update:modelValue', val)
})

// Fechar ao pressionar ESC
const handleKeydown = (e) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function closeModal() {
  isOpen.value = false
  emit('close')
}

// function onSave() {
//   emit('save')
//   closeModal()
// }
</script>

<style scoped>
.form-check-input {
  width: 1.2rem;
  height: 1.2rem;
}

.accordion-header {
  margin-bottom: -19px !important;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 1);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.fadex {
  transition: opacity 0.15s linear;
}

.fadex:not(.show) {
  opacity: 1;
}

.modal-dialog {
  background-color: white;
  /* Fundo branco para o conteúdo */
  border-radius: 0.3rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
</style>