import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import { useLanguage } from "../hooks/useLanguage";

function MainNavigation() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const admin = user?.is_superuser;


  return (
    <div className="main-navigation">
      {admin
        ? (
          <>
            <h1>Admin - {user?.username}</h1>
            <NavLink>
              <i className="fa fa-th-large"></i>
              <p>Dashboard</p>
            </NavLink>
          </>
        )
        : (
          <>
            <h1>{user?.fullname}</h1>
            <NavLink to={"/dashboard/profile"}>
              <i className="fa fa-user"></i>
              <p>{user?.username}</p>
              {!user?.is_verified && (
                <span><i className="fa fa-exclamation-triangle"></i></span>
              )}
            </NavLink>
            <h2>{t("mainNavigation")}</h2>
            <NavLink to={"/dashboard"} end>
              <i className="fa fa-th-large"></i>
              <p>Dashboard</p>
            </NavLink>
            <NavLink to={"/dashboard/projects"}>
              <i className="fa fa-file-code"></i>
              <p>Projects</p>
            </NavLink>
            <NavLink to={"/dashboard/certificates"}>
              <i className="fa-solid fa-award"></i>
              <p>Certificates</p>
            </NavLink>
          </>
        )
      }
    </div>
  )
}

export default MainNavigation;