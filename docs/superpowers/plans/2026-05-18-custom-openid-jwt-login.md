# Custom OpenID JWT Login Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `api` 项目中完成一套基于自定义 `openId` 和 `JWT accessToken` 的最小登录闭环，并让学习过程贴近真实的 NestJS + Prisma + MySQL 开发方式。

**Architecture:** 前端生成自定义 `openId` 作为身份入口，后端通过 `Prisma` 持久化用户数据，并在注册或登录成功后签发 `JWT`。受保护接口通过 `JwtStrategy` 和 Guard 解析 token，从 payload 中读取用户 id，再访问用户资料。

**Tech Stack:** NestJS 11, Prisma, MySQL, JWT, Passport, class-validator, class-transformer

---

### Task 1: 安装依赖并准备环境变量

**Files:**
- Modify: `D:\一些完整的项目\nest-login\api\package.json`
- Create: `D:\一些完整的项目\nest-login\api\.env`

- [ ] 安装后端依赖：`@nestjs/config`、`@nestjs/jwt`、`@nestjs/passport`、`passport`、`passport-jwt`、`class-validator`、`class-transformer`、`@prisma/client`
- [ ] 安装开发依赖：`prisma`
- [ ] 新建 `.env`，配置 `DATABASE_URL`、`JWT_SECRET`、`JWT_EXPIRES_IN`

### Task 2: 初始化 Prisma 和 users 表

**Files:**
- Create: `D:\一些完整的项目\nest-login\api\prisma\schema.prisma`

- [ ] 初始化 Prisma
- [ ] 配置 `datasource` 为 MySQL
- [ ] 创建 `User` 模型并设置 `openId` 唯一约束
- [ ] 生成并执行第一版 migration

### Task 3: 接入 PrismaModule

**Files:**
- Create: `D:\一些完整的项目\nest-login\api\src\prisma\prisma.module.ts`
- Create: `D:\一些完整的项目\nest-login\api\src\prisma\prisma.service.ts`
- Modify: `D:\一些完整的项目\nest-login\api\src\app.module.ts`

- [ ] 创建 `PrismaService`
- [ ] 创建 `PrismaModule`
- [ ] 在根模块中导入，供后续 `auth` 和 `users` 使用

### Task 4: 接入配置管理和全局校验

**Files:**
- Modify: `D:\一些完整的项目\nest-login\api\src\main.ts`
- Modify: `D:\一些完整的项目\nest-login\api\src\app.module.ts`

- [ ] 配置 `ConfigModule.forRoot`
- [ ] 开启 `ValidationPipe`

### Task 5: 实现 auth/register 和 auth/login

**Files:**
- Create: `D:\一些完整的项目\nest-login\api\src\auth\auth.module.ts`
- Create: `D:\一些完整的项目\nest-login\api\src\auth\auth.controller.ts`
- Create: `D:\一些完整的项目\nest-login\api\src\auth\auth.service.ts`
- Create: `D:\一些完整的项目\nest-login\api\src\auth\dto\register.dto.ts`
- Create: `D:\一些完整的项目\nest-login\api\src\auth\dto\login.dto.ts`

- [ ] 编写注册 DTO
- [ ] 编写登录 DTO
- [ ] 注册接口根据 `openId` 创建用户
- [ ] 登录接口根据 `openId` 查找用户

### Task 6: 接入 JWT Strategy 和 Guard

**Files:**
- Create: `D:\一些完整的项目\nest-login\api\src\auth\jwt.strategy.ts`
- Create: `D:\一些完整的项目\nest-login\api\src\auth\jwt-auth.guard.ts`
- Modify: `D:\一些完整的项目\nest-login\api\src\auth\auth.module.ts`
- Modify: `D:\一些完整的项目\nest-login\api\src\auth\auth.service.ts`

- [ ] 配置 `JwtModule`
- [ ] 登录和注册时签发 token
- [ ] 从 Bearer Token 中解析 payload

### Task 7: 实现 users/me 和更新资料

**Files:**
- Create: `D:\一些完整的项目\nest-login\api\src\users\users.module.ts`
- Create: `D:\一些完整的项目\nest-login\api\src\users\users.controller.ts`
- Create: `D:\一些完整的项目\nest-login\api\src\users\users.service.ts`
- Create: `D:\一些完整的项目\nest-login\api\src\users\dto\update-user.dto.ts`

- [ ] 受保护接口获取当前用户信息
- [ ] 受保护接口修改用户资料

### Task 8: 联调验证

**Files:**
- No file changes required

- [ ] 使用 Postman 或 Apifox 测试 `/auth/register`
- [ ] 测试 `/auth/login`
- [ ] 带 Bearer token 测试 `/users/me`
- [ ] 带 Bearer token 测试 `PATCH /users/me`
