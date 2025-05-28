import { EnumValue } from './types';

export function getEnumValueOrDefault<T extends Object>(value: string, enumType: T, defaultValue: EnumValue<T>) {
  return Object.values(enumType).includes(value) ? value : defaultValue;
}

export function getAttribute<T>(element: Element, attribute: string) {
  return element.getAttribute(`data-${attribute}`) as T;
}

export function getEnumAttributeOrDefault<T extends Object>(
  element: Element,
  attribute: string,
  enumType: T,
  defaultValue: EnumValue<T>,
) {
  const value = element.getAttribute(`data-${attribute}`) || '';

  return getEnumValueOrDefault(value, enumType, defaultValue) as EnumValue<T>;
}
