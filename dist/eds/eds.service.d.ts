/// <reference types="multer" />
import { TelegramService } from "../telegram/telegram.service";
import { MailerService } from "@nestjs-modules/mailer";
import { EdsEntity } from "./eds.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateEdsDto } from "./dto/creadteEds.dto";
import { UpdateEdsDto } from "./dto/updateEds.dto";
export declare class EdsService {
    private readonly telegramService;
    private readonly mailerService;
    private readonly edsRepository;
    constructor(telegramService: TelegramService, mailerService: MailerService, edsRepository: Repository<EdsEntity>);
    getAllEds(): Promise<EdsEntity[]>;
    addEds(createEdsDto: CreateEdsDto): Promise<EdsEntity>;
    updateEds(updateEdsDto: UpdateEdsDto, id: number): Promise<EdsEntity>;
    deleteEds(id: number): Promise<DeleteResult>;
    getFileById(id: number): Promise<EdsEntity>;
    addFile(file: Express.Multer.File, id: number): Promise<void>;
    deleteFile(id: number): Promise<void>;
    cronEds30(): Promise<void>;
    cronEds14(): Promise<void>;
}
