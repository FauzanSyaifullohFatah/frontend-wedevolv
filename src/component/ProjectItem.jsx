import { formatDateIndo } from "../utils";
import PropTypes from "prop-types";
import Image from "../component/Image";
import highlightText from "../utils/highlight";
import { useLocation } from "react-router-dom";

function ProjectItem({
  projects,
  setEdit,
  deletePopup,
  projectVisible,
  isLoadingVisibility,
  showForm,
  keyword = "",
}) {
  const locationPath = useLocation().pathname;

  const filteredProjects = projects.filter((p) =>
    [p.title, p.description, p.created_at]
      .join(" ")
      .toLowerCase()
      .includes(keyword.toLowerCase())
  )

  return (
    <>
      {filteredProjects.length === 0
        ? (
          <div style={{color: "black"}}>
            <p>Tidak ada yang cocok dengan pencarian <b><q>{keyword}</q></b></p>
          </div>
        )
        : (
          filteredProjects.map((p) => (
            <article className="project-item" key={p.id}>
              <div className="side">
                <Image src={p.image} alt={p.title} />
              </div>
              <div className="side">
                <h3>{highlightText(p.title, keyword)}</h3>
                <p className="created-at">
                  {formatDateIndo(
                    highlightText(p.created_at, keyword)
                  )}
                </p>
                <p className="description-project">{highlightText(p.description, keyword)}</p>
                <div className="my-projects__button">
                  <a href={p.link_repository} target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-github"></i> Repository
                  </a>
                  <a href={p.link_demo} target="_blank" rel="noreferrer">
                    <i className="fa fa-globe"></i> Live Demo
                  </a>
                </div>
              </div>
              {locationPath === "/dashboard/projects" && (
                <div className="side">
                  <button
                    onClick={() => projectVisible(p.id, p.is_visible)}
                    className={p.is_visible ? "btn-active" : ""}
                  >
                    {isLoadingVisibility
                      ? <i className="fa fa-spinner" id="isLoadingVisible"></i>
                      : <i className="fa fa-globe"></i>
                    }
                  </button>
                  <button
                      onClick={() => {
                        setEdit(p);
                        showForm(true);
                      }}
                    >
                      <i className="fa fa-pencil-square"></i>
                  </button>
                  <button
                    onClick={() => deletePopup(p)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              )}
            </article>
          ))
        )
      }
    </>
  )
}

ProjectItem.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tech: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      link_demo: PropTypes.string.isRequired,
      link_repository: PropTypes.string.isRequired,
      is_visible: PropTypes.bool.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    })
  ),
  setEdit: PropTypes.func,
  deletePopup: PropTypes.func,
  projectVisible: PropTypes.func,
  isLoadingVisibility: PropTypes.bool,
  showForm: PropTypes.func,
  keyword: PropTypes.string,
}

export default ProjectItem;