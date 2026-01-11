import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Chip, IconButton } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { createGroup, getGroups, deleteGroup, findUserByEmail, addUserToGroup } from "../api"; 
import {useNavigate} from "react-router-dom";

const GroupsPage = ({ user }) => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newLabel, setNewLabel] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await getGroups(); // Backend needs to return groups for this user
      setGroups(res.data);
    } catch (err) { console.error(err); }
  };

  const handleCreateGroup = async () => {
    try {
      await createGroup({ name: newGroupName, label:newLabel });
      setOpen(false);
      setNewGroupName("");
      setNewLabel("");
      await fetchGroups();
    } catch (err) { console.error(err); }
  };
const handleDelete = async (id) => {
  console.log("Button clicked! Group ID to delete:", id); // Check your console!
  
  if (!id) {
    alert("Error: This group doesn't have a valid ID in the database.");
    return;
  }

  if (window.confirm("Are you sure?")) {
    try {
      const response = await deleteGroup(id);
      console.log("Server response:", response.data);
      fetchGroups(); // This refreshes the list
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  }
};

const handleInvite = async (groupID) => {
  const email = prompt("Enter your friend's email:");
  if (!email) return;

  try {
    // 1. Find the user
    const userRes = await findUserByEmail(email);
    const userId = userRes.data.id;

    // 2. Add them to the group
    await addUserToGroup(groupID, userId);
    
    alert("Friend added successfully!");
    fetchGroups(); // Refresh to see updated member count
  } catch (err) {
    alert(err.response?.data?.error || "Could not find or add user.");
  }
};

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h4" fontWeight="bold">Friend Groups</Typography>
        <Button variant="contained" startIcon={<GroupAddIcon />} onClick={() => setOpen(true)}>
          New Group
        </Button>
      </Box>

      <Grid container spacing={3}>
  {groups.map((group) => (
    /* 1. Ensure the key is consistent. Usually 'id' is safest */
    <Grid item xs={12} sm={6} md={4} key={group.groupID}> 
      <Card 
        elevation={3} 
        sx={{ borderRadius: 3, cursor: 'pointer' }} 
        /* 2. Using backticks for the dynamic URL */
        onClick={() => navigate(`/groups/${group.groupID}`)} 
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>{group.name}</Typography>
          <Chip 
            label={`Preference: ${group.label || 'None'}`} 
            color="secondary" 
            size="small" 
            sx={{ mb: 2 }} 
          />
          <Typography variant="body2" color="textSecondary" mb={2}>
            Members: {group.members?.length || 1}
          </Typography>

          {/* 3. Wrap buttons with e.stopPropagation() so clicking them 
                 doesn't trigger the Card's onClick (navigation) */}
          <Button 
            fullWidth 
            variant="outlined" 
            startIcon={<PersonAddIcon />} 
            size="small" 
            onClick={(e) => {
              e.stopPropagation(); 
              handleInvite(group.groupID); // Standardize to .id
            }}
          >
            Invite Friend
          </Button>

          <IconButton 
            onClick={(e) => {
              e.stopPropagation(); 
              handleDelete(group.id); // Standardize to .id
            }} 
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

      {/* MODAL FOR NEW GROUP */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create a New Group</DialogTitle>
        <DialogContent>
          <TextField label="Group Name" fullWidth margin="dense" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
          <TextField label="Labels/Preferences (e.g. Vegan, No Nuts)" fullWidth margin="dense" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateGroup} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GroupsPage;