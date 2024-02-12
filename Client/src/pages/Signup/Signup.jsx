import { useEffect, useRef, useState } from "react";
import "./Signup.css";
import { NavLink, useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/api/auth/signup";

const USER_RGX = /^^[\w\s_0-9]{4,}$/;
const EMAL_RGX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const PASS_RGX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@%])[A-Za-z\d$#@%]{8,}$/;

const Signup = () => {
  // Start INPUTS DATA

  // handle user name
  const [userName, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(true);
  // handle user name

  // handle password
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  // handle password

  // handle email
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  // handle email

  // End INPUTS DATA

  // Start Handle error and loading states
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, isLoading] = useState(false);
  // End Handle error and loading states

  // Start REFS
  const userRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const submitButtonRef = useRef(null);
  const signWitGoogleButtonRef = useRef(null);
  // End REFS

  // handle navigation
  const navigate = useNavigate();

  // foucs on user name input after loading the page
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Start Handle validation of input data
  useEffect(() => {
    const match = USER_RGX.test(userName);
    setValidUserName(match);
  }, [userName, validUserName]);

  useEffect(() => {
    const match = PASS_RGX.test(password);
    setValidPassword(match);
  }, [password, validPassword]);

  useEffect(() => {
    const match = EMAL_RGX.test(email);
    setValidEmail(match);
  }, [email, validEmail]);
  // End Handle validation of input data

  function validation(name, email, password) {
    if (!name || !email || !password) {
      return false;
    } else {
      if (!validUserName) {
        setValidUserName(false);
        userRef.current.focus();
        return false;
      }
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

    if (!validation(userName, email, password)) {
      return;
    }
    const newUser = {
      username: userName,
      email,
      password,
    };
    // SEND DATA TO SERVER

    isLoading(true);

    const addNewUser = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await addNewUser.json();

    isLoading(false);
    // SEND DATA TO SERVER

    if (data.status !== "success") {
      setErrorStatus(true);
      setErrorMessage(data.message);
      return;
    } else {
      navigate("/");
    }
  };

  // Loading Message
  if (loading) {
    return (
      <p
        className="text-center
      fw-bold fs-1"
      >
        Loading...
      </p>
    );
  }

  // Our Application
  return (
    <div className="signup mt-5">
      <div className="container">
        <form onSubmit={handleSubmit} action="">
          <h2 className="title text-center">sign up</h2>

          {/* Error Message */}
          {errorStatus && userName && email && password && (
            <p className="text-danger fs-2 text-center fw-bold text-capitalize">
              {errorMessage}
            </p>
          )}

          {/* UserName */}
          <input
            type="text"
            id="username"
            name="name"
            required
            placeholder="user name"
            ref={userRef}
            onChange={(e) => {
              setErrorStatus(true);
              setUserName(e.target.value);
            }}
          />
          {!validUserName && userName && (
            <p className="fw-bold m-0">
              Username must have at least 4 characters long.
            </p>
          )}

          {/* Email  */}
          <input
            type="email"
            name="useremail"
            id="email"
            required
            ref={emailRef}
            placeholder="email address"
            onChange={(e) => {
              setErrorStatus(true);
              setEmail(e.target.value);
            }}
          />
          {!validEmail && email && (
            <p className="fw-bold m-0">Enter a valid email address</p>
          )}

          {/* Password  */}
          <input
            type="password"
            name="user-password"
            id="password"
            required
            ref={passwordRef}
            placeholder="password"
            onChange={(e) => {
              setErrorStatus(true);
              setPassword(e.target.value);
            }}
          />
          {!validPassword && password && (
            <p className="fw-bold m-0">
              password has at least 8 characters, and must include: a lowercase
              letter, an uppercase letter, a number, and a special character.
              Allowed specila characters:
              <span className="mx-1">@</span>
              <span className="mx-1">$</span>
              <span className="mx-1">%</span>
              <span className="mx-1">#</span>
            </p>
          )}

          {/* Sign up button */}
          <button className="btn btn-dark" ref={submitButtonRef}>
            sing up
          </button>

          {/* Sign up wiht Google button */}
          <button
            type="button"
            className="btn btn-danger"
            ref={signWitGoogleButtonRef}
          >
            sing up with google
          </button>

          {/* Don't have an account */}
          <p>
            <span className="me-1">do not have an account?</span>
            <NavLink to="/signin">sign in</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

/**
 * 
 * userNameFcous === false &&
  emailFcous === false &&
  passwordFcous === false &&
 */
