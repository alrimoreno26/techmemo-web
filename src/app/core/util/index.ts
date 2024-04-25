import {environment} from "../../../environments/environment";

const APIUrl: string = environment.apiURL;

/**
 * Retrieve the base URL associated
 * with the API from the environment
 * concatenated with the given value
 * @param serviceUrl string
 * @return An string
 */
export const buildURL = (serviceUrl: string): string => {
    return `${APIUrl + serviceUrl}`;
};

export const onlyDigits = (value: string) => value.replace(/[^0-9]/g, '');

export const isObject = (value: any) => value instanceof Object;

export const groupBy = (array: any[], key: string) => {
    return array.reduce((result, obj) => {
        (result[obj[key]] = result[obj[key]] || []).push(obj);
        return result;
    }, {});
}

export function getErrorMessage(
    error: any,
    fallbackMessage: string = 'Ops! Ocorreu um erro inesperado. Por favor, tente novamente mais tarde'
): string {
    if (typeof error === 'string') {
        if (
            error.includes('doctype') ||
            error.includes('html') ||
            error.includes('head') ||
            error.includes('title')
        ) {
            // case 500: of amazon
            return 'Ocorreu um erro no servidor. Por favor, tente novamente mais tarde';
        }
        return error;
    }
    switch (error?.status) {
        case 403:
            return 'O recurso especificado não está acessível';
        case 503:
            return 'Serviço indisponível. Por favor, tente novamente mais tarde';
    }
    if (typeof error === 'object' && error?.message) {
        return error.message;
    }
    return fallbackMessage;
}

export const getCookie = (value: string): string => {
    const cookie = document.cookie.split('; ').find(f => f.startsWith(value + '='));
    return cookie ? cookie.split('=')[1] : '';
};

export const setCookie = (key: string, value: string, maxAge: number = 7200) => {
    const domain = document.location.hostname.includes('techmemo-app.s3') ? 'techmemo-app' : 'localhost';
    debugger
    environment.production ?
        document.cookie = `${key}=${value}; Domain=${domain}; Max-Age=${maxAge}; SameSite=None; Secure; Path=/;` :
        document.cookie = `${key}=${value}; Domain=${domain}; Max-Age=${maxAge}; Path=/;`;
};

export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Suma 1 al mes porque los meses comienzan desde 0
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}
