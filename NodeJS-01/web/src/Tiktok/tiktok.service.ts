import { Injectable } from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class TiktokService{

    constructor(
        private prisma: PrismaService
    ) { }

    buscarMuchos(parametrosBusqueda: {
        skip?: number; // registros que te saltes 0 10 20
        take?: number; // registros tomas 10 10 10
        busqueda?: string; // Adr
    }) {
        const or = parametrosBusqueda.busqueda? {
                OR: [
                    { autor: { contains: parametrosBusqueda.busqueda } },
                ],
            }
            : {};
        console.log(or);
        return this.prisma.tiktok.findMany({
            where: or,
            take: Number(parametrosBusqueda.take) || undefined,
            skip: Number(parametrosBusqueda.skip) || undefined,
        });
    }

    crearUno(newTiktok: Prisma.tiktokCreateInput) {
        return this.prisma.tiktok.create({
            data: newTiktok,
        });
    }

    eliminarUno(id: number) {
        this.prisma.tiktok
        return this.prisma.tiktok.delete({
            where: { id: id },
        });
    }

    buscarUno(id: number) {
        return this.prisma.tiktok.findUnique({
            where: {
                id: id,
            },
        });
    }

    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.tiktokUpdateInput;
    }) {
        return this.prisma.tiktok.update({
            data: parametrosActualizar.data,
            where: {
                id: parametrosActualizar.id,
            },
        });
    }


}