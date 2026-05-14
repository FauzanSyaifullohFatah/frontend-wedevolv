import { useEffect, useState, useRef } from "react";
import { API } from "../utils/api";
import PropTypes from "prop-types";
import { getImageUrl } from "../utils";
import { useLanguage } from "../hooks/useLanguage";
import { organizations } from "../utils/organizations";
import { skills } from "../utils/skills";

function FormInputCertificate({ setShowFormCertificate, onCertificateAdded, certificateToEdit }) {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    title: certificateToEdit?.title || "",
    issued_by: certificateToEdit?.issued_by || "",
    issue_date: certificateToEdit?.issue_date || "",
    expiration_date: certificateToEdit?.expiration_date || "",
    id_credential: certificateToEdit?.id_credential || "",
    url_credential: certificateToEdit?.url_credential || "",
    skills: certificateToEdit?.skills || "",
  })
  const inputRef = useRef();

  const [previewImage, setPreviewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const issueDateRef = useRef(null);
  const expirationDateRef = useRef(null);

  useEffect(() => {
    setPreviewUrl(getImageUrl(certificateToEdit?.image));
  }, [certificateToEdit]);

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
      formData.append("issued_by", form.issued_by);
      formData.append("issue_date", form.issue_date);
      formData.append("expiration_date", form.expiration_date);
      formData.append("id_credential", form.id_credential);
      formData.append("url_credential", form.url_credential);
      formData.append("skills", form.skills);

      if (previewImage) {
        formData.append("image", previewImage);
      }

      let res;

      if (certificateToEdit) {
        res = await API.patch(`/certificates/${certificateToEdit.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await API.post("/certificates/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setForm({
          title: "",
          issued_by: "",
          issue_date: "",
          expiration_date: "",
          id_credential: "",
          url_credential: "",
          skills: ""
        });
        setPreviewImage(null);
        setPreviewUrl(null);
      }

      if (onCertificateAdded) onCertificateAdded(res.data.payload);
    } catch (err) {
      console.error(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(form.issued_by.toLowerCase())
  );

  const currentSkill = form.skills.split(",").pop().trim();

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
        placeholder={t("formCertificate.certificateName")}
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="issued_by"
        placeholder={t("formCertificate.issuingOrganization")}
        value={form.issued_by}
        onChange={handleChange}
        required
      />
      {form.issued_by && filteredOrganizations.length > 0 && (
        <div className="list-organizations">
          {filteredOrganizations.map((org) => (
            <div
              key={org.name}
              className="organization-item"
              onClick={() =>
                setForm({
                  ...form,
                  issued_by: org.name,
                })
              }
            >
              <img src={org.favicon} alt={org.name} />
              <span>{org.name}</span>
            </div>
          ))}
        </div>
      )}
      <div className="wrapping">
        <div className="inp-group">
          <input
            className={!form.issue_date ? "hidden" : ""}
            ref={issueDateRef}
            type="date"
            name="issue_date"
            id="issue_date"
            value={form.issue_date}
            onChange={handleChange}
          />
          <label
            className={form.issue_date ? "hidden" : ""}
            htmlFor="issue_date"
            onClick={() => issueDateRef.current?.showPicker()}>
            {t("formCertificate.issueDate")}
          </label>
        </div>
        <div className="inp-group">
          <input
            className={!form.expiration_date ? "hidden" : ""}
            ref={expirationDateRef}
            type="date"
            name="expiration_date"
            id="expiration_date"
            value={form.expiration_date}
            onChange={handleChange}
          />
          <label
            className={form.expiration_date ? "hidden" : ""}
            htmlFor="expiration_date"
            onClick={() => expirationDateRef.current?.showPicker()}>
            {t("formCertificate.expirationDate")}
          </label>
        </div>
      </div>
      <input
        type="text"
        name="id_credential"
        placeholder={t("formCertificate.credentialId")}
        value={form.id_credential}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="url_credential"
        placeholder={t("formCertificate.credentialURL")}
        value={form.url_credential}
        onChange={handleChange}
      />
      <input
        ref={inputRef}
        type="text"
        name="skills"
        placeholder={t("formCertificate.skills")}
        value={form.skills}
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
                const skillsArray = form.skills
                  .split(",")
                  .map((item) => item.trim());

                skillsArray.pop();

                const newSkills = [...skillsArray, s.label];

                setForm({
                  ...form,
                  skills: `${newSkills.join(", ")}, `,
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
      <button type="submit" disabled={loading}>
        {loading
          ? t("formCertificate.saving")
          : certificateToEdit
            ? t("formCertificate.save")
            : t("formCertificate.submit")
        }
      </button>
      <button
        type="button"
        id="back"
        onClick={() => setShowFormCertificate(false)}
      >
        <i className="fa fa-chevron-left"></i> {t("back")}
      </button>
    </form>
  )
}

FormInputCertificate.propTypes = {
  setShowFormCertificate: PropTypes.func.isRequired,
  onCertificateAdded: PropTypes.func.isRequired,
  certificateToEdit: PropTypes.shape({
    user: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    id_credential: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    issued_by: PropTypes.string.isRequired,
    issue_date: PropTypes.string.isRequired,
    expiration_date: PropTypes.string.isRequired,
    skills: PropTypes.string.isRequired,
    image: PropTypes.string,
    url_credential: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  })
}

export default FormInputCertificate;