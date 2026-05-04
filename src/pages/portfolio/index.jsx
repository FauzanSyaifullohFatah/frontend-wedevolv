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

function PortfolioPage() {
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
    if (data?.user?.fullname) {
      document.title = `${data.user.fullname} | Wedevolv`;
    }
  }, [data]);

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
    <div className="portfolio-container">

      <Home user={data.user} />

      <section className="portfolio-project" id="projects">
        <h2><i className="fa fa-laptop-code"></i> Projects</h2>
        <ProjectList projects={data.projects || []} />
      </section>

      <section className="portfolio-certificate" id="certificate">
        <h2><i className="fa-solid fa-award"></i> CERTIFICATE</h2>
        <CertificateList certificates={data.certificates || []} />
      </section>

      <section className="portfolio-skill" id="skills">
        <h2><i className="fa-solid fa-code"></i> SKILLS</h2>

        <div
          className="box-skill"
          style={{ width: `${100 * (allSkill.length || 1) + 80}px` }}
        >
          <SkillList allSkill={allSkill || []} />
          <SkillList allSkill={allSkill || []} />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PortfolioPage;