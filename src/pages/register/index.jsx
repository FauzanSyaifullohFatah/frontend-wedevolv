import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";
import { sanitizeUsername } from "../../utils";
import { useLanguage } from "../../hooks/useLanguage";
import SEO from "../../component/SEO";
import Footer from "../../component/Footer";

function RegisterPage(){
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [isVisibleShowPass, setIsVisibleShowPass] = useState(false);

  if (user) {
    return <Navigate to={"/"} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (form.password !== confirmPassword) {
      setMessage(t("formReg.passNotSame"));
      setLoading(false);
      return;
    }
  
    try {
      setMessage("");
  
      await register(form);
  
      navigate('/dashboard');
    } catch (error) {
      if (error === "Email is already registered.") {
        setMessage(t("formReg.emailExists"));
      } else {
        setMessage(t("formReg.usernameExists"));
      }
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setForm({ ...form, password: value })

    if (value.length > 0) {
      setIsVisibleShowPass(true);
    } else {
      setIsVisibleShowPass(false);
    }
  }

  return (
    <>
      <SEO title={t("registerPage.metaTitle")} description={t("registerPage.metaDescription")} />
      <section className="register-page">
        <div className="wrapper">
          <h1>{t("registerPage.title")}</h1>
          <p>{t("registerPage.description")}</p>
        </div>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h2>{t("formReg.title")}</h2>
            <div className="box">
              <div className="inp">
                <label htmlFor="fullname"><i className="fa fa-address-card"></i></label>
                <input
                  id="fullname"
                  type="text"
                  placeholder={t("formReg.fullname")}
                  value={form.fullname}
                  onChange={(e) =>
                    setForm({ ...form, fullname: e.target.value })
                  }
                  required
                />
              </div>
              <div className="inp">
                <label htmlFor="username"><i className="fa fa-user-circle"></i></label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: sanitizeUsername(e.target.value) })
                  }
                  required
                />
              </div>
              <div className="inp">
                <label htmlFor="email"><i className="fa fa-envelope"></i></label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="inp">
                <label htmlFor="password"><i className="fa fa-unlock-alt"></i></label>
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder={t("formReg.password")}
                  value={form.password}
                  onChange={onChange}
                  required
                />
                {isVisibleShowPass && (
                  <button
                    type="button"
                    id="show-pass"
                    onClick={() => setShowPass(!showPass)}
                    >
                    {showPass
                      ? <i className="fa fa-eye"></i>
                      : <i className="fa fa-eye-slash"></i>
                    }
                    
                  </button>
                )}
              </div>
              <div className="inp">
                <label htmlFor="confirm-password"><i className="fa fa-unlock-alt"></i></label>
                <input
                  id="confirm-password"
                  type={showPass ? "text" : "password"}
                  placeholder={t("formReg.confirmPass")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <p>{t("formReg.haveAcc")} <Link to={'/login'}> {t("login")}</Link></p>
                {message
                  ? <p><i className="fa fa-exclamation-triangle" style={{color: "yellow"}}></i> {message}</p>
                  : null}
              </div>
            </div>
            {loading ? <div className="loading"><span></span></div> : null}
            <button>{t("register")}</button>
            <Footer />
          </form>
        </div>
      </section>
    </>
  )
}

export default RegisterPage;