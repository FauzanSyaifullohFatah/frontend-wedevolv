import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useState, useEffect } from "react";
import { API } from "../../../utils/api";
import { getImageUrl, sanitizeUsername } from "../../../utils";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../../../hooks/useLanguage";
import FormInputProfile from "../../../component/FormInputProfile";

function MyProfile() {
  const { lang } = useLanguage();
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

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    github: "",
    linkedin: "",
    instagram: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [initialForm, setInitialForm] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
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
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar!");
      return;
    }

    setPreviewImage(file);
    setPreviewUrl(URL.createObjectURL(file));
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
      const { payload } = res.data;

      setUser(payload);
      setPreviewImage(null);
      setPreviewUrl(getImageUrl(payload.image));

      setErrors({
        username: "",
        email: "",
        github: "",
        linkedin: "",
        instagram: "",
      });

      const updatedForm = {
        fullname: payload.fullname || "",
        username: payload.username || "",
        role: payload.role || "",
        email: payload.email || "",
        linkedin: payload.linkedin || "",
        github: payload.github || "",
        instagram: payload.instagram || "",
        phone: payload.phone || "",
        whatsapp: payload.whatsapp || "",
        country: payload.country || "",
        bio: payload.bio || "",
      };

      setForm(updatedForm);
      setInitialForm(updatedForm);

    } catch (err) {
      const data = err.response?.data.errors || {};

      setErrors({
        username: data.username?.[0] || "",
        email: data?.email?.[0] || "",
        github: data?.github?.[0] || "",
        linkedin: data?.linkedin?.[0] || "",
        instagram: data?.instagram?.[0] || "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async () => {
    SetIsLoadingVerification(true);

    try {
      const res = await API.post("/auth/send-verification-link/", {
        language: lang,
      });
      setMessageVerif(res.data.message);
    } catch (err) {
      setMessageVerif(err?.response?.data?.message);
    } finally {
      SetIsLoadingVerification(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile - {user?.fullname}</title>
      </Helmet>

      <FormInputProfile
        form={form}
        setForm={setForm}
        formChange={isFormChanged}
        change={handleChange}
        fileChange={handleFileChange}
        loading={isLoading}
        submit={handleSubmit}
        previewImg={previewUrl}
        verification={handleVerification}
        loadVerif={isLoadingVerification}
        messageVerif={messageVerif}
        errors={errors}
      />
    </>
  );
}

export default MyProfile;