import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPortfolio } from "../../utils/api";
import { getImageUrl, portfolioProgress } from "../../utils";

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
  const { lang, t } = useLanguage();
  const { username } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allSkill, setAllSkill] = useState([]);
  const [progress, setProgress] = useState(null);
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [linkPreviewImage, setLinkPreviewImage] = useState("");

  const safeT = typeof t === 'function' ? t : (key) => key;

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

        const techProj = [...new Set(safeData.projects.flatMap(p => (p.tech || "").split(",")).map(t => t.trim().toUpperCase()).filter(Boolean))];
        const skillsCert = [...new Set(safeData.certificates.flatMap(c => (c.skills || "").split(",")).map(s => s.trim().toUpperCase()).filter(Boolean))];

        setAllSkill([...new Set([...techProj, ...skillsCert])]);
      } catch (err) {
        console.error("Fetch portfolio error:", err);
        setData(null);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    fetchPortfolio();
  }, [username]);

  useEffect(() => {
    if (!data?.user || typeof safeT !== 'function') return;

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
      projectCount: data.projects?.length || 0,
      certificateCount: data.certificates?.length || 0,
      t: safeT
    });

    setProgress(resultProgress.progress);
  }, [data, safeT]);

  const handlePreviewImage = (url) => {
    if (typeof getImageUrl === 'function') {
        setLinkPreviewImage(getImageUrl(url));
        setShowPreviewImage(true);
    }
  }

  if (loading) return <GLobalLoading />;
  if (!data) return <PageNotFound />;
  
  if (progress === null) return <GLobalLoading />;

  const isPublic = data?.user?.is_public_portfolio;
  const isComplete = progress === 100;

  if (!isPublic || !isComplete) {
    return <PortfolioComingSoon progress={progress} />;
  }

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{`${data.user.fullname || 'Portfolio'} | Wedevolv`}</title>
        <meta name="description" content={data.user.bio || "Developer portfolio"} />
      </Helmet>
      
      <main className="portfolio-container">
        <Home user={data.user} />

        {data.projects?.some(p => p.is_visible) && (
          <section className="portfolio-project" id="projects">
            <h2><i className="fa fa-laptop-code"></i> Projects</h2>
            <ProjectList projects={data.projects} onlyVisible={true} onClick={handlePreviewImage} />
          </section>
        )}

        {data.certificates?.some(c => c.is_visible) && (
          <section className="portfolio-certificate" id="certificate">
            <h2><i className="fa-solid fa-award"></i> CERTIFICATE</h2>
            <CertificateList certificates={data.certificates} onlyVisible={true} onClick={handlePreviewImage} />
          </section>
        )}

        <section className="portfolio-skill" id="skills">
          <h2><i className="fa-solid fa-code"></i> SKILLS</h2>
          <SkillList allSkill={allSkill} />
        </section>

        {showPreviewImage && (
          <div className="preview-image">
            <img src={linkPreviewImage} alt="Preview" />
            <button onClick={() => setShowPreviewImage(false)}>
              <i className="fa fa-chevron-left"></i> {safeT("back")}
            </button>
          </div>
        )}

        <Footer />
      </main>
    </>
  );
}

export default PortfolioPage;