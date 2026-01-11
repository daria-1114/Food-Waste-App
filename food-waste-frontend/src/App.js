import React, { useState } from "react";
import Auth from "./components/Auth";
import Main from "./components/Main";
import ListsPage from "./components/ListsPage";
function App() {
  // Load user from localStorage if exists
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return saved ? JSON.parse(saved) : null;
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
    {view === "dashboard" ? (
      <Main 
        user={user} 
        onLogout={handleLogout} 
        goToLists={() => setView("lists")} 
      />
    ) : (
      <ListsPage 
        user={user} 
        goBack={() => setView("dashboard")} 
      />
    )}
  </>
);
}

export default App;
