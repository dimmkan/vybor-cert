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
exports.KktController = void 0;
const common_1 = require("@nestjs/common");
const kkt_service_1 = require("./kkt.service");
const createKkt_dto_1 = require("./dto/createKkt.dto");
const updateKkt_dto_1 = require("./dto/updateKkt.dto");
let KktController = class KktController {
    constructor(kktService) {
        this.kktService = kktService;
    }
    async getAllKkt() {
        return await this.kktService.getAllKkt();
    }
    async addKkt(createKktDto) {
        return await this.kktService.addKkt(createKktDto);
    }
    async updateKkt(updateKktDto, id) {
        return await this.kktService.updateKkt(updateKktDto, id);
    }
    async deleteKkt(id) {
        return await this.kktService.deleteKkt(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KktController.prototype, "getAllKkt", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createKkt_dto_1.CreateKktDto]),
    __metadata("design:returntype", Promise)
], KktController.prototype, "addKkt", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateKkt_dto_1.UpdateKktDto, Number]),
    __metadata("design:returntype", Promise)
], KktController.prototype, "updateKkt", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KktController.prototype, "deleteKkt", null);
KktController = __decorate([
    (0, common_1.Controller)('kkt'),
    __metadata("design:paramtypes", [kkt_service_1.KktService])
], KktController);
exports.KktController = KktController;
//# sourceMappingURL=kkt.controller.js.map