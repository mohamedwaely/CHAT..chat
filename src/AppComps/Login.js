
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import './style.css'

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div id="wrapper">
    <div id="form">
        <h1 id="logo">CHAT..chat</h1>
        <span id="title">Login</span>
        <form id="indiv" onSubmit={handleSubmit}>
            <input id="email" placeholder="Email" type="email"></input>
            <input id="password" type="password" placeholder="Password"></input>
            <button className="R">Login</button>
            {err&&<span>Something Went Wrong</span>}
        </form>
        <p>Do You Not Have Account? <Link to="/signup">SignUp</Link></p> 
    </div>
</div>
  );
};

export default Login;