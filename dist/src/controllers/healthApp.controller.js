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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnairaWallet = exports.userSignin = exports.registerUser = void 0;
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
// import bcrypt from "bcrypt";
const userReg_schema_1 = __importDefault(require("../models/userReg.schema"));
// import { comparePassword } from "../utils/comparePasswords";
const nodemailer_send_1 = require("../utils/nodemailer.send");
const salt = process.env.SALT_ROUNDS;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { NIN, password, confirmPassword } = req.body;
        const userInfo = yield (0, axios_1.default)({
            method: "POST",
            url: "https://rgw.k8s.apis.ng/centric-platforms/uat/customer/identity/NINValidationByNIN",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                ClientId: "272613b1bacd6c492459bbd717bbfbef",
            },
            data: { searchParameter: NIN, verificationType: "NIN-SEARCH" },
        });
        // console.log(userInfo.data.response)
        if (userInfo) {
            const newUser = new userReg_schema_1.default({
                userId: (0, uuid_1.v4)(),
                firstname: userInfo.data.response[0].firstname,
                lastname: userInfo.data.response[0].surname,
                middlename: userInfo.data.response[0].middlename,
                gender: userInfo.data.response[0].gender,
                title: userInfo.data.response[0].title,
                country: userInfo.data.response[0].birthcountry,
                state_of_origin: userInfo.data.response[0].self_origin_state,
                state_of_residence: userInfo.data.response[0].residence_state,
                postal_code: userInfo.data.response[0].residence_postalcode,
                email: userInfo.data.response[0].email,
                password,
                confirmPassword,
                NIN: userInfo.data.response[0].nin,
                telephone: userInfo.data.response[0].telephoneno,
                birthdate: userInfo.data.response[0].birthdate,
            });
            yield newUser.save();
            const origin = `http://localhost:3007`;
            const loginUrl = `${origin}/api/user/signin`;
            const message = `<p>Your email has been successfully registered, please proceed to login. <a href="${loginUrl}">Login</a></p>`;
            yield (0, nodemailer_send_1.sendEmail)("maestro_health@yahoo.com", "Email confirmation", message);
            res.status(200).json({ msg: "Registration Successful", newUser });
        }
    }
    catch (err) {
        console.error(err);
        if (err)
            return res.status(400).json({ msg: err.message });
    }
});
exports.registerUser = registerUser;
const userSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Please provide email and password");
        }
        const user = yield userReg_schema_1.default.findOne({ email });
        // console.log(email)
        if (!user) {
            //throw new Error("Login Failed");
            res.status(404).send("Login Failed.");
        }
        const isPasswordCorrect = password === (user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordCorrect)
            res.send("Incorrect Password");
        if (isPasswordCorrect && email === (user === null || user === void 0 ? void 0 : user.email)) {
            res.send("Logged in successfully!");
        }
    }
    catch (error) {
        if (error)
            console.log(error);
    }
});
exports.userSignin = userSignin;
const createEnairaWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, tier, accountNumber, address, NIN, phoneNumber } = req.body;
        // const userDetails = await UserData.findOne({email})
        // Function to reverse user's date of birth.
        function reverseDate(str) {
            const arr = str.split("-");
            return arr.reverse().join("/");
        }
        // Function to change user's country code
        function changeCountryForm(str) {
            const arr = str.split("");
            const first = arr[0].toUpperCase();
            const second = arr[2].toUpperCase();
            const result = [];
            result.push(first, second);
            return result.join("");
        }
        const createWallet = yield (0, axios_1.default)({
            method: "POST",
            url: "https://rgw.k8s.apis.ng/centric-platforms/uat/enaira-user/CreateConsumerV2",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                ClientId: "272613b1bacd6c492459bbd717bbfbef",
            },
            data: {
                channelCode: "APISNG",
                uid: NIN,
                uidType: "NIN",
                reference: "NXG3547585HGTKJHGO",
                title: "Mr",
                firstName: "john",
                middleName: "Bismark",
                lastName: "Doe",
                userName: "maestro_health@yahoo.com",
                phone: phoneNumber,
                emailId: email,
                postalCode: null,
                city: "Denmark",
                address: address,
                countryOfResidence: "NG",
                tier: tier,
                accountNumber: accountNumber,
                dateOfBirth: "31/12/1987",
                countryOfBirth: "NG",
                password: password,
                remarks: "Passed",
                referralCode: "maestro_health",
            },
        });
        console.log(createWallet.data);
        res.json(createWallet.data);
    }
    catch (err) {
        console.error(err);
        if (err)
            return res.status(400).json({ msg: err.message });
    }
});
exports.createEnairaWallet = createEnairaWallet;
