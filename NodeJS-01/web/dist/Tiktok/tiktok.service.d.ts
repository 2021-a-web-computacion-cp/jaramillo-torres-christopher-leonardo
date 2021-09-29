import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";
export declare class TiktokService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").tiktok[]>;
    crearUno(newTiktok: Prisma.tiktokCreateInput): Prisma.Prisma__tiktokClient<import(".prisma/client").tiktok>;
    eliminarUno(id: number): Prisma.Prisma__tiktokClient<import(".prisma/client").tiktok>;
    buscarUno(id: number): Prisma.Prisma__tiktokClient<import(".prisma/client").tiktok>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.tiktokUpdateInput;
    }): Prisma.Prisma__tiktokClient<import(".prisma/client").tiktok>;
}
