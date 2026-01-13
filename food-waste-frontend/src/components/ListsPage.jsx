import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Paper, Fab, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; 
import { getFoods } from "../api";

const ListsPage = ({ user, goBack }) => {
  const [groupedFoods, setGroupedFoods] = useState({});
  
  
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await getFoods();
        const myItems = res.data.filter(f => String(f.UserId) === String(user.id));
        
        // ORGANIZE FOODS BY CATEGORY 
        const groups = myItems.reduce((acc, food) => {
          const cat = food.category || "Uncategorized";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(food);
          return acc;
        }, {});
        
        setGroupedFoods(groups);
      } catch (err) {
        console.error("Error fetching for lists", err);
      }
    };
    fetchFoods();
  }, [user.id]);

  return (
    <Box p={4} sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      
      
      <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
        My Food Lists
      </Typography>

      <Grid container spacing={3}>
        {Object.keys(groupedFoods).map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category}>
            <Paper elevation={4} sx={{ p: 0, borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
                <Typography variant="h6">{category}</Typography>
              </Box>
              <Box sx={{ p: 2, maxHeight: 300, overflowY: "auto" }}>
                {groupedFoods[category].map((item) => (
                  <Box key={item.foodID} sx={{ mb: 1, borderBottom: "1px solid #eee", pb: 1 }}>
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Expires: {item.expiration}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>      
    </Box>
  );
};

export default ListsPage;