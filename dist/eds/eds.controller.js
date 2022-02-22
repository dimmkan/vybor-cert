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
exports.EdsController = void 0;
const common_1 = require("@nestjs/common");
const eds_service_1 = require("./eds.service");
const platform_express_1 = require("@nestjs/platform-express");
const creadteEds_dto_1 = require("./dto/creadteEds.dto");
const updateEds_dto_1 = require("./dto/updateEds.dto");
let EdsController = class EdsController {
    constructor(edsService) {
        this.edsService = edsService;
    }
    async getAllEds() {
        return await this.edsService.getAllEds();
    }
    async addEds(createEdsDto) {
        return await this.edsService.addEds(createEdsDto);
    }
    async updateEds(updateEdsDto, id) {
        return await this.edsService.updateEds(updateEdsDto, id);
    }
    async deleteEds(id) {
        return await this.edsService.deleteEds(id);
    }
    async downloadFile(res, id) {
        const file = await this.edsService.getFileById(id);
        res.setHeader('Content-Disposition', `attachment; filename="${file.fileName}"`);
        res.setHeader('Content-type', file.fileType);
        res.setHeader('Content-Length', file.fileSize);
        res.setHeader('Cache-Control', 'no-cache');
        return new common_1.StreamableFile(Buffer.from(file.fileData.toString(), 'base64'));
    }
    async uploadFile(file, id) {
        await this.edsService.addFile(file, id);
    }
    async deleteFile(id) {
        await this.edsService.deleteFile(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EdsController.prototype, "getAllEds", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [creadteEds_dto_1.CreateEdsDto]),
    __metadata("design:returntype", Promise)
], EdsController.prototype, "addEds", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateEds_dto_1.UpdateEdsDto, Number]),
    __metadata("design:returntype", Promise)
], EdsController.prototype, "updateEds", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EdsController.prototype, "deleteEds", null);
__decorate([
    (0, common_1.Get)('downloadfile/:id'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], EdsController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.Post)('addfile/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], EdsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)('deletefile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EdsController.prototype, "deleteFile", null);
EdsController = __decorate([
    (0, common_1.Controller)('eds'),
    __metadata("design:paramtypes", [eds_service_1.EdsService])
], EdsController);
exports.EdsController = EdsController;
//# sourceMappingURL=eds.controller.js.map