import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Carousel, Spinner, Alert } from "react-bootstrap";

const Admin = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

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

  return (
    <div className="container mt-4">
      <h2 className="text-center">Hotels</h2>

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
                  <p className="card-text">👥 Max Capacity: {room.max_count}</p>
                  <p className="card-text">🏨 Type: {room.type}</p>
                  <p className="card-text flex-grow-1">{room.description}</p>

                  <div className="mt-auto text-center">
                    <button className="btn btn-primary" onClick={() => handleViewDetails(room)}>
                      View Details
                    </button>
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
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Admin;
