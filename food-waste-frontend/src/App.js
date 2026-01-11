import React, { useState } from "react";
import Auth from "./components/Auth";
import Main from "./components/Main";
import ListsPage from "./components/ListsPage";
import Navbar from "./components/Navbar";
import GroupsPage from "./components/GroupsPage";
import GroupPantry from "./components/GroupPantry";
import {Box} from "@mui/material"; 
import Footer from "./components/Footer";
import {Routes, Route, Navigate} from "react-router-dom";
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
    <Navbar 
      setView={setView} // Keep this for now if your Navbar still uses it
      onLogout={handleLogout} 
      userName={user.name} 
    />

    <Box sx={{ mt: 2 }}>
      <Routes>
        {/* Default Landing Page */}
        <Route path="/" element={<Main user={user} />} />
        
        {/* Lists Page */}
        <Route path="/lists" element={<ListsPage user={user} />} />
        
        {/* Groups Page */}
        <Route path="/groups" element={<GroupsPage user={user} />} />
        
        {/* THE NEW GROUP PANTRY ROUTE */}
        <Route path="/groups/:groupId" element={<GroupPantry user={user} />} />
        
        {/* Catch-all: Redirect back to home if path doesn't exist */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
    <Footer />
  </>
);

}

export default App;
