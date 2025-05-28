import type { ButtonConfig } from '@/types/button-config';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scriptBuilder = (base: string) => {
  return {
    add: function (prop: string, value?: string) {
      if (!value || value === 'false') {
        return this;
      }

      base += `data-${prop}="${value}" `;

      return this;
    },
    build: function () {
      return `${base.trimEnd()}></div>`;
    },
  };
};

export const getButtonPreview = (buttonConfig: ButtonConfig) => {
  const base = '<div id="kpi_id_signin" ';
  const sb = scriptBuilder(base);

  return sb
    .add('app-id', buttonConfig.appId)
    .add('size', buttonConfig.size)
    .add('full-width', String(buttonConfig.fullWidth))
    .add('logo-alignment', buttonConfig.logoAlignment)
    .add('locale', buttonConfig.locale)
    .add('caption', buttonConfig.caption)
    .add('color', buttonConfig.color)
    .add('class-name', buttonConfig.className)
    .add('dev-mode', String(buttonConfig.devMode))
    .build();
};
