import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../../api'
import { useAuthStore } from '@/stores/auth'

export const useProcessoStore = defineStore('processo', () => {
  // Estados da store
  const processos = ref([])
  const loading = ref(false)
  const error = ref(null)
  const authStore = useAuthStore()
  const filtroGeral = ref('')
  const pagination = ref({
    currentPage: 1,
    pageSize: 12,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  })

  async function listarProcessos(page = 1, pageSize = 12) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get('/processos/listar-por-letra', {
        params: { page, pageSize },
        headers: { Authorization: `Bearer ${authStore.accessToken}` }
      });

      // Verifica se a resposta é um array direto (sem paginação)
      if (Array.isArray(response.data)) {
        processos.value = response.data;
        pagination.value = {
          currentPage: 1,
          pageSize: response.data.length,
          totalItems: response.data.length,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false
        };
      }
      // Verifica se a resposta tem estrutura de paginação
      else if (response.data.processos) {
        processos.value = response.data.processos;
        pagination.value = response.data.pagination || {
          currentPage: page,
          pageSize,
          totalItems: response.data.processos.length,
          totalPages: Math.ceil(response.data.processos.length / pageSize),
          hasNextPage: page < Math.ceil(response.data.processos.length / pageSize),
          hasPreviousPage: page > 1
        };
      }
      // Caso padrão (assume que é a lista de processos)
      else {
        processos.value = response.data;
        pagination.value = {
          currentPage: 1,
          pageSize: response.data.length,
          totalItems: response.data.length,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false
        };
      }

    } catch (err) {
      console.error('Erro ao carregar processos:', err);
      error.value = err.response?.data?.message || 'Erro ao carregar processos';

      // Limpa os processos em caso de erro
      processos.value = [];
      pagination.value = {
        currentPage: 1,
        pageSize: 12,
        totalItems: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false
      };
    } finally {
      loading.value = false;
    }
  }

  // Função para mudar de página
  async function goToPage(page) {
    if (page < 1 || page > pagination.value.totalPages) return;
    await listarProcessos(page, pagination.value.pageSize);
  }

  // Função para alterar o tamanho da página
  async function setPageSize(size) {
    await listarProcessos(1, size);
  }


  async function filtrarProcessos({ numero = '', ano = '', numeroAno = '' }, page = 1, pageSize = 12) {
    const filtros = {}
    if (numero) filtros.numero = numero
    if (ano) filtros.ano = ano
    if (numeroAno) filtros.numeroAno = numeroAno

    filtroGeral.value = numeroAno || numero || ano
    loading.value = true
    error.value = null

    try {
      if (!numero && !ano && !numeroAno) {
        console.log('🔁 Nenhum filtro preenchido. Recarregando todos os processos...')
        await listarProcessos(page, pageSize)
        return
      }

      console.log('🔎 Enviando filtros para API:', { numero, ano, numeroAno })
      const response = await api.get('/processos/filtrar', {
        params: { ...filtros, page, pageSize },
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      })
      console.log('📥 Resposta da API:', response.data)

      processos.value = response.data.data || [];

      if (response.data.pagination) {
        pagination.value = response.data.pagination;
      } else {
        pagination.value = {
          currentPage: 1,
          pageSize: response.data.data.length,
          totalItems: response.data.count,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false
        };

      }
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
    const processList = Array.isArray(processos.value) ? processos.value : [];

    return processList.map(processo => {
      const arguidos = processo.arguidos || [];
      const presos = arguidos.filter(arguido =>
        arguido.arguido?.estado?.descricao === 'Preso'
      ).length;
      const soltos = arguidos.filter(arguido =>
        arguido.arguido?.estado?.descricao === 'Solto'
      ).length;

      return {
        ...processo,
        totalArguidos: arguidos.length,
        arguidosPresos: presos,
        arguidosSoltos: soltos
      };
    });
  });

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

  async function associarArguidoAoProcesso(numeroProcesso, anoProcesso, dadosArguido) {
    loading.value = true
    error.value = null

    try {
      const response = await api.post(`/processos/${numeroProcesso}/${anoProcesso}/arguidos`, dadosArguido, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      }
      )
      // 🔁 Recarrega todos os processos após associação
      await listarProcessos()

      return response.data
    } catch (err) {
      const mensagem = err.response?.data?.message || err.message || 'Erro ao associar arguido ao processo'
      error.value = mensagem
      console.error('Erro ao associar arguido:', mensagem)
      throw new Error(mensagem)
    } finally {
      loading.value = false
    }
  }

  function init() {
    if (processos.value.length === 0) {
      listarProcessos(pagination.value.currentPage, pagination.value.pageSize);
    }
  }

  init()

  return {
    // Estados
    processos,
    loading,
    error,
    filtroGeral,
    pagination,

    // Computed
    estatisticasProcessos,
    totalProcessosComArguidosPresos,
    totalProcessosComArguidosSoltos,

    // Métodos
    filtrarProcessos,
    listarProcessos,
    adicionarProcesso,
    associarArguidoAoProcesso,
    goToPage,
    setPageSize,
    init
  }
})