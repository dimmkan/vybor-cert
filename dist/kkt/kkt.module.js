"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KktModule = void 0;
const common_1 = require("@nestjs/common");
const kkt_controller_1 = require("./kkt.controller");
const kkt_service_1 = require("./kkt.service");
const telegram_module_1 = require("../telegram/telegram.module");
const typeorm_1 = require("@nestjs/typeorm");
const kkt_entity_1 = require("./kkt.entity");
let KktModule = class KktModule {
};
KktModule = __decorate([
    (0, common_1.Module)({
        imports: [telegram_module_1.TelegramModule, typeorm_1.TypeOrmModule.forFeature([kkt_entity_1.KktEntity])],
        controllers: [kkt_controller_1.KktController],
        providers: [kkt_service_1.KktService]
    })
], KktModule);
exports.KktModule = KktModule;
//# sourceMappingURL=kkt.module.js.map