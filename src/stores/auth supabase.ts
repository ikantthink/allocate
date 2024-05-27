import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../js/supabase'

type SupabaseData = {
  data: any | null;
  error: any;
}

type User = {
  app_metadata?: object;
  aud?: string;
  confirmed_at?: any;
  created_at?: string;
  email?: string;
  email_confirmed_at?: string;
  id: string;
  identities?: any[];
  is_anonymous?: boolean;
  last_sign_in_at?: string;
  phone?: string;
  role?: string;
  updated_at?: string;
  user_metadata?: object;
}

export const useAuthStore = defineStore('AuthStore', () => {
  const user = ref<User | null>(null)
  const session = ref<object | null>(null)
  const redirect_path = ref('')

    async function login (email: string, password: string) : Promise<SupabaseData> {
      const authed = await supabase.auth.signInWithPassword({ email: email, password: password })
      if (authed.error) return authed
      if (authed.data) {
        user.value = authed.data.user
        session.value = authed.data.session
      }
      return authed
    }

    async function logout (): Promise<boolean> {
      if (!user.value) {
        return true
      }
      const { error } = await supabase.auth.signOut();
      if (error) return false
      user.value = null
      session.value = null
      return true
    }

    async function isLoggedIn(): Promise<boolean> {
      const is_auth = await supabase.auth.getSession()
      if (is_auth.data.session) {
        user.value = Object.assign({}, is_auth.data.session.user)
        session.value = Object.assign({}, is_auth.data.session)
      }
      console.log('is_auth', is_auth)
      return !!session.value
    }
  
  
    function getUser() {
      return user.value
    }

    function getSession() {
      return session.value
    }

    return { user, session, redirect_path, login, logout, isLoggedIn, getUser, getSession}
})