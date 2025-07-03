import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../../api'
import { useAuthStore } from '@/stores/auth'

export const usePapelStore = defineStore('papel', () => {
  // Estado
  const papeis = ref([])
  const papelAtual = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const pagination = ref({
    page: 1,
    limit: 8,
    total: 1
  })
  
  const filters = ref({
    name: '',
    description: '',
    isActive: null,
    search: ''
  })

  // Stores
  const authStore = useAuthStore()

  // Getters
  const totalPages = computed(() => Math.ceil(pagination.value.total / pagination.value.limit))
  const hasNextPage = computed(() => pagination.value.page < totalPages.value)
  const hasPreviousPage = computed(() => pagination.value.page > 1)
  const papeisAtivos = computed(() => papeis.value.filter(p => p.isActive))

  // Ações
const fetchPapeis = async (params = {}) => {
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

    const response = await api.get('/roles', {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    })

    // Correção aqui - acesse response.data diretamente
    papeis.value = response.data.data // Array de papeis
    pagination.value = {
      page: response.data.page,
      limit: response.data.limit,
      total: response.data.total
    }

    // DEBUG: Verifique os valores
    console.log('Dados de paginação:', {
      page: pagination.value.page,
      limit: pagination.value.limit,
      total: pagination.value.total,
      calculatedPages: Math.ceil(pagination.value.total / pagination.value.limit)
    })

  } catch (err) {
    handleError(err)
  } finally {
    loading.value = false
  }
}

  const fetchPapelDetails = async (papelId) => {
    loading.value = true
    try {
      const response = await api.get(`/roles/${papelId}`, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })
      papelAtual.value = response.data
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  const criarPapel = async (dadosPapel) => {
    // Implementação similar com tratamento de erro
  }

  // ... outros métodos específicos para papeis

const setPage = async (page) => {
  const targetPage = Math.max(1, Math.min(page, totalPages.value))
  
  if (targetPage !== pagination.value.page) {
    pagination.value.page = targetPage
    await fetchPapeis() 
  }
}
  const setLimit = (limit) => { /*...*/ }
  const setFilters = (newFilters) => { /*...*/ }
  const resetFilters = () => { /*...*/ }

  const handleError = (err) => { /* Manter igual */ }

  return {
    // Estado
    papeis,
    papelAtual,
    loading,
    error,
    pagination,
    filters,
    
    // Getters
    totalPages,
    hasNextPage,
    hasPreviousPage,
    papeisAtivos,
    
    // Ações
    fetchPapeis,
    fetchPapelDetails,
    criarPapel,
    setPage,
    setLimit,
    setFilters,
    resetFilters
  }
})