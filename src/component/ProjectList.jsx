import { useLanguage } from "../hooks/useLanguage";
import ProjectItem from "./ProjectItem";
import PropTypes from "prop-types";

function ProjectList({
  projects,
  setEdit,
  deletePopup,
  projectVisible,
  loadingId,
  showForm,
  isLoading,
  keyword,
  onlyVisible,
  onClick,
}) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="is-loading">
        <span></span>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <span>
          <i className="fa fa-folder-plus"></i>
        </span>
        <p>{t("emptyProject")}</p>
      </div>
    );
  }

  return (
    <div className="project-list">
      <ProjectItem
        projects={projects}
        setEdit={setEdit}
        deletePopup={deletePopup}
        projectVisible={projectVisible}
        loadingId={loadingId}
        showForm={showForm}
        keyword={keyword}
        onlyVisible={onlyVisible}
        onClick={onClick}
      />
    </div>
  );
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tech: PropTypes.string.isRequired,
      image: PropTypes.string,
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
  loadingId: PropTypes.number,
  showForm: PropTypes.func,
  isLoading: PropTypes.bool,
  keyword: PropTypes.string,
  onlyVisible: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ProjectList;