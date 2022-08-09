"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = require("./sendEmail");
const sendVerifyEmail = ({ name, email, origin }) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUrl = `${origin}/api/user/signin`;
    const message = `<p>Your email has been successfully registered, please proceed to login. <a href="${loginUrl}">Login</a></p>`;
    return (0, sendEmail_1.sendEmail)({
        to: email,
        subject: "Email Confirmation",
        html: `<h4> Hello, ${name} </h4>
        ${message}`
    });
});
exports.default = sendVerifyEmail;
