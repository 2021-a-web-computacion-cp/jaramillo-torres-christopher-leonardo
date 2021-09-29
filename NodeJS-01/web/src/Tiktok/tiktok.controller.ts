import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Query,
    Res
} from "@nestjs/common";
import {TiktokService} from "./tiktok.service";
import {TiktokCrearDto} from "./dto/tiktok.crear.dto";
import {validate} from "class-validator";


@Controller('tiktok')
export class TiktokController {

    constructor(
        private tiktokService: TiktokService,
    ) {}

    @Get('lista-tiktoks')
    async listatiktoks(@Res() response, @Query() parametrosConsulta) {
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
        } catch (error) {
            throw new InternalServerErrorException('Error del servidor');
        }
    }

    @Get('vista-crear')
    vistaCrear(@Res() response, @Query() parametrosConsulta) {
        response.render('tiktok/creartiktok', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }

    @Post('crear-tiktok-formulario')
    async crearTitktokFormulario(@Res() response, @Body() parametrosCuerpo) {
        let copyright = true
        if(parametrosCuerpo.copyright == true){
            copyright = true
        } else {
            copyright = false
        }
        const tiktokrearDto = new TiktokCrearDto();
        tiktokrearDto.autor = parametrosCuerpo.autor;
        tiktokrearDto.fechaPublicacion = new Date(parametrosCuerpo.fechaPublicacion + " " + "00:00:00" );
        tiktokrearDto.numReproudcciones = +parametrosCuerpo.numReproducciones;
        tiktokrearDto.copyright = copyright

        try {
            const errores = await validate(tiktokrearDto);
            if (errores.length > 0) {
                response.redirect(
                    '/tiktok/vista-crear' +
                    '?mensaje=Error al crear el tiktok, parámetros no válidos ');
                throw new BadRequestException('No envia bien parametros');
            } else {
                response.redirect(
                    '/tiktok/lista-tiktoks' +
                    '?mensaje=Se creo el tiktok de ' +
                    tiktokrearDto.autor);
                return this.tiktokService.crearUno(
                    {
                        autor: tiktokrearDto.autor,
                        fechaPublicacion: tiktokrearDto.fechaPublicacion,
                        numReproducciones: tiktokrearDto.numReproudcciones,
                        copyright: tiktokrearDto.copyright
                    }
                );
            }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error creando usuario');
        }
    }

    @Post('eliminar-tiktok/:idTiktok')
    async eliminarTiktok(@Res() response, @Param() parametrosRuta) {
        try {
            await this.tiktokService.eliminarUno(+parametrosRuta.idTiktok);
            response.redirect(
                '/tiktok/lista-tiktoks' + '?mensaje=Se elimino el usuario',
            );
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error');
        }
    }

    @Post('vista-editar/:idTiktok')
    async editarTiktok(@Res() response, @Param() parametrosRuta, @Query() parametrosConsulta) {
        const tiktokSelec = await this.tiktokService.buscarUno(+parametrosRuta.idTiktok);
        //console.error(tiktokSelec);
        response.render('tiktok/editartiktok', {
            datos: {
                id: parametrosRuta.idTiktok,
                tiktok: tiktokSelec,
                mensaje: parametrosConsulta.mensaje
            },
        });
    }

    @Post('editar-tiktok-formulario/:idTiktok')
    async editarTitktokFormulario(@Res() response, @Body() parametrosCuerpo, @Param() parametrosRuta) {
            let copyright: boolean
            if(parametrosCuerpo.copyright == true){
                copyright = true
            } else {
                copyright = false
            }
            const id = +parametrosRuta.idTiktok
            const tiktokrearDto = new TiktokCrearDto();
            tiktokrearDto.autor = parametrosCuerpo.autor;
            tiktokrearDto.fechaPublicacion = new Date(parametrosCuerpo.fechaPublicacion);
            tiktokrearDto.numReproudcciones = +parametrosCuerpo.numReproducciones;
            tiktokrearDto.copyright = copyright
        console.error('ultimo valor del copy ' + copyright);

            try {
                const errores = await validate(tiktokrearDto);
                if (errores.length > 0) {
                    response.redirect(
                        '/tiktok/lista-tiktoks/' +
                        '?mensaje=Error al editar el tiktok, parametros no válidos'
                    );
                    throw new BadRequestException('No envia bien parametros');
                } else {
                    const data = {
                        autor: tiktokrearDto.autor,
                        fechaPublicacion: new Date(tiktokrearDto.fechaPublicacion),
                        numReproducciones: tiktokrearDto.numReproudcciones,
                        copyright: tiktokrearDto.copyright
                    }
                    await this.tiktokService.actualizarUno({
                        id: id,
                        data: data
                    });
                    response.redirect(
                        '/tiktok/lista-tiktoks' +
                        '?mensaje=Se edito el tiktok de ' +
                        parametrosCuerpo.autor + ' con exito',
                    );
                }
            } catch (error) {
                console.error(error);
                throw new InternalServerErrorException('Error creando usuario');
            }
    }

}