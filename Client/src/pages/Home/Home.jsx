import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const URL = `http://localhost:5000/api/users`;

const Home = () => {
  const [users, setUsers] = useState([]);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    try {
      const savedtoken = localStorage.getItem("savedToken");
      setToken(savedtoken);
      const token = savedtoken.split(" ")[1];
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      setRole(userRole);
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  const getAllUsers = async () => {
    const getUsers = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const data = await getUsers.json();

    if (data.status !== "success") {
      setErrorStatus(true);
      setErrorMessage(data.message);
      return;
    }

    setUsers(data.data.users);
  };

  return (
    <div className="home mt-5">
      <div className="container">
        <h2>Welcome to the home page!</h2>
        <p>This is a simple example of a React component.</p>

        {role === "admin" && (
          <button className="btn btn-primary" onClick={() => getAllUsers()}>
            Get All Users
          </button>
        )}

        {errorStatus && (
          <p className="text-danger fw-bold text-center">
            Error: {errorMessage}
          </p>
        )}
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <h1>User Name: {user.username}</h1>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
