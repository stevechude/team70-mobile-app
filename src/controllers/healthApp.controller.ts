import { Request, Response } from "express";
import Axios from 'axios';


export const registerUser = async ( req: Request, res: Response) => {
    try {
        const { searchParameter, verificationType } = req.body;

        const body = {
            searchParameter,
            verificationType
        }

        console.log(JSON.stringify(body))
        
        // const userInfo = await Axios({
        //   url: "https://rgw.k8s.apis.ng/centric-platforms/uat/customer/identity/NINValidationByNIN",
        //   method: "POST",
        //   data: JSON.stringify(body),
        // });

        const userInfo2 = await Axios.post("https://rgw.k8s.apis.ng/centric-platforms/uat/customer/identity/NINValidationByNIN", JSON.stringify(body))
        console.log("I am here")
        console.log("body: ",body);
        // console.log(userInfo.data);
        return res.json(userInfo2.data);
    } catch (err: any) {
        console.error(err.message)
        if(err) return res.json({msg: err.message})
    }
}