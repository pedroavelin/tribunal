<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useProcessoStore } from '@/stores/useProcessoStore'
import { useEstadosProcessoStore } from '@/stores/useEstadosProcessoStore'
import { useAlertStore } from '@/stores/useAlertStore';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

// Alertas básicos
const alertStore = useAlertStore();
const estadosStore = useEstadosProcessoStore()
const processoStore = useProcessoStore()

// Gera anos de 2000 até o ano atual + 10
const currentYear = new Date().getFullYear();
const availableYears = Array.from({ length: 11 }, (_, i) => currentYear - 10 + i);
// Schema de validação
const validationSchema = yup.object({
  numero: yup.number()
    .typeError('Deve ser um número válido')
    .positive('Deve ser um número positivo')
    .required('Número é obrigatório'),
  ano: yup.number()
    .typeError('Deve ser um número válido')
    .integer('Deve ser um número inteiro')
    .min(1900, 'Ano deve ser após 1900')
    .max(currentYear + 10, 'Ano não pode ser no futuro distante')
    .required('Ano é obrigatório'),
  crime: yup.string()
    .matches(/^[a-zA-ZÀ-ÿ\s]*$/, 'Deve conter apenas letras')
    .required('Crime é obrigatório'),
  idEstadoProcesso: yup.string().required('Estado do processo é obrigatório')
});

const { handleSubmit, errors, setFieldError } = useForm({
  validationSchema,
  initialValues: {
    numero: '',
    ano: '',
    crime: '',
    idEstadoProcesso: ''
  }
});

const { value: numero } = useField('numero');
const { value: ano } = useField('ano');
const { value: crime } = useField('crime');
const { value: idEstadoProcesso } = useField('idEstadoProcesso');

const isSubmitting = ref(false);

const submitForm = handleSubmit(async (values) => {
  try {
    isSubmitting.value = true;

    await processoStore.adicionarProcesso({
      numero: values.numero,
      ano: values.ano,
      crime: values.crime,
      idEstadoProcesso: values.idEstadoProcesso
    });

    // Limpa o formulário
    numero.value = '';
    ano.value = '';
    crime.value = '';
    idEstadoProcesso.value = '';

    emit('save');
    closeModal();
    alertStore.success('Processo cadastrado com sucesso');

  } catch (error) {
    console.error('Erro ao salvar processo:', error);

    // Tratamento específico para erros de API
    if (error.response?.data?.errors) {
      Object.entries(error.response.data.errors).forEach(([field, message]) => {
        setFieldError(field, message);
      });
    } else {
      alertStore.error(error.message || 'Já existe um processo com esse número e ano.');
    }
  } finally {
    isSubmitting.value = false;
  }
});

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

onMounted( async () => {
  window.addEventListener('keydown', handleKeydown)
  estadosStore.fetchEstados().catch(error => {
    alertStore.error('Erro ao carregar lista de estados');
  });
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
                  <input type="text" class="form-control" :class="{ 'is-invalid': errors.numero }" id="numero-processo"
                    placeholder="Núm. do processo" v-model="numero">
                  <div class="invalid-feedback" v-if="errors.numero">{{ errors.numero }}</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-6 form-control-validation">
                  <label class="form-label" for="ano-processo">Ano</label>
                  <select id="ano-processo" class="form-control" :class="{ 'is-invalid': errors.ano }" v-model="ano">
                    <option value="">Selecione o ano</option>
                    <option v-for="year in availableYears" :value="year" :key="year">{{ year }}</option>
                  </select>
                  <div class="invalid-feedback" v-if="errors.ano">{{ errors.ano }}</div>
                </div>
              </div>
            </div>
            <div class="mb-6">
              <label class="form-label" for="crime-processo">Crime</label>
              <input type="text" class="form-control" :class="{ 'is-invalid': errors.crime }" id="crime-processo"
                placeholder="Informe o crime" v-model="crime">
              <div class="invalid-feedback" v-if="errors.crime">{{ errors.crime }}</div>
            </div>
            <div class="mb-6">
              <label class="form-label" for="estado-processo">Estado do processo</label>
              <select id="estado-processo" class="form-select" :class="{ 'is-invalid': errors.idEstadoProcesso }"
                v-model="idEstadoProcesso">
                <option value="">Selecione o estado</option>
                <option v-for="estado in estadosStore.listaEstados" :key="estado.id" :value="estado.id">
                  {{ estado.estado }}
                </option>
              </select>
              <div class="invalid-feedback" v-if="errors.idEstadoProcesso">{{ errors.idEstadoProcesso }}</div>
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn btn-primary me-3" type="submit" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status"
                  aria-hidden="true"></span>
                {{ isSubmitting ? 'Salvando...' : 'Adicionar' }}
              </button>
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