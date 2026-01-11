import User from "../models/user.js";
import bcrypt from "bcrypt";
import {signToken} from "../utils/jwt.js";


export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = signToken(user);

  return res.json({
    token:token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  });
};

export const login = async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken(user);

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};

export const searchUser = async (req,res) =>{
  try{
    const {email} = req.query;
    const user = await User.findOne({where:{email:email}});
    if(!user) return res.status(404).json({error:"user not found"});

    res.json({ id:user.id, name:user.name, email:user.email });
  }catch(err){
    res.status(500).json({error:err.message});
  }
};