import Footer from "../../component/Footer";
import Home from "../../component/Home";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPortfolio } from "../../utils/api";
import PortfolioComingSoon from "./PortfolioComingSoon";
import ProjectList from "../../component/ProjectList";
import SkillList from "../../component/SkillList";
import CertificateList from "../../component/CertificateList";

import "../../style/portfolio.css";

function PortfolioPage() {
  const { username } = useParams();

  const [isPublicPortFolio, setIsPublicPortfolio] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allSkill, setAllSkill] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await getPortfolio(username);

        const safeData = {
          user: res?.user || {},
          projects: res?.projects || [],
          certificates: res?.certificates || [],
        };

        setData(safeData);
        setIsPublicPortfolio(safeData.user?.is_public_portfolio ?? false);

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

        const mergedSkills = [...new Set([...techProj, ...skillsCert])];
        setAllSkill(mergedSkills);

      } catch (err) {
        console.error("Fetch portfolio error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  useEffect(() => {
    if (data?.user?.fullname) {
      document.title = `${data.user?.fullname} | Wedevolv`;
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>User tidak ditemukan</p>;
  if (!isPublicPortFolio) return <PortfolioComingSoon />;


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