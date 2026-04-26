import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../hooks/useLanguage";

function DashboardPage(){
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { authedUser, setAuthedUser } = useAuth();

  const handleLogout = () => {
    logout();
    setAuthedUser(null);
    navigate("/");
  }

  if (!authedUser) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="dashboard-page">
      <aside>
        <div className="main-navigation">
          <h1>{authedUser.fullname}</h1>
          <NavLink to={"/dashboard/profile"}>
            <i className="fa fa-user"></i>
            <p>{authedUser.username}</p>
            {!authedUser.is_verified && (
              <span><i className="fa fa-exclamation-triangle"></i></span>
            )}
          </NavLink>
          <h2>Main navigation</h2>
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
          <h2>Settings</h2>
        </div>
        {/* <button>
          <i className="fa fa-question-circle"></i>
          <p>Forgot password</p>
        </button> */}
        <button
          id="aside-logout"
          onClick={handleLogout}>
          <i className="fa fa-sign-out"></i>
          <p>{t("logout")}</p>
        </button>
      </aside>
      <main>
        <Outlet />
      </main>
    </section>
  )
}

export default DashboardPage;