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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    holaTexto() {
        return 'HOLA TEXTO';
    }
    holaHTML() {
        return '<h1>Hola HTML</h1> <button>Click</button>';
    }
    holaJSON() {
        return '{mensaje: "Hola json" }';
    }
    badRequest() {
        throw new common_1.BadRequestException();
    }
    internalError() {
        throw new common_1.InternalServerErrorException();
    }
    setearCookieInsegura(req, res) {
        res.cookie('galletaInsegura', 'Tengo hambre');
        res.cookie('galletaSeguraYFirmada', 'Web :3', {
            secure: true,
            signed: true,
        });
        res.send('ok');
    }
    mostrarCookies(req) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies,
        };
        return mensaje;
    }
    parametrosConsulta(queryParams, params) {
        return {
            parametrosConsulta: queryParams,
            parametrosRuta: params,
        };
    }
    parametrosCuerpo(bodyParams, cabecerasPeticion) {
        return {
            parametrosCuerpo: bodyParams,
            cabeceras: cabecerasPeticion,
        };
    }
    suma(params, req, res) {
        const parametrosRuta = params;
        const numero1 = Number(parametrosRuta['numero1'].toString());
        const numero2 = Number(parametrosRuta['numero2'].toString());
        const result = operaciones(res, req, 'suma', numero1, numero2);
        const resultadoSuma = result.resultadoOperacion;
        const cookieResult = result.cookieResult;
        return {
            parametrosRuta,
            resultadoSuma,
            cookieResult,
        };
    }
    resta(bodyParams, cabecerasPeticion, req, res) {
        const parametrosdeCuerpoResult = bodyParams;
        const numero1 = Number(parametrosdeCuerpoResult['numero1'].toString());
        const numero2 = Number(parametrosdeCuerpoResult['numero2'].toString());
        const result = operaciones(res, req, 'resta', numero1, numero2);
        const resultadoResta = result.resultadoOperacion;
        const cookieResult = result.cookieResult;
        return {
            parametrosdeCuerpoResult,
            resultadoResta,
            cookieResult,
        };
    }
    multiplicacion(params, req, res) {
        const parametrosResult = params;
        const numero1 = Number(parametrosResult['numero1'].toString());
        const numero2 = Number(parametrosResult['numero2'].toString());
        const result = operaciones(res, req, 'multiplicacion', numero1, numero2);
        const resultadoMultiplicacion = result.resultadoOperacion;
        const cookieResult = result.cookieResult;
        return {
            parametrosResult,
            resultadoMultiplicacion,
            cookieResult,
        };
    }
    division(params, req, res) {
        const parametrosRuta = params;
        const numero1 = Number(parametrosRuta['numero1'].toString());
        const numero2 = Number(parametrosRuta['numero2'].toString());
        const result = operaciones(res, req, 'division', numero1, numero2);
        const resultadoDivision = result.resultadoOperacion;
        const cookieResult = result.cookieResult;
        return {
            parametrosRuta,
            resultadoDivision,
            cookieResult,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('texto'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaTexto", null);
__decorate([
    (0, common_1.Get)('html'),
    (0, common_1.HttpCode)(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaHTML", null);
__decorate([
    (0, common_1.Get)('json'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaJSON", null);
__decorate([
    (0, common_1.Get)('bad-request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "badRequest", null);
__decorate([
    (0, common_1.Get)('internal-error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "internalError", null);
__decorate([
    (0, common_1.Get)('setear-cookie-insegura'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setearCookieInsegura", null);
__decorate([
    (0, common_1.Get)('mostrar-cookies'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "mostrarCookies", null);
__decorate([
    (0, common_1.Get)('parametros-consulta/:nombre/:apellido'),
    (0, common_1.HttpCode)(200),
    (0, common_1.Header)('Cache-Control', 'none'),
    (0, common_1.Header)('EPN', 'SISTEMAS'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosConsulta", null);
__decorate([
    (0, common_1.Post)('parametros-cuerpo'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosCuerpo", null);
__decorate([
    (0, common_1.Get)('suma/:numero1/:numero2'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "suma", null);
__decorate([
    (0, common_1.Post)('resta'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "resta", null);
__decorate([
    (0, common_1.Put)('multiplicacion/:numero1/:numero2'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "multiplicacion", null);
__decorate([
    (0, common_1.Get)('division/:numero1/:numero2'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "division", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
function operaciones(res, req, operacion, numero1, numero2) {
    let resultadoOperaciones;
    const cookieResult = req.cookies;
    const valorCookie = cookieResult['cookieOperacion'];
    switch (operacion) {
        case 'suma': {
            resultadoOperaciones = numero1 + numero2;
            break;
        }
        case 'resta': {
            resultadoOperaciones = numero1 - numero2;
            break;
        }
        case 'multiplicacion': {
            resultadoOperaciones = numero1 * numero2;
            break;
        }
        case 'division': {
            resultadoOperaciones = numero1 / numero2;
            break;
        }
    }
    if (valorCookie == undefined) {
        const nuevoValor = 100 - resultadoOperaciones;
        res.cookie('cookieOperacion', String(nuevoValor));
        cookieResult['cookieOperacion'] = String(nuevoValor);
    }
    else {
        const nuevoValor = Number(valorCookie) - resultadoOperaciones;
        if (nuevoValor > 0) {
            cookieResult['cookieOperacion'] = String(nuevoValor);
            res.cookie('cookieOperacion', String(nuevoValor));
            console.log('ya existe una cookie1, valor actualizado');
            console.log('Nuevo Valor: ' + cookieResult['cookieOperacion']);
        }
        else {
            res.cookie('cookieOperacion', '100');
            cookieResult['cookieOperacion'] = '100';
            res.send('Terminaste el juego');
        }
    }
    const resultadoOperacion = String(resultadoOperaciones);
    return {
        cookieResult,
        resultadoOperacion,
    };
}
//# sourceMappingURL=app.controller.js.map