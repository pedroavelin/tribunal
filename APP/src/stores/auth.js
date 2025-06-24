import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../../api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref(null)
  const refreshToken = ref(null)
  const isAuthenticated = computed(() => !!accessToken.value)
  // Função de login
  async function signIn(credentials) {
    try {
      const response = await api.post('/auth/signin', credentials)
      if (response.data) {
        accessToken.value = response.data.accessToken
        refreshToken.value = response.data.refreshToken
        user.value = {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          roles: response.data.roles,
          tribunal: response.data.tribunal,
          seccao: response.data.seccao,
          letra: response.data.letra
        }
        // Armazena tokens no localStorage
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        localStorage.setItem('user', JSON.stringify(user.value))

        return true

      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Função para renovar o token
  async function refreshAccessToken() {
    try {
      if (!refreshToken.value) {
        throw new Error('No refresh token available')
      }

      const response = await axios.post('/auth/refresh-token', {
        refreshToken: refreshToken.value
      })

      if (response.data) {
        accessToken.value = response.data.accessToken
        localStorage.setItem('accessToken', response.data.accessToken)
        return true
      }
    } catch (error) {
      console.error('Refresh token error:', error)
      // Limpa os tokens em caso de erro
      signOut()
      throw error
    }
  }

  // Função de logout
  function signOut() {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

// Função initialize
function initialize() {
  const storedAccessToken = localStorage.getItem('accessToken')
  const storedRefreshToken = localStorage.getItem('refreshToken')
  const storedUser = localStorage.getItem('user')
  
  if (storedAccessToken && storedRefreshToken && storedUser) {
    accessToken.value = storedAccessToken
    refreshToken.value = storedRefreshToken
    user.value = JSON.parse(storedUser)
  }
}
  // Chama initialize quando o store é criado
  initialize()

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    signIn,
    refreshAccessToken,
    signOut,
    initialize
  }
})