<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useProcessoStore } from '@/stores/useProcessoStore'
import { storeToRefs } from 'pinia'
import Menu from '@/components/layout/Menu.vue'
import Navbar from '@/components/layout/Navbar.vue'
// import Footer from '@/components/layout/Footer.vue'
import ModalDetalhesDoProcesso from '@/components/dialog/ModalDetalhesDoProcesso.vue'
import ModalAddProcesso from '@/components/dialog/ModalAddProcesso.vue'

const processoStore = useProcessoStore()
const { processos, estatisticasProcessos, pagination, loading } = storeToRefs(processoStore)
const modalOpen = ref(false)
const modalAddProcesso = ref(false)
const processoSelecionado = ref(null)

//  const store = useProcessoStore();
const currentPage = ref(1);
const pageSize = ref(12);


function openModal(processo) {
  processoSelecionado.value = processo
  modalOpen.value = true
}

// verificar se pode ser eliminado
const atualizarListaDeArguidos = async () => {
  try {
    // Forçar recarregamento completo do processo
    await processoStore.carregarProcesso(processoSelecionado.value.id)
    
    // Atualizar o processo selecionado com os novos dados
    processoSelecionado.value = { 
      ...processoStore.processoAtual,
      arguidos: [...processoStore.processoAtual.arguidos]
    }
    
    // Atualizar também a lista de estatísticas
    await processoStore.listarProcessos()
  } catch (error) {
    console.error('Erro ao atualizar lista de arguidos:', error)
  }
}

function OpenModalAddProcesso() {
  modalAddProcesso.value = true
}
// Funções de paginação
async function goToPage(page) {
  if (page < 1 || page > pagination.value.totalPages) return
  currentPage.value = page
  await processoStore.listarProcessos(page, pageSize.value)
}

async function changePageSize(size) {
  pageSize.value = size
  currentPage.value = 1
  await processoStore.listarProcessos(1, size)
}
// Gera array de páginas para exibição
const pageRange = computed(() => {
  const current = pagination.value.currentPage
  const total = pagination.value.totalPages
  const range = []
  
  // Mostra até 5 páginas ao redor da atual
  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    range.push(i)
  }
  
  return range
})
onMounted(async () => {
  await processoStore.listarProcessos(currentPage.value, pageSize.value)
})
onMounted(async () => {
  if (processos.value.length === 0) {
    await processoStore.listarProcessos()
  }
})

watch(modalAddProcesso, async (newVal) => {
  if (!newVal && !processoStore.filtroGeral) {
    await processoStore.listarProcessos()
  }
})
watch(modalAddProcesso, async (newVal) => {
  if (!newVal && !processoStore.filtroGeral) {
    await processoStore.listarProcessos(currentPage.value, pageSize.value)
  }
})
</script>

<template>
  <!-- Layout wrapper -->
  <div class="layout-wrapper layout-content-navbar  ">
    <div class="layout-container">
      <!-- Menu -->
      <Menu />
      <!-- / Menu -->
      <!-- Layout container -->
      <div class="layout-page">
        <!-- Navbar -->
        <Navbar />
        <!-- / Navbar -->
        <!-- Content wrapper -->
        <div class="content-wrapper">
          <!-- Content -->
          <div class="container-xxl flex-grow-1 container-p-y">

            <!-- Lista de processos  -->
            <div class="my-scroll mb-3">
              <div class="card-body-1">
                <div class="row g-1">
                  <div class="col-sm-2 col-md-2 col-lg-2 mb-0" v-for="processo in estatisticasProcessos"
                    :key="processo.id">
                    <div class="p-1 border" @click="openModal(processo)">
                      <div class="rounded-0 text-center mb-0 position-relative">
                        <a href="#!">
                          <img class="img-fluid img-fluid-process" src="../../assets/img/processo.jpg"
                            alt="tutor image 1">
                        </a>
                        <div class="position-absolute top-0 start-0 m-2">
                          <div class="spinner-grow spinner-grow-sm text-danger" role="status"
                            v-if="processo.arguidosPresos > 0">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>
                        <div
                          class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                          <div class="row">
                            <div class="mb-3">
                              <span class="bg-dark bg-opacity-75 text-white px-2 py-1 rounded-2 fs-6 fw-bold">
                                {{ processo.numero }}/{{ processo.ano }}
                              </span>
                            </div>
                            <div class="">
                              <span class="bg-dark bg-opacity-75 text-white px-2 py-1 rounded-0 fs-6 fw-bold">
                                {{ processo.estado.estado }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="p-0 pt-0">
                        <div class="d-flex justify-content-between align-items-center">
                          <span class="badge bg-label-danger rounded-0 w-50">Preso: {{ processo.arguidosPresos }}</span>
                          <span class="badge bg-label-success rounded-0 w-50">Solto: {{ processo.arguidosSoltos
                            }}</span>
                          <p class="d-flex align-items-center justify-content-center fw-medium gap-1 mb-0"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                   <div v-if="loading" class="text-center py-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
                  <div v-else-if="estatisticasProcessos.length === 0 && !processoStore.loading"
                    class="text-center text-muted my-0">
                    <div class="mt-12">
                      <h4 class="mb-2 mx-2">Nenhum processo encontrado ⚠️</h4>
                      <img src="@/assets/img/illustrations/page-misc-error.png"
                        alt="page-misc-not-authorized" width="130" class="img-fluid">
                    </div>
                  </div>
                </div>
              </div>
            </div>         
                       <!-- Paginação -->
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center gap-2">
                <span class="text-muted">Itens por página:</span>
                <select 
                  class="form-select form-select-sm w-auto" 
                  v-model="pageSize"
                  @change="changePageSize(pageSize)"
                >
                  <option value="12">12</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
              
              <nav aria-label="Page navigation">
                <ul class="pagination pagination pagination-sm justify-content-center mb-0">
                  <li class="page-item prev" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link waves-effect" @click="goToPage(1)">
                      <i class="icon-base ti tabler-chevrons-left icon-xs"></i>
                    </a>
                  </li>
                  <li class="page-item prev" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link waves-effect" @click="goToPage(currentPage - 1)">
                      <i class="icon-base ti tabler-chevron-left icon-xs"></i>
                    </a>
                  </li>
                  
                  <li 
                    class="page-item" 
                    v-for="page in pageRange" 
                    :key="page"
                    :class="{ active: page === currentPage }"
                  >
                    <a class="page-link waves-effect" @click="goToPage(page)">{{ page }}</a>
                  </li>
                  
                  <li class="page-item next" :class="{ disabled: currentPage === pagination.totalPages }">
                    <a class="page-link waves-effect" @click="goToPage(currentPage + 1)">
                      <i class="icon-base ti tabler-chevron-right icon-sm"></i>
                    </a>
                  </li>
                  <li class="page-item next" :class="{ disabled: currentPage === pagination.totalPages }">
                    <a class="page-link waves-effect" @click="goToPage(pagination.totalPages)">
                      <i class="icon-base ti tabler-chevrons-right icon-sm"></i>
                    </a>
                  </li>
                </ul>
              </nav>
              
              <div class="text-muted">
                Mostrando {{ (currentPage - 1) * pageSize + 1 }} a 
                {{ Math.min(currentPage * pageSize, pagination.totalItems) }} de 
                {{ pagination.totalItems }} itens
              </div>
            </div>
            <!-- / Paginação -->
            <!-- Lista de processos  -->
          </div>
          <!-- / Content -->
        </div>
        <!-- Content wrapper -->
      </div>
      <div class="buy-now">
        <a href="#!" class="btn btn-primary btn-buy-now" @click="OpenModalAddProcesso()">Novo processo</a>
      </div>
      <!-- / Layout page -->
    </div>
    <ModalDetalhesDoProcesso v-show="processoSelecionado" v-model="modalOpen" :processo="processoSelecionado" 
    @update:modelValue="showModal = $event"
    @arguido-adicionado="atualizarListaDeArguidos"/>

    <!-- Offcanvas to add new proc -->
    <modalAddProcesso v-model="modalAddProcesso" />
    <!-- Offcanvas to add new proc -->
  </div>
  <!-- / Layout wrapper -->
</template>