import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserDetailsSchema = new mongoose.Schema({
    name: String,
    email : {type: String , unique: true},
    mobile : String,
    password : String,
    createdAt : String,
},{
    timestamps: true
});

UserDetailsSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10);
    next()
})
UserDetailsSchema.methods.isPasswordMatched = async function(password){
    return await bcrypt.compare(password, this.password)
}


export const Users = mongoose.model("Users", UserDetailsSchema);