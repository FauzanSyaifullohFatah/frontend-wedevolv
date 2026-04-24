import { getSkills } from "../utils/skills"
import PropTypes from "prop-types";

function SkillList({ allSkill }) {
  const result = getSkills(allSkill);

  return (
    <div className="skill-list">
      {result.length === 0 
        ? <div className="empty-skills">
            <span>
              <i className="fa fa-info-circle"></i>
            </span>
            <p>Mulai tambahkan project atau sertifikat untuk menampilkan keahlian Anda.</p>
          </div>
        : result.map((skills) => (
            <div className="skill-item" key={skills.label}>
              <span>
                <i className={skills.icon}></i>
                </span>
                <p>{skills.label}</p>
            </div>
          ))
      }
    </div>
  )
}

SkillList.propTypes = {
  allSkill: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default SkillList;