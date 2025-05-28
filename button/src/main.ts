import './style.css';
import cn from 'classnames';
import {
  DEFAULT_CAPTION_EN,
  DEFAULT_CAPTION_UK,
  DEFAULT_CONFIG,
  getKPIIDDev,
  getKPIIDProd,
  ROOT_ELEMENT_ID,
} from './constants';
import { Logger } from './logger';
import { ButtonConfig, Color, Locale, LogoAlignment, Size } from './types';
import { getAttribute, getEnumAttributeOrDefault } from './utils';
import { CODE_OF_ARMS_IMAGE } from './images';

const logger = Logger('KPI ID');

function getDefaultCaption(locale: Locale) {
  if (locale === Locale.En) {
    return DEFAULT_CAPTION_EN;
  }

  return DEFAULT_CAPTION_UK;
}

function getConfig(rootElement: Element) {
  const size = getEnumAttributeOrDefault(rootElement, 'size', Size, Size.Medium);
  const color = getEnumAttributeOrDefault(rootElement, 'color', Color, Color.Brand);
  const logoAlignment = getEnumAttributeOrDefault(rootElement, 'logo-alignment', LogoAlignment, LogoAlignment.Left);
  const locale = getEnumAttributeOrDefault(rootElement, 'locale', Locale, Locale.Uk);
  const caption = getAttribute<string>(rootElement, 'caption') || getDefaultCaption(locale);
  const className = getAttribute<string>(rootElement, 'class-name');
  const fullWidth = getAttribute<string>(rootElement, 'full-width') === 'true';
  const appId = getAttribute<string>(rootElement, 'app-id');
  const devMode = getAttribute<string>(rootElement, 'dev-mode') === 'true';

  return {
    ...DEFAULT_CONFIG,
    size,
    color,
    logoAlignment,
    locale,
    caption,
    className,
    fullWidth,
    appId,
    devMode,
  } satisfies ButtonConfig;
}

export function init() {
  const rootElement = document.getElementById(ROOT_ELEMENT_ID);

  if (!rootElement) {
    logger.error('Root element not found');
    logger.info('Please add <div id="kpi_id_signin"></div> to your HTML');
    return;
  }

  const config = getConfig(rootElement);

  if (!config.appId) {
    logger.error('Client ID must be provided');
    return;
  }

  const className = cn(
    '__kpi_id_button',
    config.size,
    config.color,
    { 'full-width': config.fullWidth },
    config.className,
  );
  const contents = [CODE_OF_ARMS_IMAGE, config.caption];
  const alignedContents = config.logoAlignment === LogoAlignment.Right ? contents.reverse() : contents;
  const href = config.devMode ? getKPIIDDev(config.appId) : getKPIIDProd(config.appId);

  rootElement.outerHTML = `
    <a class="${className}" href="${href}">
      ${alignedContents.join('')}
    </a>
  `;
}
