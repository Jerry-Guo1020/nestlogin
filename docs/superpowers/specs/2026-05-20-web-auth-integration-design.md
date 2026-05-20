# Web 前端接入后端认证设计

**目标**

在 `D:\一些完整的项目\nest-login\web` 中，用一个简洁的 Vue 3 + Vite 前端项目接入当前已完成的 NestJS 认证后端，完成以下完整闭环：

- 注册
- 登录
- 保存 token
- 获取当前登录用户信息
- 更新当前登录用户资料

本次以前后端联调学习为主，不追求复杂 UI，不引入超出当前阶段必要的状态管理工具。

## 一、范围与边界

本次只实现前端 `web` 项目对以下后端接口的接入：

- `POST /auth/register`
- `POST /auth/login`
- `GET /users/me`
- `PATCH /users/me`

本次不实现：

- 复杂视觉样式
- 第三方 UI 组件库
- Pinia / Vuex
- Axios 拦截器体系
- 管理员端
- 刷新 token
- 微信小程序前端

## 二、推荐技术方案

前端采用以下最小技术组合：

- `vue-router`
- 浏览器原生 `fetch`
- `localStorage` 保存 `accessToken`

选择原因：

- 真正连接当前 Nest 后端，而不是 mock
- 依赖少，便于学习整个认证链路
- 所有请求、token 存储与带 token 过程都能清楚看到
- 更适合当前“学习前后端如何接起来”的目标

## 三、页面设计

前端采用多页面，但保持极简。

### 1. 注册页

路径：`/register`

功能：

- 输入 `openId`
- 输入 `nickname`
- 输入 `avatar`
- 提交到 `POST /auth/register`
- 成功后保存 `accessToken`
- 跳转到 `/me`

### 2. 登录页

路径：`/login`

功能：

- 输入 `openId`
- 提交到 `POST /auth/login`
- 成功后保存 `accessToken`
- 跳转到 `/me`

### 3. 当前用户页

路径：`/me`

功能：

- 页面加载时请求 `GET /users/me`
- 展示当前用户信息
- 提供“去编辑资料”按钮
- 提供“退出登录”按钮

### 4. 编辑资料页

路径：`/profile/edit`

功能：

- 编辑可更新字段
- 提交到 `PATCH /users/me`
- 成功后跳回 `/me`

## 四、路由与访问控制

使用 `vue-router` 管理页面。

路由规则：

- `/register`：公开
- `/login`：公开
- `/me`：需要登录
- `/profile/edit`：需要登录

访问控制规则：

- 若访问 `/me` 或 `/profile/edit` 时本地没有 token，则重定向到 `/login`
- 注册或登录成功后自动跳转到 `/me`
- 退出登录后清空 token 并跳回 `/login`

## 五、token 存储策略

前端只使用 `localStorage`：

- 登录或注册成功后：
  - `localStorage.setItem('accessToken', token)`
- 请求受保护接口时：
  - 从 `localStorage` 取出 token
  - 设置请求头：

```http
Authorization: Bearer <accessToken>
```

- 退出登录时：
  - `localStorage.removeItem('accessToken')`

选择 `localStorage` 的原因：

- 简单直接
- 方便调试
- 最能帮助理解前后端认证闭环

## 六、请求层设计

前端封装一个最小请求函数，不引入 axios。

职责：

- 拼接后端 `baseURL`
- 根据是否有 token 自动追加 `Authorization` 头
- 统一发送 JSON 请求
- 统一解析 JSON 响应
- 在拿到 `401` 时做基础处理，例如跳回登录页

这样可以避免每个页面重复写相同的 `fetch` 代码。

## 七、推荐目录结构

```text
web/src/
  main.js
  App.vue
  router/
    index.js
  pages/
    RegisterPage.vue
    LoginPage.vue
    MePage.vue
    EditProfilePage.vue
  utils/
    auth.js
    request.js
```

说明：

- `router/index.js`：路由定义与基础守卫
- `pages/*`：页面组件
- `utils/auth.js`：token 的存取与清理
- `utils/request.js`：后端请求封装

## 八、页面与后端接口映射

### 注册页

请求：

```http
POST /auth/register
```

请求体：

```json
{
  "openId": "test-openid-1001",
  "nickname": "测试用户",
  "avatar": "https://example.com/avatar.png"
}
```

成功后：

- 取响应中的 `accessToken`
- 保存到 `localStorage`
- 跳转到 `/me`

### 登录页

请求：

```http
POST /auth/login
```

请求体：

```json
{
  "openId": "test-openid-1001"
}
```

成功后：

- 取响应中的 `accessToken`
- 保存到 `localStorage`
- 跳转到 `/me`

### 当前用户页

请求：

```http
GET /users/me
```

请求头：

```http
Authorization: Bearer <accessToken>
```

### 编辑资料页

请求：

```http
PATCH /users/me
```

请求头：

```http
Authorization: Bearer <accessToken>
```

请求体示例：

```json
{
  "nickname": "新的昵称",
  "grade": "大三",
  "major": "软件工程"
}
```

## 九、错误处理原则

前端保持朴素，不做复杂错误系统。

第一版只处理这些场景：

- `400`：提示参数不合法
- `401`：提示登录失效并跳转登录页
- `404`：提示资源不存在
- `409`：提示注册冲突，例如 openId 已存在
- `500`：提示服务异常

展示方式可以非常简单：

- `alert(...)`
- 页面中显示错误信息

本次不要求复杂通知系统。

## 十、开发顺序

推荐按这个顺序落地：

1. 安装 `vue-router`
2. 配置路由和 4 个页面骨架
3. 写 `utils/auth.js`
4. 写 `utils/request.js`
5. 接注册页
6. 接登录页
7. 接当前用户页
8. 接编辑资料页

## 十一、成功标准

完成后应满足：

1. 可以在前端页面注册用户
2. 可以在前端页面登录用户
3. 登录后 token 能保存在本地
4. 刷新 `/me` 页面时仍能用 token 获取当前用户
5. 可以在编辑资料页更新用户信息
6. token 缺失时访问受保护页面会跳回登录页

## 十二、为什么这是当前最合适的路线

这条方案保留了完整全栈联调本质：

- 前端真实请求 NestJS 后端
- 前端真实接收并保存后端 JWT
- 前端真实带 token 调用受保护接口

同时又避免过早引入过多前端工具，保证你能把注意力放在：

- 路由
- 请求
- token
- 前后端认证协作

这正是当前阶段最值得掌握的核心能力。
