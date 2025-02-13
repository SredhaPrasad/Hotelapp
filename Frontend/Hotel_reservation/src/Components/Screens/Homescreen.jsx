import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Carousel, Modal, Spinner, Alert } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../axiosinterceptor";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51Qryv4GD1UEV5KkRFFoToa1xsPua3ajKJuNXaEipJdJPswPsz4x7xZDDha0io3nQd2MQZq2pP4Uu6Z9kAxzM2eTl00XGxMGhB2");
const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dateError, setDateError] = useState("");
  const token = sessionStorage.getItem("logintoken");
  const decoded= jwtDecode(token);
  console.log(decoded);
  
  const handleStripePayment = async () => {
    try {
      const response = await axiosInstance.post("/users/payment", {
        totalAmount,
      });
      console.log(response.data);
      
      const { id } = response.data;
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) {
        console.error("Stripe Error:", error);
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };
  // Store selected dates per room
  const [selectedDates, setSelectedDates] = useState({});

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/rooms/getallrooms");
        setRooms(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch rooms. Please try again later.");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    setShowDetailsModal(true);
  };

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setShowBookingModal(true);
  };

  const handleDateChange = (roomId, field, value) => {
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [roomId]: {
        ...prevDates[roomId],
        [field]: value,
      },
    }));
  };

  const calculateTotalAmount = () => {
    if (selectedRoom && selectedDates[selectedRoom._id]?.fromDate && selectedDates[selectedRoom._id]?.toDate) {
      const start = new Date(selectedDates[selectedRoom._id].fromDate);
      const end = new Date(selectedDates[selectedRoom._id].toDate);
      const timeDiff = end - start;
      const days = timeDiff / (1000 * 3600 * 24);
      setTotalAmount(days * selectedRoom.rent_per_day);
    }
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [selectedRoom, selectedDates]);

  const handleBooking = async () => {
   await handleStripePayment();
    const userId = localStorage.getItem("userId");
    
    if (!selectedRoom || !selectedDates[selectedRoom._id]?.fromDate || !selectedDates[selectedRoom._id]?.toDate) {
      setDateError("Please select both From and To dates.");
      return;
    }
  
    console.log("📌 Selected Room Object:", selectedRoom);

    const bookingData = {
      user: decoded.userId
      , // Replace with actual user ID from authentication
      hotel:selectedRoom.hotel_name, // Debug: Check alternate fields
      room: selectedRoom._id,
      checkInDate: selectedDates[selectedRoom._id].fromDate,
      checkOutDate: selectedDates[selectedRoom._id].toDate,
      totalPrice: totalAmount,
    };
  
    console.log("📌 Booking Data Sent to Backend:", bookingData); // Debugging
  
    if (!bookingData.hotel) {
      console.error("❌ Missing hotel ID in selectedRoom:", selectedRoom);
      alert("Error: Missing hotel ID. Please check room data.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:7000/booking/add", bookingData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("✅ Booking Success:", response.data);
      alert("Booking Successful!");
      setShowBookingModal(false);
    } catch (error) {
      console.error("❌ Booking error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Error occurred while booking.");
    }
  };
  

  return (
    <div className="container mt-4">
      <h2 className="text-center">Available Hotels</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p>Loading rooms...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <div className="row">
          {rooms.map((room) => (
            <div key={room._id} className="col-md-4 mb-4">
              <div className="card h-100 d-flex flex-column shadow">
                {room.image_urls.length > 0 && (
                  <img
                    src={`http://localhost:7000${room.image_urls[0]}`} 
                    className="card-img-top"
                    alt={room.hotel_name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{room.hotel_name}</h5>
                  <p className="card-text">📍 Location: {room.location}</p>
                  <p className="card-text">💰 Rent per day: ₹{room.rent_per_day}</p>
                  <p className="card-text">📞 phone: {room.phone_number}</p>
                  <p className="card-text">👥 Max Capacity: {room.max_count}</p>
                  <p className="card-text">🏨 Type: {room.type}</p>
                  <p className="card-text flex-grow-1">{room.description}</p>

                  <div className="mt-auto d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={() => handleBookNow(room)}>Book Now</button>
                    <button className="btn btn-primary" onClick={() => handleViewDetails(room)}>View Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRoom && (
        <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedRoom.hotel_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
              {selectedRoom.image_urls.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={`http://localhost:7000${image}`}
                    alt={`Slide ${index + 1}`}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="mt-3">
              <h5>Description</h5>
              <p>{selectedRoom.description}</p>
              <p><strong>📍 Location:</strong> {selectedRoom.location}</p>
              <p><strong>💰 Rent per day:</strong> ₹{selectedRoom.rent_per_day}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleBookNow(selectedRoom)}>
              Book Now
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {selectedRoom && (
        <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} size="md" centered>
          <Modal.Header closeButton>
            <Modal.Title>Booking Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card p-3">
              <h5>{selectedRoom.hotel_name}</h5>
              <label><strong>📆 From Date:</strong></label>
              <input
                type="date"
                className="form-control mb-2"
                value={selectedDates[selectedRoom._id]?.fromDate || ""}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => handleDateChange(selectedRoom._id, "fromDate", e.target.value)}
              />
              
              <label><strong>📆 To Date:</strong></label>
              <input
                type="date"
                className="form-control mb-2"
                value={selectedDates[selectedRoom._id]?.toDate || ""}
                min={selectedDates[selectedRoom._id]?.fromDate || new Date().toISOString().split("T")[0]}
                onChange={(e) => handleDateChange(selectedRoom._id, "toDate", e.target.value)}
              />
               <p><strong>💰 Rent per day:</strong> ₹{selectedRoom.rent_per_day}</p>
               <p><strong>💰 Max Capacity:</strong> ₹{selectedRoom.max_count}</p>
              
          
              <p><strong>💵 Total Amount:</strong> ₹{totalAmount}</p>
          
              {dateError && <Alert variant="danger">{dateError}</Alert>}

              {/* <button className="btn btn-success w-100" onClick={handleBooking}>
                Pay Now
              </button> */}
              <div>
      <h2>Total Amount: ₹{totalAmount}</h2>
      <Button onClick={()=>handleBooking()} className="btn btn-success">
        Pay with Stripe
      </Button>
    </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Homescreen;

