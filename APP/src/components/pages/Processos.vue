<script setup>
import { onMounted } from 'vue'
import { useProcessoStore } from '@/stores/processo'
import { storeToRefs } from 'pinia'
import Menu from '@/components/layout/Menu.vue'
import Navbar from '@/components/layout/Navbar.vue'

const processoStore = useProcessoStore()
const { processos, loading, error } = storeToRefs(processoStore)

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
            <div class="row g-3 mb-5">
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
            <div class="card h-50">

              <!-- <div class="card-header d-flex justify-content-between align-items-center"></div> -->
              <div class="table-responsive">
                <table class="table table-borderless border-top">
                  <thead class="border-bottom">
                    <tr>
                      <th>Processo(s)</th>
                      <th>Estado</th>
                      <th>Arguido(s) preso(s)</th>
                      <th>Arguido(s) solto(s)</th>
                    </tr>
                  </thead>
                  <!-- {{ processos }} -->
                  <tbody>
                    <tr  v-for="processo in processos" :key="processo.id">
                      <td class="pt-1">
                        <div class="d-flex justify-content-start align-items-center">
                          <div class="me-4">
                            <img src="../../assets/img/icons/payments/visa-img.png" alt="Visa" height="30">
                          </div>
                          <div class="d-flex flex-column text-center">
                            <p class="mb-0 text-heading">{{ processo.numero }}/{{ processo.ano }}</p>
                          </div>
                        </div>
                      </td>

                      <td class="pt-1"><span class="badge bg-label-warning">Em análise</span></td>
                      <td class="pt-1">
                        <p class="mb-0 text-heading">{{ i + 4 }}</p>
                      </td>
                      <td class="pt-1">
                        <div class="d-flex flex-column text-center">
                          <p class="mb-0 text-heading">{{ i + 3 }}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
      <div class="offcanvas-header border-bottom">
        <h5 id="offcanvasAddUserLabel" class="offcanvas-title">Novo processo</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body mx-0 flex-grow-0 p-6 h-100">
        <form class="add-new-user pt-0" id="addNewUserForm" onsubmit="return false">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-6 form-control-validation">
                <label class="form-label" for="add-user-fullname">Número</label>
                <input type="text" class="form-control" id="add-user-fullname" placeholder="Núm. do processo" name="userFullname" aria-label="John Doe">
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
            <input type="text"  class="form-control phone-mask" placeholder="Informe o crime"
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
          <button type="reset" class="btn btn-label-danger" data-bs-dismiss="offcanvas">Cancelar</button>
        </form>
      </div>
    </div>
    <!-- Offcanvas to add new user -->
    <div class="buy-now">
      <a href="#!" class="btn btn-primary btn-buy-now">Novo processo</a>
    </div>

  </div>
  <!-- / Layout wrapper -->
</template>
<style scoped>
div.card .card-body {
  padding: 9px!important;
}
</style>