import { Locale } from './types';

const configLocales = {
  no: 'nb-NO',
  pl: 'pl-PL',
  en: 'en-US',
};

export const getTimeDisplayLocale = (locale: Locale): string =>
  configLocales[locale];
