<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'


const props = defineProps({
  modelValue: Boolean,
  processo: {
    type: Object,
    default: () => ({})
  }
})
const isSubmitting = ref()
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

onMounted( async () => {
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
                  <input type="text" class="form-control" id="" placeholder="">
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-6 form-control-validation">
                  <label class="form-label" for="ano-processo">Ano</label>
                  <select id="ano-processo" class="form-control">
                    <option value="">Selecione o ano</option>
                    <option>A</option>
                    <option>B</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="mb-6">
              <label class="form-label" for="crime-processo">Crime</label>
              <input type="text" class="form-control" id="" placeholder="Informe o crime">
            </div>
            <div class="mb-6">
              <label class="form-label" for="estado-processo">Estado do processo</label>
              <select id="estado-processo" class="form-select">
                <option value="">Selecione o estado</option>
                <option>E_1</option>
                <option>E_2</option>
              </select>
            </div>
            <div class="d-flex justify-content-end">
               <button class="btn btn-primary me-3" type="submit" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status"
                  aria-hidden="true"></span>
                {{ isSubmitting ? 'Salvando...' : 'Adicionar' }}
              </button>
              <button type="button" class="btn btn-label-danger" @click="closeModal">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>