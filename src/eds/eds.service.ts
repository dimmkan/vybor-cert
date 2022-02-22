import { Injectable } from '@nestjs/common';
import {TelegramService} from "../telegram/telegram.service";
import {MailerService} from "@nestjs-modules/mailer";
import {InjectRepository} from "@nestjs/typeorm";
import {EdsEntity} from "./eds.entity";
import {DeleteResult, getRepository, Repository} from "typeorm";
import {CreateEdsDto} from "./dto/creadteEds.dto";
import {UpdateEdsDto} from "./dto/updateEds.dto";
import {Cron} from "@nestjs/schedule";


@Injectable()
export class EdsService {
    constructor(
        private readonly telegramService: TelegramService,
        private readonly mailerService: MailerService,
        @InjectRepository(EdsEntity) private readonly edsRepository: Repository<EdsEntity>,
    ) {
    }

    async getAllEds(): Promise<EdsEntity[]> {
        return await this.edsRepository.find();
    }

    async addEds(createEdsDto: CreateEdsDto): Promise<EdsEntity> {
        const newEds = new EdsEntity();
        Object.assign(newEds, createEdsDto);
        return await this.edsRepository.save(newEds);
    }

    async updateEds(updateEdsDto: UpdateEdsDto, id: number): Promise<EdsEntity> {
        const eds = await this.edsRepository.findOne(id);
        Object.assign(eds, updateEdsDto);
        return await this.edsRepository.save(eds);
    }

    async deleteEds(id: number): Promise<DeleteResult> {
        return await this.edsRepository.delete(id);
    }

    async getFileById(id: number): Promise<EdsEntity> {
        return await this.edsRepository.findOne({id}, {select:['fileData', 'fileName', 'fileType', 'fileSize']});
    }

    async addFile(file: Express.Multer.File, id: number): Promise<void> {
        let eds = await this.edsRepository.findOne(id);
        eds.fileData = file.buffer.toString('base64');
        eds.fileName = file.originalname;
        eds.fileType = file.mimetype;
        eds.fileSize = file.size;
        await this.edsRepository.save(eds);
    }

    async deleteFile(id: number): Promise<void> {
        let eds = await this.edsRepository.findOne(id);
        eds.fileData = null;
        eds.fileName = null;
        eds.fileType = null;
        eds.fileSize = null;
        await this.edsRepository.save(eds);
    }

    @Cron('1 10 * * 1,2,3,4,5')
    async cronEds30() {
        const result = await getRepository(EdsEntity)
            .createQueryBuilder('eds')
            .where('TIMESTAMPDIFF(DAY, NOW(), `toDate`) < 30 AND TIMESTAMPDIFF(DAY, NOW(), `toDate`) > 13')
            .getMany()

        result.sort((a: EdsEntity,b: EdsEntity) => {
            const aDate = new Date(a.toDate);
            const bDate = new Date(b.toDate);
            return aDate.getDate() - bDate.getDate();
        });

        let emailRows = '';

        for(const element of result){
            const time = new Date(element['toDate']);
            const dateNow = new Date();
            const interval = time.getDate() - dateNow.getDate();
            const formatTime = time.toLocaleDateString();
            const org = element['organization'];
            const cert = element['certificateSerial'];

            emailRows += `<tr><td>${org}</td><td>${cert}</td><td>${formatTime}</td><td>${interval} дней</td></tr>`;
            const tgMessage = '<b>'+`Заканчивается сертификат эцп! (осталось ${interval} дней)` + '</b>' + `\n Организация: ${org} \n Сер. номер: ${cert} \n Дата окончания: ${formatTime}`;
            await this.telegramService.sendMessage(tgMessage);
        }

        if(emailRows !== ''){
            const table = `<table border='1'><tr><th><b>Организация</b></th><th><b>Серийный номер</b></th><th><b>Дата окончания</b></th><th><b>Осталось дней</b></th></tr>${emailRows}</table>`;

            const message = `
            <html>
                <head>
                    <title>Заканчиваются сертификаты эцп</title>
                </head>
                <body>
                    ${table}
                </body>
            </html>`;

            this.mailerService.sendMail(
                {
                    to: 'd.kanaev@vyborstroi.ru, m.grachev@vyborstroi.ru',
                    subject: 'Заканчивается срок действия ЭЦП (менее 30 дней)',
                    html: message
                }
            )
                .then(()=>{})
                .catch(()=>{});
        }
    }

    @Cron('0 10,17 * * 1,2,3,4,5')
    async cronEds14() {
        const result = await getRepository(EdsEntity)
            .createQueryBuilder('eds')
            .where('TIMESTAMPDIFF(DAY, NOW(), `toDate`) < 14')
            .getMany()

        result.sort((a: EdsEntity,b: EdsEntity) => {
            const aDate = new Date(a.toDate);
            const bDate = new Date(b.toDate);
            return aDate.getDate() - bDate.getDate();
        });

        let emailRows = '';

        for(const element of result){
            const time = new Date(element['toDate']);
            const dateNow = new Date();
            const interval = time.getDate() - dateNow.getDate();
            const formatTime = time.toLocaleDateString();
            const org = element['organization'];
            const cert = element['certificateSerial'];

            emailRows += `<tr><td>${org}</td><td>${cert}</td><td>${formatTime}</td><td>${interval} дней</td></tr>`;
            const tgMessage = '<b>'+`Заканчивается сертификат эцп! (осталось ${interval} дней)` + '</b>' + `\n Организация: ${org} \n Сер. номер: ${cert} \n Дата окончания: ${formatTime}`;
            await this.telegramService.sendMessage(tgMessage);
        }

        if(emailRows !== ''){
            const table = `<table border='1'><tr><th><b>Организация</b></th><th><b>Серийный номер</b></th><th><b>Дата окончания</b></th><th><b>Осталось дней</b></th></tr>${emailRows}</table>`;

            const message = `
            <html>
                <head>
                    <title>Заканчиваются сертификаты эцп</title>
                </head>
                <body>
                    ${table}
                </body>
            </html>`;

            this.mailerService.sendMail(
                {
                    to: 'd.kanaev@vyborstroi.ru, m.grachev@vyborstroi.ru',
                    subject: 'Заканчивается срок действия ЭЦП (менее 14 дней)',
                    html: message
                }
            )
                .then(()=>{})
                .catch(()=>{});
        }
    }

}
