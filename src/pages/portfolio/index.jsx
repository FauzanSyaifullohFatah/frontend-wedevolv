import Footer from "../../component/Footer";
import Home from "../../component/Home";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPortfolio } from "../../utils/api";
import PortfolioComingSoon from "./PortfolioComingSoon";
import ProjectList from "../../component/ProjectList";
import SkillList from "../../component/SkillList";

import "../../style/portfolio.css";
import CertificateList from "../../component/CertificateList";

function PortfolioPage(){
  const { username } = useParams();

  const [isPublicPortFolio, setIsPublicPortfolio] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allSkill, setAllSkill] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const dataPortfolio = await getPortfolio(username);
        setData(dataPortfolio);
        setIsPublicPortfolio(dataPortfolio.user.is_public_portfolio);
        const techProj = [
          ...new Set(
            dataPortfolio.projects
              .flatMap(p => p.tech.split(","))
              .map(t => t.trim().toUpperCase())
              .filter(Boolean)
          )
        ];
        const skillsCert = [
          ...new Set(
            dataPortfolio.certificates
              .flatMap(c => c.skills.split(","))
              .map(s => s.trim().toUpperCase())
              .filter(Boolean)
          )
        ]
        const allSkill = [
          ...new Set([
            ...techProj,
            ...skillsCert
          ])
        ];
        setAllSkill(allSkill);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  useEffect(() => {
    if (data) {
      document.title = `${data.user.fullname} | Wedevolv`;
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (!isPublicPortFolio) return <PortfolioComingSoon />;
  if (!data) return <p>User tidak ditemukan</p>;

  return (
    <>
      <Home user={data.user} />
      <section id="projects">
        <h2><i className="fa fa-laptop-code"></i> Projects</h2>
        <ProjectList projects={data.projects} />
      </section>

      <section id="skills">
        <h2><i className="fa-solid fa-code"></i> SKILLS</h2>
        <SkillList allSkill={allSkill} />
      </section>
      <section id="certificate">
        <h2><i className="fa-solid fa-award"></i> CERTIFICATE</h2>
        <CertificateList certificates={data.certificates} />
      </section>
      <Footer />
    </>
  )
}

export default PortfolioPage;