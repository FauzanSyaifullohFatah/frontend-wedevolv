import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPortfolio } from "../../utils/api";
import { portfolioProgress } from "../../utils";

import PortfolioComingSoon from "./PortfolioComingSoon";
import Home from "../../component/Home";
import ProjectList from "../../component/ProjectList";
import CertificateList from "../../component/CertificateList";
import SkillList from "../../component/SkillList";
import Footer from "../../component/Footer";

import "../../style/portfolio.css";
import GLobalLoading from "../../component/GlobalLoading";
import PageNotFound from "../notFound";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../../hooks/useLanguage";

function PortfolioPage() {
  const { lang } = useLanguage();
  const { username } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allSkill, setAllSkill] = useState([]);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await getPortfolio(username);

        if (!res) {
          setData(null);
          return;
        }

        const safeData = {
          user: res?.user || {},
          projects: res?.projects || [],
          certificates: res?.certificates || [],
        };

        setData(safeData);

        const techProj = [
          ...new Set(
            safeData.projects
              .flatMap(p => (p.tech || "").split(","))
              .map(t => t.trim().toUpperCase())
              .filter(Boolean)
          )
        ];

        const skillsCert = [
          ...new Set(
            safeData.certificates
              .flatMap(c => (c.skills || "").split(","))
              .map(s => s.trim().toUpperCase())
              .filter(Boolean)
          )
        ];

        setAllSkill([...new Set([...techProj, ...skillsCert])]);

      } catch (err) {
        console.error("Fetch portfolio error:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  useEffect(() => {
    if (!data?.user) return;

    const resultProgress = portfolioProgress({
      profilePict: data.user.image,
      isVerified: data.user.is_verified,
      role: data.user.role,
      country: data.user.country,
      phoneNumber: data.user.phone,
      whatsapp: data.user.whatsapp,
      linkedin: data.user.linkedin,
      github: data.user.github,
      summary: data.user.bio,
      projectCount: data.projects.length || 0,
      certificateCount: data.certificates.length || 0,
    });

    setProgress(resultProgress.progress);
  }, [data]);

  const isLoading = loading;
  const isNotFound = !loading && !data;
  const isReady = data && progress !== null;

  const canViewPortfolio =
    isReady &&
    progress === 100 &&
    data?.user?.is_public_portfolio;

  if (isLoading) return <GLobalLoading />;

  if (isNotFound) return <PageNotFound />;

  if (!isReady) return <GLobalLoading />;

  if (!canViewPortfolio) return <PortfolioComingSoon />;

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{`${data.user.fullname} | Wedevolv`}</title>
        <meta name="description" content={data.user.bio || `Developer portfolio of ${data.user.fullname}`} />
        <link rel="canonical" href={`https://wedevolv.com/${username}`} />

        <link rel="alternate" hrefLang="en" href={`https://wedevolv.com/${username}?lang=en`} />
        <link rel="alternate" hrefLang="id" href={`https://wedevolv.com/${username}?lang=id`} />
        <link rel="alternate" hrefLang="x-default" href={`https://wedevolv.com/${username}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`https://wedevolv.com/${username}`} />
        <meta property="og:title" content={`${data.user.fullname} - Portfolio`} />
        <meta property="og:description" content={data.user.bio} />
        <meta property="og:image" content={data.user.image || "https://wedevolv.com/wedevolv-fav-icon.svg"} />

        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="portfolio-container">

        <Home user={data.user} />

        {data.projects?.some(project => project.is_visible) && (
          <section className="portfolio-project" id="projects">
            <h2><i className="fa fa-laptop-code"></i> Projects</h2>
            <ProjectList
              projects={data.projects || []}
              onlyVisible={true}
            />
          </section>
        )}

        {data.certificates?.some(certificate => certificate.is_visible) && (
          <section className="portfolio-certificate" id="certificate">
            <h2><i className="fa-solid fa-award"></i> CERTIFICATE</h2>
            <CertificateList
              certificates={data.certificates || []}
              onlyVisible={true}
            />
          </section>
        )}

        <section className="portfolio-skill" id="skills">
          <h2><i className="fa-solid fa-code"></i> SKILLS</h2>

          <SkillList allSkill={allSkill || []} />
        </section>

        <Footer />
      </div>
    </>
  );
}

export default PortfolioPage;