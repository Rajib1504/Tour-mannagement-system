import { NextFunction, Request, Response } from "express";

type AsyncHandler =(req: Request, res: Response, next: NextFunction)=>Promise<void>
// heigher order function  
const catchAsync = (fn:AsyncHandler)=>(req: Request, res: Response, next: NextFunction)=>{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Promise.resolve(fn(req,res,next)).catch((err:any)=>{
            // console.log(err);
            next(err)
      })
}
export default catchAsync;

// catAsync is a functon took type of AsyncHandler and return a function with parameter of req,res,next and also mannage the error catch on itself.Then our controler pass the argument mean pass the whole function work to the catchAsync function 


// in this way we can skip our repetative try catch 