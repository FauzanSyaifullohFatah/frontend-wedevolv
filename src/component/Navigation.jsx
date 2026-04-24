import { useAuth } from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/api";

function Navigation() {
  const { authedUser, setAuthedUser } = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    setAuthedUser(null);
    navigate("/");
  }

  return(
    <>
      {authedUser
        ? (
          <>
            <li>
              <NavLink to={"/dashboard"}>
                <i className="fa fa-th-large"></i>Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={"/explore"}>
                <i className="fa-solid fa-laptop-code"></i>Explore
              </NavLink>
            </li>
            <li>
              <button id="nav-logout" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i>
                <p>Logout</p>
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to={"/"}>
                <i className="fa-solid fa-house"></i>Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/explore"}>
                <i className="fa-solid fa-laptop-code"></i>Explore
              </NavLink>
            </li>
            <li>
              <NavLink to={"/aboutus"}>
                <i className="fa fa-info-circle"></i>About
              </NavLink>
            </li>
            <li>
              <NavLink to={"/login"}>
                <i className="fa fa-info-circle"></i>Login
              </NavLink>
            </li>
          </>
        )
      }
    </>
  )
}

export default Navigation;