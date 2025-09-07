import catchAsync from "../../utils/catchAsync";
import { Response, Request } from 'express';
import { NextFunction } from 'express';
import { sendResponse } from "../../utils/sendResponse";
import httpStatus  from 'http-status-codes';
import { AuthServices } from "./auth.service";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialLogin = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

const loginfo = await AuthServices.credentialLogin(req.body)

      sendResponse(res,{
            success:true,
            statusCode:(httpStatus.OK),
            message: `User Login successfully`,
            data:loginfo
      })
})
export const AuthControlers = {
      credentialLogin
}