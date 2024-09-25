export interface Settings {
  title?: string;
  background?: BackgroundConfig;
  favicon?: string;
  theme?: string;
  color?: Color;
  layout?: Service[];
}

export enum Color {
  slate = 0,
  gray = 1,
  zinc = 2,
  neutral = 3,
}

export interface BackgroundConfig {
  uri?: string;
  blur?: string;
  saturate?: number;
  brightness?: number;
  opacity?: number;
}

export interface Service {
  name: string;
  icon?: string;
  href?: string;
  description?: string;
  container?: string;
  widget?: Widget;
}

export interface Widget {
  type: string;
  url: string;
  key: string;
}
