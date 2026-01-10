import user from "../models/user.js";
import foodProduct from "../models/foodProduct.js";


export const createFood = async (req, res) => {
  try {
    const { userId, name, category, expiration } = req.body;

    const food = await foodProduct.create({ name, category, expiration, userId });
    res.status(201).json(food);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getFoods = async (req, res) => {
  try {
    const foods = await foodProduct.findAll({ include: user });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
