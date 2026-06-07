# misc 项目总结

## 一、项目定位

**misc** 是一亩田（YMT360）App 内的 **Kraken/WebF 动态页 Monorepo**，承载大量可在 App 内动态加载的 H5 业务页面。项目版本 `0.4.0`，描述为「一亩田 webf 页面」。

它不是单一业务应用，而是 **多业务、多页面的前端聚合仓库**：每个路由对应一个独立页面，通过 Kraken/WebF 引擎在 App 内以 `.js` 或 `.kbc1` 形式加载运行。线上统一部署在 [https://misc.ymt.com](https://misc.ymt.com)。

---

## 二、技术栈与架构


| 维度  | 技术选型                               |
| ----- | -------------------------------------- |
| 框架  | Vue 3（自维护 fork，位于 `build/vue`） |
| 语言  | TypeScript + Less                      |
| 路由  | Vue Router 4                           |
| UI 库 | Vant 3、`@ymt/vant`                    |
| 构建  | Webpack 5（生产）+ Rsbuild（开发）     |
| 网络  | Axios + `@ymt/gfw-axios`               |
| 测试  | Jest + `@vue/test-utils`               |
| 图表  | ECharts 5                              |
| 埋点  | 神策 `sa-sdk-javascript`               |


### 核心架构特点

1. **多入口构建**：`build/entryRouters.js` 扫描 `src/router/*.ts`，为每个路由自动生成独立 Webpack entry，实现按页分包、按需加载。
2. **双端运行**：同一套代码可在浏览器（`http://127.0.0.1:9400/{path}`）和 App 内（`ymtpage://...kraken&httpUrl=...`）调试。
3. **平台抽象层**：`src/platforms/` 对 Web / WebF / Kraken 做 Bridge 封装，覆盖账号、弹窗、Toast、键盘、权限、返回等端能力。
4. **Weex 迁移能力**：`yarn fix-weex-code` 支持将历史 Weex 页面批量迁入（每目录仅可执行一次）。
5. **自维护 Vue 编译链**：`build/compiler-core`、`build/runtime-core` 等为定制 Vue 3 编译/runtime，用于解决特定编译问题。

---

## 三、代码规模


| 指标                             | 数量                                       |
| -------------------------------- | ------------------------------------------ |
| 业务页面目录（`src/views/`）     | **约 115 个**                              |
| 注册路由                         | **约 150+ 条**（分布在 17 个 router 文件） |
| 通用组件（`src/components/`）    | **约 34 个**                               |
| 平台桥接模块（`src/platforms/`） | **约 82 个文件**                           |
| 源码文件总量                     | **约 1100+**                               |


---

## 四、目录结构

```
misc/
├── src/
│   ├── views/          # 业务页面（按业务分子目录，核心开发区）
│   ├── router/         # 路由注册（多文件 merge 到 routers.ts）
│   ├── api/            # get/post 封装，统一 status===0 判断
│   ├── components/     # 通用组件（Refresh、Scroller、YmtImg、Chart…）
│   ├── platforms/      # Web/WebF/Kraken 端能力桥接
│   ├── utils/          # navigation、dialog、sensors、platform 等
│   ├── commonComponents/  # 跨业务公共组件
│   ├── styles/         # 全局样式 token
│   └── config/         # 环境配置（DEV/QA/PROD）
├── build/              # Webpack/Rsbuild 配置、entry 生成、kbc1 编译（慎改）
├── mock/               # 本地 mock 数据
├── tests/              # Jest 单元测试
└── .cursor/            # AI Agent 规则与 Skill 配置
```

---

## 五、业务域概览

路由按业务线拆分在 `src/router/` 下，主要覆盖以下领域：


| 业务线              | 路由文件                                        | 说明                                                   |
| ------------------- | ----------------------------------------------- | ------------------------------------------------------ |
| 超级工厂 / 小田拓客 | `super_factory.router.ts`                       | 线索库、我的客户、智能外呼、管理中心                   |
| 行情                | `hangqing.router.ts`                            | 农产品行情搜索、产地行情、市场动态                     |
| 采购                | `purchase.router.ts`                            | 采购大厅、采购请求、同城采购                           |
| 现金贷              | `loan.router.ts`                                | 贷款申请、额度、账单、还款（约 15 个路由）             |
| 电话洽谈            | `phone_negotiation.router.ts`                   | 电话权益、洽谈列表、营销页                             |
| 生意 / 供应         | `business.router.ts`                            | 商机卡、生意日报、供应发布、生意圈                     |
| 频道与营销          | `channels.router.ts`                            | 福气频道、一元频道、热门话题、人气榜                   |
| 实力商家 / 工厂     | `power_merchant.router.ts`、`factory.router.ts` | 客户管理、工厂名片、找工厂                             |
| 其他                | `routers.ts` 等                                 | 包园分发、找基地、微信名片、卖家中心、定金、小田支付等 |


---

## 六、开发与工程化

### 常用命令

```bash
yarn / npm start      # 开发服务，默认 9400 端口（Rsbuild）
yarn build            # 生产构建（web + app + kbc1）
yarn fix-eslint       # 修复 ESLint
yarn fix-weex-code    # Weex 迁移（每目录仅一次）
yarn test             # Jest 测试
```

### 质量保障

- ESLint（`@ymt/eslint-config`）+ Husky + lint-staged
- Docker 多环境构建（DEV / QA / PROD）
- CI Lint（`Dockerfile.Lint`）

### 页面开发规范

- 新页优先 `<script setup lang="ts">`
- 长列表用 `Flutter/Refresh` 组件 + `start/pageSize` 分页
- 网络层统一走 `@/api` 的 `get/post`，判断 `res.status === 0`
- 页内跳转用 `generateKrakenUrl` + `openUrl`
- 端能力通过 `checkLogin()`、`goBack()`、`track()` 等工具函数调用

---

## 七、Kraken 与 misc 项目的关系

### 7.1 先厘清角色分工

misc **不是** Kraken 引擎本身，而是运行在 Kraken/WebF 之上的 **业务页面仓库（内容提供方）**。

```
┌─────────────────────────────────────────────────────────┐
│                    一亩田 App（Flutter）                  │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Kraken / WebF 渲染引擎（容器）              │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │           misc 业务页面（本仓库产出）          │  │  │
│  │  │   super_factory / hangqing / loan / ...     │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
│         ↑ MethodChannel 调用 Native 能力                  │
└─────────────────────────────────────────────────────────┘
```

- **Kraken/WebF**：App 内的 Web 渲染运行时，负责加载 JS、执行 DOM/CSS、与 Flutter 桥接。
- **misc**：用 Vue 3 编写业务逻辑和 UI，构建为独立 JS bundle，部署到 CDN，由 App 按需拉取渲染。

### 7.2 从注册路由到 App 加载的完整链路

```
src/router/*.ts 注册路由
        ↓
build/entryRouters.js 扫描路由，为每个 path 生成独立 entry
        ↓
基于 webf_template_main.ts 生成 build/.webfViews/{path}.ts 入口文件
        ↓
Webpack kraken 配置（webpack.config.webf.js）按页打包
        ↓
产出 dist/app/{version}/{path}.js
        ↓
BuildKBCPlugin 用 qjsc 将 .js 编译为 .kbc1 字节码（App 端优先使用）
        ↓
部署到 https://misc.ymt.com/app/{path}.kbc1
        ↓
App 通过深链打开页面并加载 bundle
```

**关键点：**

- 每个路由 = 一个独立入口 = 一个独立 JS 文件，不是传统 SPA 单入口。
- `entryRouters.js` 解析 router 文件中的 `path` + `component: () => import(...)`，自动生成多入口配置。
- `webf_template_main.ts` 为每个页面生成独立的 bootstrap 文件，内含 Vue 实例化、Router、全局 mixin 等。
- 生产构建同时产出 **web 版**（`dist/web/`，浏览器调试用）和 **app 版**（`dist/app/`，Kraken/WebF 用）。

### 7.3 App 如何打开 misc 页面

App 通过一亩田自定义深链协议加载页面：

```
ymtpage://com.ymt360.app.mass/flutter?url=kraken&httpUrl={编码后的页面URL}
```

示例：

```
# 本地调试
ymtpage://com.ymt360.app.mass/flutter?url=kraken&httpUrl=http%3A%2F%2F127.0.0.1%3A9400%2Fsuper_factory.js

# 线上环境
ymtpage://com.ymt360.app.mass/flutter?url=kraken&httpUrl=https%3A%2F%2Fmisc.ymt.com%2Fapp%2Fsuper_factory.kbc1
```

页面 URL 规则：

- 线上路径前缀为 `/app/`（`config.prefixPath`）
- App 端优先使用 `.kbc1` 字节码产物，开发时可用 `.js`

业务代码中统一通过工具函数生成跳转链接：

```typescript
import { generateKrakenUrl, openUrl } from '@/utils/navigation'

// 生成 Kraken 深链并在当前环境打开
openUrl(generateKrakenUrl('/super_factory_my_customer?id=123'))
```

`generateKrakenUrl` 会根据运行环境自动处理路径后缀（`.kbc1`）和深链参数拼接。

### 7.4 运行环境识别与平台桥接

`src/utils/platform.ts` 在运行时判断当前所在容器：


| 变量       | 判断条件                        | 含义                                          |
| ---------- | ------------------------------- | --------------------------------------------- |
| `isKraken` | `typeof kraken !== 'undefined'` | 运行在 Kraken 容器（旧版，已标记 deprecated） |
| `isWebF`   | `typeof webf !== 'undefined'`   | 运行在 WebF 容器（Kraken 继任者）             |
| `isWeb`    | 非 Kraken/WebF/App/小程序       | 普通浏览器 H5                                 |
| `isApp`    | UA 含 `YMT` / `YmtAgent`        | 一亩田 App 原生环境                           |


`src/platforms/` 根据环境选择不同实现：

```
MethodChannel / Toast / Dialog / Popup / Account / Keyboard / StatusBar ...
    ├── impl/kraken/   → kraken.methodChannel.invokeMethod(...)
    ├── impl/webf/     → webf.methodChannel.invokeMethod(...)
    └── impl/web/      → 浏览器降级实现
```

业务代码调用统一的 Bridge 接口（如 `showToast`、`checkLogin`），无需关心底层是 Kraken 还是 WebF。

### 7.5 .js 与 .kbc1 两种产物


| 产物    | 说明                                          | 使用场景                             |
| ------- | --------------------------------------------- | ------------------------------------ |
| `.js`   | 标准 JavaScript bundle                        | 本地开发调试、浏览器直接访问         |
| `.kbc1` | 由 `qjsc`（QuickJS 编译器）将 JS 编译为字节码 | App 端生产环境，加载更快、体积更可控 |


构建插件：

- 生产：`build/plugins/buildkbc-webpack-plugin.js`（Webpack 构建时同步生成）
- 开发：`build/plugins/rspack-kbc1.js` + `generate_kbc1.js`（Rsbuild 开发时 Worker 线程生成）

### 7.6 Kraken 与 WebF 的演进关系（在一亩田语境下）

一亩田 App 经历了 **Weex → Kraken → WebF** 的动态页技术栈迁移：


| 阶段 | 技术             | misc 中的体现                                                       |
| ---- | ---------------- | ------------------------------------------------------------------- |
| 早期 | Weex             | 历史页面，通过 `fix-weex-code` 迁入                                 |
| 中期 | Kraken           | `isKraken`、`impl/kraken/`、`kraken.methodChannel`                  |
| 当前 | WebF（OpenWebF） | `isWebF`、`impl/webf/`、`webf.methodChannel`，新 Bridge 优先走 WebF |


代码中 Kraken 相关实现已标记 `@deprecated`，新能力以 WebF 为主；但项目描述、构建配置、深链参数（`url=kraken`）仍保留 Kraken 命名，属于历史延续。

**对开发者的实际影响：**

- 写业务代码时无需区分 Kraken/WebF，走 `platforms/` 统一抽象即可。
- 本地浏览器调试走 H5 路径（`http://127.0.0.1:9400/{path}`），不依赖 Kraken 容器。
- 涉及字体、安全区、返回栈、MethodChannel 等端能力时，需在 App Kraken/WebF 链路上再验一遍。

---

## 八、Kraken 技术介绍

### 8.1 Kraken 是什么

[Kraken](https://github.com/openkraken/kraken) 是阿里开源的 **基于 Flutter 的 W3C 标准 Web 渲染引擎**（Apache-2.0），由淘系前端团队发起，2020 年开源。

核心特性：

- **Web 标准兼容**：支持 DOM、CSS、JavaScript 等 W3C 标准 API，前端技术栈可直接复用。
- **Flutter 原生集成**：作为 Flutter Widget 嵌入 App，与原生 UI 无缝混排。
- **高性能渲染**：自绘渲染管线，提供接近原生的列表滚动、动画、导航体验。
- **MethodChannel 桥接**：JS 层可通过 `kraken.methodChannel` 调用 Native / Dart 能力（登录、支付、相机等）。
- **QuickJS 引擎**：使用 QuickJS 执行 JavaScript，支持将 JS 编译为字节码（`.kbc1`）加速加载。

与传统 WebView 的区别：


| 维度      | 传统 WebView         | Kraken / WebF               |
| --------- | -------------------- | --------------------------- |
| 渲染      | 系统浏览器内核       | Flutter 自绘渲染管线        |
| 性能      | 列表滚动、动画易卡顿 | 针对 App 场景优化，接近原生 |
| 集成      | 独立 WebView 组件    | 与 Flutter Widget 混排      |
| JS 运行时 | 系统 JS 引擎         | QuickJS（可字节码化）       |
| 定位      | 通用网页浏览         | App 内动态页运行时          |


### 8.2 架构原理（简化）

```
┌──────────────────────────────────────────────┐
│              业务 JS（Vue/React 等）           │
│         document / CSS / fetch / ...         │
├──────────────────────────────────────────────┤
│           JS Engine Binding（QuickJS）        │
│         kraken.methodChannel / webf.*        │
├──────────────────────────────────────────────┤
│     Dart 层：W3C 标准布局与渲染能力实现         │
│     Element / CSS / Layout / Paint           │
├──────────────────────────────────────────────┤
│              Flutter Engine（C++）            │
│              Skia 渲染 / Platform Channel     │
└──────────────────────────────────────────────┘
```

JS 调用 Web API → 生成指令 → 通过 FFI 传递到 Dart 层 → Dart 调用 W3C 标准能力完成布局渲染 → Flutter Engine 最终绘制到屏幕。

### 8.3 WebF（OpenWebF）—— Kraken 的继任者

Kraken 官方仓库自 2022 年底后停止活跃维护。对于 Flutter 3.x+ 项目，官方推荐使用 fork 项目 **[OpenWebF](https://github.com/openwebf/webf)**（原 WebF）。

WebF 相对 Kraken 的改进：

- 支持 Flutter 3.x ~ 3.41.x 等新版本
- 持续维护 CSS/DOM/Form 等标准能力
- 提供 `@openwebf/vue-router` 等框架适配
- API 兼容层更完善（可参考 [WebF API Compatibility](https://openwebf.com)）

一亩田 misc 项目正处于 Kraken → WebF 过渡期：`platform.ts` 同时检测 `kraken` 和 `webf` 全局对象，平台桥接层优先走 WebF 实现。

### 8.4 为什么一亩田选择 Kraken/WebF 路线

在一亩田 App 中，大量业务页面需要 **不发版 App 即可更新**。Kraken/WebF 路线带来的价值：

1. **动态发布**：misc 页面独立构建部署到 CDN，App 按需加载，业务迭代不依赖 App 发版。
2. **前端生态复用**：Vue 3 + TypeScript + Vant 等成熟栈直接可用，降低动态页开发成本。
3. **性能优于 WebView**：农产品 B2B 场景大量长列表、复杂交互，Kraken 自绘渲染体验更好。
4. **Native 能力打通**：通过 MethodChannel 调用登录、支付、外呼、埋点等 App 原生能力。
5. **Weex 平滑迁移**：历史 Weex 页面可逐步迁入 misc，统一技术栈。

---

## 九、项目特点与挑战

### 优势

1. **高聚合、低耦合**：百余个业务页共用一个仓库，共享组件与平台层，避免重复建设。
2. **动态发布**：页面可独立构建、独立上线，无需发版 App 即可更新业务。
3. **迁移友好**：Weex → Kraken/WebF 有标准化脚本与流程。
4. **端能力统一**：`platforms/` 抽象屏蔽 Web/H5/App 差异，业务代码专注 UI 与逻辑。

### 挑战

1. **体量大**：115+ 业务目录、150+ 路由，新人上手成本高。
2. **历史包袱**：部分页面由 Weex 迁移而来，代码风格不完全统一。
3. **构建链复杂**：自维护 Vue 编译链 + kbc1 产物，构建目录改动风险高。
4. **Kraken → WebF 过渡**：两套 Bridge 并存，需注意端上行为一致性。

---

## 十、近期迭代方向

从 Git 历史推断，当前重点在：

- **小田拓客（超级工厂）**：线索屏蔽、管理中心更新
- **新年打卡活动**：活动终止判断、埋点区分
- **Feed 流优化**

---

## 十一、一句话总结

**misc 是一亩田 App 的「动态页工厂」**——用 Vue 3 编写业务页面，通过 Kraken/WebF 渲染引擎在 App 内动态加载运行，将农产品 B2B 平台中行情、采购、贷款、拓客、营销等百余个业务页面聚合在一个 Monorepo 中，通过多入口构建实现按页独立发布，是 App 内 H5 业务的核心承载仓库。

---

## 附录：相关链接


| 资源            | 地址                                                                                                             |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| misc 线上环境   | [https://misc.ymt.com](https://misc.ymt.com)                                                                     |
| Kraken 开源仓库 | [https://github.com/openkraken/kraken](https://github.com/openkraken/kraken)                                     |
| Kraken 技术原理 | [https://openkraken.com/en-US/blog/technology-principle](https://openkraken.com/en-US/blog/technology-principle) |
| OpenWebF 文档   | [https://openwebf.com](https://openwebf.com)                                                                     |
| Vant 组件库     | [https://vant-contrib.gitee.io/vant/v3/#/zh-CN](https://vant-contrib.gitee.io/vant/v3/#/zh-CN)                   |
| 项目 Agent 地图 | `.cursor/AGENTS.md`                                                                                              |


---

## 十二、Cursor Rules 沉淀总结

本节回答三个问题：这套 AI 辅助配置解决了什么痛点、实际提效多少、以及如何持续迭代。

> **说明**：misc 的 Cursor 配置位于 `.cursor/`（3 条 Rule、4 个 Skill、2 个 Hook、`AGENTS.md` 索引）。以下提效估算基于规则设计目标与同类 Monorepo 经验推导，**团队尚未做正式 before/after 度量**；落地后建议用下文「迭代机制」中的指标持续校准。

### 12.1 具体解决了什么团队痛点？

misc 体量大（115+ 页面目录、150+ 路由、Kraken/WebF 双端），新人与 Agent 都容易在「该用哪套约定」上踩坑。Rules 体系把口头经验固化成可自动触发的约束，针对性解决以下痛点：


| 痛点                     | 典型后果                                                              | 对应配置                                          | 如何解决                                                        |
| ------------------------ | --------------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------- |
| **项目上下文难传递**     | Agent 不知道多入口构建、本地调试地址、该改哪个 router 文件            | `AGENTS.md` + `misc-core.mdc`                     | 一页「项目地图」+ 编辑 `src/`** 时自动注入 Kraken/WebF 约定     |
| **页面写法不统一**       | 自建 axios、手写 `ymtpage://`、列表不分页、漏 `dismissProgressDialog` | `misc-core.mdc`                                   | 统一 API 层、跳转工具、分页模式、端能力入口                     |
| **超级工厂模块复杂**     | Tab 子页 vs 独立路由搞混、权益校验遗漏、返回不刷新列表                | `super-factory.mdc` + `super-factory-page` Skill  | 模块级规范 + 可复制列表模板 + 参考页索引                        |
| **新页面不知从何下手**   | 路由注册漏项、目录结构随意、联调 checklist 缺失                       | `misc-kraken-page` Skill                          | 按业务线选 router 文件 → 注册 → 列表骨架 → 本地/App 双验        |
| **Weex 迁移高风险**      | 脚本重复执行毁代码、未提交基线无法回滚                                | `misc-weex-migrate` Skill + `guard-shell.sh` Hook | 强制「先 commit → 跑一次 → 有错回滚」流程；执行前 Hook 二次确认 |
| **联调 Bug 排查发散**    | 接口字段、`result`/`data` 混用、lazy-render 导致字段不展示            | `misc-debug` Skill                                | 按接口/列表/展示/权益/路由分层 checklist，约束 Agent 输出格式   |
| **构建链被误改**         | Agent 顺手改 webpack / Vue 编译链，导致全量构建失败                   | `build-protect.mdc`                               | 编辑 `build/`** 时强制「先说明影响、给回滚方案、需用户确认」    |
| **代码风格与 CI 不一致** | Agent 产出代码 eslint 报错、增加 review 成本                          | `lint-after-edit.sh` Hook                         | 编辑 `src/**/*.vue                                              |
| **危险操作无护栏**       | force push、hard reset、误跑迁移脚本                                  | `guard-shell.sh` Hook                             | 拦截破坏性 git；`fix-weex-code` 触发用户确认                    |


**本质**：把 misc 这类「大仓 + 特殊运行时 + 多业务线」里最高频、代价最高的失误点，从「靠人记」变成「靠规则自动提醒 + 靠 Skill 给 SOP + 靠 Hook 兜底」。

### 12.2 实际给团队提效了多少？

目前**没有埋点或工时统计**，以下为基于规则覆盖场景的**合理估算**（供团队后续用真实数据替换）：


| 场景                             | 改造前（经验值）                          | 改造后（预期）                              | 估算节省                     |
| -------------------------------- | ----------------------------------------- | ------------------------------------------- | ---------------------------- |
| 新建 Kraken 列表页（含路由注册） | 0.5～1 天（找参考页、对齐分页/跳转约定）  | 2～4 小时（Skill 模板 + Rule 约束）         | **约 50%～60%**              |
| 超级工厂功能迭代                 | 0.5 天+（权益/Tab 联动易漏）              | 2～3 小时                                   | **约 40%～50%**              |
| 联调类 Bug 定位                  | 2～4 小时（多端行为不一致时更长）         | 0.5～1.5 小时（misc-debug 分层排查）        | **约 30%～50%**              |
| Agent 产出代码的 review 修复     | 每 PR 15～30 分钟（eslint、错误跳转写法） | 5～10 分钟（Hook 自动 fix + Rule 前置约束） | **约 50%～70%**              |
| Weex 迁移踩坑回滚                | 偶发 0.5～2 天（脚本重复跑）              | 流程化后显著降低概率                        | **风险下降为主，难量化工时** |
| 构建链误改事故                   | 偶发 0.5～1 天恢复                        | 基本阻断                                    | **避免类收益**               |


**综合判断（定性）**：

- 对**日常需求开发**（新页、列表迭代）：单人任务可节省 **约 0.5～1 个工作日**。
- 对**使用 Cursor Agent 的同学**：减少「反复纠正 Agent 写法」的对话轮次，单次任务大约少 **3～8 轮**无效 prompt。
- 对**团队整体**：在 misc 这种多入口 Monorepo 里，主要收益不是「写代码更快」，而是 **减少返工、减少 review 摩擦、降低构建/迁移事故**——这三项在大仓里的隐性成本往往高于编码本身。

**建议纳入的度量指标**（便于下一轮校准「提效多少」）：

1. 新页面从 PR 创建到合并的 lead time
2. Agent 相关 PR 的 review comment 数 / 因规范问题的修改轮次
3. `fix-weex-code` 误跑与构建回滚次数
4. 联调 Bug 从报告到定位的平均时长

### 12.3 是怎么迭代这套规则的？

当前配置采用 **「索引 → 分层规则 → 场景 Skill → 自动化 Hook → 反馈回流」** 五层结构，迭代路径如下：

```
┌─────────────────────────────────────────────────────────────┐
│  AGENTS.md          项目地图 + 配置索引（新人/Agent 第一站）    │
├─────────────────────────────────────────────────────────────┤
│  Rules (.mdc)       按 globs 自动生效的硬约束                │
│    misc-core        全仓通用（src/**）                       │
│    super-factory    业务模块加深（super_factory/**）         │
│    build-protect    高风险目录护栏（build/**）               │
├─────────────────────────────────────────────────────────────┤
│  Skills (SKILL.md)  按任务触发的 SOP + 模板 + Prompt 范例   │
│    kraken-page / super-factory-page / weex-migrate / debug  │
├─────────────────────────────────────────────────────────────┤
│  Hooks              机器强制执行（lint、危险命令拦截）        │
└─────────────────────────────────────────────────────────────┘
                              ↑
                    联调踩坑 / Review 意见 / 事故复盘
                              ↓
                    更新 Rule（约束）或 Skill（流程）或 Hook（兜底）
```

**迭代原则**

1. **先地图、后规则、再 Skill、最后 Hook**
  - 发现 Agent 「不知道项目结构」→ 补 `AGENTS.md`  
  - 发现反复写错同一类代码 → 写入 `misc-core.mdc` 或模块 Rule  
  - 发现完整流程需要步骤清单 → 抽成 Skill（含可复制模板）  
  - 发现仅靠提醒仍会被执行 → 上升为 Hook 拦截
2. **按影响面分层，避免一条规则管全部**
  - 通用约定不进业务 Rule，避免超级工厂改动牵动全仓  
  - `build-protect` 独立，把「少出事」和「写得快」分开治理
3. **每条规则必须有「参考页指针」**
  - 如 `MyCustomer.vue`、`SuperFactoryCluePool.vue` 作为列表页金标准  
  - Agent 不是凭空生成，而是「读参考 → 套模板 → 最小 diff」
4. **从真实事故和 Review 回流**
  - 联调问题 → 沉淀进 `misc-debug`（如 lazy-render、visibilityChange）  
  - 迁移踩坑 → 强化 `misc-weex-migrate` 与 `guard-shell.sh`  
  - Review 高频 comment → 上收为 `misc-core` 的「禁止」条款
5. **小步验证、控制膨胀**
  - 单条 Rule 建议控制在可读的一屏内；过长流程放 Skill  
  - 新 Skill 先服务最高频场景（超级工厂、通用 Kraken 页），再按业务线扩展  
  - 定期清理过时条目（如 Kraken deprecated 后逐步以 WebF 表述为主）

**下一轮迭代建议（待团队确认）**


| 优先级 | 动作                                                         | 触发条件                                |
| ------ | ------------------------------------------------------------ | --------------------------------------- |
| P0     | 为 `loan`、`purchase`、`hangqing` 各补一条模块 Rule 或 Skill | 这些业务线 Agent 使用率上升             |
| P1     | 在 `misc-debug` 增加「H5 vs App 差异」典型案例库             | 同类联调 Bug 一周内重复 2 次以上        |
| P1     | 建立提效度量看板（见 12.2）                                  | 配置上线满 1 个迭代周期                 |
| P2     | `AGENTS.md` 增加「变更日志」小节                             | 每次 Rule/Skill 更新留痕，方便新人 diff |


---

*本节随 `.cursor/` 配置演进持续更新；配置变更时请同步修订 12.1～12.3。*