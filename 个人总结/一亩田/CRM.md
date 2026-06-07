# crm-vue 项目总结

## 一、项目概述

**crm-vue** 是一亩田（YMT360）内部使用的 **CRM 后台管理系统**前端工程，系统名称为「一亩田 CRM 系统」。项目基于开源模板 [vue-typescript-admin-template](http://armour.github.io/vue-typescript-admin-template) 演进而来，服务于一亩田农业 B2B 平台的运营、销售、客服及多业务线管理需求。

| 属性       | 说明                                                  |
| ---------- | ----------------------------------------------------- |
| 项目名称   | crm-vue                                               |
| 版本       | 1.0.1                                                 |
| 仓库地址   | `git@git.ymt360.com:fe/crm-vue.git`                   |
| 代码规模   | 约 1,800+ 源文件，702 个 Vue 组件，208 个业务页面模块 |
| 线上地址   | https://crm.ymt360.com                                |
| 微服务基座 | https://liantiao-newcrm.ymt360.com/crm-vue            |

---

## 二、技术栈

### 核心框架

- **Vue 2.6** + **TypeScript 3.5** + **Vue Class Component / Property Decorator**
- **Vue Router 3** + **Vuex 3**（`vuex-module-decorators` 模块化）
- **Element UI 2.13** 作为 UI 组件库
- **Less** 样式预处理，BEM 命名规范

### 构建与工程化

- **Vue CLI 3** + **Webpack 4** 多入口构建
- **ESLint**（`@ymt/eslint-config` 内部规范）
- **Jest** 单元测试 + **Cypress** E2E 测试
- **Mock Server**（`ts-node-dev` + `node-mock-server`）本地接口模拟
- 脚手架命令：`create:view` / `create:component` / `create:directive`

### 主要依赖能力

- 图表：**ECharts 4**
- 富文本：**TinyMCE**、**WangEditor**
- 地图：**vue-baidu-map**
- 表格导出：**xlsx**、**file-saver**
- 音视频：**vod-js-sdk-v6**（腾讯云点播）
- 埋点：**sa-sdk-javascript**（神策）
- 网络请求：**@ymt/gfw-axios**（内部 GFW 网关封装）

---

## 三、架构设计

### 1. 多入口应用

通过 `vue.config.js` 的 `pages` 配置实现多入口：

```
src/pages/
├── crm/     → 主 CRM 应用（入口 app/index.html）
├── h5/      → 移动端 H5 页面（工单、发票、档口拜访等）
└── tools/   → 工具类应用（Session 调试等）
```

开发服务端口 **3002**，Mock 服务端口 **3001**。

### 2. 微前端支持

项目支持作为 **micro-app 子应用** 嵌入新 CRM 基座：

- `src/public-path.ts` 动态设置 `__webpack_public_path__`
- 路由 `meta.viewKey` 区分应用归属（`crm-vue` / `old`）
- 非本应用菜单自动跳转到基座对应子应用
- 路由切换后通过 `microApp.dispatch` 向基座同步页面标题

### 3. 权限与路由

采用 **后端动态菜单 + 前端路由映射** 模式：

1. 用户登录后调用 `getRoutes` 获取权限菜单
2. `PermissionModule.GenerateRoutes()` 将后端资源树转为 Vue Router 配置
3. 通过 `router.addRoutes()` 动态注入可访问路由
4. 菜单命名规范：`应用名:路由名`（如 `crm-vue:test`）

路由按业务线拆分为多个模块：

| 路由模块       | 路由数 | 业务域                                          |
| -------------- | ------ | ----------------------------------------------- |
| `old.ts`       | ~91    | 历史遗留页面（认证审核、投诉、CMS 等）          |
| `routes.ts`    | ~67    | 通用功能（工单、用户画像、CMS 编辑器等）        |
| `marketing.ts` | ~72    | 集市运营（供应/采购管理、广告、秒杀、活动配置） |
| `sales.ts`     | ~42    | 销售体系（电销、续费、增值、SDR、权益管理）     |
| `douniu.ts`    | ~51    | 豆牛业务（代卖、保理、电销、档口、品类百科）    |
| `wolaixiao.ts` | ~7     | 沃来销（基地管理、供货、订单、线索）            |

合计约 **330+** 可配置路由页面。

### 4. 新旧系统共存

- 新页面在本仓库内以 Vue SPA 实现
- 部分历史页面通过 `old_ctn.html` 以 iframe/新窗口方式承载
- 路由守卫中，非 Dashboard 的页面跳转默认在新窗口打开，实现新旧系统并行

---

## 四、核心业务模块

### 销售与客户（Sales）

- 电销工作台、必销霸、寻客宝
- 销售续费/增值服务线索池
- SDR 线索管理、牛商会员中心
- 商家列表/详情、订单管理、开票/发票
- 权益组管理、礼品卡、群发工具

### 集市运营（Marketing）

- 供应/采购/交易订单管理
- 广告管理、秒杀频道、运营活动
- APP 首页配置、CMS 内容发布/预览/编辑器
- 买家会员服务、产能上报、物流展示

### 豆牛业务（Douniu）

- 代卖方案、货主/代卖商管理
- 豆牛电销工作台（含容联呼叫中心集成）
- 保理审核、出借管理、档口借贷
- 行情管理、市场盘点、品类百科
- 权限管理（角色/用户/权限）

### 沃来销（Wolaixiao）

- 基地管理、供货信息、人员管理
- 线索导入、订单管理与详情

### 客户服务与风控

- 工单系统、投诉管理、通话记录/坐席
- 风险审核、用户画像筛选
- 审核审批（产地行情、发票、权益等）

### 内容与运营工具

- CMS 可视化编辑器（多模块配置）
- AIGC 视频任务、AI 商品
- 推送任务、优惠券预算、热门内容生成
- Chat RPA、企业微信运营

### H5 移动端

- 工单创建/详情、退款详情
- 发票采集、档口拜访
- 豆牛线索详情、地推管理
- 农场记录/日报、会议室预约

---

## 五、特色能力

### 呼叫中心集成

主应用注册了多个外呼插件，支撑电销场景：

- 容联（Ronglian）
- 祥云（XiangYun）
- 智博（Zhibo）
- 百川（BaiChuan）
- 蘑菇云（MoGuYun）

### 通用组件体系

`src/components`（基础 UI）+ `src/commonComponents`（业务复用）：

- UploadMedia、Pagination、YmtDialog、YmtStaffSelector
- LocationPicker、Dict/DictSelect、FollowHistory、Reassignment 等

### 全局能力

- **过滤器**：图片裁剪/前缀处理（`aspectFill`、`fixPrefix` 等）
- **指令**：`clipboard`、`authShow`、`preventReClick`、`elDraggableDialog`
- **页面级 store**：各业务页面独立 `store.ts` + `api.ts` 模式

---

## 六、目录结构（实际）

```
crm-vue/
├── config/                  # 环境配置（dev/qa/prod）
├── mock/                    # Mock 服务与模拟数据
├── public/                  # 静态资源（含 old_ctn.html）
├── src/
│   ├── api/                 # 公共 API
│   ├── commonComponents/    # 业务公共组件
│   ├── components/          # 基础公共组件
│   ├── directives/          # 全局指令
│   ├── filters/             # 全局过滤器
│   ├── icons/               # SVG 图标
│   ├── plugins/             # 呼叫中心、埋点等插件
│   ├── store/modules/       # Vuex 模块（user/permission/app 等）
│   ├── styles/              # 全局 Less 变量与混入
│   ├── utils/               # 工具函数
│   └── pages/
│       ├── crm/             # 主应用（layout/router/views）
│       ├── h5/              # 移动端页面
│       └── tools/           # 工具应用
├── tests/                   # 单元/E2E 测试
├── tools/                   # 脚手架脚本
└── vue.config.js            # Webpack 多入口配置
```

---

## 七、开发与部署

### 环境

| 环境       | 地址                              |
| ---------- | --------------------------------- |
| 开发       | https://crm-dev.ymt360.com        |
| QA         | http://qa-crm.ymt360.com          |
| 生产       | https://crm.ymt360.com            |
| 微服务开发 | https://newcrm.ymt360.com/crm-vue |

### 发布流程

- **开发环境**：合并到 `FE/liantiao` 分支触发 CI 自动构建
- **QA**：由 QA 人员发布
- **线上**：通过 Jenkins（`k8s-crm-vue`）发布

### 开发规范

项目配套 `SPECIFICATION.md`、`Gitflow.md`、`STARTUP.md`，约定：

- 页面四件套：`index.vue` + `api.ts` + `store.ts` + 路由配置
- 组件/页面命名、BEM 样式、接口异常处理等均有明确规范

---

## 八、项目特点与现状

### 优势

1. **业务覆盖广**：横跨销售、运营、物流、金融、客服等多条业务线，是典型的大型 B 端单体前端
2. **工程化成熟**：多入口、动态路由、微前端、Mock、脚手架一应俱全
3. **组件沉淀丰富**：通用组件与业务组件库支撑快速迭代
4. **电销深度集成**：多呼叫中心插件，贴合农业 B2B 销售场景

### 技术债务与演进方向

1. **Vue 2 技术栈**：Vue 2 / Webpack 4 / Element UI 2 已属上一代方案，升级 Vue 3 成本高
2. **单体体量庞大**：330+ 路由、700+ 组件，构建需 `max-old-space-size=8192`，维护与拆分压力大
3. **新旧系统并存**：`old.ts` 中 91 个历史路由 + `old_ctn.html` 增加认知与维护成本
4. **微前端迁移中**：新旧 CRM 基座并行，路由跳转逻辑较复杂

---

## 九、一句话总结

**crm-vue** 是一亩田公司内部最大型的 B 端前端工程之一，以 Vue 2 + TypeScript + Element UI 构建，承载销售电销、集市运营、豆牛物流、沃来销、客服风控等全链路 CRM 能力；采用多入口 + 微前端 + 后端动态权限路由架构，是一个历经多年迭代、功能高度聚合的企业级农业 B2B 运营管理平台。

## 十、 具体问题细节
### 用 2 分钟介绍你最代表的一个项目。
一亩田 CRM 是公司 B2B 商业化运营前台，我负责其中销售触达与转化履约相关前端，包括电销工作台、六套外呼、市场线索公海、沃来销订单审核等。
技术上它是 Vue2 + TS 的大型应用，约 700+ 业务页，多入口，并作为 micro-app 子应用 接入公司基座；菜单由后端 RBAC 动态生成。
我最有代表性的成果是 外呼话单统一：推动 online → initId → 拨打 → hangup 契约，横向改造六套供应商组件，解决重复拨打、话单缺失和切换客户串号；同时做了业务组件封装 和 Webpack 拆包等工程化优化。
难点是销售不能停线，前提下的横向改造，我采用先定后端契约、再分波改 UI 的策略。

### CRM 为什么接入微前端？你们子应用和基座怎么协作？
微前端解决的首先是组织问题，其次才是技术问题。是让"多个团队在同一个前端里不互相踩脚"的治理方案。
解决痛点：巨石应用难维护​/技术栈升级卡死/独立部署需求​/多团队协作
额外成本 = 沙箱运行时开销 + 跨应用通信复杂度 + 多套 CI/CD 流水线 + 版本兼容性矩阵 + 调试链路变长 + 包体积可能膨胀

1. 资源路径:运行时根据基座注入改publicPath,否则chunk404.
```
if ((window as any).__MICRO_APP_ENVIRONMENT__) {
  __webpack_public_path__ = (window as any).__MICRO_APP_PUBLIC_PATH__
}
```
1. 路由与菜单:后端约束应用名，若页面不在本子应用，整页跳基座的子应用，路由 afterEach 向基座 dispatch 标题更新 Tab。
```
  // 如果菜单不是在此应用中跳到基座应用中
  const { fullPath, meta } = to
  if (meta.viewKey && !commonConfig.subBaseName.includes(meta.viewKey)) {
    location.href = `${config.baseCrmUrl}/${meta.viewKey}#${fullPath}`
    NProgress.done()
    return
  }
```
子应用服从 统一登录、菜单、发布；CRM 的核心矛盾是 旧系统并行 + 动态菜单，不是多框架沙箱对比。
缺陷： 外呼 SDK 在 index.html 按是否基座环境分支加载；业务代码与基座生命周期耦合仍偏重。

### 为什么不是qiankun而是micro_app
1. 本质
qiankun是蚂蚁集团基于基于 single-spa封装，把子应用当独立应用管起来，"应用级"路由管控 + JS 沙箱代理​
micro是京东零售，基于WebComponent方案，把子应用当自定义元素 <micro-app>​ 来用，"组件级"标签化渲染 + Shadow DOM 边界隔离​
2. 核心技术差异
qiankun​ — 子应用需要改造，导出生命周期钩子。还需要配 publicPath、__webpack_public_path__等，接入周期通常 1~2 周。
micro-app​ — 零侵入，子应用只需要打出标准静态资源（HTML），主应用一行标签完事。不需要改子应用源码、不需要导出钩子、不需要特殊 webpack 配置
```
<!-- 主应用模板里直接用 -->
<micro-app name="sub-app" url="http://localhost:7100/"></micro-app>
```
### micro_app中shadow有哪些坑
Shadow DOM 隔离的代价，集中爆发在一条线上：凡是子应用里有"把 DOM 挂到 body / 逃出我自己的根节点"的行为，就会炸。​ 弹窗组件库是头号嫌疑人，全局样式供给是二号，老 React 事件系统是三号。能把这些三个前置处理好（改 portal 挂载点 + 子应用自包含样式 + 框架版本 ≥17），shadowDOM 才会真的变成"开箱即爽"而不是"开箱即修Bug"。
### 动态权限路由怎么实现的？有什么坑？
流程：router.beforEach → 拉用户 → GenerateRoutes() → filterAsyncRoutes → 把后端资源树转成 Vue Router 配置 → router.addRoutes

坑：
组件 name 必须等于路由 name，否则 keep-alive 失效（规范里写明）。
addRoutes 后必须 replace: true，否则刷新白屏。
迁移期非 inner 导航会 window.open 旧 CRM，测试容易误判为路由 bug。

### 历史老旧Angular项目对接的兼容问题，你是怎么一步步定位解决的？
「我们不是把 Angular 代码迁进 Vue，而是 新旧并行：未迁完的菜单仍进老容器，已迁的走 Vue；再叠加微前端基座。兼容工作的核心是 路由、登录态、窗口策略、全局脚本冲突。」

我排查兼容问题会先 看 URL 和 viewKey，分清走 Vue、走 iframe 老容器，还是跳微前端基座。老菜单在 router/old.ts 做 path 映射，页面用 iframe 加载 oldUrlBase + fullPath。

踩坑主要在四块：路由对不上、iframe 不随路由刷新、Vue Router 和老应用抢 history、基座环境重复加载全局 SDK。对应处理是完善 old 映射表、Watch 路由更新 src、permission 里用命名窗口 + MyHistory 识别后退，以及 isBaseCrm 控制脚本加载。

回头看，iframe 方案 稳但体验割裂；重做会按业务域 分批迁 Vue，老系统只保留只读低频页，并统一基座侧的 认证与 SDK 注入，而不是每个子应用各写一套 index.html。

### 六套外呼为什么用插件单例？话单流程怎么设计？
外呼依赖WebRtc和WebSocket,重复mount会重复注册分机，所以用Vue.use插件，在 document.body 挂 单例浮窗。
话单流程：
1. 注册分机： 返回 canDail + initId
2. 拨打：initId 写入 SDK 透传字段 transId
3. 挂断：CTI Hangup 事件 → callCenterReportStatus('hangup', { initId, hangupType })

防连点： lodash.debounce 1500ms，leading: true, trailing: false。
单例副作用： 切换 cid 必须刷新被叫号；配合 getCustInfo、remark: 'new'、getHash() 与后端清缓存。

### Webpack 做了哪些性能相关配置？为什么关 prefetch？
生产环境：

1. splitChunks：chunk-libs / chunk-elementUI / chunk-commons（src/components 引用 ≥3 次）
2. runtimeChunk('single') + 输出 contenthash
3. productionSourceMap: false
4. 路由 import() + webpackChunkName 按业务域分组（如 wlx_group）
5. 关 prefetch/preload： 多入口 + 菜单极多，预加载会 抢首屏带宽；CRM 是 常驻后台，首屏稳定比「下一页极致快」更重要。
6. Element： babel-plugin-component + element.ts 手动 register，避免全量引入。

