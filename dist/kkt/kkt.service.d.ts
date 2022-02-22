import { TelegramService } from "../telegram/telegram.service";
import { MailerService } from "@nestjs-modules/mailer";
import { KktEntity } from "./kkt.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateKktDto } from "./dto/createKkt.dto";
import { UpdateKktDto } from "./dto/updateKkt.dto";
export declare class KktService {
    private readonly telegramService;
    private readonly mailerService;
    private readonly kktRepository;
    constructor(telegramService: TelegramService, mailerService: MailerService, kktRepository: Repository<KktEntity>);
    getAllKkt(): Promise<KktEntity[]>;
    addKkt(createKktDto: CreateKktDto): Promise<KktEntity>;
    updateKkt(updateKktDto: UpdateKktDto, id: number): Promise<KktEntity>;
    deleteKkt(id: number): Promise<DeleteResult>;
    cronKkt14(): Promise<void>;
}
