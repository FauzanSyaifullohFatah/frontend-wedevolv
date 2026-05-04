import { Link } from "react-router-dom";
import Footer from "../../component/Footer";
import { useLanguage } from "../../hooks/useLanguage";

function PageNotFound() {
  const { t } = useLanguage();

  return (
    <>
      <section className="not-found-page">
        <div className="icon">
          <i className="fa-solid fa-ghost"></i>
          <p>404</p>
        </div>
        <h1>{t("notFoundPage.title")}</h1>
        <p>{t("notFoundPage.description")}</p>
        <Link to="/">{t("notFoundPage.button")}</Link>
      </section>
      <Footer />
    </>
  )
}

export default PageNotFound;