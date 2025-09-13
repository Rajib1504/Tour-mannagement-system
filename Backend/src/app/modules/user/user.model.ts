import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, Iuser, Role } from "./user.interface";

// embedded scheme for auth 
const authProviderSchema = new Schema<IAuthProvider>({
      provider:{type:String, required:true},
      providerId:{type:String,required:true}
},{
     versionKey:false,
     _id:false 
})    

const userSchema = new Schema<Iuser>({
      name: { type: String, require: true },
      email: { type: String, required: true, unique: true },
      password: { type: String },
      role: {
            type: String,
            enum: Object.values(Role),
            default: Role.USER
      },
      phone: { type: String },
      picture: { type: String },
      address: { type: String },
      isDeleted: { type: Boolean, default: false },
      isActive: {
            type: String,
            enum: Object.values(IsActive),
            default: IsActive.ACTIVE
      },
      isVerified:{type:Boolean,default:false},
      auth:[authProviderSchema],
      // booking:{},
      // guide:{}after createing this modal will will be back

}, {
      timestamps: true,
      versionKey: false
})

export const User =model<Iuser>("user",userSchema)