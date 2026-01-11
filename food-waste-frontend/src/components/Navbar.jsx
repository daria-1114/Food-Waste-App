import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import KitchenIcon from "@mui/icons-material/Kitchen"; // Fridge icon
import ListAltIcon from "@mui/icons-material/ListAlt"; // Lists icon
import GroupIcon from "@mui/icons-material/Group"; // Groups icon
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = ({ onLogout, userName }) => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ mb: 3, backgroundColor: "#2c3e50" }}>
      <Toolbar>
        <KitchenIcon sx={{ mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          SmartFridge
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" startIcon={<KitchenIcon />} onClick={() => navigate("/")}>
            My Fridge
          </Button>
          <Button color="inherit" startIcon={<ListAltIcon />} onClick={() => navigate("/lists")}>
            My Lists
          </Button>
          <Button color="inherit" startIcon={<GroupIcon />} onClick={() => navigate("/groups")}>
            Groups
          </Button>
        </Box>

        <Box sx={{ ml: 4, display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            Hi, {userName}
          </Typography>
          <Button color="error" variant="contained" size="small" startIcon={<LogoutIcon />} onClick={onLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;