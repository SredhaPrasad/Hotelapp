import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    role: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure phone number is only numbers
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelection = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    setSelectedRole(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.role) {
      setErrorMessage("Please select a role (Hotel or User).");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:7000/users/register", formData);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
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
      <Typography variant="h5" align="center" mb={3} color="black" fontWeight="bold">
        Register
      </Typography>
      {errorMessage && (
        <Typography color="error" align="center" mb={2}>
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ maxLength: 10 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={formData.password.length > 0 && formData.password.length < 8}
          helperText={
            formData.password.length > 0 && formData.password.length < 8
              ? "Password must be at least 8 characters long."
              : ""
          }
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Confirm Password"
          name="confirmpassword"
          type="password"
          value={formData.confirmpassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={formData.confirmpassword.length > 0 && formData.password !== formData.confirmpassword}
          helperText={
            formData.confirmpassword.length > 0 && formData.password !== formData.confirmpassword
              ? "Passwords do not match."
              : ""
          }
          InputLabelProps={{ shrink: true }}
        />

        {/* Role Selection Buttons */}
        <Typography variant="body1" sx={{ mt: 2, mb: 1, fontWeight: "bold", textAlign: "center" }}>
          Select Role
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant={selectedRole === "hotel" ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleRoleSelection("hotel")}
            >
              Hotel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={selectedRole === "user" ? "contained" : "outlined"}
              color="secondary"
              onClick={() => handleRoleSelection("user")}
            >
              User
            </Button>
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
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
