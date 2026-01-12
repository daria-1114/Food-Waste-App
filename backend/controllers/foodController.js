import FoodProduct from "../models/foodProduct.js";
import User from "../models/user.js";
import FriendGroup from "../models/friendGroup.js";


export const addFood = async (req, res) => {
  try {
    const food = await FoodProduct.create({
      name: req.body.name,
      category: req.body.category,
      expiration: req.body.expiration,
      available: true,
      shared: false,
      UserId: req.user.id, // This MUST come from JWT to be valid
    });
    res.json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFoods = async (req, res) => {
  try {
    const foods = await FoodProduct.findAll();
    res.json(foods); // MUST be an array
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const shareFood = async (req, res) => {
  try {
    const food = await FoodProduct.findByPk(req.params.id);
    if (!food) return res.status(404).json({ error: "Food not found" });

    food.shared = true; // mark as shared
    await food.save();

    res.json({ message: "Food shared", food });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFoodsByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Find the group with members
    const group = await FriendGroup.findByPk(groupId, {
      include: { model: User, as: "members" } // include users in group
    });

    if (!group) return res.status(404).json({ error: "Group not found" });

    // Collect all user IDs in this group
    const userIds = group.members.map(u => u.id);

    // Fetch foods for these users that are available
    const foods = await FoodProduct.findAll({
      where: {
        available: true,
        UserId: userIds
      }
    });

    
    // Group by category
    const grouped = {};
    foods.forEach(food => {
      if (!grouped[food.category]) grouped[food.category] = [];
      grouped[food.category].push(food);
    });

    res.json(grouped);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const toggleAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the food
    const food = await FoodProduct.findByPk(id);
    if (!food) return res.status(404).json({ error: "Food not found" });

    // Toggle the availability
    food.available = !food.available;
    await food.save();

    res.json({ message: "Availability toggled", food });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Unshare a food
export const unshareFood = async (req, res) => {
  try {
    const food = await FoodProduct.findByPk(req.params.id);
    if (!food) return res.status(404).json({ error: "Food not found" });

    food.shared = false;
    await food.save();

    res.json({ message: "Food unshared", food });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a food
export const deleteFood = async (req, res) => {
  try {
    const food = await FoodProduct.findByPk(req.params.id);
    if (!food) return res.status(404).json({ error: "Food not found" });

    await food.destroy();
    res.json({ message: "Food deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const toggleFoodShare = async (req, res) => {
  try {
    const { id } = req.params;
    const { shared } = req.body; // Getting the true/false value from frontend

    const food = await FoodProduct.findByPk(id);

    if (!food) {
      return res.status(404).json({ error: "Food item not found" });
    }

    // Update the 'shared' column
    food.shared = shared;
    await food.save();

    res.json({ message: `Item is now ${shared ? 'shared' : 'private'}`, food });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const claimFood = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; 

    const food = await FoodProduct.findByPk(id);
    if (!food) return res.status(404).json({ error: "Food not found" });
    if (food.claimedBy) return res.status(400).json({ error: "Already claimed" });

    food.claimedBy = userId;
    await food.save();

    res.json({ message: "Food claimed successfully", food });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};