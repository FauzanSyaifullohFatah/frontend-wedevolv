import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { API } from "../../utils/api";
import { getImageUrl, sanitizeUsername } from "../../utils";

function MyProfile() {
  const { authedUser, setAuthedUser } = useAuth();
  
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    role: "",
    email: "",
    linkedin: "",
    github: "",
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

  useEffect(() => {
    if (authedUser) {
      const initialData = {
        fullname: authedUser?.fullname || "",
        username: authedUser?.username || "",
        role: authedUser?.role || "",
        email: authedUser?.email || "",
        linkedin: authedUser?.linkedin || "",
        github: authedUser?.github || "",
        phone: authedUser?.phone || "",
        whatsapp: authedUser?.whatsapp || "",
        country: authedUser?.country || "",
        bio: authedUser?.bio || "",
        isVerified: authedUser?.is_verified,
      };

      setForm(initialData);
      setInitialForm(initialData);
      setPreviewUrl(getImageUrl(authedUser?.image));
    }
  }, [authedUser]);

  if (!authedUser) {
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

      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("role", form.role);
      formData.append("bio", form.bio);
      formData.append("github", form.github);
      formData.append("linkedin", form.linkedin);
      formData.append("phone", form.phone);
      formData.append("whatsapp", form.whatsapp);
      formData.append("country", form.country);

      const [first_name, ...last] = form.fullname.split(" ");
      formData.append("first_name", first_name);
      formData.append("last_name", last.join(" "));

      if (previewImage) {
        formData.append("image", previewImage);
      }

      const res = await API.put("/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAuthedUser(res.data);
      setErrorUsername(false);

    } catch (err) {
      if (err.response?.data.username) {
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
      const res = await API.post("/send-verification-link/");
  
      alert(res.data.message);
    } catch (err) {
      alert("Gagal mengirim link");
    } finally {
      SetIsLoadingVerification(false);
    }
  };

  return (
    <div className="my-profile">
      {!authedUser.is_verified && (
        <div className="is-verified">
          <p><i className="fa fa-exclamation-triangle"></i> Email Not Verified</p>
          <button
            onClick={handleVerification}
            disabled={isLoadingVerification}
          >
            {isLoadingVerification
              ? <i className="fa fa-spinner"></i>
              : <p>Verification</p>
            }
          </button>
        </div>
      )}
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
            <span style={{background: authedUser.is_verified && ("transparent")}}>
              <label htmlFor="email">
                <i className="fa fa-envelope"></i>
                Email
                <div className="alert">
                {authedUser.is_verified
                  ? <i className="fa fa-check"></i>
                  : <i className="fa fa-exclamation-triangle"></i>
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
                disabled={authedUser.is_verified}
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
          </div>
        </div>

        <div className="box">
          <div className="side">
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
            Bio
          </label>
          <textarea
            name="bio"
            id="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Ceritakan tentang diri anda..."
          />
        </span>
      </form>
    </div>
  );
}

export default MyProfile;