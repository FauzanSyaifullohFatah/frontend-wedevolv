import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../hooks/useLanguage";
import MainNavigation from "../../component/MainNavigation";

function DashboardPage(){
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="dashboard-page">
      <aside>
        <MainNavigation />
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