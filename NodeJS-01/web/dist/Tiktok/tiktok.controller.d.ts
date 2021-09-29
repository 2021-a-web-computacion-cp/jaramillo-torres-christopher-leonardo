import { TiktokService } from "./tiktok.service";
export declare class TiktokController {
    private tiktokService;
    constructor(tiktokService: TiktokService);
    listatiktoks(response: any, parametrosConsulta: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    crearTitktokFormulario(response: any, parametrosCuerpo: any): Promise<import(".prisma/client").tiktok>;
    eliminarTiktok(response: any, parametrosRuta: any): Promise<void>;
    editarTiktok(response: any, parametrosRuta: any, parametrosConsulta: any): Promise<void>;
    editarTitktokFormulario(response: any, parametrosCuerpo: any, parametrosRuta: any): Promise<void>;
}
