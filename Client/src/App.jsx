import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();

  const showNavbar =
    location.pathname.includes("signin") ||
    location.pathname.includes("signIn") ||
    location.pathname.includes("signup") ||
    location.pathname.includes("signUp"); // true

  return (
    <main>
      {!showNavbar && <Navbar />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </main>
  );
}

export default App;
