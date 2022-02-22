import { KktService } from "./kkt.service";
import { KktEntity } from "./kkt.entity";
import { CreateKktDto } from "./dto/createKkt.dto";
import { UpdateKktDto } from "./dto/updateKkt.dto";
import { DeleteResult } from "typeorm";
export declare class KktController {
    private readonly kktService;
    constructor(kktService: KktService);
    getAllKkt(): Promise<KktEntity[]>;
    addKkt(createKktDto: CreateKktDto): Promise<KktEntity>;
    updateKkt(updateKktDto: UpdateKktDto, id: number): Promise<KktEntity>;
    deleteKkt(id: number): Promise<DeleteResult>;
}
