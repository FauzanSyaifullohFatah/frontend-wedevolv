import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { API } from "../utils/api";
import { getImageUrl } from "../utils";
import { useLanguage } from "../hooks/useLanguage";
import { skills } from "../utils/skills";

function FormInputProject({ setShowFormProject, onProjectAdded, projectToEdit }) {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    title: projectToEdit?.title || "",
    description: projectToEdit?.description || "",
    tech: projectToEdit?.tech || "",
    link_repository: projectToEdit?.link_repository || "",
    link_demo: projectToEdit?.link_demo || "",
  })
  const inputRef = useRef();

  const [previewImage, setPreviewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreviewUrl(getImageUrl(projectToEdit?.image));
  }, [projectToEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("tech", form.tech);
      formData.append("link_repository", form.link_repository);
      formData.append("link_demo", form.link_demo);

      if (previewImage) {
        formData.append("image", previewImage);
      }

      let res;

      if (projectToEdit) {
        res = await API.patch(`/projects/${projectToEdit.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await API.post("/projects/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setForm({
          title: "",
          description: "",
          tech: "",
          link_repository: "",
          link_demo: ""
        });
        setPreviewImage(null);
        setPreviewUrl(null);
      }

      if (onProjectAdded) onProjectAdded(res.data.payload);
    } catch (err) {
      console.error(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const currentSkill = form.tech.split(",").pop().trim();

  const filteredSkills = Object.values(skills).filter((skill) =>
    skill.label.toLowerCase().includes(currentSkill.toLowerCase())
  );

  return (
    <form className="form-input-project" onSubmit={handleSubmit}>
      <div className="preview">
        <div
          className="image"
          style={{backgroundImage: previewUrl ? `url(${previewUrl})` : "none"}}
        >
          <label htmlFor="upload-image"><i className="fa fa-camera"></i></label>
        </div>
        <input
          type="file"
          id="upload-image"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <input
        type="text"
        name="title"
        placeholder={t("formProject.title")}
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder={t("formProject.description")}
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        ref={inputRef}
        type="text"
        name="tech"
        placeholder={t("formProject.techStack")}
        value={form.tech}
        onChange={handleChange}
        required
      />
      {currentSkill && filteredSkills.length > 0 && (
        <div className="list-skills">
          {filteredSkills.map((s) => (
            <div
              className="skill-item"
              key={s.label}
              onClick={() => {
                const skillsArray = form.tech
                  .split(",")
                  .map((item) => item.trim());

                skillsArray.pop();

                const newSkills = [...skillsArray, s.label];

                setForm({
                  ...form,
                  tech: `${newSkills.join(", ")}, `,
                });

                inputRef.current?.focus();
              }}
            >
              <i className={s.icon}></i>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      )}
      <input
        type="text"
        name="link_repository"
        placeholder="Link Repository Project"
        value={form.link_repository}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="link_demo"
        placeholder="Link Live Demo Project"
        value={form.link_demo}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading
          ? t("formProject.saving")
          : projectToEdit
            ? t("formProject.saveChanges")
            : t("formProject.submit")
        }
      </button>
      <button
        type="button"
        id="back"
        onClick={() => setShowFormProject(false)}
      >
        <i className="fa fa-chevron-left"></i> {t("back")}
      </button>
    </form>
  )
}

FormInputProject.propTypes = {
  setShowFormProject: PropTypes.func.isRequired,
  onProjectAdded: PropTypes.func.isRequired,
  projectToEdit: PropTypes.shape({
    user: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tech: PropTypes.string.isRequired,
    image: PropTypes.string,
    link_demo: PropTypes.string.isRequired,
    link_repository: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  })
}

export default FormInputProject;