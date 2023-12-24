import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loading,setLoading} = useContext(Context);
  const navigate = useNavigate();
  const RegisterHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/user/register`,
        {
          name,
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
      setLoading(false);
      navigate("/");
      } catch (error) {
      toast.error(error.response.data.message);
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
          <form onSubmit={RegisterHandler}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              required
            />
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
            <button disabled={loading} type="submit" className="login-btn">
              Sign Up
            </button>
            <h4>Or</h4>
            <Link to="/" className="signUp-btn">
              Log In
            </Link>
          </form>
        </section>
      )}
    </div>
  );
};

export default Register;
