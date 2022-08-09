import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
  const existingUser = await User.findOne({EmailId:body.EmailId});
  if(existingUser){
    throw new Error("User With same MailId Already Exists!!");
  }
  else{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.Password,saltRounds);
    body.Password = hashedPassword;
    const data = await User.create(body);
    return data;
  }
};

//Checks whether login details are valid
export const checkLogin = async (body) => {
  const loginDetails = await User.findOne({EmailId:body.EmailId})
  
  if(loginDetails){
    const checkPwdMatch = await bcrypt.compare(body.Password,loginDetails.Password);
    if(checkPwdMatch){
      const token = jwt.sign({EmailId:body.EmailId,id:loginDetails._id},process.env.SECRET_KEY);
      return token;
    }
    else{
      throw new Error("Invalid Password!");
    }
  }
  else{
    throw new Error("Invalid User Id!");
  }
};