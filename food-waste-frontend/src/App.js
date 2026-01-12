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
      setView={setView} 
      onLogout={handleLogout} 
      userName={user.name} 
    />

    <Box sx={{ mt: 2 }}>
      <Routes>
        <Route path="/" element={<Main user={user} />} />
        <Route path="/lists" element={<ListsPage user={user} />} />
        <Route path="/groups" element={<GroupsPage user={user} />} />
        <Route path="/groups/:groupId" element={<GroupPantry user={user} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
    <Footer />
  </>
);

}

export default App;
