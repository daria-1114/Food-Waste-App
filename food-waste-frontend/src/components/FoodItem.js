import React from "react";

const FoodItem = ({ food, onToggle }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "5px 0",
      borderBottom: "1px solid #ddd",
    }}
  >
    <span>{food.name}</span>
    <button onClick={() => onToggle(food.id)}>
      {food.available ? "Available ✅" : "Unavailable ❌"}
    </button>
  </div>
);

export default FoodItem;
