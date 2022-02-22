import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EdsModule } from './eds/eds.module';
import { KktModule } from './kkt/kkt.module';
import { TelegramModule } from './telegram/telegram.module';
import {ScheduleModule} from "@nestjs/schedule";
import {MailerModule} from "@nestjs-modules/mailer";
import {TypeOrmModule} from "@nestjs/typeorm";
import ormconfig from "./ormconfig";

@Module({
  imports: [UserModule,
    EdsModule,
    KktModule,
    TelegramModule,
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host:'exch01.vybor.local',
        port:'587',
        secure: false,
        requireTLS: true,
        auth: {
          user:'vybor\\send',
          pass:'arf7KOoGkj'
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: 'Управление сертификатами <send@vyborstroi.ru>',
      },
    }),
    TypeOrmModule.forRoot(ormconfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
