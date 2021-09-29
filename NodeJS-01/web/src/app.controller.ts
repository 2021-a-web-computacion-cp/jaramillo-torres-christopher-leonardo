import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post, Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

// npm i cookie-parser express-session session-file-store

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // import {Controller, Get, HttpCode} from '@nestjs/common';
  @Get('texto')
  @HttpCode(200)
  holaTexto(): string {
    return 'HOLA TEXTO';
  }

  @Get('html')
  @HttpCode(201)
  holaHTML(): string {
    return '<h1>Hola HTML</h1> <button>Click</button>';
  }

  @Get('json')
  @HttpCode(200)
  holaJSON(): string {
    return '{mensaje: "Hola json" }';
  }

  @Get('bad-request')
  badRequest() {
    throw new BadRequestException();
  }

  @Get('internal-error')
  internalError() {
    throw new InternalServerErrorException();
  }

  @Get('setear-cookie-insegura')
  setearCookieInsegura(
      @Req() req, //  request - PETICION
      @Res() res, //  response - RESPUESTA
  ) {
    res.cookie(
        'galletaInsegura', // nombre
        'Tengo hambre', // valor
    );
    res.cookie(
        'galletaSeguraYFirmada', // nombre
        'Web :3', // valor
        {
          secure: true, // solo se transfiera por canales confiables https
          signed: true, // Encriptacion
        },
    );
    res.send('ok'); // return de antes
  }

  @Get('mostrar-cookies')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
    // req.signedCookies.total
    return mensaje;
  }

  @Get('parametros-consulta/:nombre/:apellido')
  @HttpCode(200)
  @Header('Cache-Control', 'none') // Cabeceras de respuesta (response headers)
  @Header('EPN', 'SISTEMAS') // Cabeceras de respuesta (response headers)
  parametrosConsulta(
      @Query() queryParams,
      @Param() params,
  ) {
    return {
      parametrosConsulta: queryParams,
      parametrosRuta: params,
    };
  }

  @Post('parametros-cuerpo') // 201
  @HttpCode(200)
  parametrosCuerpo(
      @Body() bodyParams,
      @Headers() cabecerasPeticion,
  ) {
    return {
      parametrosCuerpo: bodyParams,
      cabeceras: cabecerasPeticion,
    };
  }
  // DEBER CALCULADORA

  //SUMA
  @Get('suma/:numero1/:numero2')
  @HttpCode(200)
  suma(@Param() params, @Req() req, @Res({ passthrough: true }) res) {
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
  //RESTA
  @Post('resta')
  @HttpCode(201)
  resta( @Body() bodyParams, @Headers() cabecerasPeticion, @Req() req, @Res({ passthrough: true }) res,) {
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

  //MULTIPLICACION
  @Put('multiplicacion/:numero1/:numero2')
  @HttpCode(200)
  multiplicacion(@Param() params, @Req() req, @Res({ passthrough: true }) res) {
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

  //DIVISION
  @Get('division/:numero1/:numero2')
  @HttpCode(200)
  division(@Param() params, @Req() req, @Res({ passthrough: true }) res) {
    //function operacionesMC(res, req, operacion, numero1, numero2)
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

}
function operaciones(res, req, operacion, numero1, numero2) {
  let resultadoOperaciones: number;

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
    res.cookie(
        'cookieOperacion', //Nombre
        String(nuevoValor), // Valor
    );
    cookieResult['cookieOperacion'] = String(nuevoValor);

  } else {
    const nuevoValor = Number(valorCookie) - resultadoOperaciones;
    if (nuevoValor > 0) {
      cookieResult['cookieOperacion'] = String(nuevoValor);
      res.cookie('cookieOperacion', String(nuevoValor));
      console.log('ya existe una cookie1, valor actualizado');
      console.log('Nuevo Valor: ' + cookieResult['cookieOperacion']);
    } else {
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