import { ButtonConfig, Color, Locale, LogoAlignment, Size } from './types';

export const DEFAULT_CAPTION_UK = 'Увійти з KPI ID';
export const DEFAULT_CAPTION_EN = 'Sign in with KPI ID';
export const ROOT_ELEMENT_ID = 'kpi_id_signin';

export const DEFAULT_CONFIG: ButtonConfig = {
  size: Size.Medium,
  color: Color.Brand,
  logoAlignment: LogoAlignment.Left,
  caption: DEFAULT_CAPTION_UK,
  locale: Locale.Uk,
};

export const getKPIIDProd = (appId: string) => `https://auth.kpi.ua?appId=${appId}`;
export const getKPIIDDev = (appId: string) => `https://auth.cloud.kpi.ua?appId=${appId}`;
