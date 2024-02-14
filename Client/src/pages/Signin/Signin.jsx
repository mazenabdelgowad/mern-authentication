import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

const URL = "http://localhost:5000/api/auth/signin";
const EMAIL_RGX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASS_RGX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@%])[A-Za-z\d$#@%]{8,}$/;

const Signin = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const emailRef = useRef(null);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const passwordRef = useRef(null);

  // Error message
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Error message

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const match = PASS_RGX.test(password);
    setValidPassword(match);
  }, [password, validPassword]);

  useEffect(() => {
    const match = EMAIL_RGX.test(email);
    setValidEmail(match);
  }, [email, validEmail]);

  function validation(email, password) {
    if (!email || !password) {
      return false;
    } else {
      if (!validEmail) {
        setValidEmail(false);
        emailRef.current.focus();
        return false;
      }
      if (!validPassword) {
        setValidPassword(false);
        passwordRef.current.focus();
        return false;
      }
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensuring that user has inputed the required fields
    if (!validation(email, password)) return;

    // SENDING DATA OT SERVER
    const user = { email, password };
    setIsLoading(true);
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    setIsLoading(false);

    // SENDING DATA OT SERVER
    // CHECK THE RESPONSE STATUS
    if (data.status !== "success") {
      setErrorStatus(true);
      setErrorMessage(data.message);
      return;
    }
    localStorage.setItem("savedToken", "Bearer " + data.data.token);
    navigate("/");
  };

  if (isLoading === true) {
    return <p className="text-center fw-bold fs1">Loading...</p>;
  }

  return (
    <div className="sign-page mt-5">
      <div className="container">
        <h1 className="title text-center mb-4">welcome back</h1>
        {errorStatus && (
          <p className="text-danger fw-bold text-center">{errorMessage}</p>
        )}
        <form action="" onSubmit={handleSubmit}>
          <input
            type="email"
            name="user-email"
            id="email"
            placeholder="Email"
            required
            autoComplete="on"
            ref={emailRef}
            value={email}
            onChange={(e) => {
              setErrorStatus(false);
              setEmail(e.target.value);
            }}
          />

          <input
            type="password"
            name="user-password"
            id="password"
            placeholder="Password"
            required
            autoComplete="on"
            ref={passwordRef}
            value={password}
            onChange={(e) => {
              setErrorStatus(false);
              setPassword(e.target.value);
            }}
          />

          <button className="btn btn-primary">Sign in</button>

          <p>
            <span className="fw-bold me-1">Already have an account?</span>
            <NavLink to="/signup">sign up</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
