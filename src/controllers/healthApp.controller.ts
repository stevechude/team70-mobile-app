import { Request, Response } from "express";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
// import bcrypt from "bcrypt";
import UserData from "../models/userReg.schema";
// import { comparePassword } from "../utils/comparePasswords";
import { sendEmail } from "../utils/nodemailer.send";

const salt: any = process.env.SALT_ROUNDS;

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { NIN, password, confirmPassword } = req.body;

    const userInfo = await Axios({
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
      const newUser = new UserData({
        userId: uuidv4(),
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
      await newUser.save();

      const origin = `http://localhost:3007`;
      
      const loginUrl = `${origin}/api/user/signin`;
      const message = `<p>Your email has been successfully registered, please proceed to login. <a href="${loginUrl}">Login</a></p>`;

      await sendEmail("maestro_health@yahoo.com", "Email confirmation", message);

      res.status(200).json({ msg: "Registration Successful", newUser });
    }

  } catch (err: any) {
    console.error(err);
    if (err) return res.status(400).json({ msg: err.message });
  }
};

export const userSignin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    const user = await UserData.findOne({ email });
    // console.log(email)

    if (!user) {
      //throw new Error("Login Failed");
       res.status(404).send("Login Failed.")
    }

    const isPasswordCorrect = password === user?.password;
    if (!isPasswordCorrect) res.send("Incorrect Password");
    if (isPasswordCorrect && email === user?.email) {
      res.send("Logged in successfully!");
    }
  } catch (error) {
    if(error) console.log(error)
  }
  
};

export const createEnairaWallet = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      tier,
      accountNumber,
      address,
      NIN,
      phoneNumber
    } = req.body;

    // const userDetails = await UserData.findOne({email})

    // Function to reverse user's date of birth.
    function reverseDate(str: any) {
      const arr = str.split("-");

      return arr.reverse().join("/");
    }

    // Function to change user's country code
    function changeCountryForm(str: any) {
      const arr = str.split("");
      const first = arr[0].toUpperCase();
      const second = arr[2].toUpperCase();
      const result = [];
      result.push(first, second);
      return result.join("");
    }

  
      const createWallet = await Axios({
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
    

  } catch (err: any) {
    console.error(err);
    if (err) return res.status(400).json({ msg: err.message });
  }
};
