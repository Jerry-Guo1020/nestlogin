<template>
<div>
  <h1>Login Page</h1>
  <p>This is the login page. You can add your login form here.</p>
  <router-link to="/">Go back to Home</router-link>
  <router-link to="/register">Go to Register</router-link>
  <div>
    <label>openId</label>
    <input v-model="form.openId" />
  </div>
  <button @click="handleLogin">Login</button>
</div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { request } from '../utils/request'
import { setAccessToken } from '../utils/auth'

const router = useRouter()

const form = reactive({
  openId: '',
})

async function handleLogin() {
  try {
    const data = await request('/auth/login',
      {
        method:'POST',
        body: JSON.stringify(form)
      }
    )

    setAccessToken(data.accessToken)
        router.push('/me')
    alert('登录成功！')

  } catch(error) {
    console.error('登录失败:', error)
    alert('登录失败，请重试！')
  }
}
</script>

<style scoped>

</style>