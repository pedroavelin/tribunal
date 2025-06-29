<script setup>
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/pt';
import { useProcessoStore } from '@/stores/useProcessoStore'
import { ref, watch } from 'vue'

const intervaloData = ref([]);
const filtro = ref('');
const processoStore = useProcessoStore();
let timeout;

watch(filtro, (valor) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const termo = valor.trim();
    console.log('🔍 Filtro digitado:', termo);

    const numeroAnoRegex = /^(\d+)\/(\d+)$/;

    if (!termo) {
      console.log('🔄 Nenhum filtro. Listando todos...');
      processoStore.filtrarProcessos({ numero: '', ano: '', numeroAno: '' });
    } else if (numeroAnoRegex.test(termo)) {
      const [numero, ano] = termo.split('/');
      processoStore.filtrarProcessos({ numero, ano, numeroAno: termo });
    } else if (!isNaN(termo)) {
      processoStore.filtrarProcessos({ numero: termo, ano: '', numeroAno: '' });
    } else {
      processoStore.filtrarProcessos({ numero: '', ano: '', numeroAno: '' });
    }
  }, 300);
});
</script>

<template>
  <nav class="layout-navbar container-xxl navbar-detached navbar navbar-expand-xl align-items-center bg-navbar-theme"
    id="layout-navbar">
    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0   d-xl-none ">
      <a class="nav-item nav-link px-0 me-xl-6" href="javascript:void(0)">
        <i class="icon-base ti tabler-menu-2 icon-md"></i>
      </a>
    </div>
    <div class="navbar-nav-right d-flex align-items-center justify-content-end" id="navbar-collapse">
      <!-- Filtro de processos -->
      <div class="filtro-processos-container">
        <div class="input-group input-group-merge">
          <span class="input-group-text" id="basic-addon-search31"><i class="icon-base ti tabler-search"></i></span>
          <input v-model="filtro" type="text" class="form-control form-control-sm rounded-0" placeholder="Pesquisar processo..."
            aria-label="Search..." aria-describedby="basic-addon-search31">
        </div>
        <!-- <button type="button" class="btn btn-outline-secondary btn-sm waves-effect waves-light">Réu Preso</button> -->
        <!-- <button type="button" class="btn btn-outline-secondary btn-sm waves-effect waves-light">Réu Solto</button> -->
        <date-picker type="daterange" format="DD-MM-YYYY" v-model:value="intervaloData" range-separator=" ~ "
          value-type="format" range lang="pt" class="date-picker-p" placeholder="Seleccione a data" />
          <div class="mx-1">
            <button type="button" class="btn rounded-pill btn-icon btn-danger btn-sm waves-effect waves-light">
            <span class="icon-base ti tabler-pdf icon-22px"></span>
          </button>
          </div>
      </div>
      <!-- /Filtro de processos -->

      <ul class="navbar-nav flex-row align-items-center ms-md-auto">

        <!--/ Language -->
        <!-- Quick links  -->
        <li class="nav-item dropdown-language dropdown">
        </li>
        <!-- Quick links -->
        <!-- Notification -->
        <li class="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
          <a class="nav-link dropdown-toggle hide-arrow btn btn-icon btn-text-secondary rounded-pill"
            href="javascript:void(0);" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
            <span class="position-relative">
              <i class="icon-base ti tabler-bell icon-22px text-heading"></i>
              <span class="badge rounded-pill bg-danger badge-dot badge-notifications border"></span>
            </span>
          </a>
          <ul class="dropdown-menu dropdown-menu-end p-0">
            <li class="dropdown-menu-header border-bottom">
              <div class="dropdown-header d-flex align-items-center py-3">
                <h6 class="mb-0 me-auto">Notification</h6>
                <div class="d-flex align-items-center h6 mb-0">
                  <span class="badge bg-label-primary me-2">8 New</span>
                  <a href="javascript:void(0)" class="dropdown-notifications-all p-2 btn btn-icon"
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Mark all as read"><i
                      class="icon-base ti tabler-mail-opened text-heading"></i></a>
                </div>
              </div>
            </li>
            <li class="dropdown-notifications-list scrollable-container">
              <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-action dropdown-notifications-item">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar">
                        <img src="../../assets/img/avatars/1.png" alt="" class="rounded-circle">
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <h6 class="small mb-1">Tribunal da Comarca de Luanda</h6>
                      <small class="mb-1 d-block text-body">Won the monthly best seller gold
                        badge</small>
                      <small class="text-body-secondary">1h ago</small>
                    </div>
                    <div class="flex-shrink-0 dropdown-notifications-actions">
                      <a href="javascript:void(0)" class="dropdown-notifications-read"><span
                          class="badge badge-dot"></span></a>
                      <a href="javascript:void(0)" class="dropdown-notifications-archive"><span
                          class="icon-base ti tabler-x"></span></a>
                    </div>
                  </div>
                </li>
                <li class="list-group-item list-group-item-action dropdown-notifications-item">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar">
                        <span class="avatar-initial rounded-circle bg-label-danger">CF</span>
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <h6 class="mb-1 small">Charles Franklin</h6>
                      <small class="mb-1 d-block text-body">Accepted your connection</small>
                      <small class="text-body-secondary">12hr ago</small>
                    </div>
                    <div class="flex-shrink-0 dropdown-notifications-actions">
                      <a href="javascript:void(0)" class="dropdown-notifications-read"><span
                          class="badge badge-dot"></span></a>
                      <a href="javascript:void(0)" class="dropdown-notifications-archive"><span
                          class="icon-base ti tabler-x"></span></a>
                    </div>
                  </div>
                </li>
                <li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar">
                        <img src="../../assets/img/avatars/2.png" alt="" class="rounded-circle">
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <h6 class="mb-1 small">New Message ✉️</h6>
                      <small class="mb-1 d-block text-body">You have new message from
                        Natalie</small>
                      <small class="text-body-secondary">1h ago</small>
                    </div>
                    <div class="flex-shrink-0 dropdown-notifications-actions">
                      <a href="javascript:void(0)" class="dropdown-notifications-read"><span
                          class="badge badge-dot"></span></a>
                      <a href="javascript:void(0)" class="dropdown-notifications-archive"><span
                          class="icon-base ti tabler-x"></span></a>
                    </div>
                  </div>
                </li>
                <li class="list-group-item list-group-item-action dropdown-notifications-item">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar">
                        <span class="avatar-initial rounded-circle bg-label-success"><i
                            class="icon-base ti tabler-shopping-cart"></i></span>
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <h6 class="mb-1 small">Whoo! You have new order 🛒</h6>
                      <small class="mb-1 d-block text-body">ACME Inc. made new order
                        $1,154</small>
                      <small class="text-body-secondary">1 day ago</small>
                    </div>
                    <div class="flex-shrink-0 dropdown-notifications-actions">
                      <a href="javascript:void(0)" class="dropdown-notifications-read"><span
                          class="badge badge-dot"></span></a>
                      <a href="javascript:void(0)" class="dropdown-notifications-archive"><span
                          class="icon-base ti tabler-x"></span></a>
                    </div>
                  </div>
                </li>
                <li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar">
                        <img src="../../assets/img/avatars/9.png" alt="" class="rounded-circle">
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <h6 class="mb-1 small">Application has been approved 🚀</h6>
                      <small class="mb-1 d-block text-body">Your ABC project application has been
                        approved.</small>
                      <small class="text-body-secondary">2 days ago</small>
                    </div>
                    <div class="flex-shrink-0 dropdown-notifications-actions">
                      <a href="javascript:void(0)" class="dropdown-notifications-read"><span
                          class="badge badge-dot"></span></a>
                      <a href="javascript:void(0)" class="dropdown-notifications-archive"><span
                          class="icon-base ti tabler-x"></span></a>
                    </div>
                  </div>
                </li>
                <li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar">
                        <span class="avatar-initial rounded-circle bg-label-success"><i
                            class="icon-base ti tabler-chart-pie"></i></span>
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <h6 class="mb-1 small">Monthly report is generated</h6>
                      <small class="mb-1 d-block text-body">July monthly financial report is
                        generated </small>
                      <small class="text-body-secondary">3 days ago</small>
                    </div>
                    <div class="flex-shrink-0 dropdown-notifications-actions">
                      <a href="javascript:void(0)" class="dropdown-notifications-read"><span
                          class="badge badge-dot"></span></a>
                      <a href="javascript:void(0)" class="dropdown-notifications-archive"><span
                          class="icon-base ti tabler-x"></span></a>
                    </div>
                  </div>
                </li>
                <li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar">
                        <img src="../../assets/img/avatars/5.png" alt="" class="rounded-circle">
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <h6 class="mb-1 small">Send connection request</h6>
                      <small class="mb-1 d-block text-body">Peter sent you connection
                        request</small>
                      <small class="text-body-secondary">4 days ago</small>
                    </div>
                    <div class="flex-shrink-0 dropdown-notifications-actions">
                      <a href="javascript:void(0)" class="dropdown-notifications-read"><span
                          class="badge badge-dot"></span></a>
                      <a href="javascript:void(0)" class="dropdown-notifications-archive"><span
                          class="icon-base ti tabler-x"></span></a>
                    </div>
                  </div>
                </li>
                <li class="list-group-item list-group-item-action dropdown-notifications-item">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar">
                        <img src="../../assets/img/avatars/6.png" alt="" class="rounded-circle">
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <h6 class="mb-1 small">New message from Jane</h6>
                      <small class="mb-1 d-block text-body">Your have new message from
                        Jane</small>
                      <small class="text-body-secondary">5 days ago</small>
                    </div>
                    <div class="flex-shrink-0 dropdown-notifications-actions">
                      <a href="javascript:void(0)" class="dropdown-notifications-read"><span
                          class="badge badge-dot"></span></a>
                      <a href="javascript:void(0)" class="dropdown-notifications-archive"><span
                          class="icon-base ti tabler-x"></span></a>
                    </div>
                  </div>
                </li>
                <li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar">
                        <span class="avatar-initial rounded-circle bg-label-warning"><i
                            class="icon-base ti tabler-alert-triangle"></i></span>
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <h6 class="mb-1 small">CPU is running high</h6>
                      <small class="mb-1 d-block text-body">CPU Utilization Percent is currently
                        at
                        88.63%,</small>
                      <small class="text-body-secondary">5 days ago</small>
                    </div>
                    <div class="flex-shrink-0 dropdown-notifications-actions">
                      <a href="javascript:void(0)" class="dropdown-notifications-read"><span
                          class="badge badge-dot"></span></a>
                      <a href="javascript:void(0)" class="dropdown-notifications-archive"><span
                          class="icon-base ti tabler-x"></span></a>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li class="border-top">
              <div class="d-grid p-4">
                <a class="btn btn-primary btn-sm d-flex" href="javascript:void(0);">
                  <small class="align-middle">View all notifications</small>
                </a>
              </div>
            </li>
          </ul>
        </li>
        <!--/ Notification -->
        <!-- User -->
        <li class="nav-item navbar-dropdown dropdown-user dropdown">
          <a class="nav-link dropdown-toggle hide-arrow p-0" href="javascript:void(0);" data-bs-toggle="dropdown">
            <div class="avatar avatar-online">
              <img src="../../assets/img/avatars/1.png" alt="" class="rounded-circle">
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item mt-0" href="pages-account-settings-account.html">
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0 me-2">
                    <div class="avatar avatar-online">
                      <img src="../../assets/img/avatars/1.png" alt="" class="rounded-circle">
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-0">John Doe</h6>
                    <small class="text-body-secondary">Admin</small>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <div class="dropdown-divider my-1 mx-n2"></div>
            </li>
            <li>
              <a class="dropdown-item" href="pages-profile-user.html"> <i
                  class="icon-base ti tabler-user me-3 icon-md"></i><span class="align-middle">My
                  Profile</span>
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="pages-account-settings-account.html"> <i
                  class="icon-base ti tabler-settings me-3 icon-md"></i><span class="align-middle">Settings</span>
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="pages-account-settings-billing.html">
                <span class="d-flex align-items-center align-middle">
                  <i class="flex-shrink-0 icon-base ti tabler-file-dollar me-3 icon-md"></i><span
                    class="flex-grow-1 align-middle">Billing</span>
                  <span class="flex-shrink-0 badge bg-danger d-flex align-items-center justify-content-center">4</span>
                </span>
              </a>
            </li>
            <li>
              <div class="dropdown-divider my-1 mx-n2"></div>
            </li>
            <li>
              <a class="dropdown-item" href="pages-pricing.html"> <i
                  class="icon-base ti tabler-currency-dollar me-3 icon-md"></i><span class="align-middle">Pricing</span>
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="pages-faq.html"> <i
                  class="icon-base ti tabler-question-mark me-3 icon-md"></i><span class="align-middle">FAQ</span>
              </a>
            </li>
            <li>
              <div class="d-grid px-2 pt-2 pb-1">
                <a class="btn btn-sm btn-danger d-flex" href="auth-login-cover.html" target="_blank">
                  <small class="align-middle">Logout</small>
                  <i class="icon-base ti tabler-logout ms-2 icon-14px"></i>
                </a>
              </div>
            </li>
          </ul>
        </li>
        <!--/ User -->
      </ul>
    </div>
  </nav>
</template>
<style>
.date-display {
  margin-top: 8px;
  font-size: 14px;
}

.date-picker-p {
  width: 13rem;
}

.filtro-processos-container {
  display: flex;
  align-items: center;
  gap: 0.1rem;
  flex-wrap: wrap;
}

.filtro-processos-container .btn {
  width: 100px;
  /* Largura fixa para ambos */
}

.filtro-processos-container .input-group {
  flex: 1;
  min-width: 150px;
}

.filtro-processos-container .btn {
  white-space: nowrap;
  border-radius: 0rem !important;
}

@media (max-width: 768px) {
  .filtro-processos-container {
    flex-direction: column;
    align-items: stretch;
  }

  .filtro-processos-container .input-group,
  .filtro-processos-container .btn {
    width: 100%;
  }
}
</style>