import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../hooks/useLanguage";
import Logo from "../../component/Logo";
import Footer from "../../component/Footer";
import SEO from "../../component/SEO";

function HomePage(){
  const { user } = useAuth();
  const { t } = useLanguage();

  if (user) {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <>
      <SEO title={t("homePage.metaTitle")} description={t("homePage.metaDescription")} />
      
      <section className="home-page">
        <div className="hero">
          <Logo />
          <h1>Developer Portfolio Builder</h1>
          <p>{t("hero.description")}</p>
          <div className="link-button">
            <Link to="/register">{t("hero.cta")}</Link>
            <Link to="/login">{t("login")}</Link>
          </div>
        </div>
        <div className="fitur">
          <div className="card">
            <span><i className="fa fa-list-alt"></i></span>
            <p>{t("homePage.fitur1")}</p>
          </div>
          <div className="card">
            <span><i className="fa fa-address-card"></i></span>
            <p>{t("homePage.fitur2")}</p>
          </div>
          <div className="card">
            <span><i className="fa-solid fa-briefcase"></i></span>
            <p>{t("homePage.fitur3")}</p>
          </div>
          <div className="card">
            <span><i className="fa fa-search"></i></span>
            <p>{t("homePage.fitur4")}</p>
          </div>
          <div className="card">
            <span><i className="fa fa-window-restore"></i></span>
            <p>{t("homePage.fitur5")}</p>
          </div>
          <div className="card">
            <span><i className="fa-solid fa-briefcase"></i></span>
            <p>{t("homePage.fitur6")}</p>
          </div>
        </div>
        <Footer />
      </section>
    </>
  )
}

export default HomePage;