import { Iuser } from "./user.interface";
import { User } from './user.model';

const createUser = async (payload: Partial<Iuser>) => {
      const { name, email } = payload;
      const newUser = await User.create({
            name, email
      })
      return newUser;
}

const getAllUsers = async()=>{
      const users = await User.find({});
      const totalUser = await User.countDocuments()
      return {
            data:users,
            meta:{
                  total:totalUser
            }
      };
}


export const UserServices={
      createUser,getAllUsers
}