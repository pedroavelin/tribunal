<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useProcessoStore } from '@/stores/useProcessoStore'
import { useEstadosProcessoStore } from '@/stores/useEstadosProcessoStore'
import { useAlertStore } from '@/stores/useAlertStore';


// Alertas básicos
// alertStore.success('Processo cadastrado com sucesso');
// alertStore.error('Erro ao salvar os dados');
// alertStore.warning('Atenção: dados incompletos');
// alertStore.info('Sua sessão expirará em 5 minutos');
// Com opções personalizadas


const alertStore = useAlertStore();
const estadosStore = useEstadosProcessoStore()
const processoStore = useProcessoStore()


const formData = ref({
  numero: '',
  ano: '',
  crime: '',
  idEstadoProcesso: '',
});

const submitForm = async () => {
  try {
    await processoStore.adicionarProcesso({
      numero: formData.value.numero,
      ano: formData.value.ano,
      crime: formData.value.crime,
      idEstadoProcesso: formData.value.idEstadoProcesso
    });

    // Limpa o formulário
    formData.value = { numero: '', ano: '', crime: '', idEstadoProcesso: '' };
    
    // Emite evento para atualizar a lista no componente pai
    emit('save');
    
    // Fecha o modal
    closeModal();
    
    // Feedback opcional (pode ser substituído por um toast)
    alertStore.success('Processo cadastrado com sucesso');
    
  } catch (error) {
    alertStore.error('Erro ao salvar os dados');
    // console.error('Erro ao adicionar processo:', error);
    // alert(error.message || 'Erro ao adicionar processo');
  }
};


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
  estadosStore.fetchEstados()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function closeModal() {
  isOpen.value = false
  emit('close')
}
alertStore.success('Ação concluída', {
  icon: 'ti tabler-circle-check',
  timeout: 3000
});
</script>
<template>
  <div v-if="isOpen">
    <div :class="{ show: isOpen }" tabindex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
      <div class="offcanvas offcanvas-end show">
        <div class="offcanvas-header border-bottom">
          <h5 id="offcanvasAddUserLabel" class="offcanvas-title">Novo processo</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"
            @click.self="closeModal"></button>
        </div>
        <div class="offcanvas-body mx-0 flex-grow-0 p-6 h-100">
          <form class="add-new-user pt-0" id="addNewUserForm" @submit.prevent="submitForm">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-6 form-control-validation">
                  <label class="form-label" for="numero-processo">Número</label>
                  <input type="text" class="form-control" id="numero-processo" placeholder="Núm. do processo"
                    v-model="formData.numero">
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-6 form-control-validation">
                  <label class="form-label" for="ano-processo">Ano</label>
                  <input type="number" id="ano-processo" class="form-control" v-model="formData.ano">
                </div>
              </div>
            </div>
            <div class="mb-6">
              <label class="form-label" for="crime-processo">Crime</label>
              <input type="text" class="form-control" id="crime-processo" placeholder="Informe o crime"
                v-model="formData.crime">
            </div>
            <div class="mb-6">
              <label class="form-label" for="estado-processo">Estado do processo</label>
              <select id="estado-processo" class="select2 form-select" v-model="formData.idEstadoProcesso">
                <option value="">Selecione o estado</option>
                <option v-for="estado in estadosStore.listaEstados" :key="estado.id" :value="estado.id">
                  {{ estado.estado }}
                </option>
              </select>
            </div>
            <div class="mb-6">
              <!-- Adicione selects para Tribunal e Seccao quando necessário -->
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn btn-primary me-3">Adicionar</button>
              <button type="button" class="btn btn-label-danger" @click="closeModal">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>