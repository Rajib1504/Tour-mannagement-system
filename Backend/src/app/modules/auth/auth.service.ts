import AppError from "../../errorHelpers/AppError"
import { Iuser } from "../user/user.interface"
import { User } from "../user/user.model"
import httpStatus from 'http-status-codes';
import bcrypytjs from "bcryptjs";

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

      // const {password,...rest}=isUserExist;
      // return {...rest};
      return {
            emal: isUserExist.email
      }

}
export const AuthServices = {
      credentialLogin,
}