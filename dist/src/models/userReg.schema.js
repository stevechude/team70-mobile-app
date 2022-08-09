"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userRegisteredSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    middlename: { type: String },
    gender: { type: String },
    title: { type: String },
    country: { type: String },
    state_of_origin: { type: String },
    state_of_residence: { type: String },
    postal_code: { type: Object },
    email: { type: String },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 6,
    },
    confirmPassword: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 6,
    },
    NIN: { type: String, required: true },
    telephone: { type: String },
    birthdate: { type: String },
}, {
    timestamps: true,
});
const UserData = mongoose_1.default.model("UserData", userRegisteredSchema);
exports.default = UserData;
