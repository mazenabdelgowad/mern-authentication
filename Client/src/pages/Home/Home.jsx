import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const url = `http://localhost:5000/api/users`;

const Home = () => {
  const [users, setUsers] = useState([]);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // validate token and get users
  const savedtoken = localStorage.getItem("savedToken");

  const token = savedtoken.split(" ")[1]; // token without "Bearer"
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;

  const getAllUsers = async () => {
    const getUsers = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: savedtoken,
      },
    });

    const data = await getUsers.json();

    // console.log(data);
    // console.log(data.data.users);

    if (data.status !== "success") {
      setErrorStatus(true);
      setErrorMessage(data.message);
      return;
    }

    setUsers(data.data.users);
  };

  // console.log(users);

  return (
    <div className="home mt-5">
      <div className="container">
        <h2>Welcome to the home page!</h2>
        <p>This is a simple example of a React component.</p>

        {userRole === "admin" && (
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
