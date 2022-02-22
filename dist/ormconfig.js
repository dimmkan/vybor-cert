"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'certificates',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map