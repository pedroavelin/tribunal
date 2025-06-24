import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../../api'
import { useAuthStore } from '@/stores/auth'

  async function listarUtilizadoresDaLetra() {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/users/by-letter/:letra', {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })
      processos.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erro ao carregar users'
      console.error('Erro ao buscar processos:', err)
    } finally {
      loading.value = false
    }
  }