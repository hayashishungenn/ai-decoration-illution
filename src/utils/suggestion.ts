import type { BudgetLevel, StyleType } from '../store/useDecorStore';

export interface Suggestion {
  id: number;
  text: string;
}

// 风格相关的建议模板
const styleSuggestions: Record<StyleType, string[]> = {
  european: [
    '建议采用经典石膏线装饰天花与墙面，营造法式宫廷的层次感',
    '主灯推荐水晶吊灯，搭配壁灯形成多层次照明系统',
    '软装可选用丝绒材质沙发与雕花木质家具，彰显欧式奢华',
  ],
  chinese: [
    '建议采用胡桃木或橡木材质，展现东方木质纹理的自然美感',
    '空间布局讲究留白意境，避免过度装饰，体现禅意美学',
    '可搭配中式屏风、茶具摆件，营造现代东方生活意境',
  ],
  modern: [
    '建议采用无主灯设计，使用筒灯与灯带营造简洁光影效果',
    '色彩以黑白灰为主，局部可用低饱和彩色作为点缀',
    '家具选择线条简洁的功能性产品，强调收纳与实用',
  ],
  cream: [
    '建议采用低饱和奶油色系作为基底，配合智能调光系统可有效提升空间纵深感',
    '推荐在吊顶与主灯之间增加层次光源，增强晚间氛围',
    '软装材质优先选择亲肤布艺与浅木元素，兼顾温度与质感',
  ],
};

// 预算相关的建议模板
const budgetSuggestions: Record<BudgetLevel, string[]> = {
  luxury: [
    '材料方面推荐使用进口品牌，如德国柏丽橱柜、意大利 IMOLA 瓷砖等',
    '可考虑全屋智能家居系统，包括灯光、窗帘、空调的联动控制',
    '工艺细节建议采用极简收口工艺，实现无缝衔接效果',
  ],
  standard: [
    '材料方面推荐使用 2026 款纳米自洁涂料，可大幅降低后续维护成本，保持长久如新',
    '建议选择国内一线品牌，如欧派、索菲亚等，平衡品质与预算',
    '工艺采用标准化流程，确保每个环节质量可控',
  ],
  basic: [
    '材料建议选用性价比高的国产品牌，满足基础功能需求',
    '可简化吊顶设计，采用明装灯具降低施工成本',
    '重点投入在隐蔽工程，确保水电质量可靠',
  ],
};

// 区域相关的建议模板
const areaSuggestions: Record<string, string[]> = {
  'living-room': [
    '客厅作为核心空间，建议采用低饱和度的莫兰迪色系作为基础，配合智能调光系统可有效提升空间纵深感',
    '沙发背景墙可做重点设计，使用岩板或木饰面提升质感',
    '地面推荐通铺大规格瓷砖，增强空间整体感',
  ],
  'kitchen': [
    '厨房建议采用 U 型或 L 型布局，最大化操作台面空间',
    '橱柜推荐选用防潮板材，台面使用石英石材质',
    '灯光设计需兼顾整体照明与操作台局部照明',
  ],
  'bedroom': [
    '卧室建议采用暖色调灯光，营造温馨舒适的睡眠氛围',
    '床头背景墙可做软包处理，提升舒适度与隔音效果',
    '衣柜建议做到顶设计，增加收纳空间且避免积灰',
  ],
  'bathroom': [
    '卫生间建议做干湿分离设计，提升使用舒适度',
    '瓷砖选用防滑材质，安全性能优先',
    '可考虑智能马桶与恒温花洒，提升生活品质',
  ],
  'dining-room': [
    '餐厅灯光建议选用暖光，增强食物色泽与用餐氛围',
    '餐桌周围预留足够活动空间，建议不小于 90cm',
    '可考虑餐边柜设计，增加餐具与酒水收纳',
  ],
  'study': [
    '书房建议采用中性光，色温 4000K 左右利于专注工作',
    '书桌位置避免背光，保证充足自然采光',
    '书柜建议采用开放与封闭结合，兼顾展示与防尘',
  ],
};

export function generateSuggestions(
  area: string,
  budget: BudgetLevel,
  style: StyleType
): Suggestion[] {
  const suggestions: string[] = [];

  // 添加区域建议（1 条）
  const areaSuggestion = areaSuggestions[area]?.[0];
  if (areaSuggestion) {
    suggestions.push(areaSuggestion);
  }

  // 添加风格建议（1 条）
  const styleSuggestion = styleSuggestions[style]?.[0];
  if (styleSuggestion) {
    suggestions.push(styleSuggestion);
  }

  // 添加预算建议（1 条）
  const budgetSuggestion = budgetSuggestions[budget]?.[0];
  if (budgetSuggestion) {
    suggestions.push(budgetSuggestion);
  }

  // 如果不足 3 条，补充通用建议
  const genericSuggestions = [
    '建议在施工前做好成品保护，避免交叉污染',
    '装修完成后建议通风 3-6 个月再入住',
    '可考虑安装新风系统，提升室内空气质量',
    '建议预留足够的电源插座，满足未来智能设备需求',
  ];

  while (suggestions.length < 3) {
    const generic = genericSuggestions[suggestions.length % genericSuggestions.length];
    if (!suggestions.includes(generic)) {
      suggestions.push(generic);
    }
  }

  return suggestions.map((text, index) => ({
    id: index + 1,
    text,
  }));
}
