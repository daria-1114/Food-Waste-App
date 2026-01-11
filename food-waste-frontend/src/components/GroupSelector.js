import React from "react";

const GroupSelector = ({ groups, selectedGroup, onSelect }) => {
  return (
    <select
      value={selectedGroup || ""}
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">All Foods</option>
      {groups.map((g) => (
        <option key={g.id} value={g.id}>
          {g.name}
        </option>
      ))}
    </select>
  );
};

export default GroupSelector;
