<script setup>
import { ref, onMounted } from 'vue'
import { useProcessoStore } from '@/stores/processo'
import { storeToRefs } from 'pinia'
import Menu from '@/components/layout/Menu.vue'
import Navbar from '@/components/layout/Navbar.vue'
import ModalDetalhesDoProcesso from '@/components/dialog/ModalDetalhesDoProcesso.vue'
import ModalAddProcesso from '@/components/dialog/ModalAddProcesso.vue'

const processoStore = useProcessoStore()
const { processos } = storeToRefs(processoStore)
const modalOpen = ref(false)
const modalAddProcesso = ref(false)
const processoSelecionado = ref(null)

function openModal(processo) {
  processoSelecionado.value = processo
  modalOpen.value = true
}
function OpenModalAddProcesso() {
  modalAddProcesso.value = true
}

// Carrega os processos quando o componente é montado
onMounted(async () => {
  if (processos.value.length === 0) {
    await processoStore.listarProcessos()
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
            <div class="row g-3 mb-2">
              <div class="col-sm-6 col-xl-3">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex align-items-start justify-content-between">
                      <div class="content-left">
                        <span class="text-heading">Preso(s)</span>
                        <div class="d-flex align-items-center my-1">
                          <h4 class="mb-0 me-2">21</h4>
                          <p class="text-success mb-0">(+2)</p>
                        </div>
                      </div>
                      <div class="avatar">
                        <span class="avatar-initial rounded bg-label-primary">
                          <i class="icon-base ti tabler-users icon-26px"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-3">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex align-items-start justify-content-between">
                      <div class="content-left">
                        <span class="text-heading">Solto(s)</span>
                        <div class="d-flex align-items-center my-1">
                          <h4 class="mb-0 me-2">4</h4>
                          <p class="text-success mb-0">(+1)</p>
                        </div>
                      </div>
                      <div class="avatar">
                        <span class="avatar-initial rounded bg-label-danger">
                          <i class="icon-base ti tabler-user-plus icon-26px"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-3">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex align-items-start justify-content-between">
                      <div class="content-left">
                        <span class="text-heading">Condenado(s)</span>
                        <div class="d-flex align-items-center my-1">
                          <h4 class="mb-0 me-2">1</h4>
                          <p class="text-danger mb-0">(-1)</p>
                        </div>
                      </div>
                      <div class="avatar">
                        <span class="avatar-initial rounded bg-label-success">
                          <i class="icon-base ti tabler-user-check icon-26px"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-3">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex align-items-start justify-content-between">
                      <div class="content-left">
                        <span class="text-heading">Em liberdade</span>
                        <div class="d-flex align-items-center my-1">
                          <h4 class="mb-0 me-2">2</h4>
                          <p class="text-success mb-0">(+4)</p>
                        </div>
                      </div>
                      <div class="avatar">
                        <span class="avatar-initial rounded bg-label-warning">
                          <i class="icon-base ti tabler-user-search icon-26px"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Lista de processos  -->
            <div class="my-scroll mb-5">
              <div class="card-body">
                <div class="row gy-2">
                  <div class="col-sm-3 col-lg-3"v-for="processo in processoStore.estatisticasProcessos" :key="processo.id">
                    <div class="card p-2 shadow-5 border-none" @click="openModal(processo)">
                      <div class="rounded-2 text-center mb-4 position-relative">
                        <a href="#!">
                          <img class="img-fluid" src="../../assets/img/pages/app-academy-tutor-1.png"
                            alt="tutor image 1">
                        </a>
                        <div class="position-absolute top-0 start-0 m-2">
                          <div class="spinner-grow spinner-grow-sm text-danger" role="status" v-if="processo.arguidosPresos > 0">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>
                        <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                          <span class="bg-dark bg-opacity-75 text-white px-2 py-1 rounded fs-5 fw-bold">
                            {{ processo.numero }}/{{ processo.ano }}
                          </span>
                        </div>
                      </div>
                      <div class="card-body p-0 pt-0">
                        <div class="d-flex justify-content-between align-items-center mb-0">
                          <span class="badge bg-label-danger">Preso(s): {{ processo.arguidosPresos }}</span>
                          <span class="badge bg-label-success">Solto(s): {{ processo.arguidosSoltos }}</span>
                          <p class="d-flex align-items-center justify-content-center fw-medium gap-1 mb-0">
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <nav aria-label="Page navigation" class="d-flex align-items-center justify-content-center">
              <ul class="pagination mb-0 pagination-rounded">
                <li class="page-item first disabled">
                  <a class="page-link waves-effect" href="javascript:void(0);"><i
                      class="icon-base ti tabler-chevrons-left icon-sm scaleX-n1-rtl"></i></a>
                </li>
                <li class="page-item prev disabled">
                  <a class="page-link waves-effect" href="javascript:void(0);"><i
                      class="icon-base ti tabler-chevron-left icon-sm scaleX-n1-rtl"></i></a>
                </li>
                <li class="page-item">
                  <a class="page-link waves-effect" href="javascript:void(0);">1</a>
                </li>
                <li class="page-item">
                  <a class="page-link waves-effect" href="javascript:void(0);">2</a>
                </li>
                <li class="page-item active">
                  <a class="page-link waves-effect waves-light" href="javascript:void(0);">3</a>
                </li>
                <li class="page-item">
                  <a class="page-link waves-effect" href="javascript:void(0);">4</a>
                </li>
                <li class="page-item">
                  <a class="page-link waves-effect" href="javascript:void(0);">5</a>
                </li>
                <li class="page-item">
                  <a class="page-link waves-effect" href="javascript:void(0);">6</a>
                </li>
                <li class="page-item next">
                  <a class="page-link waves-effect" href="javascript:void(0);"><i
                      class="icon-base ti tabler-chevron-right icon-xs scaleX-n1-rtl"></i></a>
                </li>
                <li class="page-item last">
                  <a class="page-link waves-effect" href="javascript:void(0);"><i
                      class="icon-base ti tabler-chevrons-right icon-sm scaleX-n1-rtl"></i></a>
                </li>
              </ul>
            </nav>
            <!-- Lista de processos  -->
          </div>
          <!-- / Content -->
          <div class="content-backdrop fade"></div>
        </div>
        <!-- Content wrapper -->
      </div>
      <!-- / Layout page -->
    </div>
    <!-- Offcanvas to add new user -->
    <ModalDetalhesDoProcesso v-model="modalOpen" :processo="processoSelecionado" />
    <modalAddProcesso v-model="modalAddProcesso" />
    <div class="buy-now">
      <a href="#!" class="btn btn-primary btn-buy-now" @click="OpenModalAddProcesso()">Novo processo</a>
    </div>
  </div>
  <!-- / Layout wrapper -->
</template>
<style scoped>
div.card .card-body {
  padding: 9px !important;
}


</style>