import { NavLink } from "react-router-dom";
const Signin = () => {
  return (
    <div className="container">
      <form action="">
        <p>
          <span>already have an account?</span>
          <NavLink to="/signup">sign up</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Signin;
