import {
  computed,
  ref
} from 'vue';
import {
  defineStore
} from 'pinia'
import https from '@/services/https.js';

export const useAuth = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'));
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}')); // Evita erro se for null


  function setToken(tokenValue) {
    localStorage.setItem('token', tokenValue);
    token.value = tokenValue;
  }

  function setUser(userValue) {
    localStorage.setItem("user", JSON.stringify(userValue));
    user.value = userValue;
  }

  async function checkToken() {
    if (!token.value) return null; // Evita requisições desnecessárias
    try {
      const tokenAuth = `Bearer ${token.value}`;

      const {
        data
      } = await https.post('/auth/refresh', {}, {
        headers: {
          Authorization: tokenAuth,
          'Content-Type': 'application/json'
        }
      });

      setToken(data.access_token); // Atualiza o token no estado
      return data;
    } catch (error) {
      console.log(error.response ?.data || error.message);
      return null;
    }
  }

  // Retorna os detalhes do usuário autenticado
  async function getUserDetails() {
    if (!token.value) {
      console.warn("Tentativa de obter detalhes do usuário sem autenticação.");
      return null;
    }

    try {
      const response = await https.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });

      const userData = {
        id: response.data.id,
        name: response.data.name
      };

      // Atualiza o usuário na store
      setUser(userData);

      // Imprime no console
      console.log("Usuário logado:", userData);
      return userData;
    } catch (error) {
      console.error("Erro ao obter detalhes do usuário:", error.response ?.data || error.message);
      return null;
    }
  }

  function isTokenExpired(token) {
    try {
      const {
        exp
      } = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= exp * 1000; // Converter para milissegundos
    } catch {
      return true; // Se houver erro, assume que está expirado
    }
  }

  async function isAuthenticated() {
    if (!token.value || !user.value) return false;

    if (!isTokenExpired(token.value)) return true; // Token ainda é válido

    try {
      return !!(await checkToken());
    } catch (error) {
      console.error("Erro na verificação de autenticação:", error);
      return false;
    }
  }

  const fullName = computed(() => user.value ?.name || '');

  return {
    checkToken,
    user,
    token,
    setToken,
    setUser,
    fullName,
    isAuthenticated,
    getUserDetails,
  }
})
