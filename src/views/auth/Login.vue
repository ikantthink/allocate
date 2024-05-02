<template>
  <div class="page moving_background">
    <div class="login_wrapper">
      <logo width="120px" height="120px" />
      <h1>Login</h1>
      <form @submit.prevent="Login">
        <div>
          <label for="email">email</label>
          <input
            v-model="email"
            autocomplete="email"
            type="email"
            id="email"
            required
          />
        </div>
        <div>
          <label for="password">password</label>
          <input
            v-model="password"
            autocomplete="current-password"
            type="password"
            id="password"
            required
          />
        </div>
        <button
          :class="`${loading ? 'loading_button' : ''}`"
          :disabled="loading"
          type="submit"
        >
          <div v-if="loading" class="spinner_wrapper">
            <svg class="spinner" viewBox="0 0 50 50">
              <circle
                class="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke-width="5"
              ></circle>
            </svg>
          </div>
          <span v-else>Login</span>
        </button>
        <div class="feedback">{{ feedback }}</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '@/components/Logo.vue';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');
const feedback = ref('');
const loading = ref(false);

async function Login() {
  console.log('login');
  loading.value = true;
  setTimeout(async () => {
    const auth = await authStore.login(email.value, password.value);
    console.log('auth from login.vue', auth);
    if (auth) {
      router.push('/');
    } else {
      loading.value = false;
      feedback.value = 'Something went wrong!';
      setTimeout(() => {
        feedback.value = '';
      }, 2500);
    }
  }, 1500);
}
</script>

<style scoped lang="scss">
.page {
  display: flex;
  place-content: center;
  width: 100vw;
  height: 100vh;

  .login_wrapper {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 2em;
    justify-content: center;
    align-items: center;

    label {
      color: var(--white);
      font-weight: 300;
    }

    form {
      display: flex;
      gap: 1em;
      flex-direction: column;

      button {
        align-self: center;
        width: 100%;

        .spinner_wrapper {
          position: relative;
          width: 25px;
          height: 25px;
        }
      }

      .loading_button {
        width: 70px;
        padding: 10px 20px;
        background-color: var(--allocate-300--brand);
      }
    }

    .feedback {
      height: 30px;
      text-align: center;
      color: var(--error);
    }
  }
}

.moving_background {
  background-image: url('/img/green-stack-trans.svg');
  background-repeat: no-repeat;
  background-position: center 55%;
  background-size: 50%;
  animation: up_down 6s infinite;
  animation-timing-function: ease-in-out;
}

@media screen and (max-width: 400px) {
  .moving_background {
    background-size: 80%;
  }
}

@keyframes up_down {
  50% {
    background-position: center 45%;
  }
}
</style>
