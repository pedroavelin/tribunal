// src/stores/useProvinciasStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../../api'

export const useProvinciasStore = defineStore('provincias', () => {
  const provincias =   ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchProvincias() {
    loading.value = true
    error.value = null
    try {
      const res = await api.get('/provincias')
      provincias.value = res.data
    } catch (err) {
      error.value = 'Erro ao carregar províncias'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    provincias,
    loading,
    error,
    fetchProvincias
  }
})
