import AppError from "../../errorHelpers/AppError"
import { Iuser } from "../user/user.interface"
import { User } from "../user/user.model"
import httpStatus from 'http-status-codes';
import bcrypytjs from "bcryptjs";
// import jwt  from "jsonwebtoken";
import { generateToken } from "../../utils/jwt";
import { envVars } from "../config/env";

const credentialLogin = async (payload: Partial<Iuser>) => {
      const { email, password } = payload;

      // find userexist ki nah 
      const isUserExist = await User.findOne({ email })
      const isPasswordMatch = await bcrypytjs.compare(password as string, isUserExist?.password as string)
      if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "user is not exist,Register", "") 
      }
      if (!isPasswordMatch) {
            throw new AppError(httpStatus.BAD_REQUEST, "incorrect password", "")
      }
const jwtPayload = {
      userId: isUserExist._id,
      email:isUserExist.email,  
      role: isUserExist.role

}
const accessToken= generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES )

      // const accessToken = jwt.sign(jwtPayload,'secret',{
      //       expiresIn:'1d'
      // })
      // const {password,...rest}=isUserExist;
      // return {...rest};
      return {
            // emal: isUserExist.email
            accessToken
      }

}

//user-login-token(email,role,_id)-booking /payment /booking /payment-cancel /tour booking 
export const AuthServices = {
      credentialLogin,
}