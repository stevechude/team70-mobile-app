"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    host: process.env.SERVICE,
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
};
