// stores/useSeccoesStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../../api'
import { useAuthStore } from '@/stores/auth'

export const useSeccoesStore = defineStore('seccoes', () => {
  const authStore = useAuthStore()

  const seccoes = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function listarSeccoes() {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/seccoes', {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })
      seccoes.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erro ao listar secções'
      console.error('Erro ao listar secções:', err)
    } finally {
      loading.value = false
    }
  }

  async function adicionarSeccao(payload) {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/seccoes', payload, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })
      await listarSeccoes()
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erro ao adicionar secção'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    seccoes,
    loading,
    error,
    listarSeccoes,
    adicionarSeccao
  }
})
