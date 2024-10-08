export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  theme: string;
  image: string;
}

export interface Message {
  message: string;
}

export interface Category {
  name: string;
  imageSrc?: string;
  user?: string;
  _id?: string;
}

export interface Position {
  name: string;
  cost: number;
  category: string;
  user?: string;
  _id?: string;
  quantity?: number;
}

export interface Order {
  Date?: Date;
  order?: number;
  user?: string;
  list: OrderPosition[];
  _id?: string;
}

export interface OrderPosition {
  name: string;
  cost: number;
  quantity: number;
  _id?: string;
}

export interface Filter {
  start?: Date;
  end?: Date;
  order?: number;
}

export interface OverviewPage {
  orders: OverviewPageItem;
  gain: OverviewPageItem;
}

export interface OverviewPageItem {
  percent: number;
  compare: number;
  dayGain?: number;
  dayOrders?: number;
  isHigher: boolean;
}

export interface AnalyticsPage {
  average: number;
  chart: AnalyticsChartItem[];
}

export interface AnalyticsChartItem {
  gain: number;
  order: number;
  label: string;
}

export interface ToastItem {
  type: string;
  text: string;
  status: number;
}

export interface Settings {
  restaurantName: string;
  url: string;
  image: string;
  mainColor?: string;
  secondaryColor?: string;
  _id?: string; 
}

export interface QrCode {
  url: string;
  qr: string;
  title: string;
  order: number;
  _id?: string;
}