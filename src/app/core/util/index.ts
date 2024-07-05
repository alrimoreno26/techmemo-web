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
    const domain = document.location.hostname.includes('techmemo-app.s3') ? 'techmemo-app.s3-website-us-east-1.amazonaws.com' : 'localhost';

    //TODO cuando haya ssl poner SameSite=None; Secure;
    //SameSite=None; Secure;
    if (domain === 'techmemo-app.s3-website-us-east-1.amazonaws.com') {
        document.cookie = `${key}=${value}; Domain=${domain}; Max-Age=${maxAge}; Path=/;`
    } else {
        document.cookie = `${key}=${value}; Domain=${domain}; Max-Age=${maxAge}; Path=/;`;
    }

};

export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Suma 1 al mes porque los meses comienzan desde 0
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

export const BrazilActiveBanks: Array<any> = [
    {
        "COMPE": "001",
        "ISPB": "00000000",
        "Document": "00.000.000/0001-91",
        "LongName": "Banco do Brasil S.A.",
        "ShortName": "BCO DO BRASIL S.A.",
        "Icon": "banco-do-brasil.svg"
    },
    {
        "COMPE": "033",
        "ISPB": "90400888",
        "Document": "90.400.888/0001-42",
        "LongName": "BANCO SANTANDER (BRASIL) S.A.",
        "ShortName": "BCO SANTANDER (BRASIL) S.A.",
        "Icon": "santander.svg"
    },
    {
        "COMPE": "104",
        "ISPB": "00360305",
        "Document": "00.360.305/0001-04",
        "LongName": "Caixa Econômica Federal",
        "ShortName": "CAIXA ECONOMICA FEDERAL",
        "Icon": "caixa.svg"
    },
    {
        "COMPE": "237",
        "ISPB": "60746948",
        "Document": "60.746.948/0001-12",
        "LongName": "Banco Bradesco S.A.",
        "ShortName": "BCO BRADESCO S.A.",
        "Icon": "bradesco.svg"
    },
    {
        "COMPE": "341",
        "ISPB": "60701190",
        "Document": "60.701.190/0001-04",
        "LongName": "ITAÚ UNIBANCO S.A.",
        "ShortName": "ITAÚ UNIBANCO S.A.",
        "Icon": "itau.svg"
    },
    {
        "COMPE": "745",
        "ISPB": "33479023",
        "Document": "33.479.023/0001-80",
        "LongName": "Banco Citibank S.A.",
        "ShortName": "BCO CITIBANK S.A.",
        "Icon": "city-bank.svg"
    },
];


export function removeNullProperties<T extends object>(obj: T): Partial<T> {
    const result: Partial<T> = {};

    Object.keys(obj).forEach(key => {
        const value = (obj as any)[key];

        if (value !== null) {
            (result as any)[key] = value;
        }
    });
    return result;
}
