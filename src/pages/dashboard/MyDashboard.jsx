import { useEffect, useState } from "react";
import { API, getCertificates, getProjects } from "../../utils/api";
import ToggleSwitch from "../../component/ToggleSwitch";
import { useAuth } from "../../hooks/useAuth";
import SkillList from "../../component/SkillList";
import Image from "../../component/Image";

function MyDashboard(){
  const { authedUser, setAuthedUser } = useAuth();

  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [latestProject, setLatestProject] = useState([]);
  const [latestCertificate, setLatestCertificate] = useState([]);
  const [isPublicPortfolio, setIsPublicPortfolio] = useState(false);
  const [allSkill, setAllSkill] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const proj = await getProjects();
      const cert = await getCertificates()
  
      setProjects(proj);
      setCertificates(cert);
      setIsPublicPortfolio(authedUser.is_public_portfolio);
  
      const latestProject = [...proj].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
      const latestCertificate = [...cert].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  
      setLatestProject(latestProject);
      setLatestCertificate(latestCertificate);
  
      const techProj = [
        ...new Set(
          proj
            .flatMap(p => p.tech.split(","))
            .map(t => t.trim().toUpperCase())
            .filter(Boolean)
        )
      ];
      const skillsCert = [
        ...new Set(
          cert
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
    }

    fetchData();
  }, [authedUser])

  const handlePublicPortfolio = async () => {
    try {
      const res = await API.put("/profile/", {
        is_public_portfolio: !isPublicPortfolio
      });

      setIsPublicPortfolio(res.data.is_public_portfolio);
      setAuthedUser(prev => ({
        ...prev,
        is_public_portfolio: res.data.is_public_portfolio
      }));
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="my-dashboard">
      <div className="cards">
        <div className="card">
          <div className="box">
            <p>Projects</p>
            <span><i className="fa fa-file-code"></i></span>
          </div>
          <div className="box">
            <p className="count">{projects.length}</p>
            <p>Total</p>
          </div>
        </div>
        <div className="card">
          <div className="box">
            <p>Certificates</p>
            <span><i className="fa-solid fa-award"></i></span>
          </div>
          <div className="box">
            <p className="count">{certificates.length}</p>
            <p>Total</p>
          </div>
        </div>
        <div className="card">
          <div className="box">
            <p>Portfolio</p>
            <span><i className="fa-solid fa-briefcase"></i></span>
          </div>
          <div className="box">
            <p>Active</p>
            <ToggleSwitch
              condition={isPublicPortfolio}
              handleOnclick={handlePublicPortfolio}
            />
          </div>
        </div>
      </div>
      <div className="portfolio-progress">
        <p>Portfolio Progress 10%</p>
        <div className="bar"></div>
      </div>
      <div className="preview">
        <div className="box">
          <h3>Recent Update</h3>
          {latestProject
            ? <div className="project">
                <h4>{latestProject.title}</h4>
                <Image src={latestProject.image} alt={latestProject.title} />
              </div>
            : <div className="project">
                <h4>Latest Project</h4>
                <span><i className="fa fa-code"></i></span>
              </div>
          }
          {latestCertificate
            ? <div className="certificate">
                <h4>{latestCertificate.title}</h4>
                <Image src={latestCertificate.image} alt={latestCertificate.title} />
              </div>
            : <div className="certificate">
                <h4>Latest Certificate</h4>
                <span><i className="fa fa-award"></i></span>
              </div>
          }
        </div>
        <div className="box">
          <h3>Your Skills</h3>
          <SkillList allSkill={allSkill} />
        </div>
      </div>
    </div>
  )
}

export default MyDashboard;