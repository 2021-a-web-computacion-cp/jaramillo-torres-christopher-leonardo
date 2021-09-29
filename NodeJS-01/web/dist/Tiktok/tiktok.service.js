"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiktokService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TiktokService = class TiktokService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    buscarMuchos(parametrosBusqueda) {
        const or = parametrosBusqueda.busqueda ? {
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
    crearUno(newTiktok) {
        return this.prisma.tiktok.create({
            data: newTiktok,
        });
    }
    eliminarUno(id) {
        this.prisma.tiktok;
        return this.prisma.tiktok.delete({
            where: { id: id },
        });
    }
    buscarUno(id) {
        return this.prisma.tiktok.findUnique({
            where: {
                id: id,
            },
        });
    }
    actualizarUno(parametrosActualizar) {
        return this.prisma.tiktok.update({
            data: parametrosActualizar.data,
            where: {
                id: parametrosActualizar.id,
            },
        });
    }
};
TiktokService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TiktokService);
exports.TiktokService = TiktokService;
//# sourceMappingURL=tiktok.service.js.map