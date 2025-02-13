import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const HotelBooking = () => {
  const { hotelId } = useParams(); // Get hotelId from URL
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("logintoken");
  const decoded = jwtDecode(token);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/booking/hotel/${decoded.name}`);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [hotelId]);


  

  const sendEmail = async (email, name) => {
    try {
      const res = await axios.post("http://localhost:7000/api/send-email", { email, name });
      alert(res.data.message);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div>
      <h2>Hotel Bookings</h2>
      <Link to="/Hotel" className="btn btn-secondary">Back to Dashboard</Link>
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Email</th>
              <th>Action</th> {/* New column for Email Button */}
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.user.name}</td>
                  <td>{booking.totalPrice}</td>
                  <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                  <td>{booking.user.email}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => sendEmail(booking.user.email, booking.user.name)}
                    >
                      Send Email
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HotelBooking;
