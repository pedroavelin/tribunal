import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../../api'

export const useMunicipiosStore = defineStore('municipios', () => {
  const municipios = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchMunicipiosByProvincia(idProvincia) {
    loading.value = true
    error.value = null
    try {
      const res = await api.get(`/provincias/${idProvincia}/municipios`)
      municipios.value = res.data
    } catch (err) {
      error.value = 'Erro ao carregar municípios'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    municipios,
    loading,
    error,
    fetchMunicipiosByProvincia
  }
})
