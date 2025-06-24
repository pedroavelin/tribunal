import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../../api'
import { useAuthStore } from '@/stores/auth'

export const useProcessoStore = defineStore('processo', () => {
  // Estados da store
  const processos = ref([]) // Lista original sem ordenação
  const loading = ref(false)
  const error = ref(null)
  const authStore = useAuthStore()

  // Função para buscar processos (mantém ordem original da API)
  async function listarProcessos() {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/processos/listar-por-letra', {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })
      processos.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erro ao carregar processos'
      console.error('Erro ao buscar processos:', err)
    } finally {
      loading.value = false
    }
  }
  async function adicionarProcesso(dadosProcesso) {
    loading.value = true
    error.value = null
    
    try {
      // Verifica campos obrigatórios
      if (!dadosProcesso.numero || !dadosProcesso.ano || !dadosProcesso.crime ||
          !dadosProcesso.idTribunal || !dadosProcesso.idSeccao || 
          !dadosProcesso.idEstadoProcesso) {
        throw new Error('Todos os campos obrigatórios devem ser preenchidos')
      }

      const response = await api.post('/processos', {
        ...dadosProcesso,
        idLetra: authStore.user?.idLetra // Usa a letra do usuário logado
      }, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })

      // Adiciona o novo processo no início da lista
      processos.value = [response.data, ...processos.value]
      return response.data
      
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Erro ao adicionar processo'
      console.error('Erro ao adicionar processo:', err)
      throw error.value // Permite tratamento no componente
    } finally {
      loading.value = false
    }
  }
// Computed property que retorna estatísticas completas
  const estatisticasProcessos = computed(() => {
    return processos.value.map(processo => {
      const arguidos = processo.arguidos || []
      
      const presos = arguidos.filter(arguido => 
        arguido.arguido?.estado?.descricao === 'Preso'
      ).length
      
      const soltos = arguidos.filter(arguido => 
        arguido.arguido?.estado?.descricao === 'Solto'
      ).length
      
      return {
        ...processo,
        totalArguidos: arguidos.length,
        arguidosPresos: presos,
        arguidosSoltos: soltos
      }
    })
  })
  // Retorna o total de processos com pelo menos 1 arguido preso
  const totalProcessosComArguidosPresos = computed(() => {
    return estatisticasProcessos.value.filter(
      p => p.arguidosPresos > 0
    ).length
  })

  // Retorna o total de processos com pelo menos 1 arguido solto
  const totalProcessosComArguidosSoltos = computed(() => {
    return estatisticasProcessos.value.filter(
      p => p.arguidosSoltos > 0
    ).length
  });
  
  // Função de inicialização
  function init() {
    if (processos.value.length === 0) {
      listarProcessos()
    }
  }

  // Chamada inicial
  init()

  return {
    // Estados
    processos, // Lista original sem ordenação
    loading,
    error,
    // Computed
    estatisticasProcessos,
    totalProcessosComArguidosPresos,
    totalProcessosComArguidosSoltos,
    
    // Métodos
    listarProcessos,
    adicionarProcesso,
    init
  }
})