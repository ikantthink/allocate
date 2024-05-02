import { defineStore } from 'pinia'
import { supabase } from '@/js/supabase'

type User = {
  app_metadata: object
  aud: string 
  confirmed_at: Date
  created_at: Date
  email: string
  email_confirmed_at: Date
  id: string
  identities: []
  is_anonymous: boolean
  last_sign_in_at: Date
  phone: string
  role: string
  updated_at: Date
  user_metadata: object
}

type Session = {
  access_token: string
  expires_at: number
  expires_in: number
  refresh_token: string
  token_type: string
}

type State = {
  user: User | null,
  session: Session | null,
  redirect_path: string
}

export const useAuthStore = defineStore('AuthStore', {
  state: (): State => ({
    user: null,
    session: null,
    redirect_path: ''
  }),
  actions: {
    async login (email: string, password: string) {
      try {
        const authed = await supabase.auth.signInWithPassword({ email: email, password: password })
        if (authed.error) return authed.error
        if (authed.data) {
          this.user = Object.assign({}, authed.data.user)
          this.session = Object.assign({}, authed.data.session)
        }
        return authed
      } catch (error) {
        return error
      }
    },
    async logout () {
      if (!this.user) {
        return true
      }
      try {
        const { error } = await supabase.auth.signOut();
        if (error) return false
        this.user = null
        this.session = null
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    async isLoggedIn() {
      const is_auth = await supabase.auth.getSession()
      if (is_auth.data.session) {
        this.user = Object.assign({}, is_auth.data.session.user)
        delete is_auth.data.session.user
        this.session = Object.assign({}, is_auth.data.session)
      }
      console.log('is_auth', is_auth)
      return !!this.session
    }
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getSession: state => {
      return state.session
    },
  },
  persist: true
})