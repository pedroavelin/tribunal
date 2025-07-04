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
            <div class="row mb-12 g-6">
              <div v-for="n in 6" :key="n" class="col-md-6 col-lg-4">
                <div class="card">
                  <div class="card-body">
                    <h6 class="card-title">Special title treatment</h6>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="javascript:void(0)" class="btn btn-primary btn-sm waves-effect waves-light">Detalhes do passe</a>
                  </div>
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