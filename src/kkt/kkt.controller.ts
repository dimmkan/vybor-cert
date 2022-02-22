import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {KktService} from "./kkt.service";
import {KktEntity} from "./kkt.entity";
import {CreateKktDto} from "./dto/createKkt.dto";
import {UpdateKktDto} from "./dto/updateKkt.dto";
import {DeleteResult} from "typeorm";

@Controller('kkt')
export class KktController {
    constructor(private readonly kktService: KktService) {
    }

    @Get()
    async getAllKkt(): Promise<KktEntity[]> {
        return await this.kktService.getAllKkt();
    }

    @Post('add')
    async addKkt(@Body() createKktDto: CreateKktDto): Promise<KktEntity> {
        return await this.kktService.addKkt(createKktDto);
    }

    @Put('update/:id')
    async updateKkt(@Body() updateKktDto: UpdateKktDto, @Param('id') id: number): Promise<KktEntity> {
        return await this.kktService.updateKkt(updateKktDto, id);
    }

    @Delete('delete/:id')
    async deleteKkt(@Param('id') id: number): Promise<DeleteResult> {
        return await this.kktService.deleteKkt(id);
    }
}
