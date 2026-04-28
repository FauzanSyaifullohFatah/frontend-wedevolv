import Footer from "../../component/Footer";
import { useLanguage } from "../../hooks/useLanguage";

function PortfolioComingSoon(){
  const { t } = useLanguage();

  return (
    <>
      <article className="portfolio-coming-soon">
        <span><i className="fa-solid fa-briefcase"></i></span>
        <h1>{t("portfolioComingSoon.title")}</h1>
      </article>
      <Footer />
    </>
  )
}

export default PortfolioComingSoon;