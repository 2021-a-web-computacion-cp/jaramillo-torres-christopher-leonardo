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
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UsuarioService = class UsuarioService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    buscarMuchos(parametrosBusqueda) {
        const or = parametrosBusqueda.busqueda ? {
            OR: [
                { nombre: { contains: parametrosBusqueda.busqueda } },
                { apellido: { contains: parametrosBusqueda.busqueda } },
            ],
        }
            : {};
        console.log(or);
        return this.prisma.ePN_USUARIO.findMany({
            where: or,
            take: Number(parametrosBusqueda.take) || undefined,
            skip: Number(parametrosBusqueda.skip) || undefined,
        });
    }
    buscarUno(id) {
        return this.prisma.ePN_USUARIO.findUnique({
            where: {
                id: id,
            },
        });
    }
    crearUno(usuario) {
        return this.prisma.ePN_USUARIO.create({
            data: usuario,
        });
    }
    actualizarUno(parametrosActualizar) {
        return this.prisma.ePN_USUARIO.update({
            data: parametrosActualizar.data,
            where: {
                id: parametrosActualizar.id,
            },
        });
    }
    eliminarUno(id) {
        this.prisma.mascota;
        return this.prisma.ePN_USUARIO.delete({
            where: { id: id },
        });
    }
};
UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map