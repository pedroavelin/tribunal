<script setup lang="ts">

</script>
<template>
      <aside id="layout-menu" class="layout-menu menu-vertical menu">
        <div class="app-brand demo ">
          <router-link to="/dashboard" class="app-brand-link">
            <span class="app-brand-logo demo">
              <span class="text-primary">
                <svg width="32" height="22" viewbox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                    fill="currentColor"></path>
                  <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z" fill="#161616"></path>
                  <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd"
                    d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z" fill="#161616"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                    fill="currentColor"></path>
                </svg>
              </span>
            </span>
            <span class="app-brand-text demo menu-text fw-bold ms-3">Secção</span>
          </router-link>
        </div>

        <div class="menu-inner-shadow"></div>
        <ul class="menu-inner py-1">
          <!-- Dashboards -->
          <li class="menu-item" :class="{ 'active': $route.path === '/dashboard' }">
            <router-link class="menu-link" to="/dashboard">
                  <i class="menu-icon icon-base ti tabler-smart-home"></i>
                  <div data-i18n="Dashboards">Dashboard</div>
            </router-link>
          </li>
          <li class="menu-item" :class="{ 'active': $route.path === '/processos' }">
            <router-link class="menu-link" to="/processos">
                  <i class="menu-icon icon-base ti tabler-smart-home"></i>
                  <div data-i18n="Dashboards">Processo(s)</div>
            </router-link>
          </li>
          <!-- Apps & Pages -->
          <li class="menu-header small">
            <span class="menu-header-text" data-i18n="Apps & Pages">Gestão </span>
          </li>
          <li class="menu-item" :class="{ 'active': $route.path === '/tribunais' }">
            <router-link to="/tribunais" class="menu-link">
              <i class="menu-icon icon-base ti tabler-mail"></i>
              <div data-i18n="Email">Tribunais</div>
            </router-link>
          </li>
          <li class="menu-item" :class="{ 'active': $route.path === '/seccoes' }">
            <router-link to="/seccoes" class="menu-link">
              <i class="menu-icon icon-base ti tabler-messages"></i>
              <div data-i18n="Chat">Secções</div>
            </router-link>
          </li>
          <li class="menu-item" :class="{ 'active': $route.path === '/documentos' }">
            <router-link to="/documentos" class="menu-link">
              <i class="menu-icon icon-base ti tabler-calendar"></i>
              <div data-i18n="Calendar">Documentos</div>
            </router-link>
          </li>
          <!-- e-commerce-app menu start -->
          <!-- Misc -->
          <li class="menu-header small">
            <span class="menu-header-text" data-i18n="Misc">Acessos</span>
          </li>
          <li class="menu-item" :class="{ 'active': $route.path === '/utilizadores' }">
            <router-link to="/utilizadores" class="menu-link">
              <i class="menu-icon icon-base ti tabler-user"></i>
              <div data-i18n="Support">Utilizador(s)</div>
            </router-link>
          </li>
          <li class="menu-item" :class="{ 'active': $route.path === '/papeis' }">
            <router-link to="/papeis" class="menu-link">
              <i class="menu-icon icon-base ti tabler-lifebuoy"></i>
              <div data-i18n="Support">Papeis</div>
            </router-link>
          </li>
          <li class="menu-item" :class="{ 'active': $route.path === '/' }">
          <a href="" class="menu-link">
              <i class="menu-icon icon-base ti tabler-file-description"></i>
              <div data-i18n="Documentation">Permissões</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="" class="menu-link">
              <i class="menu-icon icon-base ti tabler-file-description"></i>
              <div data-i18n="Documentation">Auditoria</div>
            </a>
          </li>
        </ul>


      </aside>

      <div class="menu-mobile-toggler d-xl-none rounded-1">
        <a href="#!" class="layout-menu-toggle menu-link text-large text-bg-secondary p-2 rounded-1">
          <i class="ti tabler-menu icon-base"></i>
          <i class="ti tabler-chevron-right icon-base"></i>
        </a>
      </div>
</template>

<style scoped>
aside{
  border-top-right-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem;
}
</style>