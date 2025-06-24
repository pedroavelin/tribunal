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
      <form class="add-new-user pt-0" id="addNewUserForm" onsubmit="return false">
        <div class="row">
          <div class="col-md-6">
            <div class="mb-6 form-control-validation">
              <label class="form-label" for="add-user-fullname">Número</label>
              <input type="text" class="form-control" id="add-user-fullname" placeholder="Núm. do processo"
                name="userFullname" aria-label="John Doe">
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-6 form-control-validation">
              <label class="form-label" for="add-user-email">Ano</label>
              <input type="date" id="add-user-email" class="form-control" placeholder="Ano" name="userEmail">
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label class="form-label" for="add-user-contact">Crime</label>
          <input type="text" class="form-control phone-mask" placeholder="Informe o crime"
            aria-label="john.doe@example.com" name="userContact">
        </div>
        <div class="mb-6">
          <label class="form-label" for="country">Estado</label>
          <select id="country" class="select2 form-select">
            <option value="">Seleccione o estado</option>
            <option value="United Kingdom">Em análise</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary me-3 data-submit">Adionar</button>
        <button type="reset" class="btn btn-label-danger" data-bs-dismiss="offcanvas" @click.self="closeModal">Cancelar</button>
      </form>
    </div>
    </div>
  </div>
  </div>
</template>