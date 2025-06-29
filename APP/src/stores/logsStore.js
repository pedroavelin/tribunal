import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../../api'
import { useAuthStore } from '@/stores/auth'

export const useLogsStore = defineStore('logs', () => {
  // Estado
  const logs = ref([])
  const loading = ref(false)
  const error = ref(null)
  const selectedLog = ref(null)
  const pagination = ref({
    page: 1,
    limit: 6,
    total: 0
  })
  const filters = ref({
    action: '',
    resource: '',
    userId: '',
    search: '',
    dateFrom: '',
    dateTo: ''
  })

  // Stores
  const authStore = useAuthStore()

  // Getters
  const totalPages = computed(() => Math.ceil(pagination.value.total / pagination.value.limit))
  const hasNextPage = computed(() => pagination.value.page < totalPages.value)
  const hasPreviousPage = computed(() => pagination.value.page > 1)

  // Ações
  const fetchLogs = async (params = {}) => {
    loading.value = true
    error.value = null

    try {
      const queryParams = {
        ...filters.value,
        page: pagination.value.page,
        limit: pagination.value.limit,
        ...params
      }

      // Limpar parâmetros vazios
      Object.keys(queryParams).forEach(key => {
        if (queryParams[key] === '' || queryParams[key] === null) {
          delete queryParams[key]
        }
      })

      const response = await api.get('/logs/audit-logs', {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })

      logs.value = response.data.data
      pagination.value = {
        page: response.data.page,
        limit: response.data.limit,
        total: response.data.total
      }
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  const fetchLogDetails = async (logId) => {
    loading.value = true
    try {
      const response = await api.get(`/logs/${logId}`, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })
      selectedLog.value = response.data
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  const setPage = (page) => {
    pagination.value.page = page
    fetchLogs()
  }

  const setLimit = (limit) => {
    pagination.value.limit = limit
    pagination.value.page = 1
    fetchLogs()
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
    fetchLogs()
  }

  const resetFilters = () => {
    filters.value = {
      action: '',
      resource: '',
      userId: '',
      search: '',
      dateFrom: '',
      dateTo: ''
    }
    fetchLogs()
  }

  const handleError = (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        error.value = 'Sessão expirada. Por favor, faça login novamente.'
        authStore.logout()
      } else {
        error.value = err.response.data?.message || 
                     `Erro ${err.response.status}: ${err.response.statusText}`
      }
    } else if (err.request) {
      error.value = 'Sem resposta do servidor. Verifique sua conexão.'
    } else {
      error.value = err.message || 'Erro desconhecido'
    }
    console.error('Erro na store de logs:', err)
  }

  return {
    // Estado
    logs,
    loading,
    error,
    selectedLog,
    pagination,
    filters,
    
    // Getters
    totalPages,
    hasNextPage,
    hasPreviousPage,
    
    // Ações
    fetchLogs,
    fetchLogDetails,
    setPage,
    setLimit,
    setFilters,
    resetFilters
  }
})