<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useProcessoStore } from '@/stores/processo'

const processoStore = useProcessoStore()

const formData = ref({
  numero: '',
  ano: '',
  crime: '',
  idEstadoProcesso: ''
});

const submitForm = async () => {
  try {
    await processoStore.adicionarProcesso({
      numero: formData.value.numero,
      ano: new Date(formData.value.ano).getFullYear(), // Extrai o ano da data
      crime: formData.value.crime,
      idEstadoProcesso: formData.value.idEstadoProcesso,
      // idTribunal e idSeccao devem vir de selects ou do contexto do usuário
      idTribunal: 1, // Substitua pelo valor real
      idSeccao: 1    // Substitua pelo valor real
    });
    
    // Limpa o formulário após sucesso
    formData.value = {
      numero: '',
      ano: '',
      crime: '',
      idEstadoProcesso: ''
    };
    
    // Fecha o modal
    closeModal();
    
    // Feedback para o usuário
    alert('Processo adicionado com sucesso!');
    
  } catch (error) {
    alert(`Erro ao adicionar processo: ${error}`);
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
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function closeModal() {
  isOpen.value = false
  emit('close')
}

</script>
<template>
  <div v-if="isOpen">
  <div  :class="{ show: isOpen }" tabindex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
    <div class="offcanvas offcanvas-end show">
    <div class="offcanvas-header border-bottom">
      <h5 id="offcanvasAddUserLabel" class="offcanvas-title">Novo processo</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" @click.self="closeModal"></button>
    </div>
    <div class="offcanvas-body mx-0 flex-grow-0 p-6 h-100">
<form class="add-new-user pt-0" id="addNewUserForm" @submit.prevent="submitForm">
    <div class="row">
      <div class="col-md-6">
        <div class="mb-6 form-control-validation">
          <label class="form-label" for="numero-processo">Número</label>
          <input 
            type="text" 
            class="form-control" 
            id="numero-processo" 
            placeholder="Núm. do processo"
            v-model="formData.numero"
            required>
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-6 form-control-validation">
          <label class="form-label" for="ano-processo">Ano</label>
          <input 
            type="number" 
            id="ano-processo" 
            class="form-control" 
            v-model="formData.ano"
            required>
        </div>
      </div>
    </div>
    <div class="mb-6">
      <label class="form-label" for="crime-processo">Crime</label>
      <input 
        type="text" 
        class="form-control" 
        id="crime-processo"
        placeholder="Informe o crime"
        v-model="formData.crime"
        required>
    </div>
    <div class="mb-6">
      <label class="form-label" for="estado-processo">Estado</label>
      <select 
        id="estado-processo" 
        class="select2 form-select"
        v-model="formData.idEstadoProcesso"
        required>
        <option value="">Selecione o estado</option>
        <option value="1">Em análise</option>
        <option value="2">Em andamento</option>
        <option value="3">Concluído</option>
      </select>
    </div>
    <div class="mb-6">
      <!-- Adicione selects para Tribunal e Seccao quando necessário -->
    </div>
    <div class="d-flex justify-content-end">
      <button type="submit" class="btn btn-primary me-3">Adicionar</button>
      <button 
        type="button" 
        class="btn btn-label-danger" 
        @click="closeModal">
        Cancelar
      </button>
    </div>
  </form>
    </div>
    </div>
  </div>
  </div>
</template>