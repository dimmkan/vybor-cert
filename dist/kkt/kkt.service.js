"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KktService = void 0;
const common_1 = require("@nestjs/common");
const telegram_service_1 = require("../telegram/telegram.service");
const mailer_1 = require("@nestjs-modules/mailer");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const kkt_entity_1 = require("./kkt.entity");
const typeorm_2 = require("typeorm");
let KktService = class KktService {
    constructor(telegramService, mailerService, kktRepository) {
        this.telegramService = telegramService;
        this.mailerService = mailerService;
        this.kktRepository = kktRepository;
    }
    async getAllKkt() {
        return await this.kktRepository.find();
    }
    async addKkt(createKktDto) {
        const kkt = new kkt_entity_1.KktEntity();
        Object.assign(kkt, createKktDto);
        return await this.kktRepository.save(kkt);
    }
    async updateKkt(updateKktDto, id) {
        const kkt = await this.kktRepository.findOne(id);
        Object.assign(kkt, updateKktDto);
        return await this.kktRepository.save(kkt);
    }
    async deleteKkt(id) {
        return await this.kktRepository.delete(id);
    }
    async cronKkt14() {
        const result = await (0, typeorm_2.getRepository)(kkt_entity_1.KktEntity)
            .createQueryBuilder('kkt')
            .where('TIMESTAMPDIFF(DAY, NOW(), `toDate`) < 14')
            .getMany();
        result.sort((a, b) => {
            const aDate = new Date(a.toDate);
            const bDate = new Date(b.toDate);
            return aDate.getDate() - bDate.getDate();
        });
        let emailRows = '';
        for (const element of result) {
            const time = new Date(element['toDate']);
            const formatTime = time.toLocaleDateString();
            const org = element['organization'];
            emailRows += `<tr><td>${org}</td><td>${formatTime}</td></tr>`;
            const tgMessage = '<b>Заканчиваются срок действия ФН! (менее 14 дней)</b>' + `\n Организация: ${org} \n Дата окончания ФН: ${formatTime}`;
            try {
                await this.telegramService.sendMessage(tgMessage);
            }
            catch (e) { }
        }
        if (emailRows !== '') {
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
            this.mailerService.sendMail({
                to: 'd.kanaev@vyborstroi.ru, m.grachev@vyborstroi.ru',
                subject: 'Заканчивается срок действия ФН (менее 14 дней)',
                html: message
            })
                .then(() => { })
                .catch(() => { });
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('2 10 * * 1,2,3,4,5'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KktService.prototype, "cronKkt14", null);
KktService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(kkt_entity_1.KktEntity)),
    __metadata("design:paramtypes", [telegram_service_1.TelegramService,
        mailer_1.MailerService,
        typeorm_2.Repository])
], KktService);
exports.KktService = KktService;
//# sourceMappingURL=kkt.service.js.map