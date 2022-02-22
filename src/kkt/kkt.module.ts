import { Module } from '@nestjs/common';
import { KktController } from './kkt.controller';
import { KktService } from './kkt.service';
import {TelegramModule} from "../telegram/telegram.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {KktEntity} from "./kkt.entity";

@Module({
  imports: [TelegramModule, TypeOrmModule.forFeature([KktEntity])],
  controllers: [KktController],
  providers: [KktService]
})
export class KktModule {}
