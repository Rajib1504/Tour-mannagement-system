/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { varifyToken } from "../../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";


//       const user = await UserServices.createUser(req.body)

//       res.status(httpStatus.CREATED).json({
//             message: `User created successfully`,
//             user
//       })
// }  


// Google login দিয়ে user create করার controller
const createUserWithGoogle = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const user = await UserServices.createUserWithGoogle(req.body)

      sendResponse(res,{
            success:true,
            statusCode:(httpStatus.CREATED),
            message: `User created successfully with Google`,
            data:user
      })
})

// Email/Password দিয়ে user register করার controller
const createUserWithCredentials = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const user = await UserServices.createUserWithCredentials(req.body)

      sendResponse(res,{
            success:true,
            statusCode:(httpStatus.CREATED),
            message: `User registered successfully with credentials`,
            data:user
      })
})
// update user 
const UpdateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const  userId = req.params.id;
      const token = req.headers.authorization
      const verifiedToken = varifyToken(token as string,envVars.JWT_ACCESS_SECRET) as JwtPayload
      const payload = req.body
      const user = await UserServices.updateUser(userId,payload,verifiedToken)

      sendResponse(res,{
            success:true,
            statusCode:(httpStatus.CREATED),
            message: `User updated successfully`,
            data:user
      })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const result = await UserServices.getAllUsers()

sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"All users Retrive successfully",
      meta:result.meta,
      data:result.data
})

})

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//       try {
//             // throw new Error('fake error')
//             // throw new AppError(httpStatus.BAD_REQUEST,'fake error',"")
//             // createUserFunction(req,res);
//             const user = await UserServices.createUser(req.body)

// res.status(httpStatus.CREATED).json({
//       message: `User created successfully`,
//       user
// })
//       } catch (error: any) {
//             // console.log(error);
//             next(error)
//       }
// }

// const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
//       try {
//             const users = await UserServices.getAllUsers()
//             return users;
//       } catch (err: any) {
//             console.log(err);
//             next(err)
//       }

// }


export const UserControlers = {
      createUserWithGoogle,
      createUserWithCredentials,
      UpdateUser,
      getAllUser,
}