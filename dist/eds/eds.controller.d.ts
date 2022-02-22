/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { EdsService } from "./eds.service";
import { EdsEntity } from "./eds.entity";
import { Response } from "express";
import { CreateEdsDto } from "./dto/creadteEds.dto";
import { UpdateEdsDto } from "./dto/updateEds.dto";
import { DeleteResult } from "typeorm";
export declare class EdsController {
    private readonly edsService;
    constructor(edsService: EdsService);
    getAllEds(): Promise<EdsEntity[]>;
    addEds(createEdsDto: CreateEdsDto): Promise<EdsEntity>;
    updateEds(updateEdsDto: UpdateEdsDto, id: number): Promise<EdsEntity>;
    deleteEds(id: number): Promise<DeleteResult>;
    downloadFile(res: Response, id: number): Promise<StreamableFile>;
    uploadFile(file: Express.Multer.File, id: number): Promise<void>;
    deleteFile(id: number): Promise<void>;
}
