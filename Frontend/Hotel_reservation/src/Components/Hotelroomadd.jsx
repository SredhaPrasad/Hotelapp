import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosinterceptor";

const HiddenInput = styled("input")({
  display: "none",
});

const Hotelroomadd = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hotel_name: "",
    max_count: "",
    phone_number: "",
    location: "",
    rent_per_day: "",
    description: "",
    type: "",
    owner: sessionStorage.getItem("userId"),
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) {
      setErrors((prev) => ({
        ...prev,
        images: "You should upload at least one image.",
      }));
      return;
    }

    if (files.length > 3) {
      setErrors((prev) => ({
        ...prev,
        images: "You can upload a maximum of 3 images.",
      }));
      return;
    }

    setImages(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.hotel_name.trim())
      newErrors.hotel_name = "Hotel Name is required";
    if (!formData.max_count || formData.max_count <= 0)
      newErrors.max_count = "Enter a valid max count";
    if (!formData.phone_number.match(/^\d{10}$/))
      newErrors.phone_number = "Enter a valid 10-digit phone number";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.rent_per_day || formData.rent_per_day <= 0)
      newErrors.rent_per_day = "Enter a valid rent per day";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.type.trim()) newErrors.type = "Type is required";
    if (images.length === 0)
      newErrors.images = "You should upload at least one image.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addHotel = async () => {
    if (!validateForm()) {
      setFormError("Please correct the errors before submitting.");
      return;
    }
    setFormError("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      await axiosInstance.post("/api/rooms/addroom", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Room added successfully!");
      setFormData({
        hotel_name: "",
        max_count: "",
        phone_number: "",
        location: "",
        rent_per_day: "",
        description: "",
        type: "",
      });
      setImages([]);
      setImagePreviews([]);
      setErrors({});
      navigate("/hotel");
    } catch (error) {
      console.error("Error adding hotel room:", error);
      setFormError("Failed to add room. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ width: 500, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
            Add Hotel Room
          </Typography>

          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={2}>
              {Object.entries(formData).map(
                ([key, value]) =>
                  key !== "owner" && (
                    <Grid item xs={12} key={key}>
                      <TextField
                        label={key.replace(/_/g, " ").toUpperCase()}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors[key]}
                        helperText={errors[key]}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  )
              )}

              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <label htmlFor="image-upload">
                  <HiddenInput
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    sx={{ mt: 2, width: "100%" }}
                  >
                    Upload Images
                  </Button>
                </label>
                {errors.images && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {errors.images}
                  </Typography>
                )}
              </Grid>

              {imagePreviews.length > 0 && (
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
                >
                  {imagePreviews.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Preview ${index}`}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={addHotel}
                >
                  Add Room
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Hotelroomadd;
