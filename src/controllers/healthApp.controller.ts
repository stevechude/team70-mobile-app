import { Request, Response } from "express";
import request from "request";
import Axios from 'axios';


export const registerUser = async ( req: Request, res: Response) => {
    try {
        const { searchParameter, verificationType } = req.body;

        const body = {
            searchParameter,
            verificationType
        }

        console.log(JSON.stringify(body))
        
        const options = {
          method: "POST",
          url: "https://rgw.k8s.apis.ng/centric-platforms/uat/customer/identity/NINValidationByNIN",
          headers: {
            ClientId: "272613b1bacd6c492459bbd717bbfbef",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: body,
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);
          res.send(body)
        });
    } catch (err: any) {
        console.error(err.message)
        if(err) return res.status(400).json({msg: err.message})
    }
}