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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiktokController = void 0;
const common_1 = require("@nestjs/common");
const tiktok_service_1 = require("./tiktok.service");
const tiktok_crear_dto_1 = require("./dto/tiktok.crear.dto");
const class_validator_1 = require("class-validator");
let TiktokController = class TiktokController {
    constructor(tiktokService) {
        this.tiktokService = tiktokService;
    }
    async listatiktoks(response, parametrosConsulta) {
        try {
            const respuesta = await this.tiktokService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda
                    ? parametrosConsulta.busqueda
                    : undefined,
            });
            response.render('tiktok/listaTiktoks', {
                datos: {
                    tiktoks: respuesta,
                    mensaje: parametrosConsulta.mensaje
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    vistaCrear(response, parametrosConsulta) {
        response.render('tiktok/creartiktok', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
    async crearTitktokFormulario(response, parametrosCuerpo) {
        let copyright = true;
        if (parametrosCuerpo.copyright == true) {
            copyright = true;
        }
        else {
            copyright = false;
        }
        const tiktokrearDto = new tiktok_crear_dto_1.TiktokCrearDto();
        tiktokrearDto.autor = parametrosCuerpo.autor;
        tiktokrearDto.fechaPublicacion = new Date(parametrosCuerpo.fechaPublicacion + " " + "00:00:00");
        tiktokrearDto.numReproudcciones = +parametrosCuerpo.numReproducciones;
        tiktokrearDto.copyright = copyright;
        try {
            const errores = await (0, class_validator_1.validate)(tiktokrearDto);
            if (errores.length > 0) {
                response.redirect('/tiktok/vista-crear' +
                    '?mensaje=Error al crear el tiktok, parámetros no válidos ');
                throw new common_1.BadRequestException('No envia bien parametros');
            }
            else {
                response.redirect('/tiktok/lista-tiktoks' +
                    '?mensaje=Se creo el tiktok de ' +
                    tiktokrearDto.autor);
                return this.tiktokService.crearUno({
                    autor: tiktokrearDto.autor,
                    fechaPublicacion: tiktokrearDto.fechaPublicacion,
                    numReproducciones: tiktokrearDto.numReproudcciones,
                    copyright: tiktokrearDto.copyright
                });
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error creando usuario');
        }
    }
    async eliminarTiktok(response, parametrosRuta) {
        try {
            await this.tiktokService.eliminarUno(+parametrosRuta.idTiktok);
            response.redirect('/tiktok/lista-tiktoks' + '?mensaje=Se elimino el usuario');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async editarTiktok(response, parametrosRuta, parametrosConsulta) {
        const tiktokSelec = await this.tiktokService.buscarUno(+parametrosRuta.idTiktok);
        response.render('tiktok/editartiktok', {
            datos: {
                id: parametrosRuta.idTiktok,
                tiktok: tiktokSelec,
                mensaje: parametrosConsulta.mensaje
            },
        });
    }
    async editarTitktokFormulario(response, parametrosCuerpo, parametrosRuta) {
        let copyright;
        if (parametrosCuerpo.copyright == true) {
            copyright = true;
        }
        else {
            copyright = false;
        }
        const id = +parametrosRuta.idTiktok;
        const tiktokrearDto = new tiktok_crear_dto_1.TiktokCrearDto();
        tiktokrearDto.autor = parametrosCuerpo.autor;
        tiktokrearDto.fechaPublicacion = new Date(parametrosCuerpo.fechaPublicacion);
        tiktokrearDto.numReproudcciones = +parametrosCuerpo.numReproducciones;
        tiktokrearDto.copyright = copyright;
        console.error('ultimo valor del copy ' + copyright);
        try {
            const errores = await (0, class_validator_1.validate)(tiktokrearDto);
            if (errores.length > 0) {
                response.redirect('/tiktok/lista-tiktoks/' +
                    '?mensaje=Error al editar el tiktok, parametros no válidos');
                throw new common_1.BadRequestException('No envia bien parametros');
            }
            else {
                const data = {
                    autor: tiktokrearDto.autor,
                    fechaPublicacion: new Date(tiktokrearDto.fechaPublicacion),
                    numReproducciones: tiktokrearDto.numReproudcciones,
                    copyright: tiktokrearDto.copyright
                };
                await this.tiktokService.actualizarUno({
                    id: id,
                    data: data
                });
                response.redirect('/tiktok/lista-tiktoks' +
                    '?mensaje=Se edito el tiktok de ' +
                    parametrosCuerpo.autor + ' con exito');
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error creando usuario');
        }
    }
};
__decorate([
    (0, common_1.Get)('lista-tiktoks'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TiktokController.prototype, "listatiktoks", null);
__decorate([
    (0, common_1.Get)('vista-crear'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TiktokController.prototype, "vistaCrear", null);
__decorate([
    (0, common_1.Post)('crear-tiktok-formulario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TiktokController.prototype, "crearTitktokFormulario", null);
__decorate([
    (0, common_1.Post)('eliminar-tiktok/:idTiktok'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TiktokController.prototype, "eliminarTiktok", null);
__decorate([
    (0, common_1.Post)('vista-editar/:idTiktok'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TiktokController.prototype, "editarTiktok", null);
__decorate([
    (0, common_1.Post)('editar-tiktok-formulario/:idTiktok'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TiktokController.prototype, "editarTitktokFormulario", null);
TiktokController = __decorate([
    (0, common_1.Controller)('tiktok'),
    __metadata("design:paramtypes", [tiktok_service_1.TiktokService])
], TiktokController);
exports.TiktokController = TiktokController;
//# sourceMappingURL=tiktok.controller.js.map