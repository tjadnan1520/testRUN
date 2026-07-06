import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { loginWithGoogle, getCurrentUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (!token) return;

    localStorage.setItem("token", token);

    const loadUser = async () => {
      try {
        const response = await getCurrentUser();

        setUser(response.user);

        navigate("/", { replace: true });
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
      }
    };

    loadUser();
  }, [location, navigate, setUser]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "40px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h1>Basic Social App</h1>

        <p>Login to continue</p>

        <button
          onClick={loginWithGoogle}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;