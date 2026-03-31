# AI 装修方案生成 H5

一个基于 React + TypeScript + Vite 的移动端 H5 应用，提供 AI 驱动的全屋定制装修方案设计。

## 🚀 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **React Router** - 路由管理
- **Framer Motion** - 动画效果
- **Zustand** - 状态管理

## 📦 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看应用（建议使用手机模式预览）

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📱 完整页面流程

### 1. 首页 - 业务类型选择
- **路径**: `/`
- **内容**: 
  - 温墅家装（住宅、公寓、别墅）
  - 商务办公（办公室、工作室）
- **下一步**: 点击任意卡片 → 区域选择页

### 2. 区域选择 - 第 1 步（25%）
- **路径**: `/area`
- **内容**: 
  - 客厅、厨房、卧室、卫生间、餐厅、书房
  - 专业建议提示框
- **上一步**: 返回按钮 → 首页
- **下一步**: 选择区域 → 点击"下一步" → 预算选择页

### 3. 预算选择 - 第 2 步（50%）
- **路径**: `/budget`
- **内容**:
  - 豪装系列（¥2500+/㎡，90 天）
  - 精装系列（¥1200-1800/㎡，60 天）⭐ 推荐
  - 简装系列（¥800-1200/㎡，45 天）
- **上一步**: 返回按钮 → 区域选择
- **下一步**: 选择预算 → 点击"下一步" → 风格选择页

### 4. 风格选择 - 第 3 步（75%）
- **路径**: `/style`
- **内容**:
  - 优雅欧式（石材线条、法式宫廷）
  - 新中式（木质纹理、禅意留白）
  - 现代极简（低饱和配色、简洁线条）
  - 奶油轻奢（柔和材质、温暖光感）
- **上一步**: 返回按钮 → 预算选择
- **下一步**: 选择风格 → 点击"生成方案" → AI 生成页

### 5. AI 生成中
- **路径**: `/generating`
- **内容**:
  - 绿色圆环加载动画
  - 进度条（0% → 99%）
  - 倒计时 2.5 秒
- **自动跳转**: 生成完成 → 结果页面

### 6. 方案结果页
- **路径**: `/result`
- **内容**:
  - 深蓝色 Hero 区域（含 3D 户型图）
  - 设计参数（4 个字段）
  - AI 专家建议（3 条）
- **操作**:
  - 返回首页按钮 → 首页
  - 重新选择 → 首页（清空选择）
  - 保存高清方案 → Toast 提示

## 🎨 设计特点

- **移动端优先**: 基准宽度 390px，最大宽度 414px
- **主色调**: 绿色 (#10B981 / #19C37D)
- **圆角风格**: 16px-24px 大圆角
- **轻阴影**: 柔和的卡片阴影效果
- **流畅动画**: Framer Motion 页面切换
- **本地存储**: Zustand persist 中间件

## 🛠️ 项目结构

```
src/
├── components/          # 可复用组件
│   ├── BizCard.tsx      # 业务类型卡片
│   ├── BudgetCard.tsx   # 预算卡片
│   ├── StyleCard.tsx    # 风格卡片
│   ├── SelectCard.tsx   # 区域选择卡片
│   ├── PageHeader.tsx   # 页面头部（含返回按钮）
│   ├── ProgressBar.tsx  # 进度条
│   ├── BottomActionBar.tsx # 底部操作栏
│   ├── LoadingRing.tsx  # 加载动画
│   └── SuggestionList.tsx  # 建议列表
├── pages/              # 页面组件
│   ├── HomeEntryPage.tsx      # 首页
│   ├── SelectAreaPage.tsx     # 区域选择
│   ├── SelectBudgetPage.tsx   # 预算选择
│   ├── SelectStylePage.tsx    # 风格选择
│   ├── GeneratingPage.tsx     # AI 生成中
│   └── ResultPage.tsx         # 结果页面
├── store/              # 状态管理
│   └── useDecorStore.ts # Zustand store
├── data/               # Mock 数据
│   └── mockData.ts      # 区域/预算/风格数据
├── utils/              # 工具函数
│   ├── suggestion.ts    # AI 建议生成
│   └── format.ts        # 格式化函数
├── App.tsx             # 路由配置
├── main.tsx            # 入口文件
└── index.css           # 全局样式
```

## 📊 状态管理

使用 Zustand 进行状态管理，支持 localStorage 持久化：

```typescript
interface FormState {
  bizType: 'home' | 'office';
  area: string;
  budget: 'luxury' | 'standard' | 'basic';
  style: 'european' | 'chinese' | 'modern' | 'cream';
  generatedAt: string;
}
```

**持久化策略**:
- 表单数据自动保存到 localStorage
- 刷新页面后恢复上次选择
- 生成时间实时更新

## ✨ 核心功能

- ✅ 完整的 6 页面流程
- ✅ 4 步选择进度条
- ✅ 本地数据持久化
- ✅ AI 建议动态生成（根据选择）
- ✅ 流畅的页面动画
- ✅ 移动端适配
- ✅ Toast 提示反馈
- ✅ 返回上一步功能
- ✅ 返回首页功能

## 📝 Mock 数据

### 区域数据（6 个）
客厅、厨房、卧室、卫生间、餐厅、书房

### 预算档次（3 个）
- 豪装系列：¥2500+/㎡，90 天工期
- 精装系列：¥1200-1800/㎡，60 天工期（推荐）
- 简装系列：¥800-1200/㎡，45 天工期

### 设计风格（4 个）
- 优雅欧式：石材线条、全房装饰、法式宫廷气息
- 新中式：木质纹理、禅意留白、现代东方美学
- 现代极简：低饱和配色、简洁线条、功能优先
- 奶油轻奢：柔和材质、温暖光感、精致软装

### AI 建议生成
根据"区域 + 预算 + 风格"组合生成 3 条个性化建议

## 🎯 导航流程

```
首页 (/)
  ↓ 点击业务类型
区域选择 (/area) ←→ 返回
  ↓ 选择区域 + 下一步
预算选择 (/budget) ←→ 返回
  ↓ 选择预算 + 下一步
风格选择 (/style) ←→ 返回
  ↓ 选择风格 + 生成方案
AI 生成中 (/generating)
  ↓ 自动跳转（2.5 秒）
结果页面 (/result)
  ↓ 重新选择
首页 (/)
```

## 🔧 配置说明

### Vite 配置
```typescript
server: {
  host: '0.0.0.0',  // 允许局域网访问
  port: 5173,
  strictPort: true,
}
```

### Tailwind 配置
- 主色：primary (green-500)
- 圆角：xl (16px), 2xl (24px), 3xl (32px)
- 阴影：soft, card

### Zustand 配置
```typescript
persist({
  name: 'decor-storage',
  partialize: (state) => ({ formState: state.formState }),
})
```

##  License

MIT
