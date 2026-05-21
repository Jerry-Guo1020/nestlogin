# Web 前端接入后端认证 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `web` 项目中完成基于 Vue 3、vue-router、fetch 和 localStorage 的前后端认证闭环，打通注册、登录、获取当前用户、更新当前用户资料。

**Architecture:** 前端使用 `vue-router` 组织 `register/login/me/profile-edit` 四个页面，`utils/auth.js` 负责 token 存取，`utils/request.js` 负责调用 NestJS 后端并自动带上 Bearer Token。受保护路由在前端进行基础拦截，受保护接口由后端 JWT Guard 兜底校验。

**Tech Stack:** Vue 3, Vite, vue-router, fetch, localStorage

---

### Task 1: 安装依赖与目录骨架

**Files:**
- Modify: `D:\一些完整的项目\nest-login\web\package.json`
- Create: `D:\一些完整的项目\nest-login\web\src\router\`
- Create: `D:\一些完整的项目\nest-login\web\src\pages\`
- Create: `D:\一些完整的项目\nest-login\web\src\utils\`

- [ ] 安装 `vue-router`
- [ ] 建立 `router/pages/utils` 目录

### Task 2: 配置路由系统

**Files:**
- Create: `D:\一些完整的项目\nest-login\web\src\router\index.js`
- Modify: `D:\一些完整的项目\nest-login\web\src\main.js`
- Modify: `D:\一些完整的项目\nest-login\web\src\App.vue`

- [ ] 创建路由配置
- [ ] 接入 `createRouter`
- [ ] 用 `router-view` 替换示例组件

### Task 3: 实现 token 工具与请求封装

**Files:**
- Create: `D:\一些完整的项目\nest-login\web\src\utils\auth.js`
- Create: `D:\一些完整的项目\nest-login\web\src\utils\request.js`

- [ ] 封装 `getToken/setToken/removeToken`
- [ ] 封装 `fetch` 请求函数
- [ ] 在请求层自动带上 Bearer Token

### Task 4: 接入注册页

**Files:**
- Create: `D:\一些完整的项目\nest-login\web\src\pages\RegisterPage.vue`

- [ ] 实现表单
- [ ] 调用 `/auth/register`
- [ ] 成功后保存 token 并跳转 `/me`

### Task 5: 接入登录页

**Files:**
- Create: `D:\一些完整的项目\nest-login\web\src\pages\LoginPage.vue`

- [ ] 实现表单
- [ ] 调用 `/auth/login`
- [ ] 成功后保存 token 并跳转 `/me`

### Task 6: 接入当前用户页

**Files:**
- Create: `D:\一些完整的项目\nest-login\web\src\pages\MePage.vue`

- [ ] 页面加载请求 `/users/me`
- [ ] 展示当前用户信息
- [ ] 提供退出登录与跳转编辑资料入口

### Task 7: 接入编辑资料页

**Files:**
- Create: `D:\一些完整的项目\nest-login\web\src\pages\EditProfilePage.vue`

- [ ] 展示可编辑字段
- [ ] 调用 `PATCH /users/me`
- [ ] 成功后跳回 `/me`

### Task 8: 路由守卫与联调收尾

**Files:**
- Modify: `D:\一些完整的项目\nest-login\web\src\router\index.js`

- [ ] 为受保护页面增加 token 检查
- [ ] 无 token 自动跳转登录页
- [ ] 手动联调注册、登录、获取用户、更新资料
