import { Injectable } from '@nestjs/common';
import {TelegramService} from "../telegram/telegram.service";
import {MailerService} from "@nestjs-modules/mailer";
import {Cron} from "@nestjs/schedule";
import {InjectRepository} from "@nestjs/typeorm";
import {KktEntity} from "./kkt.entity";
import {DeleteResult, getRepository, Repository} from "typeorm";
import {CreateKktDto} from "./dto/createKkt.dto";
import {UpdateKktDto} from "./dto/updateKkt.dto";

@Injectable()
export class KktService {
    constructor(
        private readonly telegramService: TelegramService,
        private readonly mailerService: MailerService,
        @InjectRepository(KktEntity) private readonly kktRepository: Repository<KktEntity>,
    ) {
    }

    async getAllKkt() {
        return await this.kktRepository.find();
    }

    async addKkt(createKktDto: CreateKktDto): Promise<KktEntity> {
        const kkt = new KktEntity();
        Object.assign(kkt, createKktDto);
        return await this.kktRepository.save(kkt);
    }

    async updateKkt(updateKktDto: UpdateKktDto, id: number) {
        const kkt = await this.kktRepository.findOne(id);
        Object.assign(kkt, updateKktDto);
        return await this.kktRepository.save(kkt);
    }

    async deleteKkt(id: number): Promise<DeleteResult> {
        return await this.kktRepository.delete(id);
    }

    @Cron('2 10 * * 1,2,3,4,5')
    async cronKkt14() {
        const result = await getRepository(KktEntity)
            .createQueryBuilder('kkt')
            .where('TIMESTAMPDIFF(DAY, NOW(), `toDate`) < 14')
            .getMany()

        result.sort((a: KktEntity,b: KktEntity) => {
            const aDate = new Date(a.toDate);
            const bDate = new Date(b.toDate);
            return aDate.getDate() - bDate.getDate();
        });

        let emailRows = '';

        for(const element of result){
            const time = new Date(element['toDate']);
            const formatTime = time.toLocaleDateString();
            const org = element['organization'];

            emailRows += `<tr><td>${org}</td><td>${formatTime}</td></tr>`;
            const tgMessage = '<b>Заканчиваются срок действия ФН! (менее 14 дней)</b>' + `\n Организация: ${org} \n Дата окончания ФН: ${formatTime}`;
            try{await this.telegramService.sendMessage(tgMessage);}catch (e){}
        }

        if(emailRows !== ''){
            const table = `<table border='1'><tr><th><b>Организация</b></th><th><b>Дата окончания ФН</b></th></tr>${emailRows}</table>`;

            const message = `
            <html>
                <head>
                    <title>Заканчиваются срок действия ФН</title>
                </head>
                <body>
                    ${table}
                </body>
            </html>`;

            this.mailerService.sendMail(
                {
                    to: 'd.kanaev@vyborstroi.ru, m.grachev@vyborstroi.ru',
                    subject: 'Заканчивается срок действия ФН (менее 14 дней)',
                    html: message
                }
            )
                .then(()=>{})
                .catch(()=>{});
        }
    }

}
