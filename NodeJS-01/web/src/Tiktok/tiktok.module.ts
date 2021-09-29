import { Module } from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {TiktokService} from "./tiktok.service";
import {TiktokController} from "./tiktok.controller";


@Module ({
    imports: [],
    providers: [TiktokService, PrismaService,],
    exports: [TiktokService,],
    controllers: [TiktokController],
})
export class TiktokModule {}