export interface Area {
  id: string;
  name: string;
  image: string;
  description?: string;
}

export interface Budget {
  id: string;
  name: string;
  tag: string;
  tagColor?: string;
  description: string;
  priceText: string;
  durationText: string;
  recommended?: boolean;
}

export interface Style {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  promptKeywords: string[];
}

export interface Suggestion {
  id: number;
  text: string;
}

// 区域数据
export const areas: Area[] = [
  {
    id: 'living-room',
    name: '客厅',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=400&fit=crop',
    description: '家庭核心活动空间',
  },
  {
    id: 'kitchen',
    name: '厨房',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop',
    description: '烹饪美食的地方',
  },
  {
    id: 'bedroom',
    name: '卧室',
    image: 'https://images.unsplash.com/photo-1616594039964-40891a909d39?w=400&h=400&fit=crop',
    description: '私密休息空间',
  },
  {
    id: 'bathroom',
    name: '卫生间',
    image: 'https://images.unsplash.com/photo-1552321901-478768244813?w=400&h=400&fit=crop',
    description: '洗漱卫浴空间',
  },
  {
    id: 'dining-room',
    name: '餐厅',
    image: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?w=400&h=400&fit=crop',
    description: '家庭聚餐区域',
  },
  {
    id: 'study',
    name: '书房',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea970?w=400&h=400&fit=crop',
    description: '工作学习空间',
  },
];

// 预算数据
export const budgets: Budget[] = [
  {
    id: 'luxury',
    name: '豪装系列',
    tag: '极致奢华',
    tagColor: 'bg-orange-100 text-orange-600',
    description: '顶级进口建材，AI 艺术化灯光控制，极致工艺细节。',
    priceText: '¥2500+/㎡',
    durationText: '90 天工期',
    recommended: false,
  },
  {
    id: 'standard',
    name: '精装系列',
    tag: '高性价比',
    tagColor: 'bg-green-100 text-green-600',
    description: '一线环保材料，标准化工艺流程，均衡的品质与价格。',
    priceText: '¥1200-1800/㎡',
    durationText: '60 天工期',
    recommended: true,
  },
  {
    id: 'basic',
    name: '简装系列',
    tag: '极简实用',
    tagColor: 'bg-blue-100 text-blue-600',
    description: '基础功能完善，适合效率优先与预算控制型方案。',
    priceText: '¥800-1200/㎡',
    durationText: '45 天工期',
    recommended: false,
  },
];

// 风格数据
export const styles: Style[] = [
  {
    id: 'european',
    name: '优雅欧式',
    subtitle: '石材线条、全房装饰、法式宫廷气息',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=400&fit=crop',
    promptKeywords: ['european', 'classical', 'luxury', 'ornate'],
  },
  {
    id: 'chinese',
    name: '新中式',
    subtitle: '木质纹理、禅意留白、现代东方美学',
    image: 'https://images.unsplash.com/photo-1545648991-a2147e649d56?w=800&h=400&fit=crop',
    promptKeywords: ['chinese', 'zen', 'minimalist', 'wood'],
  },
  {
    id: 'modern',
    name: '现代极简',
    subtitle: '低饱和配色、简洁线条、功能优先',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=400&fit=crop',
    promptKeywords: ['modern', 'minimalist', 'clean', 'functional'],
  },
  {
    id: 'cream',
    name: '奶油轻奢',
    subtitle: '柔和材质、温暖光感、精致软装',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=400&fit=crop',
    promptKeywords: ['cream', 'luxury', 'warm', 'soft'],
  },
];

// 业务类型
export type BizType = 'home' | 'office';

export interface BizOption {
  id: BizType;
  name: string;
  subtitle: string;
  image: string;
}

export const bizOptions: BizOption[] = [
  {
    id: 'home',
    name: '温墅家装',
    subtitle: '覆盖住宅、公寓、别墅的全屋定制方案',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=500&fit=crop',
  },
  {
    id: 'office',
    name: '商务办公',
    subtitle: '高效能办公室、独立工作室专业设计',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop',
  },
];
