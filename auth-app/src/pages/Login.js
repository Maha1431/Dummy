import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://65.0.29.192:5000/api/auth/google";
  };

  const handleAppleLogin = () => {
    window.location.href = "http://65.0.29.192:5000/api/auth/apple";
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {success && <div className="success-message">Login Successful!</div>}
        {error && <div className="error-message">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        <button type="submit">
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="divider">OR</div>

        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        <button
          type="button"
          className="apple-btn"
          onClick={handleAppleLogin}
        >
          Continue with Apple
        </button>

        <p className="redirect-text">
          Don’t have an account? <Link to="/">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
