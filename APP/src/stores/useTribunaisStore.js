// stores/useTribunaisStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../../api'
import { useAuthStore } from '@/stores/auth' 

export const useTribunaisStore = defineStore('tribunais', () => {
  const tribunais = ref([])
  const loading = ref(false)
  const error = ref(null)

  const authStore = useAuthStore()

  const listaTribunais = computed(() => tribunais.value)

  const tribunaisCompletos = computed(() =>
    tribunais.value.map(t => ({
      id: t.id,
      nome: t.nome,
      municipio: t.municipio?.nome || '',
      provincia: t.municipio?.provincia?.nome || ''
    }))
  )

  async function adicionarTribunal(novoTribunal) {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/tribunal', novoTribunal, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })
      tribunais.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erro ao adicionar tribunal'
      console.error('Erro ao adicionar tribunal:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function getAllTribunais() {
    loading.value = true
    error.value = null

    try {
      const res = await api.get('tribunal', {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })
      tribunais.value = res.data
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Erro ao buscar tribunais'
    } finally {
      loading.value = false
    }
  }

  async function fetchTribunais() {
    loading.value = true
    error.value = null

    try {
      const res = await api.get('tribunal/with-municipio', {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })
      tribunais.value = res.data
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Erro ao buscar tribunais'
    } finally {
      loading.value = false
    }
  }

  return {
    getAllTribunais,
    tribunais,
    loading,
    error,
    listaTribunais,
    tribunaisCompletos,
    fetchTribunais,
    adicionarTribunal
  }
})
