# nest-login

一个用于练习前后端认证联调的示例项目，包含：

- `api`：基于 `NestJS + Prisma + MySQL + JWT` 的后端接口
- `web`：基于 `Vue 3 + Vite + vue-router` 的前端页面

项目目标很明确：跑通一个最小但完整的登录闭环，包括注册、登录、保存 token、获取当前用户信息、编辑个人资料。

## 功能概览

当前仓库已经围绕以下流程组织完成：

- 用户注册：`POST /auth/register`
- 用户登录：`POST /auth/login`
- 获取当前登录用户：`GET /users/me`
- 更新当前登录用户资料：`PATCH /users/me`
- 前端路由守卫：未登录访问受保护页面时跳转到登录页
- 本地 token 存储：使用 `localStorage` 保存 JWT
- 接口文档：后端接入了 Swagger

## 技术栈

### 后端

- NestJS 11
- Prisma 7
- MySQL
- JWT / Passport
- Swagger

### 前端

- Vue 3
- Vite
- vue-router
- 原生 `fetch`

## 目录结构

```text
nest-login/
  api/
    prisma/
    src/
      auth/
      prisma/
      users/
  web/
    public/
    src/
      pages/
      router/
      utils/
  docs/
    superpowers/
```

## 前端页面

前端目前包含 4 个核心页面：

- `/register`：注册页，提交 `openId`、`nickname`、`avatar`
- `/login`：登录页，使用 `openId` 登录
- `/me`：当前用户信息页
- `/profile/edit`：资料编辑页

受保护页面：

- `/me`
- `/profile/edit`

## 用户数据模型

项目中的 `User` 模型主要字段如下：

- `openId`
- `nickname`
- `avatar`
- `username`
- `sex`
- `grade`
- `college`
- `subCollege`
- `major`
- `isNewUser`
- `createdAt`
- `updatedAt`

## 运行前准备

### 1. 安装依赖

分别安装前后端依赖：

```bash
cd api
pnpm install

cd ../web
pnpm install
```

### 2. 配置环境变量

后端启动依赖至少两个环境变量：

```env
DATABASE_URL="mysql://root:password@localhost:3306/nest_login"
JWT_SECRET="replace-with-a-secure-secret"
```

建议把它们放到 `api/.env` 中。

补充说明：

- 当前仓库根目录已经有一个 `.env`
- 如果你是在 `api` 目录内直接运行 NestJS / Prisma 命令，最好同步在 `api/.env` 中也放一份
- 否则 `ConfigModule` 和 `prisma.config.ts` 可能读取不到环境变量

### 3. 初始化数据库

进入 `api` 目录后执行：

```bash
pnpm exec prisma migrate dev
pnpm exec prisma generate
```

## 启动项目

### 启动后端

```bash
cd api
pnpm run start:dev
```

默认端口：

- `http://localhost:3000`

Swagger 文档地址：

- `http://localhost:3000/api`

### 启动前端

```bash
cd web
pnpm run dev
```

默认端口：

- `http://localhost:5173`

当前后端 CORS 已放行的前端地址也是 `http://localhost:5173`。

## 接口概览

### `POST /auth/register`

注册用户，请求体示例：

```json
{
  "openId": "test-openid-1001",
  "nickname": "测试用户",
  "avatar": "https://example.com/avatar.png"
}
```

### `POST /auth/login`

登录用户，请求体示例：

```json
{
  "openId": "test-openid-1001"
}
```

### `GET /users/me`

获取当前登录用户信息，请求头需要带上：

```http
Authorization: Bearer <accessToken>
```

### `PATCH /users/me`

更新当前登录用户信息，请求体示例：

```json
{
  "nickname": "新的昵称",
  "grade": "大三",
  "major": "软件工程"
}
```

## 开发说明

这个项目目前更偏向“学习认证流程”而不是“完整生产方案”，因此采用了比较直白的实现方式：

- 前端使用 `localStorage` 保存 token
- 前端通过 `fetch` 手动拼接请求
- 登录标识使用 `openId` 模拟
- 暂未引入刷新 token、权限分级、状态管理等复杂机制

如果你接下来准备继续扩展，这个仓库比较适合从这些方向往下做：

- 补充统一错误处理
- 增加表单校验和更完整的页面样式
- 接入真实用户体系，而不只是演示用 `openId`
- 增加 refresh token、登出失效、权限控制

## 相关文档

仓库里还保留了设计和计划文档，方便回看开发过程：

- `docs/superpowers/specs/`
- `docs/superpowers/plans/`
