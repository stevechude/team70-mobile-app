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
exports.registerUser = void 0;
const axios_1 = __importDefault(require("axios"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchParameter, verificationType } = req.body;
        const body = {
            searchParameter,
            verificationType
        };
        console.log(JSON.stringify(body));
        // const userInfo = await Axios({
        //   url: "https://rgw.k8s.apis.ng/centric-platforms/uat/customer/identity/NINValidationByNIN",
        //   method: "POST",
        //   data: JSON.stringify(body),
        // });
        const userInfo2 = yield axios_1.default.post("https://rgw.k8s.apis.ng/centric-platforms/uat/customer/identity/NINValidationByNIN", JSON.stringify(body));
        console.log("I am here");
        console.log("body: ", body);
        // console.log(userInfo.data);
        return res.json(userInfo2.data);
    }
    catch (err) {
        console.error(err.message);
        if (err)
            return res.json({ msg: err.message });
    }
});
exports.registerUser = registerUser;
