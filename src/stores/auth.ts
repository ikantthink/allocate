import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../js/supabase'

type User = {
  id: 14,
  email: string
  name: string
  username: string
  first_name: string
  last_name: string
  uid: string
  provider: string
  created_at: string
  upstringd_at: string
}

// type AuthRes = {
//   user: User,
//   errors?: any
// }

export const useAuthStore = defineStore('AuthStore', () => {

  const user = ref<User | null>(null)
  const access_token = ref<string | null>(null)
  const client = ref<string | null>(null)
  const redirect_path = ref('')

  async function login (email: string, password: string) : Promise<User> {
    const headers = {
      //'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
    };
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users/sign_in`, {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: JSON.stringify({
        user:{
          email: email,
          password: password,
        }
      }),
    });

    const authed = await response.json();
    console.log('response', response)
    console.log('authed', authed)
    if (authed.errors) return authed
    if (authed.user) {
      console.log('setting user', response.headers)
      user.value = authed.user
      access_token.value = response.headers.get('access-token')
      client.value = response.headers.get('client')
    }
    localStorage.setItem('grown',JSON.stringify({
      at: access_token.value,
      c: client.value,
      u: user.value,
    }))
    return authed
  }

    async function logout (): Promise<boolean> {
      if (!user.value) {
        return true
      }
      const { error } = await supabase.auth.signOut();
      if (error) return false
      user.value = null
      access_token.value = null
      client.value = null
      localStorage.removeItem('grown')
      return true
    }

    async function isLoggedIn(): Promise<boolean> {
      if (access_token.value && client.value) return true
      const hasSession = localStorage.getItem('grown')
      if (hasSession) {
        const session = JSON.parse(hasSession);
        user.value = session.u
        access_token.value = session.at
        client.value = session.c
        return true
      }
      return false 
    }
  
    function getUser() {
      return user.value
    }

    // function getSession() {
    //   return session.value
    // }

    return { user, access_token, client, redirect_path, login, logout, getUser, isLoggedIn}
})