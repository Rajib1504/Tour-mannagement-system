import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, Iuser } from "./user.interface";
import { User } from './user.model';
// import bcrypt from 'bcryptjs';
import httpStatus from 'http-status-codes';

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


const createUserWithCredentials = async (payload: Partial<Iuser>) => {
      const { email, ...rest } = payload;

      const isUserExist = await User.findOne({ email })
      if (isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "user already exist","")
      }
      const authProvider: IAuthProvider = {
            provider: "credential",
            providerId: email || '' // Email as provider ID for credential login
      };

      const newUser = await User.create({
            email,
            auth: [authProvider],
            ...rest
      })
      return newUser;
}



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


export const UserServices = {
      createUserWithGoogle,
      createUserWithCredentials,
      getAllUsers
}