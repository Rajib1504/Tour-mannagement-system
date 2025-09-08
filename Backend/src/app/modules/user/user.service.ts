import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { envVars } from "../config/env";
import { IAuthProvider, Iuser, Role } from "./user.interface";
import { User } from './user.model';
import bcryptjs from "bcryptjs";
import httpStatus from 'http-status-codes';
// regitster with google 
const createUserWithGoogle = async (payload: Partial<Iuser>) => {
      const { name, email } = payload;

      const authProvider: IAuthProvider = {
            provider: "google",
            providerId: email || '' // Google থেকে আসা unique ID
      };

      const newUser = await User.create({
            name,
            email,
            auth: [authProvider]
      })
      return newUser;
}
// register 
const createUserWithCredentials = async (payload: Partial<Iuser>) => {
      const { email, password, ...rest } = payload;

      const isUserExist = await User.findOne({ email })
      if (isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "user already exist", "")
      }

      const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

      // const comparePassword = await bcryptjs.compare(password as string,hashedPassword)
      // console.log(password,hashedPassword);
      // console.log(comparePassword);

      const authProvider: IAuthProvider = {
            provider: "credential",
            providerId: email || '' // Email as provider ID for credential login
      };
      const newUser = await User.create({
            email,
            password: hashedPassword,
            auth: [authProvider],
            ...rest
      })
      return { newUser };
}
// all user  
const getAllUsers = async () => {
      const users = await User.find({});
      const totalUser = await User.countDocuments()
      return {
            data: users,
            meta: {
                  total: totalUser
            }
      };
}
// update 
const updateUser = async (userId: string, payload: Partial<Iuser>, decodedToken: JwtPayload) => {
      const ifUserExist = await User.findById(userId);
      if (!ifUserExist) {
            throw new AppError(httpStatus.NOT_FOUND, "User Not Found", '')
      }
      /**
       * email-can't be update
       * name,phone,password,address
       * password -re hasing
       * only admin -role ,is deleted...
       * promoting to  superadmin -superadmin
       * */
      if (payload.role) {
            if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
                  throw new AppError(httpStatus.FORBIDDEN, "you're not authoized", '');
            }
            if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
                  throw new AppError(httpStatus.FORBIDDEN, "you're not authoized", '');
            }
      }

      
      if (payload.isActive || payload.isDeleted || payload.isVerified) {
            if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
                  throw new AppError(httpStatus.FORBIDDEN, "you're not authoized", '');
            }
      }
      if (payload.password) {
            payload.password = await bcryptjs.hash(payload.password, envVars.BCRYPT_SALT_ROUND)
      }
      const newUpdateUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })
      return newUpdateUser
}


export const UserServices = {
      createUserWithGoogle,
      createUserWithCredentials,
      updateUser,
      getAllUsers,
}