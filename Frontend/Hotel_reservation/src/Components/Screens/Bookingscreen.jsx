// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Button, Carousel, Modal, Form } from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const Bookingscreen = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
//   const [totalDays, setTotalDays] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await axios.get("http://localhost:7000/api/rooms/getallrooms");
//         setRooms(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchRooms();
//   }, []);

//   const handleBookNow = (room) => {
//     setSelectedRoom(room);
//     setShowBookingModal(true);
//   };

//   const handleDateChange = (dates) => {
//     const [start, end] = dates;
//     setFromDate(start);
//     setToDate(end);

//     if (start && end) {
//       const diffTime = Math.abs(end - start);
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       setTotalDays(diffDays);
//       setTotalAmount(diffDays * selectedRoom.rent_per_day);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center">Book Your Stay</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-danger">Error: {error}</p>}

//       <div className="row">
//         {rooms.map((room) => (
//           <div key={room._id} className="col-md-4 mb-4">
//             <div className="card h-100 d-flex flex-column shadow">
//               {room.image_urls.length > 0 && (
//                 <img
//                   src={room.image_urls[0]}
//                   className="card-img-top"
//                   alt={room.hotel_name}
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//               )}
//               <div className="card-body d-flex flex-column">
//                 <h5 className="card-title">{room.hotel_name}</h5>
//                 <p className="card-text">📍 Location: {room.location}</p>
//                 <p className="card-text">💰 Rent per day: ₹{room.rent_per_day}</p>
//                 <p className="card-text">👥 Max Capacity: {room.max_count}</p>
//                 <p className="card-text flex-grow-1">{room.description}</p>
//                 <button className="btn btn-success mt-auto" onClick={() => handleBookNow(room)}>
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedRoom && (
//         <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Book {selectedRoom.hotel_name}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group className="mb-3">
//                 <Form.Label>🏨 Hotel Name</Form.Label>
//                 <Form.Control type="text" value={selectedRoom.hotel_name} disabled />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>📅 Select Dates</Form.Label>
//                 <DatePicker
//                   selected={fromDate}
//                   onChange={handleDateChange}
//                   startDate={fromDate}
//                   endDate={toDate}
//                   selectsRange
//                   inline
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>👥 Max Capacity</Form.Label>
//                 <Form.Control type="number" value={selectedRoom.max_count} disabled />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>💰 Rent Per Day</Form.Label>
//                 <Form.Control type="text" value={`₹${selectedRoom.rent_per_day}`} disabled />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>📆 Total Days</Form.Label>
//                 <Form.Control type="text" value={totalDays} disabled />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>💵 Total Amount</Form.Label>
//                 <Form.Control type="text" value={`₹${totalAmount}`} disabled />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
//               Close
//             </Button>
//             <Button variant="success">Pay Now</Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Bookingscreen;
