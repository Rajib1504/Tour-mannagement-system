import { envVars } from "../modules/config/env";
import { IAuthProvider, Iuser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcryptjs  from 'bcryptjs';

export const seedSuperAdmin =async()=>{
      try {
            const isSuperAdmin = await User.findOne({email:envVars.SUPER_ADMIN_EMAIL})

            if(isSuperAdmin){
                  console.log("super admin exist");
                  return
            }
            console.log("tring to create super admin");
            const hasedPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASSWORD,Number(envVars.BCRYPT_SALT_ROUND))

            const authProvider:IAuthProvider ={
                  provider:'credential',
                  providerId:envVars.SUPER_ADMIN_EMAIL
            }
            const payload:Iuser = {
                  name: "Super admin",
                  role: Role.SUPER_ADMIN,
                  email: envVars.SUPER_ADMIN_EMAIL,
                  password:  hasedPassword,
                  isVerified: true,
                  auth: [authProvider],

            }
            const superadmin = await User.create(payload)
            console.log("Super Admin Created Successfully!/n");
            console.log(superadmin);
      } catch (error) {
       console.log(error);     
      }
}