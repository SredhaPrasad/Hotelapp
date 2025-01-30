import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmpassword: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message before making the request

    try {
      const response = await axios.post("http://localhost:7000/users/register", formData);
      alert(response.data.message);
      navigate("/login"); // Redirect to login page after success
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Show backend error
      } else {
        setErrorMessage("Registration failed! Please try again.");
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" align="center" mb={3}>
        Register
      </Typography>
      {errorMessage && (
        <Typography color="error" align="center" mb={2}>
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" required />
        <TextField
          label="Confirm Password"
          name="confirmpassword"
          type="password"
          value={formData.confirmpassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>

        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
  <Link to={"/login"} style={{ color: "#388e3c", textDecoration: "none", display: "block" }}>
    Already registered? Login here
  </Link>
</Typography>
      </form>
    </Box>
  );
};

export default Register;
