<template>

  <div class="layout-wrapper layout-content-navbar">
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
            <h4>Auditoria</h4>
            <div class="card">
              <!-- Filtros -->

              <!-- Filtros -->
              <!-- Loading e Erros -->
              <div v-if="logsStore.loading" class="text-center p-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Carregando...</span>
                </div>
                <p class="mt-2">Carregando logs...</p>
              </div>
              <div v-if="logsStore.error" class="alert alert-danger m-3">
                {{ logsStore.error }}
              </div>
              <div class="table-responsive text-nowrap" v-if="!logsStore.loading">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Usuário</th>
                      <th>Acção</th>
                      <th>Recurso</th>
                      <th>Descrição</th>
                      <th width="110">Data/Hora</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    <tr v-for="log in logsStore.logs" :key="log.id">
                      <td>
                        <i class="icon-base ti tabler-lock icon-md text-danger me-1"></i>
                        <span class="fw-medium">{{ log.id }}</span>
                      </td>
                      <td><span v-if="log.user">{{ log.user.username }}</span>
                        <span v-else class="text-muted">Desconhecido</span>
                      </td>
                      <td>
                        <span class="badge" :class="actionBadgeClass(log.action)">
                          {{ log.action }}
                        </span>
                      </td>
                      <td>{{ log.resource }}</td>
                      <td class="text-truncate" style="max-width: 300px;">{{ log.description }}</td>
                      <td>{{ formatDateTime(log.createdAt) }}

                      </td>

                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- Paginação -->
              <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                  Mostrando {{ (logsStore.pagination.page - 1) * logsStore.pagination.limit + 1 }} a
                  {{ Math.min(logsStore.pagination.page * logsStore.pagination.limit, logsStore.pagination.total) }} de
                  {{ logsStore.pagination.total }} registros
                </div>

                <div class="d-flex align-items-center">
                  <select v-model="logsStore.pagination.limit" @change="logsStore.setLimit(logsStore.pagination.limit)"
                    class="form-select form-select-sm me-2" style="width: auto;">
                    <option value="6">6</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>

                  <nav>
                    <ul class="pagination pagination-sm mb-0">
                      <li class="page-item" :class="{ disabled: !logsStore.hasPreviousPage }">
                        <button class="page-link" @click="logsStore.setPage(logsStore.pagination.page - 1)">
                          &laquo;
                        </button>
                      </li>

                      <li class="page-item" v-for="page in visiblePages" :key="page"
                        :class="{ active: page === logsStore.pagination.page }">
                        <button class="page-link" @click="logsStore.setPage(page)">
                          {{ page }}
                        </button>
                      </li>

                      <li class="page-item" :class="{ disabled: !logsStore.hasNextPage }">
                        <button class="page-link" @click="logsStore.setPage(logsStore.pagination.page + 1)">
                          &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
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
  </div>
</template>

<script setup>
import Menu from '@/components/layout/Menu.vue'
import Navbar from '@/components/layout/Navbar.vue'
import { useLogsStore } from '@/stores/logsStore'
import { onMounted, computed } from 'vue'

const logsStore = useLogsStore()

// Carregar logs ao montar o componente
onMounted(() => {
  logsStore.fetchLogs()
})

// Páginas visíveis na paginação
const visiblePages = computed(() => {
  const pages = []
  const current = logsStore.pagination.page
  const total = logsStore.totalPages

  // Mostrar até 3 páginas ao redor da atual
  let start = Math.max(1, current - 2)
  let end = Math.min(total, current + 2)

  // Ajustar se estiver no início ou fim
  if (current <= 3) end = Math.min(3, total)
  if (current >= total - 2) start = Math.max(1, total - 4)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// Aplicar filtros
const applyFilters = () => {
  logsStore.setFilters({ ...logsStore.filters })
}

// Resetar filtros
const resetFilters = () => {
  logsStore.resetFilters()
}

// Atualizar logs
const refreshLogs = () => {
  logsStore.fetchLogs()
}

// Mostrar detalhes do log
const showLogDetails = async (log) => {
  await logsStore.fetchLogDetails(log.id)
  const modal = new Modal(document.getElementById('logDetailsModal'))
  modal.show()
}

// Formatar data/hora
const formatDateTime = (dateString, withSeconds = false) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }

  if (withSeconds) {
    options.second = '2-digit'
  }

  return new Date(dateString).toLocaleString('pt-BR', options)
}

// Classes para badges de ação
const actionBadgeClass = (action) => {
  const classes = {
    'LOGIN_SUCCESS': 'bg-success',
    'LOGIN_FAILED': 'bg-danger',
    'CREATE': 'bg-primary',
    'UPDATE': 'bg-warning text-dark',
    'DELETE': 'bg-danger',
    'default': 'bg-secondary'
  }

  return classes[action] || classes.default
}
</script>

<style scoped>
.logs-container {
  max-width: 99%;
  margin: 0 auto;
}

.badge {
  font-size: 0.75em;
  font-weight: 500;
  text-transform: capitalize;
}

.table td,
.table th {
  vertical-align: middle;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.modal pre {
  max-height: 200px;
  overflow-y: auto;
}
</style>