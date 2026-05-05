import { useLanguage } from "../../hooks/useLanguage";
import SEO from "../../component/SEO";
import Footer from "../../component/Footer";

function AboutUs() {
  const { t } = useLanguage();

  return (
    <>
      <SEO title={t("aboutPage.metaTitle")} description={t("aboutPage.metaDescription")} />

      <section className="about-container">
        <div className="hero">
          <span><i className="fa fa-info-circle"></i></span>
          <h1>{t("aboutPage.hero.title")}</h1>
          <p className="about-intro">{t("aboutPage.hero.description")}</p>
        </div>
        <div className="about-wrapper">
          <div className="about-section">
            <h2>{t("aboutPage.mission.title")}</h2>
            <p>{t("aboutPage.mission.description")}</p>
          </div>

          <div className="about-section">
          <h2>{t("aboutPage.vision.title")}</h2>
            <p>{t("aboutPage.vision.description")}</p>
          </div>

          <div className="about-section">
            <h2>{t("aboutPage.offer.title")}</h2>
            <ul>
              <li>{t("aboutPage.offer.items.item1")}</li>
              <li>{t("aboutPage.offer.items.item2")}</li>
              <li>{t("aboutPage.offer.items.item3")}</li>
              <li>{t("aboutPage.offer.items.item4")}</li>
            </ul>
          </div>

          <div className="about-section">
            <h2>{t("aboutPage.why.title")}</h2>
            <p>{t("aboutPage.why.description")}</p>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default AboutUs;