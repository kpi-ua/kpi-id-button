export type EnumValue<T> = T[keyof T];

export enum Size {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum Color {
  Brand = 'brand',
  Outline = 'outline',
}

export enum LogoAlignment {
  Left = 'left',
  Right = 'right',
}

export enum Locale {
  Uk = 'uk',
  En = 'en',
}

export type ButtonConfig = {
  size: Size;
  color: Color;
  logoAlignment: LogoAlignment;
  caption: string;
  appId?: string;
  locale: Locale;
  fullWidth?: boolean;
  className?: string;
  devMode?: boolean;
};
