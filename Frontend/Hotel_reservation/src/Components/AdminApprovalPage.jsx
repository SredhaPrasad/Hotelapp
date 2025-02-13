import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminApprovalPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:7000/admin/hotels");
      setHotels(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching hotels");
      setLoading(false);
    }
  };

  const approveHotel = async (hotelId) => {
    try {
      await axios.put(`http://localhost:7000/admin/approve/${hotelId}`);
      alert("Hotel approved successfully!");
      fetchHotels(); // Refresh list after approval
    } catch (err) {
      alert("Failed to approve hotel");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Approval Page</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel._id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={styles.td}>{hotel.name}</td>
              <td style={styles.td}>{hotel.email}</td>
              <td style={styles.td}>
                {hotel.isApproved ? (
                  <span style={{ color: "green", fontWeight: "bold" }}>Approved</span>
                ) : (
                  <span style={{ color: "red", fontWeight: "bold" }}>Pending</span>
                )}
              </td>
              <td style={styles.td}>
                {!hotel.isApproved && (
                  <button style={styles.button} onClick={() => approveHotel(hotel._id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// CSS Styles
const styles = {
  th: {
    padding: "12px",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "10px",
  },
  button: {
    backgroundColor: "green",
    color: "white",
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
  },
};

export default AdminApprovalPage;
