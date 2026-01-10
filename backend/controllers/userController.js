import User from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
export const getUserGroups = async (req,res)=>{
  try{
    const { userId} = req.params;
    const user = await User.findByPk(userId);
    if(!user)return res.status(404).json({error:"User not found"});

    const groups = await user.getGroups();
    res.json(groups);
  }
  catch(error){
    res.status(500).json({error:error.message});
  }
}