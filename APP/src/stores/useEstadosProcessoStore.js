// stores/useEstadosProcessoStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../../api'
import { useAuthStore } from '@/stores/auth'

export const useEstadosProcessoStore = defineStore('estadosProcesso', () => {
  const estados = ref([])
  const loading = ref(false)
  const error = ref(null)

  const authStore = useAuthStore()

  const listaEstados = computed(() => estados.value)

  async function fetchEstados() {
    loading.value = true
    error.value = null

    try {
      const res = await api.get('/estadosDoProcesso', {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })
      estados.value = res.data
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Erro ao buscar estados dos processos'
      console.error('Erro ao buscar estados dos processos:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    estados,
    loading,
    error,
    listaEstados,
    fetchEstados
  }
})