import React, { useState } from "react";
import Auth from "./components/Auth";
import Main from "./components/Main";
import ListsPage from "./components/ListsPage";
import Navbar from "./components/Navbar";
import GroupsPage from "./components/GroupsPage";
import {Box} from "@mui/material"; 
function App() {
 const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // Only consider the user "logged in" if we have BOTH the user data AND the token
  if (savedUser && token && token !== "undefined") {
    return JSON.parse(savedUser);
  }
  return null;
});

  const handleLogin = (data, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  
  const [view, setView] = useState("dashboard");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setView("dashboard");
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }
  return (
  <>
    {/* The Navbar is always here as long as a user is logged in */}
    <Navbar 
      setView={setView} 
      onLogout={handleLogout} 
      userName={user.name} 
    />

    <Box sx={{ mt: 2 }}>
      {view === "dashboard" && <Main user={user} />}
      {view === "lists" && <ListsPage user={user} setView={setView} />}
      {view === "groups" && <GroupsPage user={user} />}
    </Box>
  
  </>
);
}

export default App;
