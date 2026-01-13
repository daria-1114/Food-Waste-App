import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  getFoods,
  createFood,
  shareFood,
  toggleAvailability,
  deleteFood,
  unshareFood
} from "../api";

const Main = ({ user, onLogout, goToLists }) => {

  const [foods, setFoods] = useState([]);
  const [sharedFoods, setSharedFoods] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [expiration, setExpiration] = useState("");

  const getExpiryStatus = (expirationDate) => {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "expired";
    if (diffDays <= 3) return "warning";
    return "safe";
  };
  const fetchFoods = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!user?.id || !token) return;
    try {
      const res = await getFoods();
      const allFoods = Array.isArray(res.data) ? res.data : [];

      setFoods(allFoods.filter((f) => String(f.UserId) === String(user.id)));
      setSharedFoods(allFoods.filter((f) => f.shared === true));
    } catch (err) {
      console.error("Fetch error:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        onLogout();
      }
    }
  }, [user?.id, onLogout]);
/* ---------------- EFFECTS ---------------- */
  // 1. Initial Load & Refresh
  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

 // 2. NOTIFICATION ALERT EXPIRED FOODS
const hasAlertedThisSession = useRef(false); 

useEffect(() => {
  if (foods.length > 0 && !hasAlertedThisSession.current) {
    const expiringItems = foods.filter(
      (f) => getExpiryStatus(f.expiration) === "warning"
    );

    if (expiringItems.length > 0) {
      alert(`📢 Awareness Alert: You have ${expiringItems.length} items expiring soon!`);
      
      // Mark as "done" so it doesn't fire again until the page is reloaded
      hasAlertedThisSession.current = true; 
    }
  }
}, [foods]);
  /* ---------------- ADD ---------------- */
 const handleAddFood = async () => {
  if (!name || !category || !expiration) return;

  try {
    // 1. Send request
    await createFood({ name, category, expiration });
    
    // 2. Clear inputs
    setName("");
    setCategory("");
    setExpiration("");

    // 3. FORCE A RE-FETCH
    await fetchFoods(); 
    
  } catch (err) {
    console.error("Failed to add:", err);
  }
};

  /* ---------------- ACTIONS ---------------- */
  const handleShare = async (id) => {
    await shareFood(id);
    fetchFoods();
  };

  const handleToggleAvailable = async (id) => {
    await toggleAvailability(id);
    fetchFoods();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this food?")) return;
    await deleteFood(id);
    fetchFoods();
  };
  const handleDeleteShare = async (id) => {
    if(!window.confirm("Unshare this product?")) return;
    await unshareFood(id);
    fetchFoods();
  }

  /* ---------------- GROUP BY CATEGORY ---------------- */
  const groupedFoods = foods.reduce((acc, f) => {
    acc[f.category] = acc[f.category] || [];
    acc[f.category].push(f);
    return acc;
  }, {});
// If user object isn't ready yet, don't even render the dashboard
if (!user || !user.id) {
  return <Typography>Loading fridge...</Typography>;
}

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {/* LEFT */}
        <Grid item xs={12} md={6}>
          {/* ADD FOOD */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6">Add Food</Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={4}>
                <TextField label="Name" fullWidth value={name}
                  onChange={(e) => setName(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Category" fullWidth value={category}
                  onChange={(e) => setCategory(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField type="date" label="Expiration"
                  InputLabelProps={{ shrink: true }}
                  fullWidth value={expiration}
                  onChange={(e) => setExpiration(e.target.value)} />
              </Grid>
            </Grid>
            <Button sx={{ mt: 2 }} variant="contained" onClick={handleAddFood}>
              Add Food
            </Button>
          </Paper>

          {/* MY FOODS */}
          <Typography variant="h5" mb={1}>My Foods</Typography>

          {Object.keys(groupedFoods).map((cat) => (
            <Box key={cat} mb={2}>
              <Typography variant="h6">{cat}</Typography>
              <Grid container spacing={2}>
                {groupedFoods[cat].map((food) => (
                  <Grid item xs={12} sm={6} key={food.foodID}>
                    <Card>
                      <CardContent>
                        <Typography>{food.name}</Typography>
                        <Typography>Expires: {food.expiration}</Typography>
                        <Typography>
                          Available: {food.available ? "Yes" : "No"}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button onClick={() => handleShare(food.foodID)}>
                          {food.shared ? "Unshare" : "Share"}
                        </Button>
                        <Button onClick={() => handleToggleAvailable(food.foodID)}>
                          Toggle Available
                        </Button>
                        <Button color="error" onClick={() => handleDelete(food.foodID)}>
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" mb={2}>Shared Foods</Typography>

          <Grid container spacing={2}>
            {sharedFoods.map((food) => (
              <Grid item xs={12} sm={6} key={food.foodID}>
                <Card sx={{ backgroundColor: "#f0f8ff" }}>
                  <CardContent>
                    <Typography>{food.name}</Typography>
                    <Typography>{food.category}</Typography>
                    <Typography>Owner ID: {food.UserId}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => handleDeleteShare(food.foodID)}>
                      Unshare
                    </Button>
                    <Button color="error" onClick={() => handleDelete(food.foodID)}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
