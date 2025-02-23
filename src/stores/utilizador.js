import { defineStore } from 'pinia';
import https from '@/services/https.js';
import { useAuth } from '@/stores/auth';

export const useUtilizadorStore = defineStore('utilizador', {
  state: () => ({
    utilizador: null,
    carregando: false,
    erro: null
  }),

  actions: {
    async detalhesUtilizador() {
      this.carregando = true;
      this.erro = null;
      try {
        const authStore = useAuth(); // Obtém a store de autenticação
        const token = authStore.token; // Obtém o token da store auth

        if (!token) {
          throw new Error("Token de autenticação não encontrado!");
        }
        const response = await https.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.utilizador = response.data;
      } catch (error) {
        this.erro = 'Erro ao buscar os dados do utilizador';
        console.error(error);
      } finally {
        this.carregando = false;
      }
    },
    limparUtilizador() {
      this.utilizador = null;
    }
  },

  getters: {
    isAutenticado: (state) => !!state.utilizador,
    getNome: (state) => state.utilizador?.name || '',
    getEmail: (state) => state.utilizador?.email || '',
    getTelefone: (state) => state.utilizador?.telefone || '',
    getGenero: (state) => state.utilizador?.genero || '',
    getDataNascimento: (state) => state.utilizador?.data_nascimento || '',
    getNdi: (state) => state.utilizador?.ndi || '',
    getMorada: (state) => state.utilizador?.morada || '',
    getIsActive: (state) => state.utilizador?.is_active || '',
    getIdSeccao: (state) => state.utilizador?.idSeccao || '',
    getNdi: (state) => state.utilizador?.ndi || '',

    isLogged() {
      const authStore = useAuth();
      return authStore.isAuthenticated;
    }
  }
});
