<template>
  <div>
    <h1>当前用户页</h1>
    <p v-if="loading" >正在加载用户信息...</p>
    <p v-else-if="error" >加载用户信息失败: {{ error }}</p>

    <div v-if="user" >
      <p><strong>id:</strong> {{ user.id }}</p>
      <p><strong>openId:</strong> {{ user.openId }}</p>
      <p><strong>nickname:</strong> {{ user.nickname }}</p>
      <p><strong>avatar:</strong> {{ user.avatar }}</p>
      <p><strong>username:</strong> {{ user.username }}</p>
      <p><strong>sex:</strong> {{ user.sex }}</p>
      <p><strong>grade:</strong> {{ user.grade }}</p>
      <p><strong>college:</strong> {{ user.college }}</p>
      <p><strong>subCollege:</strong> {{ user.subCollege }}</p>
      <p><strong>major:</strong> {{ user.major }}</p>
      <p><strong>isNewUser:</strong> {{ user.isNewUser }}</p>
    </div>

    <button @click="goToEditProfile">编辑资料</button>
    <button @click="handleLogout">退出登录</button>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { removeAccessToken } from '../utils/auth'

const router = useRouter()

const user = ref(null)
const loading = ref(false)
const error = ref("")

async function fetchCurrentUser() {
  loading.value = true
  error.value = ""

  try {
    const data = await request('/users/me')
    user.value = data
  } catch (error) {
    error.value = error.message
  } finally {
    loading.value = false
  }
}

function handleLogout() {
  removeAccessToken('')
  router.push('/login')
}

function goToEditProfile() {
  router.push('/profile/edit')
}

onMounted(() => {
  fetchCurrentUser()
})
</script>

<style scoped>

</style>