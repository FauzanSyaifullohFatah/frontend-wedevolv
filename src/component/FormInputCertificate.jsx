import { useEffect, useState } from "react";
import { API } from "../utils/api";
import PropTypes from "prop-types";
import { getImageUrl } from "../utils";

function FormInputCertificate({ setShowFormCertificate, onCertificateAdded, certificateToEdit }) {
  const [form, setForm] = useState({
    title: certificateToEdit?.title || "",
    issued_by: certificateToEdit?.issued_by || "",
    issue_date: certificateToEdit?.issue_date || "",
    expiration_date: certificateToEdit?.expiration_date || "",
    id_credential: certificateToEdit?.id_credential || "",
    url_credential: certificateToEdit?.url_credential || "",
    skills: certificateToEdit?.skills || "",
  })

  const [previewImage, setPreviewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

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

      if (onCertificateAdded) onCertificateAdded(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

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
        />
      </div>
      <input
        type="text"
        name="title"
        placeholder="Name Certificate"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="issued_by"
        placeholder="Organisasi Penerbit"
        value={form.issued_by}
        onChange={handleChange}
        required
      />
      <div className="wrapping">
        <input
          type="date"
          name="issue_date"
          placeholder="Tahun Diterbitkan"
          value={form.issue_date}
          onChange={handleChange}
        />
        <input
          type="date"
          name="expiration_date"
          placeholder="Tahun Kadaluarsa"
          value={form.expiration_date}
          onChange={handleChange}
        />
      </div>
      <input
        type="text"
        name="id_credential"
        placeholder="ID Credential"
        value={form.id_credential}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="url_credential"
        placeholder="URL Credential"
        value={form.url_credential}
        onChange={handleChange}
      />
      <input
        type="text"
        name="skills"
        placeholder="Skills"
        value={form.skills}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading
          ? "Menyimpan..."
          : certificateToEdit
            ? "Simpan Perubahan"
            : "Tambah Certificate"
        }
      </button>
      <button
        type="button"
        id="back"
        onClick={() => setShowFormCertificate(false)}
      >
        <i className="fa fa-chevron-left"></i> Back
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
    image: PropTypes.string.isRequired,
    url_credential: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  })
}

export default FormInputCertificate;