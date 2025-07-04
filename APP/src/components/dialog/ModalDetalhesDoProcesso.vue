<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useEstadoDosArguidosStore } from '@/stores/useEstadoDosArguidosStore'
import { useMunicipiosStore } from '@/stores/useMunicipiosStore'
import { useProvinciasStore } from '@/stores/useProvinciasStore'
import { useProcessoStore } from '@/stores/useProcessoStore'
import { useAlertStore } from '@/stores/useAlertStore';


import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const alertStore = useAlertStore();
const processoStore = useProcessoStore()
// const provinciaId = ref('')
// const municipioId = ref('')

const isOpen = ref(false)
const tipoPessoa = ref('arguido')

const estadosArguidoStore = useEstadoDosArguidosStore()
const provinciasStore = useProvinciasStore()
const municipiosStore = useMunicipiosStore()

const props = defineProps({
  modelValue: Boolean,
  processo: {
    type: Object,
    default: () => ({})
  }
})
const processoLocal = ref({ ...props.processo })

const emit = defineEmits([
  'update:modelValue',
  'save',
  'close'
])

watch(() => props.processo, (val) => {
  processoLocal.value = { ...val }
}, { immediate: true })

// Esquema de validação
const validationSchema = yup.object({
  nome: yup.string().required('Obrigatório').min(3, 'Mínimo 3 caracteres'),
  apelido: yup.string().required('Obrigatório').min(3, 'Mín 3 caracteres'),
  idade: yup.number()
    .typeError('A idade deve ser um número')
    .positive('Deve nº positiva')
    .integer('A idade deve ser um nº inteiro')
    .required('Obrigatório'),
  sexo: yup.string().required('Obrigatório'),
  nascimento: yup.string().required('Obrigatório'),
  pai: yup.string().required('Obrigatório'),
  mae: yup.string().required('Obrigatório'),
  provincia: yup.string().required('Obrigatório'),
  municipio: yup.string().required('Obrigatório'),
  bairro: yup.string().required('Obrigatório'),
  rua: yup.string().required('Obrigatório'),
  casa: yup.string().required('Obrigatório'),
  crime: yup.string().when('tipoPessoa', {
    is: 'arguido',
    then: schema => schema.required('Crime é obrigatório para arguidos'),
    otherwise: schema => schema.notRequired()
  }),
  estado: yup.string().required('Obrigatório'),
  pena: yup.string().when('tipoPessoa', {
    is: 'arguido',
    then: schema => schema.required('Pena é obrigatória para arguidos'),
    otherwise: schema => schema.notRequired()
  })
})

// Inicializar o formulário com vee-validate
const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema,
  initialValues: {
    tipoPessoa: 'arguido',
    nome: '',
    apelido: '',
    idade: null,
    sexo: 'M',
    nascimento: '',
    pai: '',
    mae: '',
    provincia: '',
    municipio: '',
    bairro: '',
    rua: '',
    casa: '',
    crime: '',
    estado: '',
    pena: '',
    tipoPessoa: 'arguido',
    cadeiaLocal: '',
  }
})

// Definir os campos com useField
const { value: nome, errorMessage: nomeError } = useField('nome')
const { value: apelido, errorMessage: apelidoError } = useField('apelido')
const { value: idade, errorMessage: idadeError } = useField('idade')
const { value: sexo, errorMessage: sexoError } = useField('sexo')
const { value: nascimento, errorMessage: nascimentoError } = useField('nascimento')
const { value: pai, errorMessage: paiError } = useField('pai')
const { value: mae, errorMessage: maeError } = useField('mae')
const { value: provincia, errorMessage: provinciaError } = useField('provincia')
const { value: municipio, errorMessage: municipioError } = useField('municipio')
const { value: bairro, errorMessage: bairroError } = useField('bairro')
const { value: rua, errorMessage: ruaError } = useField('rua')
const { value: casa, errorMessage: casaError } = useField('casa')
const { value: crime, errorMessage: crimeError } = useField('crime')
const { value: estado, errorMessage: estadoError } = useField('estado')
const { value: pena, errorMessage: penaError } = useField('pena')
const { value: cadeiaLocal, errorMessage: cadeiaLocalError } = useField('cadeiaLocal')


// Função para submeter o formulário
const onSubmitJoinArgInProcess = handleSubmit(async (values) => {
  try {
    const payload = {
      idEstadoArguido: parseInt(values.estado),
      arguido: {
        nome: values.nome,
        apelido: values.apelido,
        idade: values.idade,
        sexo: values.sexo,
        dataDeNascimento: values.nascimento,
        pai: values.pai,
        mae: values.mae,
        profissao: 'Indefinida',
        estado: { id: parseInt(values.estado) },
        municipio: values.municipio,
        endereco: {
          bairro: values.bairro,
          rua: values.rua,
          casa: values.casa,
          municipio: { id: parseInt(values.municipio) }
        }
      }
    }

    // Adicionar campos específicos para arguidos
    if (tipoPessoa.value === 'arguido') {
      payload.crime = values.crime
      payload.pena = values.pena
      payload.cadeiaLocal = values.cadeiaLocal
    }

    await processoStore.associarArguidoAoProcesso(
      props.processo.numero,
      props.processo.ano,
      payload
    )
    emit('arguido-adicionado')
    closeModal()
    alertStore.success('Associação realizada com sucesso!')

  } catch (err) {
    alertStore.error('Erro ao associar: ' + (err.response?.data?.message || err.message))
  }
})

// Observadores para controle do modal
watch(() => props.modelValue, (val) => {
  isOpen.value = val
})

watch(isOpen, (val) => {
  emit('update:modelValue', val)
})

// Atualizar tipoPessoa no formulário quando mudar
watch(tipoPessoa, (newVal) => {
  setFieldValue('tipoPessoa', newVal)
})

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)
  estadosArguidoStore.fetchEstados().catch(error => {
    alertStore.error('Erro ao carregar lista de estados');
  });
  provinciasStore.fetchProvincias()
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
  resetForm()
  tipoPessoa.value = 'arguido'
  isOpen.value = false
  emit('close')
}
watch(provincia, async (newId) => {
  if (newId) {
    await municipiosStore.fetchMunicipiosByProvincia(newId)
    municipio.value = ''
  }
})
</script>
<template>
  <div v-if="isOpen" class="modal-backdrop-x fade show" @click.self="closeModal" style="display: blocks;">
    <div class="modal fadex" :class="{ show: isOpen }" tabindex="-1">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-header">
              <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
            </div>
            <div class="row">
              <h5 class="modal-title">Processo {{ processo?.numero }}/{{ processo?.ano }} | Crime: {{ processo?.crime }}
              </h5>
              <div class="col-md-6">
                <div class="info-container">
                  <form class="add-new-user pt-0" id="addNewUserForm" @submit.prevent="onSubmitJoinArgInProcess">
                    <ul class="list-unstyled">
                      <li>
                        <div class="col-md">
                          <label class="form-check-label me-1">Seleccione uma opção para associar um: </label>
                          <div class="form-check form-check-inline mt-4">
                            <input class="form-check-input" type="radio" v-model="tipoPessoa" id="inlineRadio1"
                              value="arguido">
                            <label class="form-check-label" for="inlineRadio1">Arguido</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" v-model="tipoPessoa" id="inlineRadio2"
                              value="declarante">
                            <label class="form-check-label" for="inlineRadio2">Declarante</label>
                          </div>
                        </div>
                      </li>
                      <div class="row g-1">
                        <!-- Campos comuns -->
                        <div class="col-md-5">
                          <label class="form-label">Nome</label>
                          <input type="text" class="form-control form-control-sm" placeholder="Nome" v-model="nome"
                            :class="{ 'is-invalid': nomeError }">
                          <!-- <div class="invalid-feedback">{{ nomeError }}</div> -->
                        </div>
                        <div class="col-md-4">
                          <label class="form-label">Apelido</label>
                          <input type="text" class="form-control form-control-sm" placeholder="Apelido"
                            v-model="apelido" :class="{ 'is-invalid': apelidoError }">
                        </div>
                        <div class="col-md-3">
                          <label class="form-label">Idade</label>
                          <input type="number" class="form-control form-control-sm" placeholder="18 anos"
                            v-model="idade" :class="{ 'is-invalid': idadeError }">
                        </div>
                        <div class="col-md-1">
                          <label class="form-label">Sexo</label>
                          <select class="form-select form-select-sm" v-model="sexo"
                            :class="{ 'is-invalid': sexoError }">
                            <option value="0">M</option>
                            <option value="1">F</option>
                          </select>
                        </div>
                        <div class="col-md-3">
                          <label class="form-label form-label-sm mx-3">Nascido aos</label>
                          <input type="text" class="form-control form-control-sm mx-3" placeholder="10/01/1999"
                            v-model="nascimento" :class="{ 'is-invalid': nascimentoError }" style="width: 118px;">
                        </div>
                        <div class="col-md-4">
                          <label class="form-label form-label-sm">Nome do pai</label>
                          <input type="text" class="form-control form-control-sm" placeholder="Pai" v-model="pai"
                            :class="{ 'is-invalid': paiError }">
                        </div>
                        <div class="col-md-4">
                          <label class="form-label form-label-sm">Nome da mãe</label>
                          <input type="text" class="form-control form-control-sm" placeholder="Mãe" v-model="mae"
                            :class="{ 'is-invalid': maeError }">
                        </div>
                        <div class="col-md-5">
                          <label class="form-label form-label-sm">Província</label>
                          <select v-model="provincia" class="form-select form-select-sm"
                            :class="{ 'is-invalid': provinciaError }">
                            <option value="">Província</option>
                            <option v-for="p in provinciasStore.provincias" :key="p.id" :value="p.id">
                              {{ p.nome }}
                            </option>
                          </select>
                        </div>
                        <div class="col-md-4">
                          <label class="form-label form-label-sm">Município</label>
                          <select v-model="municipio" class="form-select form-select-sm" :disabled="!provincia"
                            :class="{ 'is-invalid': municipioError }">
                            <option value="">Município</option>
                            <option v-for="m in municipiosStore.municipios" :key="m.id" :value="m.id">
                              {{ m.nome }}
                            </option>
                          </select>
                        </div>
                        <div class="col-md-3">
                          <label class="form-label form-label-sm">Bairro</label>
                          <input type="text" class="form-control form-control-sm" placeholder="Bairro" v-model="bairro"
                            :class="{ 'is-invalid': bairroError }">
                        </div>
                        <div class="col-md-2">
                          <label class="form-label form-label-sm">Rua nº</label>
                          <input type="text" class="form-control form-control-sm" placeholder="123" v-model="rua"
                            :class="{ 'is-invalid': ruaError }">
                        </div>
                        <div class="col-md-2">
                          <label class="form-label form-label-sm">Casa nº</label>
                          <input type="text" class="form-control form-control-sm" placeholder="Nº" v-model="casa"
                            :class="{ 'is-invalid': casaError }">
                        </div>

                        <!-- Campo específico de arguido -->
                        <div class="col-md-6" v-if="tipoPessoa === 'arguido'">
                          <label class="form-label form-label-sm">Crime do arguido no processo</label>
                          <input type="text" class="form-control form-control-sm" placeholder="Nome" v-model="crime"
                            :class="{ 'is-invalid': crimeError }">
                        </div>
                        <div class="col-md-2" v-if="tipoPessoa === 'arguido'">
                          <label class="form-label form-label-sm">Pena</label>
                          <input type="text" class="form-control form-control-sm" placeholder="Pena" v-model="pena"
                            :class="{ 'is-invalid': penaError }">
                        </div>
                        <div class="col-md-3" v-if="tipoPessoa === 'arguido'">
                          <label class="form-label form-label-sm">Estado</label>
                          <select id="estado-processo" class="form-select form-select-sm" v-model="estado"
                            :class="{ 'is-invalid': estadoError }">
                            <option value="">Escolher</option>
                            <option v-for="estado in estadosArguidoStore.listaEstados" :key="estado.id"
                              :value="estado.id">
                              {{ estado.descricao }}
                            </option>
                          </select>
                        </div>
                        <div class="col-md-7" v-if="tipoPessoa === 'arguido'">
                          <label class="form-label form-label-sm">Nome da cadeia</label>
                          <input type="text" v-model="cadeiaLocal" class="form-control form-control-sm"
                            placeholder="Comarca de Viana, Província de Luanda"
                            :class="{ 'is-invalid': cadeiaLocalError }">
                        </div>
                        <div class="col-md-2">
                          <div class="mt-6">
                            <button type="submit"
                              class="btn btn-success btn-sm waves-effect waves-light ">Associar</button>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </form>
                </div>
              </div>
              <div class="col-md-6">
                <div class="my-scroll-list-arguido">
                  <div class="accordion accordion-without-arrow mt-0">
                    <div class="accordion-item" v-for="(arguido, index) in processo.arguidos" :key="arguido.idArguido">
                      <h2 class="accordion-header d-flex align-items-center">
                        <button type="button" class="accordion-button" data-bs-toggle="collapse"
                          data-bs-target="#accordionWithIcon-1" aria-expanded="true">
                          <i class="icon-base ti tabler-user me-2"></i>
                          <div class="mx-2"><input class="form-check-input form-input-sm" type="checkbox"></div>
                          <span class="badge bg-danger mb-4 mb-sm-0 me-2"> {{ arguido.arguido.nome }} </span>
                          {{ arguido.crime }} | Julgamento: {{
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
                          Actualmente <span class="fw-bold">{{ arguido.arguido.estado.descricao }}</span>,
                          no estabelecimento prisional de(a) <span class="fw-bold">{{ arguido.cadeiaLocal }}</span>.
                        </div>
                      </div>
                    </div>
                    <!-- Se não encontrar arguidos -->
                    <div v-if="processo.arguidos.length === 0" class="text-center text-muted my-0">
                      <div class="mt-12">
                        <h4 class="mb-2 mx-2">Não há arguidos associados ao processo ⚠️</h4>
                        <img src="@/assets/img/illustrations/page-misc-error.png" alt="page-misc-not-authorized"
                          width="80" class="img-fluid">
                      </div>
                    </div>
                    <!-- Se não encontrar arguidos -->
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
  border-radius: 0.3rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

/* Scroll */
.my-scroll-list-arguido {
  max-height: 310px;
  overflow-y: auto;
  overflow-x: hidden;
}


.my-scroll-list-arguido::-webkit-scrollbar {
  width: 8px;
}

.my-scroll-list-arguido::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.my-scroll-list-arguido::-webkit-scrollbar-thumb {
  background: linear-gradient(270deg, rgba(var(--bs-primary-rgb), 0.7) 0%, #02010c 100%);
  border-radius: 10px;
}

.my-scroll-list-arguido::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(270deg, rgba(var(--bs-primary-rgb), 0.7) 0%, #02010c 100%);
}

/* Scroll */
</style>