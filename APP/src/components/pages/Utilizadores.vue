<script setup>
import Menu from '@/components/layout/Menu.vue'
import Navbar from '@/components/layout/Navbar.vue'
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
            <div class="row g-3">
              <!-- View sales -->
              <div class="col-xl-4 d-none">
                <div class="card">
                  <div class="d-flex align-items-end row">
                    <div class="col-7">
                      <div class="card-body text-nowrap">
                        <h5 class="card-title mb-0">Congratulations John! 🎉</h5>
                        <p class="mb-0">Best seller of the month</p>
                      </div>
                    </div>
                    <div class="col-5 text-center text-sm-left">
                      <div class="card-body pb-0 px-0 px-md-4">
                        <img src="../../assets/img/illustrations/card-advance-sale.png" height="75" alt="view sales">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- View sales -->

              <!-- Statistics -->
              <div class="col-xl-8 col-md-12 d-none">
                <div class="card">
                  <div class="card-body d-flex align-items-end">
                    <div class="w-100">
                      <div class="row gy-3">
                        <div class="col-md-3 col-6">
                          <div class="d-flex align-items-center">
                            <div class="badge rounded bg-label-primary me-4 p-2"><i
                                class="icon-base ti tabler-chart-pie-2 icon-lg"></i></div>
                            <div class="card-info">
                              <h5 class="mb-0">Total</h5>
                              <small>????</small>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3 col-6">
                          <div class="d-flex align-items-center">
                            <div class="badge rounded bg-label-info me-4 p-2"><i
                                class="icon-base ti tabler-users icon-lg"></i></div>
                            <div class="card-info">
                              <h5 class="mb-0">Online</h5>
                              <small>Customers</small>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3 col-6">
                          <div class="d-flex align-items-center">
                            <div class="badge rounded bg-label-danger me-4 p-2"><i
                                class="icon-base ti tabler-shopping-cart icon-lg"></i></div>
                            <div class="card-info">
                              <h5 class="mb-0">Offline</h5>
                              <small>Products</small>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3 col-6">
                          <div class="d-flex align-items-center">
                            <div class="badge rounded bg-label-success me-4 p-2"><i
                                class="icon-base ti tabler-currency-dollar icon-lg"></i></div>
                            <div class="card-info">
                              <h5 class="mb-0">Blocklist</h5>
                              <small>Revenue</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--/ Statistics -->
              <div class="app-chat overflow-hidden">
                <div class="row g-0">
                  <!-- Chat & Contacts -->
                  <div class="col app-chat-contacts app-sidebar flex-grow-0 overflow-hidden border-end"
                    id="app-chat-contacts">
                    <div class="sidebar-header h-px-75 px-5 border-bottom d-flex align-items-center">
                      <div class="d-flex align-items-center me-6 me-lg-0">
                        <div class="flex-shrink-0 avatar avatar-online me-4" data-bs-toggle="sidebar"
                          data-overlay="app-overlay-ex" data-target="#app-chat-sidebar-left">
                          <img class="user-avatar rounded-circle cursor-pointer" src="../../assets/img/avatars/1.png"
                            alt="Avatar">
                        </div>
                        <div class="flex-grow-1 input-group input-group-merge">
                          <span class="input-group-text" id="basic-addon-search31"><i
                              class="icon-base ti tabler-search icon-xs"></i></span>
                          <input type="text" class="form-control chat-search-input" placeholder="Search..."
                            aria-label="Search..." aria-describedby="basic-addon-search31">
                        </div>
                      </div>
                      <i class="icon-base ti tabler-x icon-lg cursor-pointer position-absolute top-50 end-0 translate-middle d-lg-none d-block"
                        data-overlay="" data-bs-toggle="sidebar" data-target="#app-chat-contacts"></i>
                    </div>
                    <div class="sidebar-body ps ps--active-y">
                      <!-- Chats -->
                      <ul class="list-unstyled chat-contact-list py-2 mb-0" id="chat-list">
                        <li class="chat-contact-list-item chat-contact-list-item-title mt-0">
                          <h5 class="text-primary mb-0">Chats</h5>
                        </li>
                        <li class="chat-contact-list-item chat-list-item-0 d-none">
                          <h6 class="text-body-secondary mb-0">No Chats Found</h6>
                        </li>
                        <li class="chat-contact-list-item mb-1 active">
                          <a class="d-flex align-items-center">
                            <div class="flex-shrink-0 avatar avatar-online">
                              <img src="../../assets/img/avatars/13.png" alt="Avatar" class="rounded-circle">
                            </div>
                            <div class="chat-contact-info flex-grow-1 ms-4">
                              <div class="d-flex justify-content-between align-items-center">
                                <h6 class="chat-contact-name text-truncate m-0 fw-normal">Pedro A. Epalanga</h6>
                                <small class="chat-contact-list-item-time">5 Minutes</small>
                              </div>
                              <small class="chat-contact-status text-truncate">NextJS developer</small>
                            </div>
                          </a>
                        </li>
                      </ul>
                      <!-- Contacts -->
                    </div>
                  </div>
                  <!-- /Chat contacts -->
                  <!-- Chat History -->
                  <div class="col app-chat-history d-block" id="app-chat-history">
                    <div class="chat-history-wrapper">
                      <div class="chat-history-header border-bottom">
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="d-flex overflow-hidden align-items-center">
                            <i class="icon-base ti tabler-menu-2 icon-lg cursor-pointer d-lg-none d-block me-4"
                              data-bs-toggle="sidebar" data-overlay="" data-target="#app-chat-contacts"></i>
                            <div class="flex-shrink-0 avatar avatar-online">
                              <img src="../../assets/img/avatars/4.png" alt="Avatar" class="rounded-circle"
                                data-bs-toggle="sidebar" data-overlay="" data-target="#app-chat-sidebar-right">
                            </div>
                            <div class="chat-contact-info flex-grow-1 ms-4">
                              <h6 class="m-0 fw-normal">Pedro A. Epalanga</h6>
                              <small class="user-status text-body">NextJS developer</small>
                            </div>
                          </div>
                          <div class="d-flex align-items-center">
                            <span class="btn btn-text-secondary cursor-pointer d-sm-inline-flex d-none me-1 btn-icon rounded-pill waves-effect">
                              <i class="icon-base ti tabler-phone icon-22px"></i>
                            </span>
                            <span class="btn btn-text-secondary cursor-pointer d-sm-inline-flex d-none me-1 btn-icon rounded-pill waves-effect">
                              <i class="icon-base ti tabler-video icon-22px"></i>
                            </span>
                            <span class="btn btn-text-secondary cursor-pointer d-sm-inline-flex d-none me-1 btn-icon rounded-pill waves-effect">
                              <i class="icon-base ti tabler-search icon-22px"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                        <div class="col app-chat-conversation d-flex align-items-center justify-content-center flex-column" id="app-chat-conversation">
                          <div class="bg-label-primary p-8 rounded-circle">
                            <i class="icon-base ti tabler-message-2 icon-50px"></i>
                          </div>
                          <p class="my-4">Seleccione um utilizador para ver mais detalhes</p>
                          <button class="btn btn-primary app-chat-conversation-btn waves-effect waves-light" id="app-chat-conversation-btn">Select Contact</button>
                        </div>
                    </div>
                  </div>
                  <!-- /Chat History -->
                </div>
              </div>
            </div>
          </div>
          <!-- / Content -->
        </div>
        <!-- Content wrapper -->
      </div>
      <!-- / Layout page -->
    </div>
        <div class="buy-now">
      <a href="#!" class="btn btn-primary btn-buy-now">Novo utilizador</a>
    </div>
  </div>
  <!-- / Layout wrapper -->
</template>