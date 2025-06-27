<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useProcessoStore } from '@/stores/useProcessoStore'
import { storeToRefs } from 'pinia'
import Menu from '@/components/layout/Menu.vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import ModalDetalhesDoProcesso from '@/components/dialog/ModalDetalhesDoProcesso.vue'
import ModalAddProcesso from '@/components/dialog/ModalAddProcesso.vue'

const processoStore = useProcessoStore()
const { processos, estatisticasProcessos } = storeToRefs(processoStore)
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
                  <div v-if="estatisticasProcessos.length === 0 && !processoStore.loading"
                    class="text-center text-muted my-0">
                    <div class="mt-12">
                      <h4 class="mb-2 mx-2">Processo não encontrado ⚠️</h4>
                      <img src="../../assets/img/illustrations/page-misc-error.png"
                        alt="page-misc-not-authorized" width="130" class="img-fluid">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <Footer/> -->
            <!-- Paginação -->
            <nav aria-label="Page navigation" class="d-none">
              <ul class="pagination justify-content-center">
                <li class="page-item prev">
                  <a class="page-link waves-effect">
                    <i class="icon-base ti tabler-chevrons-left icon-sm"></i></a>
                </li>
                <li class="page-item">
                  <a class="page-link waves-effect">1</a>
                </li>
                <li class="page-item">
                  <a class="page-link waves-effect">2</a>
                </li>
                <li class="page-item active">
                  <a class="page-link waves-effect waves-light">3</a>
                </li>
                <li class="page-item">
                  <a class="page-link waves-effect">4</a>
                </li>
                <li class="page-item">
                  <a class="page-link waves-effect">5</a>
                </li>
                <li class="page-item next">
                  <a class="page-link waves-effect"><i class="icon-base ti tabler-chevrons-right icon-sm"></i></a>
                </li>
              </ul>
            </nav>
            <!-- Paginação -->
            <!-- Lista de processos  -->
          </div>
          <!-- / Content -->
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