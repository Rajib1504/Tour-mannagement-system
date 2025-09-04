/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


//       const user = await UserServices.createUser(req.body)

//       res.status(httpStatus.CREATED).json({
//             message: `User created successfully`,
//             user
//       })
// }  


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const user = await UserServices.createUser(req.body)

      sendResponse(res,{
            success:true,
            statusCode:(httpStatus.CREATED),
            message: `User created successfully`,
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
      createUser, getAllUser,

}