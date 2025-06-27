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
  const filtroGeral = ref('')


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

  async function filtrarProcessos({ numero = '', ano = '', numeroAno = '' }) {
    // Limpa espaços e garante string
    const filtros = {}
    if (numero) filtros.numero = numero
    if (ano) filtros.ano = ano
    if (numeroAno) filtros.numeroAno = numeroAno

    filtroGeral.value = numeroAno || numero || ano
    loading.value = true
    error.value = null

    try {
      // ✅ Se nenhum filtro for fornecido, recarrega todos os processos
      if (!numero && !ano && !numeroAno) {
        console.log('🔁 Nenhum filtro preenchido. Recarregando todos os processos...')
        await listarProcessos()
        return
      }
      console.log('🔎 Enviando filtros para API:', { numero, ano, numeroAno })
      const response = await api.get('/processos/filtrar', {
        params: filtros,
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })

      // Se sua API responde com { data: [...] }, use isso:
      processos.value = response.data.data ?? response.data
      console.log('✅ Processos filtrados:', processos.value)
      console.log('🔢 Quantidade:', processos.value.length)
      console.log('📄 Conteúdo real:', JSON.parse(JSON.stringify(processos.value)))

    } catch (err) {
      error.value = err.response?.data?.message || 'Erro ao filtrar processos'
    } finally {
      loading.value = false
    }
  }

  async function adicionarProcesso(dadosProcesso) {
    loading.value = true;
    error.value = null;

    try {
      const authStore = useAuthStore();

      // Verifica se o usuário tem os dados necessários
      if (!authStore.user?.idTribunal || !authStore.user?.idSeccao || !authStore.user?.idLetra) {
        throw new Error('Usuário não possui tribunal, seção ou letra associada');
      }

      const response = await api.post('/processos', {
        ...dadosProcesso,
        idTribunal: authStore.user.idTribunal,
        idSeccao: authStore.user.idSeccao,
        idLetra: authStore.user.idLetra
      });

      // Adiciona o novo processo no início da lista reativa
      processos.value.unshift(response.data);
      // processosFiltrados.value.unshift(response.data);

      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
      throw error.value;
    } finally {
      loading.value = false;
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
    filtroGeral,

    // Computed
    estatisticasProcessos,
    totalProcessosComArguidosPresos,
    totalProcessosComArguidosSoltos,

    // Métodos
    filtrarProcessos,
    listarProcessos,
    adicionarProcesso,
    init
  }
})