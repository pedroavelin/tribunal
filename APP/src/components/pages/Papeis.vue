<script setup>
import Menu from '@/components/layout/Menu.vue'
import Navbar from '@/components/layout/Navbar.vue'
import { usePapelStore } from '@/stores/usePapelStore'
import { onMounted, computed } from 'vue'

const papelStore = usePapelStore()

onMounted(() => {
  papelStore.fetchPapeis().then(() => {
    console.log('Pagination data:', {
      totalPages: papelStore.pagination.totalPages,
      currentPage: papelStore.pagination.page,
      totalItems: papelStore.pagination.totalItems
    })
  })
})

const papeis = computed(() => papelStore.papeis)
const isLoading = computed(() => papelStore.loading)
// const totalPages = computed(() => papelStore.pagination.totalPages)
const totalPages = computed(() => {
  const pag = papelStore.pagination
  return Math.ceil(pag.total / pag.limit)
})
const currentPage = computed(() => papelStore.pagination.page)
const hasPapeis = computed(() => papeis.value.length > 0)

// const setPage = async (page) => {
//   await papelStore.setPage(page)
// }
const setPage = async (page) => {
  console.log('Changing to page:', page)
  await papelStore.setPage(page)
  console.log('After page change:', {
    current: papelStore.pagination.page,
    items: papelStore.papeis.length
  })
}
</script>

<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <Menu />
      <div class="layout-page">
        <Navbar />
        <div class="content-wrapper">
          <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="mb-1">Lista de papeis</h4>
            <p class="mb-6">A role provided access to predefined menus and features.</p>

            <!-- Skeleton Loaders -->
            <div v-if="isLoading" class="row g-6">
              <div v-for="n in 6" :key="n" class="col-xl-4 col-lg-6 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <div class="skeleton-loader w-25 h-20"></div>
                      <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                        <li v-for="i in 3" :key="i" class="avatar pull-up">
                          <div class="skeleton-loader rounded-circle" style="width: 32px; height: 32px;"></div>
                        </li>
                        <li class="avatar">
                          <div class="skeleton-loader rounded-circle" style="width: 32px; height: 32px;"></div>
                        </li>
                      </ul>
                    </div>
                    <div class="d-flex justify-content-between align-items-end">
                      <div class="role-heading">
                        <div class="skeleton-loader w-50 h-25 mb-2"></div>
                        <div class="skeleton-loader w-75 h-15"></div>
                      </div>
                      <div class="skeleton-loader icon-md" style="width: 24px; height: 24px;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Conteúdo real -->
            <template v-else>
              <div class="row g-2 mb-3">
                <div v-for="papel in papeis" :key="papel.id" class="col-xl-3 col-lg-4 col-md-3">
                  <!-- Seu card de papel existente -->
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <h6 class="fw-normal mb-0 text-body">Total {{ papel.users_count || 0 }} users</h6>
                        <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                          <template v-if="papel.users && papel.users.length > 0">
                            <li v-for="(user, index) in papel.users.slice(0, 3)" :key="index" data-bs-toggle="tooltip"
                              data-popup="tooltip-custom" data-bs-placement="top" class="avatar pull-up"
                              :aria-label="user.description" :data-bs-original-title="user.description">
                              <img v-if="user.avatar" class="rounded-circle" :src="user.avatar" alt="Avatar">
                              <span v-else class="avatar-initial rounded-circle bg-label-primary">
                                {{ user.description.charAt(0) }}
                              </span>
                            </li>
                          </template>
                          <li v-if="papel.users_count > 3" class="avatar">
                            <span class="avatar-initial rounded-circle pull-up" data-bs-toggle="tooltip"
                              data-bs-placement="bottom" :data-bs-original-title="`${papel.users_count - 3} more`">
                              +{{ papel.users_count - 3 }}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div class="d-flex justify-content-between align-items-end">
                        <div class="role-heading">
                          <h5 class="mb-1">{{ papel.description }}</h5>
                          <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#addRoleModal"
                            class="role-edit-modal"><span>Edit
                              Role</span></a>
                        </div>
                        <a href="javascript:void(0);"><i class="icon-base ti tabler-copy icon-md text-heading"></i></a>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Card para adicionar novo papel -->
                <div class="col-xl-3 col-lg-4 col-md-3">
                  <div class="card h-100">
                    <div class="row h-100">
                      <div class="col-sm-5">
                        <div class="d-flex align-items-end h-100 justify-content-center mt-sm-0 mt-4">
                          <img src="../../assets/img/illustrations/add-new-roles.png" class="img-fluid" alt="Image"
                            width="83">
                        </div>
                      </div>
                      <div class="col-sm-7">
                        <div class="card-body text-sm-end text-center ps-sm-0">
                          <button data-bs-target="#addRoleModal" data-bs-toggle="modal"
                            class="btn btn-sm btn-primary text-nowrap add-new-role waves-effect waves-light">
                            Adicionar novo papel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Paginação -->
              <div class="row">
                <div class="col-12">
                  <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                      <li class="page-item prev" :class="{ disabled: currentPage === 1 || isLoading }">
                        <a class="page-link" href="javascript:void(0);" @click="setPage(currentPage - 1)"
                          :aria-disabled="currentPage === 1 || isLoading">
                          <i class="tf-icon bx bx-chevron-left"></i>
                        </a>
                      </li>

                      <li v-for="page in totalPages" :key="page" class="page-item"
                        :class="{ active: currentPage === page, disabled: isLoading }">
                        <a class="page-link" href="javascript:void(0);" @click="setPage(page)"
                          :aria-disabled="isLoading">
                          {{ page }}
                        </a>
                      </li>

                      <li class="page-item next" :class="{ disabled: currentPage === totalPages || isLoading }">
                        <a class="page-link" href="" @click="setPage(currentPage + 1)"
                          :aria-disabled="currentPage === totalPages || isLoading">
                          <i class="tf-icon bx bx-chevron-right"></i>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para os Skeletons */
.skeleton-loader {
  background-color: #eee;
  background-image: linear-gradient(90deg, #eee 0px, #f5f5f5 40px, #eee 80px);
  background-size: 200%;
  animation: shimmer 1.5s infinite linear;
  border-radius: 4px;
}

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }

  100% {
    background-position: 200px 0;
  }
}

.skeleton-loader.w-25 {
  width: 25%;
}

.skeleton-loader.w-50 {
  width: 50%;
}

.skeleton-loader.w-75 {
  width: 75%;
}

.skeleton-loader.h-15 {
  height: 15px;
}

.skeleton-loader.h-20 {
  height: 20px;
}

.skeleton-loader.h-25 {
  height: 25px;
}

.skeleton-loader.icon-md {
  width: 24px;
  height: 24px;
}

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

@media (forced-colors: active) {
  .skeleton-loader {
    background-color: CanvasText;
    forced-color-adjust: none;
  }
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>