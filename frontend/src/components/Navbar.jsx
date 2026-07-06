import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../api/authApi";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      localStorage.removeItem("token");
      setUser(null);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          fontSize: "22px",
          fontWeight: "bold",
          color: "#222",
        }}
      >
        Basic Social App
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link to="/">Home</Link>

        {user && (
          <>
            <Link to="/create">Create Post</Link>

            <span>{user.name}</span>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {!user && (
          <Link to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;