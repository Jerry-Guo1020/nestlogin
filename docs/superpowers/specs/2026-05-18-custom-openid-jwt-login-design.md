# 自定义 OpenID + JWT 登录设计

**目标**

在 `D:\一些完整的项目\nest-login\api` 中实现一套适合 uni-app 小程序使用的轻量登录方案。该方案不接入微信官方 `openid`，而是由前端生成自定义 `openId` 作为身份入口，后端使用 `JWT accessToken` 作为真实登录态凭证，并通过 `Prisma + MySQL` 持久化用户数据。

**适用场景**

- 小程序首次进入时，前端可以自动生成一个随机身份标识。
- 后端需要根据该标识完成注册或登录。
- 后续需要受保护的接口时，不再反复依赖 `openId`，而是使用 `JWT` 识别当前用户。
- 当前阶段以“教学和理解登录流程”为主，不引入 refresh token、微信接口、复杂权限、Cookie Session 流程。

## 一、认证模型

本次方案分为两层：

1. `openId`：身份入口。由前端生成并持久化，用于首次注册或再次登录时找到用户。
2. `JWT accessToken`：登录态凭证。由后端签发，前端保存，后续请求通过 `Authorization: Bearer <token>` 访问受保护接口。

这意味着：

- `openId` 解决“你是谁”。
- `JWT` 解决“你现在是否已登录”。

## 二、第一版接口范围

第一版只实现 4 个接口，构成最小学习闭环：

### 1. `POST /auth/register`

用途：首次注册用户，并直接返回 token。

请求体：

```json
{
  "openId": "abc123xyz",
  "nickname": "随机昵称",
  "avatar": "https://example.com/avatar.png"
}
```

行为：

- 校验 `openId`、`nickname`、`avatar`。
- 检查数据库中是否已存在相同 `openId`。
- 若已存在，返回业务错误。
- 若不存在，创建用户。
- 创建成功后，立刻签发 `JWT accessToken` 并返回。

### 2. `POST /auth/login`

用途：已有 `openId` 的用户再次登录。

请求体：

```json
{
  "openId": "abc123xyz"
}
```

行为：

- 根据 `openId` 查询用户。
- 若不存在，返回未注册错误。
- 若存在，签发 `JWT accessToken` 并返回。

### 3. `GET /users/me`

用途：获取当前登录用户资料。

请求头：

```http
Authorization: Bearer <accessToken>
```

行为：

- 由 JWT Guard 校验 token。
- 从 token 中取出用户 `id`。
- 查询数据库并返回当前用户信息。

### 4. `PATCH /users/me`

用途：修改当前用户资料。

请求头：

```http
Authorization: Bearer <accessToken>
```

请求体第一版仅允许几个基础字段，例如：

```json
{
  "nickname": "新的昵称",
  "sex": "男",
  "grade": "大二"
}
```

行为：

- 由 JWT Guard 校验 token。
- 从 token 中取出当前用户 `id`。
- 校验允许修改的字段。
- 更新并返回最新用户信息。

## 三、数据库设计

第一版只建立一张 `users` 表，避免学习阶段复杂化。

建议字段：

- `id`：主键，自增
- `openId`：字符串，唯一
- `nickname`：字符串
- `avatar`：字符串
- `username`：字符串，可为空
- `sex`：字符串，可为空
- `grade`：字符串，可为空
- `college`：字符串，可为空
- `subCollege`：字符串，可为空
- `major`：字符串，可为空
- `isNewUser`：布尔值，默认 `true`
- `createdAt`
- `updatedAt`

约束：

- `openId` 必须唯一。
- 后续 JWT payload 中以 `sub` 保存数据库 `id`，可以附带 `openId` 方便调试。

## 四、NestJS 模块划分

第一版只拆三个核心域：

### 1. `prisma`

职责：

- 提供数据库连接。
- 暴露 `PrismaService` 供业务模块使用。

### 2. `auth`

职责：

- 处理注册和登录。
- 生成 JWT。
- 提供 JWT Strategy 和 Guard。

### 3. `users`

职责：

- 查询当前用户。
- 更新当前用户信息。

## 五、目录结构

目标目录结构如下：

```text
api/
  prisma/
    schema.prisma
  src/
    app.module.ts
    main.ts
    prisma/
      prisma.module.ts
      prisma.service.ts
    auth/
      auth.module.ts
      auth.controller.ts
      auth.service.ts
      jwt.strategy.ts
      jwt-auth.guard.ts
      dto/
        register.dto.ts
        login.dto.ts
    users/
      users.module.ts
      users.controller.ts
      users.service.ts
      dto/
        update-user.dto.ts
```

## 六、JWT / Session / Cookie 的定位

为帮助学习，需要明确三者关系：

- `Session`：服务端保存登录状态。
- `Cookie`：浏览器自动携带的数据容器，本身不是认证方案。
- `JWT`：后端签发令牌，前端保存并主动携带。

本项目第一版只落地 `JWT`，原因是：

- uni-app 小程序更适合显式存储 token。
- 不依赖浏览器 Cookie 自动机制。
- 更贴近你后续项目中的移动端调用方式。

## 七、第一版不做的内容

为了保证学习聚焦，以下能力明确不进入本次实现：

- 微信官方 `code -> openid` 接口
- refresh token
- Session 登录
- Cookie 登录
- 管理员登录
- 角色权限
- 上传头像到对象存储
- 邮箱、手机号验证码

## 八、成功标准

完成后应能验证以下结果：

1. 可以调用 `/auth/register` 创建用户并拿到 token。
2. 可以调用 `/auth/login` 根据 `openId` 再次获取 token。
3. 可以在请求头带 token 成功访问 `/users/me`。
4. 可以在请求头带 token 成功修改 `/users/me`。
5. 能够清楚区分：
   - `openId` 是身份入口
   - `JWT` 是登录凭证

## 九、教学方式

本次实现采用“讲解 + 你自己敲代码”的方式：

- 我负责给出每一步该写的代码。
- 你在本地手动输入，强化记忆。
- 每一步我会解释：
  - 这段代码放在哪
  - 为什么这样写
  - 它在整条登录链路里处于什么位置

这样做的目的不是一次性把功能堆出来，而是让你真正掌握这套登录逻辑在 NestJS 中的落地方式。
