import { useState, useEffect } from "react";
import { getAllUsers } from "../../../utils/api";
import { formatDateIn } from "../../../utils/index";
import { Helmet } from "react-helmet-async";

function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.users);
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div style={{ color: "white" }}>Memuat data...</div>;

  return (
    <>
      <Helmet>
        <title>Dashboard - Admin</title>
      </Helmet>
      
      <div className="dashboard-admin">
        <table style={{ color: "white", width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>NO</th>
              <th>Username</th>
              <th>Email</th>
              <th>Email Verified</th>
              <th>Status Admin</th>
              <th>Date Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.is_verified ? (
                    <i className="fa fa-check-square" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fa fa-window-close" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {user.is_superuser ? (
                    <i className="fa fa-check-square" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fa fa-window-close" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>{formatDateIn(user.date_joined)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DashboardAdmin;