import ProjectItem from "./ProjectItem";
import PropTypes from "prop-types";

function ProjectList({
  projects,
  setEdit,
  deletePopup,
  projectVisible,
  isLoadingVisibility,
  showForm,
  isLoading,
  keyword,
}) {
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
        <p>Kamu belum menambahkan projek</p>
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
        isLoadingVisibility={isLoadingVisibility}
        showForm={showForm}
        keyword={keyword}
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
  isLoading: PropTypes.bool,
  keyword: PropTypes.string,
}

export default ProjectList;