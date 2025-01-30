import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function capValue() {
    axios
      .post("http://localhost:7000/users/login", form)
      .then((res) => {
        console.log("Login Response:", res);
        alert(res.data.message);
        if (res.data.token) {
          const token = res.data.token;
          sessionStorage.setItem("logintoken", token);
          const decodedToken = jwtDecode(token);
          sessionStorage.setItem("role", decodedToken.role);
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        alert("Invalid Login");
      });
  }

  return (
    <Container maxWidth="sm">
      <Box
        component={Paper}
        elevation={5}
        sx={{
          padding: 4,
          marginTop: 10,
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: "bold", mb: 2 }}>
          Login
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          name="email"
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <TextField
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          fullWidth
          sx={{ mb: 3 }}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            padding: "10px",
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
          onClick={capValue}
        >
          Login
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <Link to={"/register"} style={{ color: "#388e3c", textDecoration: "none" }}>
            New user? Register here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
