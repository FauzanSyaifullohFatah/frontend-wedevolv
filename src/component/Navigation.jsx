import { useAuth } from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/api";
import { useLanguage } from "../hooks/useLanguage";

function Navigation() {
  const { user, setUser } = useAuth();
  const { t } = useLanguage();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return(
    <>
      {user
        ? (
          <>
            <li>
              <NavLink to={"/dashboard"}>
                <i className="fa fa-th-large"></i>
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li>
              <button id="nav-logout" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i>
                <p>{t("logout")}</p>
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to={"/"}>
                <i className="fa-solid fa-house"></i>
                <p>Home</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/about"}>
                <i className="fa fa-info-circle"></i>
                <p>{t("header.about")}</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/login"}>
                <i className="fa fa-sign-in"></i>
                <p>{t("login")}</p>
              </NavLink>
            </li>
          </>
        )
      }
    </>
  )
}

export default Navigation;