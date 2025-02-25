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
            "ISPB": "0",
            "LongName": "Banco Do Brasil S.A (BB)",
            "ShortName": "Banco Do Brasil S.A (BB)"
        },
        {
            "COMPE": "237",
            "ISPB": "60746948",
            "LongName": "Bradesco S.A.",
            "ShortName": "Bradesco S.A."
        },
        {
            "COMPE": "335",
            "ISPB": "27098060",
            "LongName": "Banco Digio S.A.",
            "ShortName": "Banco Digio S.A."
        },
        {
            "COMPE": "260",
            "ISPB": "18236120",
            "LongName": "Nu Pagamentos S.A (Nubank)",
            "ShortName": "Nu Pagamentos S.A (Nubank)"
        },
        {
            "COMPE": "290",
            "ISPB": "8561701",
            "LongName": "PagSeguro Internet S.A.",
            "ShortName": "PagSeguro Internet S.A."
        },
        {
            "COMPE": "323",
            "ISPB": "10573521",
            "LongName": "Mercado Pago – Conta Do Mercado Livre",
            "ShortName": "Mercado Pago – Conta Do Mercado Livre"
        },
        {
            "COMPE": "237",
            "ISPB": "60746948",
            "LongName": "Next Bank (Mesmo Código Do Bradesco)",
            "ShortName": "Next Bank (Mesmo Código Do Bradesco)"
        },
        {
            "COMPE": "637",
            "ISPB": "60889128",
            "LongName": "Banco Sofisa S.A (Sofisa Direto)",
            "ShortName": "Banco Sofisa S.A (Sofisa Direto)"
        },
        {
            "COMPE": "077",
            "ISPB": "416968",
            "LongName": "Banco Inter S.A.",
            "ShortName": "Banco Inter S.A."
        },
        {
            "COMPE": "341",
            "ISPB": "60701190",
            "LongName": "Itaú Unibanco S.A.",
            "ShortName": "Itaú Unibanco S.A."
        },
        {
            "COMPE": "104",
            "ISPB": "360305",
            "LongName": "Caixa Econômica Federal (CEF)",
            "ShortName": "Caixa Econômica Federal (CEF)"
        },
        {
            "COMPE": "033",
            "ISPB": "90400888",
            "LongName": "Banco Santander Brasil S.A.",
            "ShortName": "Banco Santander Brasil S.A."
        },
        {
            "COMPE": "212",
            "ISPB": "92894922",
            "LongName": "Banco Original S.A.",
            "ShortName": "Banco Original S.A."
        },
        {
            "COMPE": "756",
            "ISPB": "2038232",
            "LongName": "Bancoob – Banco Cooperativo Do Brasil S.A.",
            "ShortName": "Bancoob – Banco Cooperativo Do Brasil S.A."
        },
        {
            "COMPE": "655",
            "ISPB": "59588111",
            "LongName": "Banco Votorantim S.A.",
            "ShortName": "Banco Votorantim S.A."
        },
        {
            "COMPE": "655",
            "ISPB": "59588111",
            "LongName": "Neon Pagamentos S.A (Memso Código Do Banco Votorantim)",
            "ShortName": "Neon Pagamentos S.A (Memso Código Do Banco Votorantim)"
        },
        {
            "COMPE": "041",
            "ISPB": "92702067",
            "LongName": "Banrisul – Banco Do Estado Do Rio Grande Do Sul S.A.",
            "ShortName": "Banrisul – Banco Do Estado Do Rio Grande Do Sul S.A."
        },
        {
            "COMPE": "389",
            "ISPB": "17184037",
            "LongName": "Banco Mercantil Do Brasil S.A.",
            "ShortName": "Banco Mercantil Do Brasil S.A."
        },
        {
            "COMPE": "422",
            "ISPB": "58160789",
            "LongName": "Banco Safra S.A.",
            "ShortName": "Banco Safra S.A."
        },
        {
            "COMPE": "070",
            "ISPB": "208",
            "LongName": "BRB – Banco De Brasília S.A.",
            "ShortName": "BRB – Banco De Brasília S.A."
        },
        {
            "COMPE": "136",
            "ISPB": "315557",
            "LongName": "Unicred Cooperativa LTDA",
            "ShortName": "Unicred Cooperativa LTDA"
        },
        {
            "COMPE": "741",
            "ISPB": "517645",
            "LongName": "Banco Ribeirão Preto S.A.",
            "ShortName": "Banco Ribeirão Preto S.A."
        },
        {
            "COMPE": "739",
            "ISPB": "558456",
            "LongName": "Banco Cetelem S.A.",
            "ShortName": "Banco Cetelem S.A."
        },
        {
            "COMPE": "743",
            "ISPB": "795423",
            "LongName": "Banco Semear S.A.",
            "ShortName": "Banco Semear S.A."
        },
        {
            "COMPE": "100",
            "ISPB": "806535",
            "LongName": "Planner Corretora De Valores S.A.",
            "ShortName": "Planner Corretora De Valores S.A."
        },
        {
            "COMPE": "096",
            "ISPB": "997185",
            "LongName": "Banco B3 S.A.",
            "ShortName": "Banco B3 S.A."
        },
        {
            "COMPE": "747",
            "ISPB": "1023570",
            "LongName": "Banco Rabobank Internacional Do Brasil S.A.",
            "ShortName": "Banco Rabobank Internacional Do Brasil S.A."
        },
        {
            "COMPE": "748",
            "ISPB": "1181521",
            "LongName": "Banco Cooperativa Sicredi S.A.",
            "ShortName": "Banco Cooperativa Sicredi S.A."
        },
        {
            "COMPE": "752",
            "ISPB": "1522368",
            "LongName": "Banco BNP Paribas Brasil S.A.",
            "ShortName": "Banco BNP Paribas Brasil S.A."
        },
        {
            "COMPE": "091",
            "ISPB": "1634601",
            "LongName": "Unicred Central Rs",
            "ShortName": "Unicred Central Rs"
        },
        {
            "COMPE": "399",
            "ISPB": "1701201",
            "LongName": "Kirton Bank S.A. – Banco Múltiplo",
            "ShortName": "Kirton Bank S.A. – Banco Múltiplo"
        },
        {
            "COMPE": "108",
            "ISPB": "1800019",
            "LongName": "Portocred S.A.",
            "ShortName": "Portocred S.A."
        },
        {
            "COMPE": "757",
            "ISPB": "2318507",
            "LongName": "Banco Keb Hana Do Brasil S.A.",
            "ShortName": "Banco Keb Hana Do Brasil S.A."
        },
        {
            "COMPE": "102",
            "ISPB": "2332886",
            "LongName": "XP Investimentos S.A.",
            "ShortName": "XP Investimentos S.A."
        },
        {
            "COMPE": "348",
            "ISPB": "33264668",
            "LongName": "Banco XP S/A",
            "ShortName": "Banco XP S/A"
        },
        {
            "COMPE": "340",
            "ISPB": "9554480",
            "LongName": "Super Pagamentos S/A (Superdital)",
            "ShortName": "Super Pagamentos S/A (Superdital)"
        },
        {
            "COMPE": "084",
            "ISPB": "2398976",
            "LongName": "Uniprime Norte Do Paraná",
            "ShortName": "Uniprime Norte Do Paraná"
        },
        {
            "COMPE": "180",
            "ISPB": "2685483",
            "LongName": "Cm Capital Markets Cctvm Ltda",
            "ShortName": "Cm Capital Markets Cctvm Ltda"
        },
        {
            "COMPE": "066",
            "ISPB": "2801938",
            "LongName": "Banco Morgan Stanley S.A.",
            "ShortName": "Banco Morgan Stanley S.A."
        },
        {
            "COMPE": "015",
            "ISPB": "2819125",
            "LongName": "UBS Brasil Cctvm S.A.",
            "ShortName": "UBS Brasil Cctvm S.A."
        },
        {
            "COMPE": "143",
            "ISPB": "2992317",
            "LongName": "Treviso Cc S.A.",
            "ShortName": "Treviso Cc S.A."
        },
        {
            "COMPE": "062",
            "ISPB": "3012230",
            "LongName": "Hipercard Banco Múltiplo S.A.",
            "ShortName": "Hipercard Banco Múltiplo S.A."
        },
        {
            "COMPE": "074",
            "ISPB": "3017677",
            "LongName": "Banco J. Safra S.A.",
            "ShortName": "Banco J. Safra S.A."
        },
        {
            "COMPE": "099",
            "ISPB": "3046391",
            "LongName": "Uniprime Central Ccc Ltda",
            "ShortName": "Uniprime Central Ccc Ltda"
        },
        {
            "COMPE": "025",
            "ISPB": "3323840",
            "LongName": "Banco Alfa S.A.",
            "ShortName": "Banco Alfa S.A."
        },
        {
            "COMPE": "075",
            "ISPB": "3532415",
            "LongName": "Bco Abn Amro S.A.",
            "ShortName": "Bco Abn Amro S.A."
        },
        {
            "COMPE": "040",
            "ISPB": "3609817",
            "LongName": "Banco Cargill S.A.",
            "ShortName": "Banco Cargill S.A."
        },
        {
            "COMPE": "190",
            "ISPB": "3973814",
            "LongName": "Servicoop",
            "ShortName": "Servicoop"
        },
        {
            "COMPE": "063",
            "ISPB": "4184779",
            "LongName": "Banco Bradescard",
            "ShortName": "Banco Bradescard"
        },
        {
            "COMPE": "191",
            "ISPB": "4257795",
            "LongName": "Nova Futura Ctvm Ltda",
            "ShortName": "Nova Futura Ctvm Ltda"
        },
        {
            "COMPE": "064",
            "ISPB": "4332281",
            "LongName": "Goldman Sachs Do Brasil Bm S.A.",
            "ShortName": "Goldman Sachs Do Brasil Bm S.A."
        },
        {
            "COMPE": "097",
            "ISPB": "4632856",
            "LongName": "Ccc Noroeste Brasileiro Ltda",
            "ShortName": "Ccc Noroeste Brasileiro Ltda"
        },
        {
            "COMPE": "016",
            "ISPB": "4715685",
            "LongName": "Ccm Desp Trâns Sc E Rs",
            "ShortName": "Ccm Desp Trâns Sc E Rs"
        },
        {
            "COMPE": "012",
            "ISPB": "4866275",
            "LongName": "Banco Inbursa",
            "ShortName": "Banco Inbursa"
        },
        {
            "COMPE": "003",
            "ISPB": "4902979",
            "LongName": "Banco Da Amazônia S.A.",
            "ShortName": "Banco Da Amazônia S.A."
        },
        {
            "COMPE": "060",
            "ISPB": "4913129",
            "LongName": "Confidence Cc S.A.",
            "ShortName": "Confidence Cc S.A."
        },
        {
            "COMPE": "037",
            "ISPB": "4913711",
            "LongName": "Banco Do Estado Do Pará S.A.",
            "ShortName": "Banco Do Estado Do Pará S.A."
        },
        {
            "COMPE": "159",
            "ISPB": "5442029",
            "LongName": "Casa do Crédito S.A.",
            "ShortName": "Casa do Crédito S.A."
        },
        {
            "COMPE": "172",
            "ISPB": "5452073",
            "LongName": "Albatross Ccv S.A.",
            "ShortName": "Albatross Ccv S.A."
        },
        {
            "COMPE": "085",
            "ISPB": "5463212",
            "LongName": "Cooperativa Central de Créditos – Ailos",
            "ShortName": "Cooperativa Central de Créditos – Ailos"
        },
        {
            "COMPE": "114",
            "ISPB": "5790149",
            "LongName": "Central Cooperativa De Crédito no Estado do Espírito Santo",
            "ShortName": "Central Cooperativa De Crédito no Estado do Espírito Santo"
        },
        {
            "COMPE": "036",
            "ISPB": "6271464",
            "LongName": "Banco Bradesco BBI S.A.",
            "ShortName": "Banco Bradesco BBI S.A."
        },
        {
            "COMPE": "394",
            "ISPB": "7207996",
            "LongName": "Banco Bradesco Financiamentos S.A.",
            "ShortName": "Banco Bradesco Financiamentos S.A."
        },
        {
            "COMPE": "004",
            "ISPB": "7237373",
            "LongName": "Banco Do Nordeste Do Brasil S.A.",
            "ShortName": "Banco Do Nordeste Do Brasil S.A."
        },
        {
            "COMPE": "320",
            "ISPB": "7450604",
            "LongName": "China Construction Bank – Ccb Brasil S.A.",
            "ShortName": "China Construction Bank – Ccb Brasil S.A."
        },
        {
            "COMPE": "189",
            "ISPB": "7512441",
            "LongName": "Hs Financeira",
            "ShortName": "Hs Financeira"
        },
        {
            "COMPE": "105",
            "ISPB": "7652226",
            "LongName": "Lecca Cfi S.A.",
            "ShortName": "Lecca Cfi S.A."
        },
        {
            "COMPE": "076",
            "ISPB": "7656500",
            "LongName": "Banco KDB Brasil S.A.",
            "ShortName": "Banco KDB Brasil S.A."
        },
        {
            "COMPE": "082",
            "ISPB": "7679404",
            "LongName": "Banco Topázio S.A.",
            "ShortName": "Banco Topázio S.A."
        },
        {
            "COMPE": "286",
            "ISPB": "7853842",
            "LongName": "Cooperativa de Crédito Rural de De Ouro",
            "ShortName": "Cooperativa de Crédito Rural de De Ouro"
        },
        {
            "COMPE": "093",
            "ISPB": "7945233",
            "LongName": "PóloCred Scmepp Ltda",
            "ShortName": "PóloCred Scmepp Ltda"
        },
        {
            "COMPE": "273",
            "ISPB": "8253539",
            "LongName": "Ccr De São Miguel Do Oeste",
            "ShortName": "Ccr De São Miguel Do Oeste"
        },
        {
            "COMPE": "157",
            "ISPB": "9105360",
            "LongName": "Icap Do Brasil Ctvm Ltda",
            "ShortName": "Icap Do Brasil Ctvm Ltda"
        },
        {
            "COMPE": "183",
            "ISPB": "9210106",
            "LongName": "Socred S.A.",
            "ShortName": "Socred S.A."
        },
        {
            "COMPE": "014",
            "ISPB": "9274232",
            "LongName": "Natixis Brasil S.A.",
            "ShortName": "Natixis Brasil S.A."
        },
        {
            "COMPE": "130",
            "ISPB": "9313766",
            "LongName": "Caruana Scfi",
            "ShortName": "Caruana Scfi"
        },
        {
            "COMPE": "127",
            "ISPB": "9512542",
            "LongName": "Codepe Cvc S.A.",
            "ShortName": "Codepe Cvc S.A."
        },
        {
            "COMPE": "079",
            "ISPB": "9516419",
            "LongName": "Banco Original Do Agronegócio S.A.",
            "ShortName": "Banco Original Do Agronegócio S.A."
        },
        {
            "COMPE": "081",
            "ISPB": "10264663",
            "LongName": "Bbn Banco Brasileiro De Negocios S.A.",
            "ShortName": "Bbn Banco Brasileiro De Negocios S.A."
        },
        {
            "COMPE": "118",
            "ISPB": "11932017",
            "LongName": "Standard Chartered Bi S.A.",
            "ShortName": "Standard Chartered Bi S.A."
        },
        {
            "COMPE": "133",
            "ISPB": "10398952",
            "LongName": "Cresol Confederação",
            "ShortName": "Cresol Confederação"
        },
        {
            "COMPE": "121",
            "ISPB": "10664513",
            "LongName": "Banco Agibank S.A.",
            "ShortName": "Banco Agibank S.A."
        },
        {
            "COMPE": "083",
            "ISPB": "10690848",
            "LongName": "Banco Da China Brasil S.A.",
            "ShortName": "Banco Da China Brasil S.A."
        },
        {
            "COMPE": "138",
            "ISPB": "10853017",
            "LongName": "Get Money Cc Ltda",
            "ShortName": "Get Money Cc Ltda"
        },
        {
            "COMPE": "024",
            "ISPB": "10866788",
            "LongName": "Banco Bandepe S.A.",
            "ShortName": "Banco Bandepe S.A."
        },
        {
            "COMPE": "095",
            "ISPB": "11703662",
            "LongName": "Banco Confidence De Câmbio S.A.",
            "ShortName": "Banco Confidence De Câmbio S.A."
        },
        {
            "COMPE": "094",
            "ISPB": "11758741",
            "LongName": "Banco Finaxis",
            "ShortName": "Banco Finaxis"
        },
        {
            "COMPE": "276",
            "ISPB": "11970623",
            "LongName": "Senff S.A.",
            "ShortName": "Senff S.A."
        },
        {
            "COMPE": "137",
            "ISPB": "12586596",
            "LongName": "Multimoney Cc Ltda",
            "ShortName": "Multimoney Cc Ltda"
        },
        {
            "COMPE": "092",
            "ISPB": "12865507",
            "LongName": "BRK S.A.",
            "ShortName": "BRK S.A."
        },
        {
            "COMPE": "047",
            "ISPB": "13009717",
            "LongName": "Banco do Estado de Sergipe S.A.",
            "ShortName": "Banco do Estado de Sergipe S.A."
        },
        {
            "COMPE": "144",
            "ISPB": "13059145",
            "LongName": "Bexs Banco De Cambio S.A.",
            "ShortName": "Bexs Banco De Cambio S.A."
        },
        {
            "COMPE": "126",
            "ISPB": "13220493",
            "LongName": "BR Partners Banco de Investimento S.A.",
            "ShortName": "BR Partners Banco de Investimento S.A."
        },
        {
            "COMPE": "301",
            "ISPB": "13370835",
            "LongName": "BPP Instituição De Pagamentos S.A.",
            "ShortName": "BPP Instituição De Pagamentos S.A."
        },
        {
            "COMPE": "173",
            "ISPB": "13486793",
            "LongName": "BRL Trust Dtvm Sa",
            "ShortName": "BRL Trust Dtvm Sa"
        },
        {
            "COMPE": "119",
            "ISPB": "13720915",
            "LongName": "Banco Western Union do Brasil S.A.",
            "ShortName": "Banco Western Union do Brasil S.A."
        },
        {
            "COMPE": "254",
            "ISPB": "14388334",
            "LongName": "Paraná Banco S.A.",
            "ShortName": "Paraná Banco S.A."
        },
        {
            "COMPE": "268",
            "ISPB": "14511781",
            "LongName": "Barigui Companhia Hipotecária",
            "ShortName": "Barigui Companhia Hipotecária"
        },
        {
            "COMPE": "107",
            "ISPB": "15114366",
            "LongName": "Banco Bocom BBM S.A.",
            "ShortName": "Banco Bocom BBM S.A."
        },
        {
            "COMPE": "412",
            "ISPB": "15173776",
            "LongName": "Banco Capital S.A.",
            "ShortName": "Banco Capital S.A."
        },
        {
            "COMPE": "124",
            "ISPB": "15357060",
            "LongName": "Banco Woori Bank Do Brasil S.A.",
            "ShortName": "Banco Woori Bank Do Brasil S.A."
        },
        {
            "COMPE": "149",
            "ISPB": "15581638",
            "LongName": "Facta S.A. Cfi",
            "ShortName": "Facta S.A. Cfi"
        },
        {
            "COMPE": "197",
            "ISPB": "16501555",
            "LongName": "Stone Pagamentos S.A.",
            "ShortName": "Stone Pagamentos S.A."
        },
        {
            "COMPE": "142",
            "ISPB": "16944141",
            "LongName": "Broker Brasil Cc Ltda",
            "ShortName": "Broker Brasil Cc Ltda"
        },
        {
            "COMPE": "389",
            "ISPB": "17184037",
            "LongName": "Banco Mercantil Do Brasil S.A.",
            "ShortName": "Banco Mercantil Do Brasil S.A."
        },
        {
            "COMPE": "184",
            "ISPB": "17298092",
            "LongName": "Banco Itaú BBA S.A.",
            "ShortName": "Banco Itaú BBA S.A."
        },
        {
            "COMPE": "634",
            "ISPB": "17351180",
            "LongName": "Banco Triangulo S.A (Banco Triângulo)",
            "ShortName": "Banco Triangulo S.A (Banco Triângulo)"
        },
        {
            "COMPE": "545",
            "ISPB": "17352220",
            "LongName": "Senso Ccvm S.A.",
            "ShortName": "Senso Ccvm S.A."
        },
        {
            "COMPE": "132",
            "ISPB": "17453575",
            "LongName": "ICBC do Brasil Bm S.A.",
            "ShortName": "ICBC do Brasil Bm S.A."
        },
        {
            "COMPE": "298",
            "ISPB": "17772370",
            "LongName": "Vip’s Cc Ltda",
            "ShortName": "Vip’s Cc Ltda"
        },
        {
            "COMPE": "129",
            "ISPB": "18520834",
            "LongName": "UBS Brasil Bi S.A.",
            "ShortName": "UBS Brasil Bi S.A."
        },
        {
            "COMPE": "128",
            "ISPB": "19307785",
            "LongName": "Ms Bank S.A Banco De Câmbio",
            "ShortName": "Ms Bank S.A Banco De Câmbio"
        },
        {
            "COMPE": "194",
            "ISPB": "20155248",
            "LongName": "Parmetal Dtvm Ltda",
            "ShortName": "Parmetal Dtvm Ltda"
        },
        {
            "COMPE": "310",
            "ISPB": "22610500",
            "LongName": "VORTX Dtvm Ltda",
            "ShortName": "VORTX Dtvm Ltda"
        },
        {
            "COMPE": "163",
            "ISPB": "23522214",
            "LongName": "Commerzbank Brasil S.A Banco Múltiplo",
            "ShortName": "Commerzbank Brasil S.A Banco Múltiplo"
        },
        {
            "COMPE": "280",
            "ISPB": "23862762",
            "LongName": "Avista S.A.",
            "ShortName": "Avista S.A."
        },
        {
            "COMPE": "146",
            "ISPB": "24074692",
            "LongName": "Guitta Cc Ltda",
            "ShortName": "Guitta Cc Ltda"
        },
        {
            "COMPE": "279",
            "ISPB": "26563270",
            "LongName": "Ccr De Primavera Do Leste",
            "ShortName": "Ccr De Primavera Do Leste"
        },
        {
            "COMPE": "182",
            "ISPB": "27406222",
            "LongName": "Dacasa Financeira S/A",
            "ShortName": "Dacasa Financeira S/A"
        },
        {
            "COMPE": "278",
            "ISPB": "27652684",
            "LongName": "Genial Investimentos Cvm S.A.",
            "ShortName": "Genial Investimentos Cvm S.A."
        },
        {
            "COMPE": "271",
            "ISPB": "27842177",
            "LongName": "Ib Cctvm Ltda",
            "ShortName": "Ib Cctvm Ltda"
        },
        {
            "COMPE": "021",
            "ISPB": "28127603",
            "LongName": "Banco Banestes S.A.",
            "ShortName": "Banco Banestes S.A."
        },
        {
            "COMPE": "246",
            "ISPB": "28195667",
            "LongName": "Banco Abc Brasil S.A.",
            "ShortName": "Banco Abc Brasil S.A."
        },
        {
            "COMPE": "751",
            "ISPB": "29030467",
            "LongName": "Scotiabank Brasil",
            "ShortName": "Scotiabank Brasil"
        },
        {
            "COMPE": "208",
            "ISPB": "30306294",
            "LongName": "Banco BTG Pactual S.A.",
            "ShortName": "Banco BTG Pactual S.A."
        },
        {
            "COMPE": "746",
            "ISPB": "30723886",
            "LongName": "Banco Modal S.A.",
            "ShortName": "Banco Modal S.A."
        },
        {
            "COMPE": "241",
            "ISPB": "31597552",
            "LongName": "Banco Classico S.A.",
            "ShortName": "Banco Classico S.A."
        },
        {
            "COMPE": "612",
            "ISPB": "31880826",
            "LongName": "Banco Guanabara S.A.",
            "ShortName": "Banco Guanabara S.A."
        },
        {
            "COMPE": "604",
            "ISPB": "31895683",
            "LongName": "Banco Industrial Do Brasil S.A.",
            "ShortName": "Banco Industrial Do Brasil S.A."
        },
        {
            "COMPE": "505",
            "ISPB": "32062580",
            "LongName": "Banco Credit Suisse (Brl) S.A.",
            "ShortName": "Banco Credit Suisse (Brl) S.A."
        },
        {
            "COMPE": "196",
            "ISPB": "32648370",
            "LongName": "Banco Fair Cc S.A.",
            "ShortName": "Banco Fair Cc S.A."
        },
        {
            "COMPE": "300",
            "ISPB": "33042151",
            "LongName": "Banco La Nacion Argentina",
            "ShortName": "Banco La Nacion Argentina"
        },
        {
            "COMPE": "477",
            "ISPB": "33042953",
            "LongName": "Citibank N.A.",
            "ShortName": "Citibank N.A."
        },
        {
            "COMPE": "266",
            "ISPB": "33132044",
            "LongName": "Banco Cedula S.A.",
            "ShortName": "Banco Cedula S.A."
        },
        {
            "COMPE": "122",
            "ISPB": "33147315",
            "LongName": "Banco Bradesco BERJ S.A.",
            "ShortName": "Banco Bradesco BERJ S.A."
        },
        {
            "COMPE": "376",
            "ISPB": "33172537",
            "LongName": "Banco J.P. Morgan S.A.",
            "ShortName": "Banco J.P. Morgan S.A."
        },
        {
            "COMPE": "473",
            "ISPB": "33466988",
            "LongName": "Banco Caixa Geral Brasil S.A.",
            "ShortName": "Banco Caixa Geral Brasil S.A."
        },
        {
            "COMPE": "745",
            "ISPB": "33479023",
            "LongName": "Banco Citibank S.A.",
            "ShortName": "Banco Citibank S.A."
        },
        {
            "COMPE": "120",
            "ISPB": "33603457",
            "LongName": "Banco Rodobens S.A.",
            "ShortName": "Banco Rodobens S.A."
        },
        {
            "COMPE": "265",
            "ISPB": "33644196",
            "LongName": "Banco Fator S.A.",
            "ShortName": "Banco Fator S.A."
        },
        {
            "COMPE": "007",
            "ISPB": "33657248",
            "LongName": "BNDES (Banco Nacional Do Desenvolvimento Social)",
            "ShortName": "BNDES (Banco Nacional Do Desenvolvimento Social)"
        },
        {
            "COMPE": "188",
            "ISPB": "33775974",
            "LongName": "Ativa S.A Investimentos",
            "ShortName": "Ativa S.A Investimentos"
        },
        {
            "COMPE": "134",
            "ISPB": "33862244",
            "LongName": "BGC Liquidez Dtvm Ltda",
            "ShortName": "BGC Liquidez Dtvm Ltda"
        },
        {
            "COMPE": "641",
            "ISPB": "33870163",
            "LongName": "Banco Alvorada S.A.",
            "ShortName": "Banco Alvorada S.A."
        },
        {
            "COMPE": "029",
            "ISPB": "33885724",
            "LongName": "Banco Itaú Consignado S.A.",
            "ShortName": "Banco Itaú Consignado S.A."
        },
        {
            "COMPE": "243",
            "ISPB": "33923798",
            "LongName": "Banco Máxima S.A.",
            "ShortName": "Banco Máxima S.A."
        },
        {
            "COMPE": "078",
            "ISPB": "34111187",
            "LongName": "Haitong Bi Do Brasil S.A.",
            "ShortName": "Haitong Bi Do Brasil S.A."
        },
        {
            "COMPE": "111",
            "ISPB": "36113876",
            "LongName": "Banco Oliveira Trust Dtvm S.A.",
            "ShortName": "Banco Oliveira Trust Dtvm S.A."
        },
        {
            "COMPE": "017",
            "ISPB": "42272526",
            "LongName": "Bny Mellon Banco S.A.",
            "ShortName": "Bny Mellon Banco S.A."
        },
        {
            "COMPE": "174",
            "ISPB": "43180355",
            "LongName": "Pernambucanas Financ S.A.",
            "ShortName": "Pernambucanas Financ S.A."
        },
        {
            "COMPE": "495",
            "ISPB": "44189447",
            "LongName": "La Provincia Buenos Aires Banco",
            "ShortName": "La Provincia Buenos Aires Banco"
        },
        {
            "COMPE": "125",
            "ISPB": "45246410",
            "LongName": "Brasil Plural S.A Banco",
            "ShortName": "Brasil Plural S.A Banco"
        },
        {
            "COMPE": "488",
            "ISPB": "46518205",
            "LongName": "Jpmorgan Chase Bank",
            "ShortName": "Jpmorgan Chase Bank"
        },
        {
            "COMPE": "065",
            "ISPB": "48795256",
            "LongName": "Banco Andbank S.A.",
            "ShortName": "Banco Andbank S.A."
        },
        {
            "COMPE": "492",
            "ISPB": "49336860",
            "LongName": "Ing Bank N.V.",
            "ShortName": "Ing Bank N.V."
        },
        {
            "COMPE": "250",
            "ISPB": "50585090",
            "LongName": "Banco Bcv",
            "ShortName": "Banco Bcv"
        },
        {
            "COMPE": "145",
            "ISPB": "50579044",
            "LongName": "Levycam Ccv Ltda",
            "ShortName": "Levycam Ccv Ltda"
        },
        {
            "COMPE": "494",
            "ISPB": "51938876",
            "LongName": "Banco Rep Oriental Uruguay",
            "ShortName": "Banco Rep Oriental Uruguay"
        },
        {
            "COMPE": "253",
            "ISPB": "52937216",
            "LongName": "Bexs Cc S.A.",
            "ShortName": "Bexs Cc S.A."
        },
        {
            "COMPE": "269",
            "ISPB": "53518684",
            "LongName": "Hsbc Banco De Investimento",
            "ShortName": "Hsbc Banco De Investimento"
        },
        {
            "COMPE": "213",
            "ISPB": "54403563",
            "LongName": "Bco Arbi S.A.",
            "ShortName": "Bco Arbi S.A."
        },
        {
            "COMPE": "139",
            "ISPB": "55230916",
            "LongName": "Intesa Sanpaolo Brasil S.A.",
            "ShortName": "Intesa Sanpaolo Brasil S.A."
        },
        {
            "COMPE": "018",
            "ISPB": "57839805",
            "LongName": "Banco Tricury S.A.",
            "ShortName": "Banco Tricury S.A."
        },
        {
            "COMPE": "630",
            "ISPB": "58497702",
            "LongName": "Banco Intercap S.A.",
            "ShortName": "Banco Intercap S.A."
        },
        {
            "COMPE": "224",
            "ISPB": "58616418",
            "LongName": "Banco Fibra S.A.",
            "ShortName": "Banco Fibra S.A."
        },
        {
            "COMPE": "600",
            "ISPB": "59118133",
            "LongName": "Banco Luso Brasileiro S.A.",
            "ShortName": "Banco Luso Brasileiro S.A."
        },
        {
            "COMPE": "623",
            "ISPB": "59285411",
            "LongName": "Banco Pan S.A.",
            "ShortName": "Banco Pan S.A."
        },
        {
            "COMPE": "204",
            "ISPB": "59438325",
            "LongName": "Banco Bradesco Cartoes S.A.",
            "ShortName": "Banco Bradesco Cartoes S.A."
        },
        {
            "COMPE": "479",
            "ISPB": "60394079",
            "LongName": "Banco ItauBank S.A.",
            "ShortName": "Banco ItauBank S.A."
        },
        {
            "COMPE": "456",
            "ISPB": "60498557",
            "LongName": "Banco MUFG Brasil S.A.",
            "ShortName": "Banco MUFG Brasil S.A."
        },
        {
            "COMPE": "464",
            "ISPB": "60518222",
            "LongName": "Banco Sumitomo Mitsui Brasil S.A.",
            "ShortName": "Banco Sumitomo Mitsui Brasil S.A."
        },
        {
            "COMPE": "613",
            "ISPB": "60850229",
            "LongName": "Omni Banco S.A.",
            "ShortName": "Omni Banco S.A."
        },
        {
            "COMPE": "652",
            "ISPB": "60872504",
            "LongName": "Itaú Unibanco Holding Bm S.A.",
            "ShortName": "Itaú Unibanco Holding Bm S.A."
        },
        {
            "COMPE": "653",
            "ISPB": "61024352",
            "LongName": "Banco Indusval S.A.",
            "ShortName": "Banco Indusval S.A."
        },
        {
            "COMPE": "069",
            "ISPB": "61033106",
            "LongName": "Banco Crefisa S.A.",
            "ShortName": "Banco Crefisa S.A."
        },
        {
            "COMPE": "370",
            "ISPB": "61088183",
            "LongName": "Banco Mizuho S.A.",
            "ShortName": "Banco Mizuho S.A."
        },
        {
            "COMPE": "249",
            "ISPB": "61182408",
            "LongName": "Banco Investcred Unibanco S.A.",
            "ShortName": "Banco Investcred Unibanco S.A."
        },
        {
            "COMPE": "318",
            "ISPB": "61186680",
            "LongName": "Banco BMG S.A.",
            "ShortName": "Banco BMG S.A."
        },
        {
            "COMPE": "626",
            "ISPB": "61348538",
            "LongName": "Banco Ficsa S.A.",
            "ShortName": "Banco Ficsa S.A."
        },
        {
            "COMPE": "270",
            "ISPB": "61444949",
            "LongName": "Sagitur Cc Ltda",
            "ShortName": "Sagitur Cc Ltda"
        },
        {
            "COMPE": "366",
            "ISPB": "61533584",
            "LongName": "Banco Societe Generale Brasil",
            "ShortName": "Banco Societe Generale Brasil"
        },
        {
            "COMPE": "113",
            "ISPB": "61723847",
            "LongName": "Magliano S.A.",
            "ShortName": "Magliano S.A."
        },
        {
            "COMPE": "131",
            "ISPB": "61747085",
            "LongName": "Tullett Prebon Brasil Cvc Ltda",
            "ShortName": "Tullett Prebon Brasil Cvc Ltda"
        },
        {
            "COMPE": "011",
            "ISPB": "61809182",
            "LongName": "C.Suisse Hedging-Griffo Cv S.A (Credit Suisse)",
            "ShortName": "C.Suisse Hedging-Griffo Cv S.A (Credit Suisse)"
        },
        {
            "COMPE": "611",
            "ISPB": "61820817",
            "LongName": "Banco Paulista",
            "ShortName": "Banco Paulista"
        },
        {
            "COMPE": "755",
            "ISPB": "62073200",
            "LongName": "Bofa Merrill Lynch Bm S.A.",
            "ShortName": "Bofa Merrill Lynch Bm S.A."
        },
        {
            "COMPE": "089",
            "ISPB": "62109566",
            "LongName": "Ccr Reg Mogiana",
            "ShortName": "Ccr Reg Mogiana"
        },
        {
            "COMPE": "643",
            "ISPB": "62144175",
            "LongName": "Banco Pine S.A.",
            "ShortName": "Banco Pine S.A."
        },
        {
            "COMPE": "140",
            "ISPB": "62169875",
            "LongName": "Easynvest – Título Cv S.A.",
            "ShortName": "Easynvest – Título Cv S.A."
        },
        {
            "COMPE": "707",
            "ISPB": "62232889",
            "LongName": "Banco Daycoval S.A.",
            "ShortName": "Banco Daycoval S.A."
        },
        {
            "COMPE": "288",
            "ISPB": "62237649",
            "LongName": "Carol Dtvm Ltda",
            "ShortName": "Carol Dtvm Ltda"
        },
        {
            "COMPE": "101",
            "ISPB": "62287735",
            "LongName": "Renascença Dtvm Ltda",
            "ShortName": "Renascença Dtvm Ltda"
        },
        {
            "COMPE": "487",
            "ISPB": "62331228",
            "LongName": "Deutsche Bank S.A (Banco Alemão)",
            "ShortName": "Deutsche Bank S.A (Banco Alemão)"
        },
        {
            "COMPE": "233",
            "ISPB": "62421979",
            "LongName": "Banco Cifra S.A.",
            "ShortName": "Banco Cifra S.A."
        },
        {
            "COMPE": "177",
            "ISPB": "65913436",
            "LongName": "Guide Investimentos S.A. Corretora de Valores",
            "ShortName": "Guide Investimentos S.A. Corretora de Valores"
        },
        {
            "COMPE": "633",
            "ISPB": "68900810",
            "LongName": "Banco Rendimento S.A.",
            "ShortName": "Banco Rendimento S.A."
        },
        {
            "COMPE": "218",
            "ISPB": "71027866",
            "LongName": "Banco Bs2 S.A.",
            "ShortName": "Banco Bs2 S.A."
        },
        {
            "COMPE": "292",
            "ISPB": "28650236",
            "LongName": "BS2 Distribuidora De Títulos E Investimentos",
            "ShortName": "BS2 Distribuidora De Títulos E Investimentos"
        },
        {
            "COMPE": "169",
            "ISPB": "71371686",
            "LongName": "Banco Olé Bonsucesso Consignado S.A.",
            "ShortName": "Banco Olé Bonsucesso Consignado S.A."
        },
        {
            "COMPE": "293",
            "ISPB": "71590442",
            "LongName": "Lastro Rdv Dtvm Ltda",
            "ShortName": "Lastro Rdv Dtvm Ltda"
        },
        {
            "COMPE": "285",
            "ISPB": "71677850",
            "LongName": "Frente Cc Ltda",
            "ShortName": "Frente Cc Ltda"
        },
        {
            "COMPE": "080",
            "ISPB": "73622748",
            "LongName": "B&T Cc Ltda",
            "ShortName": "B&T Cc Ltda"
        },
        {
            "COMPE": "753",
            "ISPB": "74828799",
            "LongName": "Novo Banco Continental S.A Bm",
            "ShortName": "Novo Banco Continental S.A Bm"
        },
        {
            "COMPE": "222",
            "ISPB": "75647891",
            "LongName": "Banco Crédit Agricole Br S.A.",
            "ShortName": "Banco Crédit Agricole Br S.A."
        },
        {
            "COMPE": "754",
            "ISPB": "76543115",
            "LongName": "Banco Sistema S.A.",
            "ShortName": "Banco Sistema S.A."
        },
        {
            "COMPE": "098",
            "ISPB": "78157146",
            "LongName": "Credialiança Ccr",
            "ShortName": "Credialiança Ccr"
        },
        {
            "COMPE": "610",
            "ISPB": "78626983",
            "LongName": "Banco VR S.A.",
            "ShortName": "Banco VR S.A."
        },
        {
            "COMPE": "712",
            "ISPB": "78632767",
            "LongName": "Banco Ourinvest S.A.",
            "ShortName": "Banco Ourinvest S.A."
        },
        {
            "COMPE": "010",
            "ISPB": "81723108",
            "LongName": "CREDICOAMO CRÉDITO RURAL COOPERATIVA",
            "ShortName": "CREDICOAMO CRÉDITO RURAL COOPERATIVA"
        },
        {
            "COMPE": "283",
            "ISPB": "89960090",
            "LongName": "RB Capital Investimentos Dtvm Ltda",
            "ShortName": "RB Capital Investimentos Dtvm Ltda"
        },
        {
            "COMPE": "217",
            "ISPB": "91884981",
            "LongName": "Banco John Deere S.A.",
            "ShortName": "Banco John Deere S.A."
        },
        {
            "COMPE": "117",
            "ISPB": "92856905",
            "LongName": "Advanced Cc Ltda",
            "ShortName": "Advanced Cc Ltda"
        },
        {
            "COMPE": "336",
            "ISPB": "28326000",
            "LongName": "Banco C6 S.A – C6 Bank",
            "ShortName": "Banco C6 S.A – C6 Bank"
        },
        {
            "COMPE": "654",
            "ISPB": "92874270",
            "LongName": "Banco A.J. Renner S.A.",
            "ShortName": "Banco A.J. Renner S.A."
        },
        {
            "COMPE": "n/a",
            "ISPB": "38121",
            "LongName": "Banco Central do Brasil – Selic",
            "ShortName": "Banco Central do Brasil – Selic"
        },
        {
            "COMPE": "n/a",
            "ISPB": "38166",
            "LongName": "Banco Central do Brasil",
            "ShortName": "Banco Central do Brasil"
        },
        {
            "COMPE": "272",
            "ISPB": "250699",
            "LongName": "AGK Corretora de Câmbio S.A.",
            "ShortName": "AGK Corretora de Câmbio S.A."
        },
        {
            "COMPE": "n/a",
            "ISPB": "394460",
            "LongName": "Secretaria do Tesouro Nacional – STN",
            "ShortName": "Secretaria do Tesouro Nacional – STN"
        },
        {
            "COMPE": "330",
            "ISPB": "556603",
            "LongName": "Banco Bari de Investimentos e Financiamentos S.A.",
            "ShortName": "Banco Bari de Investimentos e Financiamentos S.A."
        },
        {
            "COMPE": "362",
            "ISPB": "1027058",
            "LongName": "CIELO S.A.",
            "ShortName": "CIELO S.A."
        },
        {
            "COMPE": "322",
            "ISPB": "1073966",
            "LongName": "Cooperativa de Crédito Rural de Abelardo Luz – Sulcredi/Crediluz",
            "ShortName": "Cooperativa de Crédito Rural de Abelardo Luz – Sulcredi/Crediluz"
        },
        {
            "COMPE": "350",
            "ISPB": "1330387",
            "LongName": "Cooperativa De Crédito Rural De Pequenos Agricultores E Da Reforma Agrária Do Ce",
            "ShortName": "Cooperativa De Crédito Rural De Pequenos Agricultores E Da Reforma Agrária Do Ce"
        },
        {
            "COMPE": "091",
            "ISPB": "1634601",
            "LongName": "Central De Cooperativas De Economia E Crédito Mútuo Do Estado Do Rio Grande Do S",
            "ShortName": "Central De Cooperativas De Economia E Crédito Mútuo Do Estado Do Rio Grande Do S"
        },
        {
            "COMPE": "379",
            "ISPB": "1658426",
            "LongName": "COOPERFORTE – Cooperativa De Economia E Crédito Mútuo Dos Funcionários De Instit",
            "ShortName": "COOPERFORTE – Cooperativa De Economia E Crédito Mútuo Dos Funcionários De Instit"
        },
        {
            "COMPE": "378",
            "ISPB": "1852137",
            "LongName": "BBC LEASING S.A. – Arrendamento Mercantil",
            "ShortName": "BBC LEASING S.A. – Arrendamento Mercantil"
        },
        {
            "COMPE": "360",
            "ISPB": "2276653",
            "LongName": "TRINUS Capital Distribuidora De Títulos E Valores Mobiliários S.A.",
            "ShortName": "TRINUS Capital Distribuidora De Títulos E Valores Mobiliários S.A."
        },
        {
            "COMPE": "084",
            "ISPB": "2398976",
            "LongName": "UNIPRIME NORTE DO PARANÁ – COOPERATIVA DE CRÉDITO LTDA",
            "ShortName": "UNIPRIME NORTE DO PARANÁ – COOPERATIVA DE CRÉDITO LTDA"
        },
        {
            "COMPE": "n/a",
            "ISPB": "2992335",
            "LongName": "Câmara Interbancária de Pagamentos – CIP – LDL",
            "ShortName": "Câmara Interbancária de Pagamentos – CIP – LDL"
        },
        {
            "COMPE": "387",
            "ISPB": "3215790",
            "LongName": "Banco Toyota do Brasil S.A.",
            "ShortName": "Banco Toyota do Brasil S.A."
        },
        {
            "COMPE": "326",
            "ISPB": "3311443",
            "LongName": "PARATI – CRÉDITO, FINANCIAMENTO E INVESTIMENTO S.A.",
            "ShortName": "PARATI – CRÉDITO, FINANCIAMENTO E INVESTIMENTO S.A."
        },
        {
            "COMPE": "315",
            "ISPB": "3502968",
            "LongName": "PI Distribuidora de Títulos e Valores Mobiliários S.A.",
            "ShortName": "PI Distribuidora de Títulos e Valores Mobiliários S.A."
        },
        {
            "COMPE": "307",
            "ISPB": "3751794",
            "LongName": "Terra Investimentos Distribuidora de Títulos e Valores Mobiliários Ltda.",
            "ShortName": "Terra Investimentos Distribuidora de Títulos e Valores Mobiliários Ltda."
        },
        {
            "COMPE": "296",
            "ISPB": "4062902",
            "LongName": "VISION S.A. CORRETORA DE CAMBIO",
            "ShortName": "VISION S.A. CORRETORA DE CAMBIO"
        },
        {
            "COMPE": "382",
            "ISPB": "4307598",
            "LongName": "FIDÚCIA SOCIEDADE DE CRÉDIT AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO PORTE L",
            "ShortName": "FIDÚCIA SOCIEDADE DE CRÉDIT AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO PORTE L"
        },
        {
            "COMPE": "097",
            "ISPB": "4632856",
            "LongName": "Credisis – Central de Cooperativas de Crédito Ltda.",
            "ShortName": "Credisis – Central de Cooperativas de Crédito Ltda."
        },
        {
            "COMPE": "016",
            "ISPB": "4715685",
            "LongName": "COOPERATIVA DE CRÉDITO MÚTUO DOS DESPACHANTES DE TRÂNSITO DE SANTA CATARINA E RI",
            "ShortName": "COOPERATIVA DE CRÉDITO MÚTUO DOS DESPACHANTES DE TRÂNSITO DE SANTA CATARINA E RI"
        },
        {
            "COMPE": "299",
            "ISPB": "4814563",
            "LongName": "SOROCRED   CRÉDITO, FINANCIAMENTO E INVESTIMENTO S.A.",
            "ShortName": "SOROCRED   CRÉDITO, FINANCIAMENTO E INVESTIMENTO S.A."
        },
        {
            "COMPE": "359",
            "ISPB": "5351887",
            "LongName": "ZEMA CRÉDITO, FINANCIAMENTO E INVESTIMENTO S/A",
            "ShortName": "ZEMA CRÉDITO, FINANCIAMENTO E INVESTIMENTO S/A"
        },
        {
            "COMPE": "391",
            "ISPB": "8240446",
            "LongName": "COOPERATIVA DE CRÉDITO RURAL DE IBIAM – SULCREDI/IBIAM",
            "ShortName": "COOPERATIVA DE CRÉDITO RURAL DE IBIAM – SULCREDI/IBIAM"
        },
        {
            "COMPE": "368",
            "ISPB": "8357240",
            "LongName": "Banco CSF S.A.",
            "ShortName": "Banco CSF S.A."
        },
        {
            "COMPE": "259",
            "ISPB": "8609934",
            "LongName": "MONEYCORP BANCO DE CÂMBIO S.A.",
            "ShortName": "MONEYCORP BANCO DE CÂMBIO S.A."
        },
        {
            "COMPE": "364",
            "ISPB": "9089356",
            "LongName": "GERENCIANET S.A.",
            "ShortName": "GERENCIANET S.A."
        },
        {
            "COMPE": "014",
            "ISPB": "9274232",
            "LongName": "STATE STREET BRASIL S.A. – BANCO COMERCIAL",
            "ShortName": "STATE STREET BRASIL S.A. – BANCO COMERCIAL"
        },
        {
            "COMPE": "081",
            "ISPB": "10264663",
            "LongName": "Banco Seguro S.A.",
            "ShortName": "Banco Seguro S.A."
        },
        {
            "COMPE": "384",
            "ISPB": "11165756",
            "LongName": "GLOBAL FINANÇAS SOCIEDADE DE CRÉDIT AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO",
            "ShortName": "GLOBAL FINANÇAS SOCIEDADE DE CRÉDIT AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO"
        },
        {
            "COMPE": "088",
            "ISPB": "11476673",
            "LongName": "BANCO RANDON S.A.",
            "ShortName": "BANCO RANDON S.A."
        },
        {
            "COMPE": "319",
            "ISPB": "11495073",
            "LongName": "OM DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS LTDA",
            "ShortName": "OM DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS LTDA"
        },
        {
            "COMPE": "274",
            "ISPB": "11581339",
            "LongName": "MONEY PLUS SOCIEDADE DE CRÉDIT AO MICROEMPREENDEDOR E A EMPRESA DE PEQUENO PORT",
            "ShortName": "MONEY PLUS SOCIEDADE DE CRÉDIT AO MICROEMPREENDEDOR E A EMPRESA DE PEQUENO PORT"
        },
        {
            "COMPE": "095",
            "ISPB": "11703662",
            "LongName": "Travelex Banco de Câmbio S.A.",
            "ShortName": "Travelex Banco de Câmbio S.A."
        },
        {
            "COMPE": "332",
            "ISPB": "13140088",
            "LongName": "Acesso Soluções de Pagamento S.A.",
            "ShortName": "Acesso Soluções de Pagamento S.A."
        },
        {
            "COMPE": "325",
            "ISPB": "13293225",
            "LongName": "Órama Distribuidora de Títulos e Valores Mobiliários S.A.",
            "ShortName": "Órama Distribuidora de Títulos e Valores Mobiliários S.A."
        },
        {
            "COMPE": "331",
            "ISPB": "13673855",
            "LongName": "Fram Capital Distribuidora de Títulos e Valores Mobiliários S.A.",
            "ShortName": "Fram Capital Distribuidora de Títulos e Valores Mobiliários S.A."
        },
        {
            "COMPE": "396",
            "ISPB": "13884775",
            "LongName": "HUB PAGAMENTOS S.A.",
            "ShortName": "HUB PAGAMENTOS S.A."
        },
        {
            "COMPE": "309",
            "ISPB": "14190547",
            "LongName": "CAMBIONET CORRETORA DE CÂMBIO LTDA.",
            "ShortName": "CAMBIONET CORRETORA DE CÂMBIO LTDA."
        },
        {
            "COMPE": "313",
            "ISPB": "16927221",
            "LongName": "AMAZÔNIA CORRETORA DE CÂMBIO LTDA.",
            "ShortName": "AMAZÔNIA CORRETORA DE CÂMBIO LTDA."
        },
        {
            "COMPE": "377",
            "ISPB": "17826860",
            "LongName": "MS SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO PORTE LTDA",
            "ShortName": "MS SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO PORTE LTDA"
        },
        {
            "COMPE": "321",
            "ISPB": "18188384",
            "LongName": "CREFAZ SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E A EMPRESA DE PEQUENO PORTE LT",
            "ShortName": "CREFAZ SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E A EMPRESA DE PEQUENO PORTE LT"
        },
        {
            "COMPE": "383",
            "ISPB": "21018182",
            "LongName": "BOLETOBANCÁRIO.COM TECNOLOGIA DE PAGAMENTOS LTDA.",
            "ShortName": "BOLETOBANCÁRIO.COM TECNOLOGIA DE PAGAMENTOS LTDA."
        },
        {
            "COMPE": "324",
            "ISPB": "21332862",
            "LongName": "CARTOS SOCIEDADE DE CRÉDITO DIRETO S.A.",
            "ShortName": "CARTOS SOCIEDADE DE CRÉDITO DIRETO S.A."
        },
        {
            "COMPE": "380",
            "ISPB": "22896431",
            "LongName": "PICPAY SERVICOS S.A.",
            "ShortName": "PICPAY SERVICOS S.A."
        },
        {
            "COMPE": "343",
            "ISPB": "24537861",
            "LongName": "FFA SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO PORTE LTDA.",
            "ShortName": "FFA SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO PORTE LTDA."
        },
        {
            "COMPE": "349",
            "ISPB": "27214112",
            "LongName": "AL5 S.A. CRÉDITO, FINANCIAMENTO E INVESTIMENTO",
            "ShortName": "AL5 S.A. CRÉDITO, FINANCIAMENTO E INVESTIMENTO"
        },
        {
            "COMPE": "374",
            "ISPB": "27351731",
            "LongName": "REALIZE CRÉDITO, FINANCIAMENTO E INVESTIMENTO S.A.",
            "ShortName": "REALIZE CRÉDITO, FINANCIAMENTO E INVESTIMENTO S.A."
        },
        {
            "COMPE": "n/a",
            "ISPB": "28719664",
            "LongName": "B3 SA – Brasil, Bolsa, Balcão – Segmento Cetip UTVM",
            "ShortName": "B3 SA – Brasil, Bolsa, Balcão – Segmento Cetip UTVM"
        },
        {
            "COMPE": "n/a",
            "ISPB": "29011780",
            "LongName": "Câmara Interbancária de Pagamentos – CIP C3",
            "ShortName": "Câmara Interbancária de Pagamentos – CIP C3"
        },
        {
            "COMPE": "352",
            "ISPB": "29162769",
            "LongName": "TORO CORRETORA DE TÍTULOS E VALORES MOBILIÁRIOS LTDA",
            "ShortName": "TORO CORRETORA DE TÍTULOS E VALORES MOBILIÁRIOS LTDA"
        },
        {
            "COMPE": "329",
            "ISPB": "32402502",
            "LongName": "QI Sociedade de Crédito Direto S.A.",
            "ShortName": "QI Sociedade de Crédito Direto S.A."
        },
        {
            "COMPE": "342",
            "ISPB": "32997490",
            "LongName": "Creditas Sociedade de Crédito Direto S.A.",
            "ShortName": "Creditas Sociedade de Crédito Direto S.A."
        },
        {
            "COMPE": "397",
            "ISPB": "34088029",
            "LongName": "LISTO SOCIEDADE DE CRÉDITO DIRETO S.A.",
            "ShortName": "LISTO SOCIEDADE DE CRÉDITO DIRETO S.A."
        },
        {
            "COMPE": "355",
            "ISPB": "34335592",
            "LongName": "ÓTIMO SOCIEDADE DE CRÉDITO DIRETO S.A.",
            "ShortName": "ÓTIMO SOCIEDADE DE CRÉDITO DIRETO S.A."
        },
        {
            "COMPE": "367",
            "ISPB": "34711571",
            "LongName": "VITREO DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS S.A.",
            "ShortName": "VITREO DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS S.A."
        },
        {
            "COMPE": "373",
            "ISPB": "35977097",
            "LongName": "UP.P SOCIEDADE DE EMPRÉSTIMO ENTRE PESSOAS S.A.",
            "ShortName": "UP.P SOCIEDADE DE EMPRÉSTIMO ENTRE PESSOAS S.A."
        },
        {
            "COMPE": "408",
            "ISPB": "36586946",
            "LongName": "BÔNUSCRED SOCIEDADE DE CRÉDIT DIRETO S.A.",
            "ShortName": "BÔNUSCRED SOCIEDADE DE CRÉDIT DIRETO S.A."
        },
        {
            "COMPE": "404",
            "ISPB": "37241230",
            "LongName": "SUMUP SOCIEDADE DE CRÉDIT DIRETO S.A.",
            "ShortName": "SUMUP SOCIEDADE DE CRÉDIT DIRETO S.A."
        },
        {
            "COMPE": "403",
            "ISPB": "37880206",
            "LongName": "CORA SOCIEDADE DE CRÉDIT DIRETO S.A.",
            "ShortName": "CORA SOCIEDADE DE CRÉDIT DIRETO S.A."
        },
        {
            "COMPE": "306",
            "ISPB": "40303299",
            "LongName": "PORTOPAR DISTRIBUIDORA DE TITULOS E VALORES MOBILIARIOS LTDA.",
            "ShortName": "PORTOPAR DISTRIBUIDORA DE TITULOS E VALORES MOBILIARIOS LTDA."
        },
        {
            "COMPE": "174",
            "ISPB": "43180355",
            "LongName": "PEFISA S.A. – CRÉDITO, FINANCIAMENTO E INVESTIMENTO",
            "ShortName": "PEFISA S.A. – CRÉDITO, FINANCIAMENTO E INVESTIMENTO"
        },
        {
            "COMPE": "354",
            "ISPB": "52904364",
            "LongName": "NECTON INVESTIMENTOS S.A. CORRETORA DE VALORES MOBILIÁRIOS E COMMODITIES",
            "ShortName": "NECTON INVESTIMENTOS S.A. CORRETORA DE VALORES MOBILIÁRIOS E COMMODITIES"
        },
        {
            "COMPE": "n/a",
            "ISPB": "54641030",
            "LongName": "BMF Bovespa S.A. – Bolsa de Valores, Mercadorias e Futuros – Camara BMFBOVESPA",
            "ShortName": "BMF Bovespa S.A. – Bolsa de Valores, Mercadorias e Futuros – Camara BMFBOVESPA"
        },
        {
            "COMPE": "630",
            "ISPB": "58497702",
            "LongName": "Banco Smartbank S.A.",
            "ShortName": "Banco Smartbank S.A."
        },
        {
            "COMPE": "393",
            "ISPB": "59109165",
            "LongName": "Banco Volkswagen S.A.",
            "ShortName": "Banco Volkswagen S.A."
        },
        {
            "COMPE": "390",
            "ISPB": "59274605",
            "LongName": "BANCO GM S.A.",
            "ShortName": "BANCO GM S.A."
        },
        {
            "COMPE": "381",
            "ISPB": "60814191",
            "LongName": "BANCO MERCEDES-BENZ DO BRASIL S.A.",
            "ShortName": "BANCO MERCEDES-BENZ DO BRASIL S.A."
        },
        {
            "COMPE": "626",
            "ISPB": "61348538",
            "LongName": "BANCO C6 CONSIGNADO S.A.",
            "ShortName": "BANCO C6 CONSIGNADO S.A."
        },
        {
            "COMPE": "755",
            "ISPB": "62073200",
            "LongName": "Bank of America Merrill Lynch Banco Múltiplo S.A.",
            "ShortName": "Bank of America Merrill Lynch Banco Múltiplo S.A."
        },
        {
            "COMPE": "089",
            "ISPB": "62109566",
            "LongName": "CREDISAN COOPERATIVA DE CRÉDITO",
            "ShortName": "CREDISAN COOPERATIVA DE CRÉDITO"
        },
        {
            "COMPE": "363",
            "ISPB": "62285390",
            "LongName": "SOCOPA SOCIEDADE CORRETORA PAULISTA S.A.",
            "ShortName": "SOCOPA SOCIEDADE CORRETORA PAULISTA S.A."
        },
        {
            "COMPE": "365",
            "ISPB": "68757681",
            "LongName": "SOLIDUS S.A. CORRETORA DE CAMBIO E VALORES MOBILIARIOS",
            "ShortName": "SOLIDUS S.A. CORRETORA DE CAMBIO E VALORES MOBILIARIOS"
        },
        {
            "COMPE": "281",
            "ISPB": "76461557",
            "LongName": "Cooperativa de Crédito Rural Coopavel",
            "ShortName": "Cooperativa de Crédito Rural Coopavel"
        },
        {
            "COMPE": "654",
            "ISPB": "92874270",
            "LongName": "BANCO DIGIMAIS S.A.",
            "ShortName": "BANCO DIGIMAIS S.A."
        },
        {
            "COMPE": "371",
            "ISPB": "92875780",
            "LongName": "WARREN CORRETORA DE VALORES MOBILIÁRIOS E CÂMBIO LTDA.",
            "ShortName": "WARREN CORRETORA DE VALORES MOBILIÁRIOS E CÂMBIO LTDA."
        },
        {
            "COMPE": "289",
            "ISPB": "94968518",
            "LongName": "DECYSEO CORRETORA DE CAMBIO LTDA.",
            "ShortName": "DECYSEO CORRETORA DE CAMBIO LTDA."
        }
    ]
;


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
