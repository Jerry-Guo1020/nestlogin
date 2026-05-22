<template>
  <div>
    <h1>资料编辑页</h1>
    <div>
      <label>nickname</label>
      <input v-model="form.nickname" type="text" />
    </div>

    <div>
      <label>username</label>
      <input v-model="form.username" type="text" />
    </div>

    <div>
      <label>sex</label>
      <input v-model="form.sex" type="text" />
    </div>

    <div>
      <label>grade</label>
      <input v-model="form.grade" type="text" />
    </div>

    <div>
      <label>college</label>
      <input v-model="form.college" type="text" />
    </div>

    <div>
      <label>subCollege</label>
      <input v-model="form.subCollege" type="text" />
    </div>

    <div>
      <label>major</label>
      <input v-model="form.major" type="text" />
    </div>

    <div>
      <label>avatar</label>
      <input v-model="form.avatar" type="text" />
    </div>

    <button @click="submitInfo">提交</button>

  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { request } from '../utils/request'

const router = useRouter()

const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  nickname: '',
  username: '',
  sex: '',
  grade: '',
  college: '',
  subCollege: '',
  major: '',
  avatar: '',
})

async function fetchUserInfo() {
  try {
    const response = await request('/users/me')
    const data = await response.json()
    form.nickname = data.nickname || ''
    form.username = data.username || ''
    form.sex = data.sex || ''
    form.grade = data.grade || ''
    form.college = data.college || ''
    form.subCollege = data.subCollege || ''
    form.major = data.major || ''
    form.avatar = data.avatar || ''
  } catch (error) {
    console.error('获取用户信息失败:', error)
    alert('获取用户信息失败')
  } finally {
    loading.value = false
  }
}

async function submitInfo() {
  try {
    const data = await request('/users/me',
      {
        method: 'PATCH',
        body: JSON.stringify(form),
      }
    )
    alert('提交成功')
    console.log("更新后的用户信息：", data);
    router.push('/me')
  } catch (error) {
    console.error('提交失败:', error)
    alert('提交失败')
  }
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped></style>