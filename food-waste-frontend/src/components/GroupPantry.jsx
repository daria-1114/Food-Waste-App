// src/pages/GroupPantry.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupSharedFoods, claimFood } from "../api";
import { Button, List, ListItem, ListItemText, Typography, Paper, Box, Grid, Card, CardContent, Chip } from "@mui/material";

const GroupPantry = () => {
  const { groupId } = useParams();
  const [sharedItems, setSharedItems] = useState([]);
  const fetchPantry = async () => {
  try {
    const res = await getGroupSharedFoods(groupId);
    setSharedItems(res.data);
  } catch (err) {
    console.error("Error fetching pantry:", err);
  }
};
  useEffect(() => {
    const loadSharedFoods = async () => {
      try {
        const res = await getGroupSharedFoods(groupId);
        setSharedItems(res.data);
      } catch (err) {
        console.error("Error loading group pantry", err);
      }
    };
    loadSharedFoods();
  }, [groupId]);
const handleClaim = async (foodId) => {
    try {
      await claimFood(foodId);
      fetchPantry(); // Refresh the list to show it's now claimed
    } catch (err) {
      alert(err.response?.data?.error || "Failed to claim item");
    }
  };
 return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>Group Shared Pantry</Typography>
      <Grid container spacing={2}>
        {sharedItems.map((item) => {
          // Check if the item has been claimed
          const isClaimed = item.claimedBy !== null;

          return (
            <Grid item xs={12} sm={6} key={item.id}>
              <Card 
                variant="outlined" 
                sx={{ 
                  // Change background to light gray if claimed
                  backgroundColor: isClaimed ? "#f5f5f5" : "white",
                  // Reduce visibility slightly to show it's "inactive"
                  opacity: isClaimed ? 0.8 : 1,
                  border: isClaimed ? "1px dashed #ccc" : "1px solid #e0e0e0",
                  transition: "0.3s"
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ textDecoration: isClaimed ? 'line-through' : 'none', color: isClaimed ? 'text.secondary' : 'text.primary' }}>
                    {item.name}
                  </Typography>
                  
                  <Typography color="textSecondary">
                    Owner: {item.owner?.name || "Unknown"}
                  </Typography>

                  <Chip 
                    label={`Expires: ${item.expiration}`} 
                    size="small" 
                    color={isClaimed ? "default" : "warning"} 
                    sx={{ mt: 1 }}
                  />

                  <Box sx={{ mt: 2 }}>
                    {isClaimed ? (
                      // Message if claimed
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontStyle: 'italic', 
                          color: 'error.main', 
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        ✅ Claimed by {item.claimer?.name || "Group Member"}
                      </Typography>
                    ) : (
                      // Button if NOT claimed
                      <Button 
                        variant="contained" 
                        color="primary" 
                        size="small"
                        fullWidth
                        onClick={() => handleClaim(item.foodID)}
                      >
                        Claim Item
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}

        {sharedItems.length === 0 && (
          <Typography p={2} color="textSecondary">
            No shared items in this group yet.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
export default GroupPantry;