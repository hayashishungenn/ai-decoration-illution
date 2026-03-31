export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
}

export function getCurrentDate(): string {
  return new Date().toISOString();
}

export function getBudgetPrice(budgetId: string): string {
  const prices: Record<string, string> = {
    luxury: '¥2,500/㎡',
    standard: '¥1,850/㎡',
    basic: '¥1,000/㎡',
  };
  return prices[budgetId] || '¥1,850/㎡';
}

export function getBudgetPriceValue(budgetId: string): string {
  const prices: Record<string, string> = {
    luxury: '¥2500+/㎡',
    standard: '¥1,850/㎡',
    basic: '¥800-1200/㎡',
  };
  return prices[budgetId] || '¥1,850/㎡';
}

export function getBudgetName(budgetId: string): string {
  const names: Record<string, string> = {
    luxury: '豪装系列',
    standard: '精装系列',
    basic: '简装系列',
  };
  return names[budgetId] || '精装系列';
}

export function getStyleName(styleId: string): string {
  const names: Record<string, string> = {
    european: '优雅欧式',
    chinese: '新中式',
    modern: '现代极简',
    cream: '奶油轻奢',
  };
  return names[styleId] || '奶油轻奢';
}

export function getAreaName(areaId: string): string {
  const names: Record<string, string> = {
    'living-room': '客厅',
    kitchen: '厨房',
    bedroom: '卧室',
    bathroom: '卫生间',
    'dining-room': '餐厅',
    study: '书房',
  };
  return names[areaId] || areaId;
}
