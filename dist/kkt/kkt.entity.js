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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KktEntity = void 0;
const typeorm_1 = require("typeorm");
let KktEntity = class KktEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], KktEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], KktEntity.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], KktEntity.prototype, "regNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], KktEntity.prototype, "zavNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], KktEntity.prototype, "kktModel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], KktEntity.prototype, "regDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], KktEntity.prototype, "toDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], KktEntity.prototype, "ofd", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], KktEntity.prototype, "fnModel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], KktEntity.prototype, "zavNumberFN", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], KktEntity.prototype, "comPortNumber", void 0);
KktEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'kkt_certificate' })
], KktEntity);
exports.KktEntity = KktEntity;
//# sourceMappingURL=kkt.entity.js.map