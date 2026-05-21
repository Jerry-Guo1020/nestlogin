<template>
 <div>
    <h1>注册页</h1>
    <div>
      <label>openId</label>
      <input v-model="form.openId" type="text" />
    </div>

    <div>
      <label>nickname</label>
      <input v-model="form.nickname" type="text" />
    </div>

    <div>
      <label>avatar</label>
      <input v-model="form.avatar" type="text" />
    </div>

    <button @click="handleRegister">注册</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { request } from '../utils/request';
import { setAccessToken } from '../utils/auth';
import { reactive } from 'vue';
const router = useRouter()

const form = reactive({
  openId:"", 
  nickname:"",
  avatar:""
})

async function handleRegister() {
  try {
    const data = await request('/auth/register', 
      {
        method:'POST',
        body: JSON.stringify(form)
      })

      setAccessToken(data.accessToken)
      alert('注册成功！')
      router.push('/login')
  } catch(error) {
    console.error('注册失败:', error)
    alert('注册失败，请重试！')
  }
}
</script>

<style scoped>

</style>
