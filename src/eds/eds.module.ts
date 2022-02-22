import { Module } from '@nestjs/common';
import { EdsController } from './eds.controller';
import { EdsService } from './eds.service';
import {TelegramModule} from "../telegram/telegram.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EdsEntity} from "./eds.entity";

@Module({
  imports: [TelegramModule, TypeOrmModule.forFeature([EdsEntity])],
  controllers: [EdsController],
  providers: [EdsService]
})
export class EdsModule {}
