import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userRegisteredSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    middlename: { type: String },
    gender: { type: String },
    title: {type: String},
    country: { type: String },
    state_of_origin: { type: String },
    state_of_residence: { type: String },
    postal_code: {type: Object},
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
  },
  {
    timestamps: true,
  }
);

const UserData = mongoose.model("UserData", userRegisteredSchema);

export default UserData;
