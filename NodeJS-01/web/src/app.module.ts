import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaService} from "./prisma.service";
import {UsuarioController} from "./Usuario/usuario.controller";
import {UsuarioModule} from "./Usuario/usuario.module";
import {TiktokModule} from "./Tiktok/tiktok.module";

@Module({
  imports: [UsuarioModule, TiktokModule],
  exports: [AppService],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
