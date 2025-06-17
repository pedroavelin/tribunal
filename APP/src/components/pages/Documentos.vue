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
                     <div class="faq-header d-flex flex-column justify-content-center align-items-center h-px-300 position-relative">
            <img src="../../assets/img/pages/header.png" class="scaleX-n1-rtl faq-banner-img z-n1 rounded" alt="background image">
            <h4 class="text-center mb-2">Hello, how can we help?</h4>
            <p class="text-center mb-0 px-4">or choose a category to quickly find the help you need</p>
            <div class="input-wrapper mt-4 input-group input-group-merge">
              <span class="input-group-text" id="basic-addon1"><i class="icon-base ti tabler-search icon-xs"></i></span>
              <input type="text" class="form-control" placeholder="Search articles..." aria-label="Search" aria-describedby="basic-addon1">
            </div>
          </div>
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
            <label class="form-label" for="country">Estado do processo</label>
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

  </div>
  <!-- / Layout wrapper -->
</template>