import React, { useState } from "react";
import { registerUser, loginUser } from "../api";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const Auth = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let res;
      if (isRegister) {
        // 1. Handle Registration
        res = await registerUser({ name, email, password });
      } else {
        // 2. Handle Login
        res = await loginUser({ email, password });
      }

      // 3. Save the token to localStorage so the interceptor can use it
      if (res.data && res.data.token) {
        onLogin(res.data.user, res.data.token);
      }else{
        setError("no token recieved from the server");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Authentication failed. Please try again.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" mb={2}>
          {isRegister ? "Register" : "Login"}
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            {isRegister ? "Register" : "Login"}
          </Button>
        </form>
        <Button
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </Button>
      </Paper>
    </Box>
  );
};

export default Auth;
