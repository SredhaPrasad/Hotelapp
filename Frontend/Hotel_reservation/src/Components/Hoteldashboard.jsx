import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Form, Spinner, Alert } from "react-bootstrap";

const HotelDashboard = ({ hotelId }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    hotel_name: "",
    max_count: "",
    phone_number: "",
    location: "",
    rent_per_day: "",
    description: "",
    type: "",
    images: [],

  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const ownerId = sessionStorage.getItem("userId"); 
    if (!ownerId) {
      setError("Unauthorized access.");
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:7000/api/rooms/getrooms/${ownerId}`);
      setRooms(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch rooms. Please try again later.");
      setLoading(false);
    }
  };
  

  
  const handleEditClick = (room) => {
    setSelectedRoom(room);
    setFormData({ ...room, images: [] }); 
    setShowEditModal(true);
  };

  // Handle Room Deletion
  const handleDeleteClick = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axios.delete(`http://localhost:7000/api/rooms/deleteroom/${roomId}`);
        alert("Room deleted successfully!");
        fetchRooms();
      } catch (error) {
        alert("Error deleting room");
      }
    }
  };

 
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };


  const handleUpdateRoom = async () => {
    const formDataToSend = new FormData();
    for (let key in formData) {
      if (key !== "images") formDataToSend.append(key, formData[key]);
    }
    for (let file of formData.images) {
      formDataToSend.append("images", file);
    }

    try {
      await axios.put(`http://localhost:7000/api/rooms/updateroom/${selectedRoom._id}`, formDataToSend);
      alert("Room updated successfully!");
      setShowEditModal(false);
      fetchRooms();
    } catch (error) {
      alert("Error updating room");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Hotel Dashboard</h2>

      <div className="text-end mb-3">
      <Link to={`/hotelbooking`} className="btn btn-primary">
  View Bookings
</Link>

      </div>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <div className="row">
          {rooms.map((room) => (
            <div key={room._id} className="col-md-4 mb-4">
              <div className="card shadow">
                {room.image_urls && room.image_urls.length > 0 && (
                  <img
                    src={`http://localhost:7000${room.image_urls[0]}`}
                    className="card-img-top"
                    alt={room.hotel_name}
                  />
                )}
                <div className="card-body">
                  <h5>{room.hotel_name}</h5>
                  <p className="card-text">Location:{room.location}</p>
                  <p className="card-text">👥 Max Capacity: {room.max_count}</p>
                  <p className="card-text">🏨 Type: {room.type}</p>
                  <p className="card-text">💰 Rent Per Day: ₹{room.rent_per_day}</p>

                  <Button variant="primary" onClick={() => handleEditClick(room)}>Edit</Button>
                  { <Button variant="danger" className="ms-2" onClick={() => handleDeleteClick(room._id)}>Delete</Button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Hotel Name</Form.Label>
            <Form.Control
              name="hotel_name"
              value={formData.hotel_name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Max Count</Form.Label>
            <Form.Control
              type="number"
              name="max_count"
              value={formData.max_count}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Rent Per Day (₹)</Form.Label>
            <Form.Control
              type="number"
              name="rent_per_day"
              value={formData.rent_per_day}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Images</Form.Label>
            <Form.Control type="file" multiple onChange={handleFileChange} />
          </Form.Group>

          <Button className="mt-3" variant="success" onClick={handleUpdateRoom}>
            Update Room
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HotelDashboard;
