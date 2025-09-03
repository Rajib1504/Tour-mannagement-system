import { Types } from "mongoose";

export enum Role{
      SUPER_ADMIN = 'SUPER_ADMIN',
      ADMIN ='ADMIN',
      USER = 'USER',
      GUIDE = 'GUIDE'
}

/**
 * auth provider 
 * google ,email password
 */

export interface IAuthProvider{
provider:string,// after google login we are also getting an id 
providerId:string
}

export enum IsActive {
      ACTIVE = "ACTIVE",
      INACTIVE = 'INACTIVE',
      BLOCKED ="BLOCKED"
}


export interface Iuser {
      name: string,
      email: string,
      password?: string,
      phone?: string,
      picture?: string,
      address?: string,
      isDeleted?: string,
      isActive?:IsActive,
      isVerified?:string,
      role: Role,
      auth:IAuthProvider[], // array nebar krn holo user google login korly toh r password asy nah toh user jodi pore giye password save kore profile edit kore tkn email password diye o login korty parby toh amader ka6y akta user er login korar 2 to jinis holo ty ata k array hisaby nawa holo
      booking?:Types.ObjectId[],//user er sob booking er unique id k array er mody rakhty hoby user model e jaty pore dkehty pare/ ba janty pare
      guide?:Types.ObjectId[] ,

}