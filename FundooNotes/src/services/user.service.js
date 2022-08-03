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

//Checks whether login details are valid
export const checkLogin = async (body) => {
  const loginDetails = await User.findOne({EmailId:body.EmailId})
  if(loginDetails){
    if(loginDetails.Password == body.Password){
      return loginDetails;
    }
    else{
      throw new Error("Invalid Password!");
    }
  }
  else{
    throw new Error("Invalid User Id!");
  }
};