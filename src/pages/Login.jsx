import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Context, server } from "../main";
import { ClipLoader } from "react-spinners";
import { ColorRing } from "react-loader-spinner";
const Login = () => {
  const { isAuthenticated, setIsAuthenticated,loading, setLoading} = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const LoginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };


  return (
    <div className="login">
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
          className="loader-style"
        >
          <ColorRing
            visible={true}
            height="250"
            width="250"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#F0F0F0", "#F0F0F0", "#F0F0F0", "#F0F0F0", "#F0F0F0"]}
            
          />
        </div>
      ) : (
        <section>
          <form onSubmit={LoginHandler}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-btn" disabled={loading} type="submit">
              Login
            </button>
            <h4>Or</h4>
            <Link to="/register" className="signUp-btn">
              Sign Up
            </Link>
          </form>
        </section>
      )}
    </div>
  );
};

export default Login;
