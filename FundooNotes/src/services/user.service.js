import User from '../models/user.model';

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
    const data = await User.create(body);
    return data;
  }
};
