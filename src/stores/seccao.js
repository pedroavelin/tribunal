import { defineStore } from 'pinia';
import https from '@/services/https.js';
import { useAuth } from '@/stores/auth';

export const useSeccaoStore = defineStore('seccao', {
  state: () => ({
    seccao: [],
    carregando: false,
    erro: null
  }),

  actions: {
    async listarSeccao() {
      this.carregando = true;
      this.erro = null;
      try {
        const authStore = useAuth(); // Obtém a store de autenticação
        const token = authStore.token; // Obtém o token da store auth

        if (!token) {
          throw new Error("Token de autenticação não encontrado!");
        }
        const response = await https.get('/auth/listar/seccoes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.seccao = response.data;
        console.log(this.seccao);

      } catch (error) {
        this.erro = 'Erro ao buscar os dados do utilizador';
        console.error(error);
      } finally {
        this.carregando = false;
      }
    },
  },
});
