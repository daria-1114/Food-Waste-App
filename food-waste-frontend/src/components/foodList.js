import React from "react";
import FoodItem from "./FoodItem";

const FoodList = ({ foodsGrouped, onToggle }) => {
  return (
    <div>
      {Object.keys(foodsGrouped).map((category) => (
        <div key={category} style={{ marginBottom: "20px" }}>
          <h3>{category}</h3>
          {foodsGrouped[category].map((food) => (
            <FoodItem key={food.id} food={food} onToggle={onToggle} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FoodList;
