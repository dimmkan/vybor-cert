import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post, Put,
    Res,
    StreamableFile,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {EdsService} from "./eds.service";
import {EdsEntity} from "./eds.entity";
import {Response} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateEdsDto} from "./dto/creadteEds.dto";
import {UpdateEdsDto} from "./dto/updateEds.dto";
import {DeleteResult} from "typeorm";

@Controller('eds')
export class EdsController {
    constructor(private readonly edsService: EdsService) {
    }

    @Get()
    async getAllEds(): Promise<EdsEntity[]>{
        return await this.edsService.getAllEds();
    }

    @Post('add')
    async addEds(@Body() createEdsDto: CreateEdsDto): Promise<EdsEntity> {
        return await this.edsService.addEds(createEdsDto);
    }

    @Put('update/:id')
    async updateEds(@Body() updateEdsDto: UpdateEdsDto, @Param('id') id: number): Promise<EdsEntity> {
        return await this.edsService.updateEds(updateEdsDto, id);
    }

    @Delete('delete/:id')
    async deleteEds(@Param('id') id: number): Promise<DeleteResult> {
        return await this.edsService.deleteEds(id);
    }

    @Get('downloadfile/:id')
    async downloadFile(@Res({ passthrough: true }) res: Response, @Param('id') id: number): Promise<StreamableFile>{
        const file = await this.edsService.getFileById(id);
        res.setHeader('Content-Disposition', `attachment; filename="${file.fileName}"`);
        res.setHeader('Content-type', file.fileType);
        res.setHeader('Content-Length', file.fileSize);
        res.setHeader('Cache-Control', 'no-cache');
        return new StreamableFile(Buffer.from(file.fileData.toString(),'base64'));
    }

    @Post('addfile/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') id: number): Promise<void> {
        await this.edsService.addFile(file, id);
    }

    @Delete('deletefile/:id')
    async deleteFile(@Param('id') id: number): Promise<void>{
        await this.edsService.deleteFile(id);
    }
}
