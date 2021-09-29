import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    holaTexto(): string;
    holaHTML(): string;
    holaJSON(): string;
    badRequest(): void;
    internalError(): void;
    setearCookieInsegura(req: any, res: any): void;
    mostrarCookies(req: any): {
        sinFirmar: any;
        firmadas: any;
    };
    parametrosConsulta(queryParams: any, params: any): {
        parametrosConsulta: any;
        parametrosRuta: any;
    };
    parametrosCuerpo(bodyParams: any, cabecerasPeticion: any): {
        parametrosCuerpo: any;
        cabeceras: any;
    };
    suma(params: any, req: any, res: any): {
        parametrosRuta: any;
        resultadoSuma: string;
        cookieResult: any;
    };
    resta(bodyParams: any, cabecerasPeticion: any, req: any, res: any): {
        parametrosdeCuerpoResult: any;
        resultadoResta: string;
        cookieResult: any;
    };
    multiplicacion(params: any, req: any, res: any): {
        parametrosResult: any;
        resultadoMultiplicacion: string;
        cookieResult: any;
    };
    division(params: any, req: any, res: any): {
        parametrosRuta: any;
        resultadoDivision: string;
        cookieResult: any;
    };
}
