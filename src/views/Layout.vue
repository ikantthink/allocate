<template>
  <div class="layout">
    <div class="navbar">
      <div class="left_wrapper">
        <logo />
        <nav>
          <router-link to="/welcome">Welcome</router-link>
          <router-link to="/charts">Charts</router-link>
        </nav>
      </div>
      <div class="user">
        <div class="email">
          {{ authStore.user?.email ? authStore.user?.email : 'User' }}
        </div>
        <div class="logout" @click="Logout()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>logout</title>
            <path
              fill="currentCOlor"
              d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Logo from '../components/Logo.vue';
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
const router = useRouter();

async function Logout() {
  const out = await authStore.logout();
  if (out) {
    router.push('/login');
  }
}
</script>

<style scoped lang="scss">
.layout {
  display: grid;
  grid-template-rows: 80px 1fr;
  grid-template-columns: 1fr;
}

.navbar {
  border-bottom: 1px solid rgba(209, 255, 243, 0.2);
  display: flex;
  justify-content: space-between;

  .left_wrapper {
    display: flex;
    gap: 3em;
  }

  .user {
    display: flex;
    height: 100%;

    .email {
      display: flex;
      padding: 0 20px;
      height: inherit;
      align-items: center;
      color: var(--white);
    }

    .logout {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2em;
      height: inherit;
      width: 80px;
      background: var(--blue--300-brand);
      cursor: pointer;

      svg {
        width: 26px;
        height: 26px;
      }

      &:hover {
        background: var(--allocate-300--brand);
        color: var(--black-brand);
        font-weight: 400;
      }
    }
  }
}

nav {
  display: flex;
  height: 100%;
  align-items: center;
  gap: 3em;

  a,
  a:visited {
    color: var(--white);
  }

  a.router-link-exact-active {
    color: var(--allocate-300--brand);
  }
}

@media screen and (max-width: 700px) {
  .navbar .user .email {
    display: none;
  }

  nav {
    gap: 1em;
  }
}
</style>
