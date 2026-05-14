import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import { countries } from "../utils/countries";
import PropTypes from "prop-types";

function FormInputProfile({
  form,
  setForm,
  formChange,
  change,
  fileChange,
  loading,
  submit,
  previewImg,
  verification,
  loadVerif,
  messageVerif,
  errors,
}) {

  const { t } = useLanguage();
  const { user } = useAuth();

  const profileFields = [
    {
      name: "image",
      icon: "fa-image",
      type: "file",
      accept: "image/*",
    },
    {
      name: "email",
      icon: "fa-envelope",
      placeholder: "Email",
      disabled: user?.is_verified,
    },
    {
      name: "fullname",
      icon: "fa-user-circle",
      placeholder: "Fullname",
    },
    {
      name: "username",
      icon: "fa-user",
      placeholder: "Username",
    },
    {
      name: "role",
      icon: "fa-tools",
      placeholder: "Role",
    },
    {
      name: "linkedin",
      icon: "fa-linkedin",
      placeholder: "Link Linkedin",
      brand: true,
    },
    {
      name: "github",
      icon: "fa-github",
      placeholder: "Link Github",
      brand: true,
    },
    {
      name: "instagram",
      icon: "fa-instagram",
      placeholder: "Link Instagram",
      brand: true,
    },
    {
      name: "phone",
      icon: "fa-phone",
      placeholder: t("formProfile.phoneNumber"),
      type: "tel",
    },
    {
      name: "whatsapp",
      icon: "fa-whatsapp",
      placeholder: "Whatsapp",
      type: "tel",
      brand: true,
    },
    {
      name: "country",
      icon: "fa-globe",
      placeholder: t("formProfile.country"),
    },
  ];

  const [showCountry, setShowCountry] = useState(false);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(form.country.toLowerCase())
  );

  return (
    <div className="my-profile">
      <form onSubmit={submit}>

        {formChange() && (
          <button type="submit" disabled={loading}>
            {loading ? t("formProfile.saving") : t("formProfile.saveChanges")}
          </button>
        )}

        {profileFields.map((field) => (
          <span
            key={field.name}
            className={`${field.name} ${errors?.[field.name] ? "error" : ""}`}
          >

            <label htmlFor={field.name}>
              <i className={`fa${field.brand ? "-brands" : ""} ${field.icon}`} />

              {field.name}

              {field.name === "email" && !errors?.email && (
                <div className="alert">
                  {user?.is_verified && (
                    <i className="fa fa-check"></i>
                  )}

                  {!user?.is_verified && (
                    <>
                      <i className="fa fa-exclamation-triangle"></i>

                      {messageVerif && <p>{t(`formProfile.${messageVerif}`)}</p>}

                      <button
                        type="button"
                        onClick={verification}
                        disabled={loadVerif}
                      >
                        {loadVerif ? (
                          <i className="fa fa-spinner"></i>
                        ) : (
                          <p>{t("verification")}</p>
                        )}
                      </button>
                    </>
                  )}
                </div>
              )}

              {field.name === "image" && (
                <div className="box-picture">
                  {previewImg ? (
                    <img src={previewImg} alt="" />
                  ) : (
                    <i className="fa fa-user"></i>
                  )}
                </div>
              )}
              {errors?.[field.name] && (
                <small className="error-message">
                  <i className="fa fa-exclamation-triangle"></i> {t(`formProfile.${errors[field.name]}`)}
                </small>
              )}
            </label>

            <input
              id={field.name}
              name={field.name}
              type={field.type || "text"}
              value={field.name === "image" ? undefined : form[field.name]}
              onChange={field.name === "image" ? fileChange : change}
              placeholder={field.placeholder}
              autoComplete={field.name}
              disabled={field.disabled}
              accept={field.accept}
              onFocus={() => {
                if (field.name === "country") {
                  setShowCountry(true);
                }
              }}
            />

            {field.name === "country" && filteredCountries.length > 0 && showCountry && (
              <div className="list-country">
                {filteredCountries.map((country) => (
                  <button
                    type="button"
                    key={country.name}
                    className="country-item"
                    onClick={() => {
                      setForm({
                        ...form,
                        country: country.name,
                      });

                      setShowCountry(false);
                    }}
                  >
                    {country.flag} {country.name}
                  </button>
                ))}
              </div>
            )}
          </span>
        ))}

        <span className="box-bio">
          <label htmlFor="bio">
            <i className="fa fa-file-text"></i>
            Professional Summary
          </label>

          <textarea
            name="bio"
            id="bio"
            value={form.bio}
            onChange={change}
            placeholder={t("formProfile.summary")}
          />
        </span>

      </form>
    </div>
  );
}

FormInputProfile.propTypes = {
  form: PropTypes.shape({
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string,
    username: PropTypes.string.isRequired,
    role: PropTypes.string,
    linkedin: PropTypes.string,
    github: PropTypes.string,
    instagram: PropTypes.string,
    phone: PropTypes.string,
    whatsapp: PropTypes.string,
    country: PropTypes.string,
    bio: PropTypes.string,
    isVerified: PropTypes.bool,
  }).isRequired,

  setForm: PropTypes.func.isRequired,
  formChange: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  fileChange: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,

  loading: PropTypes.bool,
  previewImg: PropTypes.string,

  verification: PropTypes.func,
  loadVerif: PropTypes.bool,
  messageVerif: PropTypes.string,

  errors: PropTypes.objectOf(
    PropTypes.string
  ),
};

export default FormInputProfile;