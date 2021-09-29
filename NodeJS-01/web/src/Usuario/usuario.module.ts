import { Module } from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";
import {PrismaService} from "../prisma.service";


@Module ({
    imports: [],
    providers: [UsuarioService, PrismaService,],
    exports: [UsuarioService,],
    controllers: [UsuarioController],
})
export class UsuarioModule {}