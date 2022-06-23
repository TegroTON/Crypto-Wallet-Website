import { useTranslation } from 'react-i18next';
import {
    currencies, Currency, languages, Language,
} from '../types';

export function round(number: number, scale: number) {
    return Math.round((number + Number.EPSILON) * 10 ** scale) / 10 ** scale;
}

export function getCurrency(): Currency {
    const cur = localStorage.getItem('currency') || '';
    if (cur in currencies) {
        return cur as Currency;
    }
    const default_cur = 'usd';
    localStorage.setItem('currency', default_cur);
    return default_cur as Currency;
}

export function setCurrency(currency: Currency) {
    localStorage.setItem('currency', currency);
    return currency;
}

export function getLanguage(): Language {
    const lang = localStorage.getItem('language') || '';
    if (lang in languages) {
        return lang as Language;
    }
    const default_lang = 'en';
    localStorage.setItem('language', default_lang);
    return default_lang as Language;
}

export function setLanguage(language: Language) {
    localStorage.setItem('language', language);
}

export function getNextLanguage() {
    const lang = getLanguage();
    const langList = Object.keys(languages);
    return langList[langList.indexOf(lang) + 1] || langList[0];
}
