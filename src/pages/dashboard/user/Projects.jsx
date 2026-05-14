import { useEffect, useState } from "react";
import { API, getProjects } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import MiniNavbar from "../../../component/MiniNavbar";
import FormInputProject from "../../../component/FormInputProject";
import ProjectList from "../../../component/ProjectList";
import PopupMessage from "../../../component/PopupMessage";

function MyProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [showFormProject, setShowFormProject] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [keyword, setKeyword] = useState("");

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const proj = await getProjects();
      setProjects(proj);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProjectAdded = (project) => {
    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? project : p))
      );
    } else {
      setProjects((prev) => [project, ...prev]);
    }

    setShowFormProject(false);
    setEditingProject(null);
  };

  const handleDeleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}/`);

      setProjects((prev) => prev.filter((p) => p.id !== id));
      setPopup(false);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  const handlePopupDelete = (project) => {
    setSelectedProject(project);
    setPopup(true);
  };

  const handleProjectVisible = async (id, currentValue) => {
    try {
      setLoadingId(id);

      await API.patch(`/projects/${id}/`, {
        is_visible: !currentValue,
      });

      setProjects((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, is_visible: !currentValue }
            : item
        )
      );
    } catch (err) {
      console.error("Gagal update visibility:", err.response?.data || err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Projects - {user?.fullname}</title>
      </Helmet>

      <div className="my-projects">
        {!(showFormProject || popup) && (
          <>
            <MiniNavbar
              variant={"Projects"}
              keyword={keyword}
              setKeyword={setKeyword}
              onAdd={() => {
                setEditingProject(null);
                setShowFormProject(true);
              }}
            />

            <ProjectList
              projects={projects}
              setEdit={setEditingProject}
              deletePopup={handlePopupDelete}
              projectVisible={handleProjectVisible}
              loadingId={loadingId}
              showForm={setShowFormProject}
              isLoading={isLoading}
              keyword={keyword}
            />
          </>
        )}

        {popup && (
          <PopupMessage
            setPopup={setPopup}
            data={selectedProject}
            onDelete={() => handleDeleteProject(selectedProject.id)}
          />
        )}

        {showFormProject && (
          <FormInputProject
            setShowFormProject={setShowFormProject}
            onProjectAdded={handleProjectAdded}
            projectToEdit={editingProject}
          />
        )}
      </div>
    </>
  );
}

export default MyProjects;