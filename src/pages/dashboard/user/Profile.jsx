import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useState, useEffect } from "react";
import { API } from "../../../utils/api";
import { getImageUrl, sanitizeUsername } from "../../../utils";
import { Helmet } from "react-helmet-async";

function MyProfile() {
  const { user, setUser } = useAuth();
  
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    role: "",
    email: "",
    linkedin: "",
    github: "",
    instagram: "",
    phone: "",
    whatsapp: "",
    country: "",
    bio: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [initialForm, setInitialForm] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errorUsername, setErrorUsername] = useState(false);
  const [isLoadingVerification, SetIsLoadingVerification] = useState(false);
  const [messageVerif, setMessageVerif] = useState("");

  useEffect(() => {
    if (user) {
      const initialData = {
        fullname: user?.fullname || "",
        username: user?.username || "",
        role: user?.role || "",
        email: user?.email || "",
        linkedin: user?.linkedin || "",
        github: user?.github || "",
        instagram: user?.instagram || "",
        phone: user?.phone || "",
        whatsapp: user?.whatsapp || "",
        country: user?.country || "",
        bio: user?.bio || "",
        isVerified: user?.is_verified,
      };

      setForm(initialData);
      setInitialForm(initialData);
      setPreviewUrl(getImageUrl(user?.image));
    }
  }, [user]);

  if (!user) {
    return <Navigate to={"/"} />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let newValue = value;
  
    if (name === "username") {
      newValue = sanitizeUsername(value);
      if (newValue === initialForm.username) {
        setErrorUsername(false)
      }
    }
  
    setForm({
      ...form,
      [name]: newValue,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const isFormChanged = () => {
    if (!initialForm) return false;

    return (
      JSON.stringify(form) !== JSON.stringify(initialForm) ||
      previewImage !== null
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const formData = new FormData();
  
      Object.entries(form).forEach(([key, value]) => {
        if (key === "fullname") return;
        formData.append(key, value || "");
      });
  
      const [first_name, ...last] = form.fullname.split(" ");
      formData.append("first_name", first_name || "");
      formData.append("last_name", last.join(" ") || "");
  
      if (previewImage instanceof File) {
        formData.append("image", previewImage);
      }
  
      const res = await API.put("/auth/profile/", formData);
  
      setUser(res.data);
      setErrorUsername(false);
      setPreviewImage(null);
      setPreviewUrl(getImageUrl(res.data.image));
  
      const updatedForm = {
        fullname: res.data.fullname || "",
        username: res.data.username || "",
        role: res.data.role || "",
        email: res.data.email || "",
        linkedin: res.data.linkedin || "",
        github: res.data.github || "",
        instagram: res.data.instagram || "",
        phone: res.data.phone || "",
        whatsapp: res.data.whatsapp || "",
        country: res.data.country || "",
        bio: res.data.bio || "",
      };
  
      setForm(updatedForm);
      setInitialForm(updatedForm);
  
    } catch (err) {
      if (err.response?.data?.username) {
        setErrorUsername(true);
      }
      console.error(err.response?.data || err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async () => {
    SetIsLoadingVerification(true);
    try {
      await API.post("/auth/send-verification-link/");
      setMessageVerif("Cek email anda");
    } catch (err) {
      setMessageVerif("Gagal mengirim link verifikasi");
    } finally {
      SetIsLoadingVerification(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile - {user?.fullname}</title>
      </Helmet>
      <div className="my-profile">
        <form onSubmit={handleSubmit}>
          {isFormChanged() && (
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          )}
          <div className="box">
            <div className="side box-picture">
              <div
                className="picture"
                style={{backgroundImage: previewUrl ? `url(${previewUrl})` : "none",}}
              >
                {!previewUrl && <i id="profile-pict-not-set" className="fa fa-user"></i>}

                <label htmlFor="upload-picture">
                  <i className="fa fa-camera"></i>
                </label>

                <input
                  type="file"
                  id="upload-picture"
                  onChange={handleFileChange}
                  hidden
                />
              </div>
            </div>

            <div className="side">
              <span style={{background: user?.is_verified && ("transparent")}}>
                <label htmlFor="email">
                  <i className="fa fa-envelope"></i>
                  Email
                  <div className="alert">
                  {user?.is_verified
                    ? <i className="fa fa-check"></i>
                    : <>
                        <i className="fa fa-exclamation-triangle"></i>
                        <p>{messageVerif}</p>
                        <button
                          type="button"
                          onClick={handleVerification}
                          disabled={isLoadingVerification}
                        >
                          {isLoadingVerification
                            ? <i className="fa fa-spinner"></i>
                            : <p>Verification</p>
                          }
                        </button>
                      </>
                  }
                  </div>
                </label>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  autoComplete="email"
                  disabled={user?.is_verified}
                />
              </span>
              <span>
                <label htmlFor="fullname">
                  <i className="fa fa-user-circle"></i>
                  Fullname
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  placeholder="Fullname"
                />
              </span>
              <span>
                <label htmlFor="username">
                  <i className="fa fa-user"></i>
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Username"
                  autoComplete="username"
                />
                {errorUsername && (
                  <div className="alert">
                    <small>Username Already</small>
                    <i className="fa fa-exclamation-triangle"></i>
                  </div>
                )}
              </span>
            </div>
          </div>

          <div className="box">
            <div className="side">
              <span>
                <label htmlFor="role">
                  <i className="fa fa-tools"></i>
                  Role
                </label>
                <input
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="Role"
                />
              </span>
              <span>
                <label htmlFor="linkedin">
                  <i className="fa-brands fa-linkedin"></i>
                  Linkedin
                </label>
                <input
                  id="linkedin"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  placeholder="Link Linkedin"
                />
              </span>
              <span>
                <label htmlFor="github">
                  <i className="fa-brands fa-github"></i>
                  Github
                </label>
                <input
                  id="github"
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  placeholder="Link Github"
                />
              </span>
              <span>
                <label htmlFor="github">
                  <i className="fa-brands fa-instagram"></i>
                  Instagram
                </label>
                <input
                  id="instagram"
                  name="instagram"
                  value={form.instagram}
                  onChange={handleChange}
                  placeholder="Link Instagram"
                />
              </span>
            </div>

            <div className="side">
              <span>
                <label htmlFor="phone">
                  <i className="fa fa-phone"></i>
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Nomor Ponsel"
                  autoComplete="phone"
                />
              </span>
              <span>
                <label htmlFor="whatsapp">
                  <i className="fa-brands fa-whatsapp"></i>
                  Whatsapp
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="Whatsapp"
                />
              </span>
              <span>
                <label htmlFor="country">
                  <i className="fa fa-globe"></i>
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Negara"
                  autoComplete="country"
                />
              </span>
            </div>
          </div>

          <span className="box-bio">
            <label htmlFor="bio">
              <i className="fa fa-file-text"></i>
              Professional Summary
            </label>
            <textarea
              name="bio"
              id="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Jelaskan dirimu berdasarkan role yang dipilih. Contoh: 'Frontend Developer dengan pengalaman 2 tahun dalam membangun aplikasi web menggunakan React.'"
            />
          </span>
        </form>
      </div>
    </>
  );
}

export default MyProfile;