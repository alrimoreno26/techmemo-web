import {environment} from "../../../environments/environment";

const APIUrl: string = environment.apiURL;
const APIOrdersUrl: string = environment.apiOrders;
const APIUsersUrl: string = environment.apiUsers;

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
export const buildOrderURL = (serviceUrl: string): string => {
    return `${APIOrdersUrl + serviceUrl}`;
};

export const buildUsersURL = (serviceUrl: string): string => {
    return `${APIUsersUrl + serviceUrl}`;
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
    const domain =  'localhost';
    environment.production ?
        document.cookie = `${key}=${value}; Domain=${domain}; Max-Age=${maxAge}; SameSite=None; Secure; Path=/;` :
        document.cookie = `${key}=${value}; Domain=${domain}; Max-Age=${maxAge}; Path=/;`;
};
