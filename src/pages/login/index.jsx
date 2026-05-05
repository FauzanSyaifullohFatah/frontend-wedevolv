import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { login } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";
import { sanitizeUsername } from "../../utils";
import { useLanguage } from "../../hooks/useLanguage";
import Footer from "../../component/Footer";
import SEO from "../../component/SEO";

function LoginPage(){
  const { t } = useLanguage();
  const { user, setUser } = useAuth();
  
  const [form, setForm] = useState({
    username: "",
    password: "",
  })

  const [loginExpired, setLoginExpired] = useState();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reason = params.get("reason");

    if (reason === "expired") {
      setLoginExpired("Sesi Anda telah berakhir. Silakan login kembali.");
    }

    if (reason) {
      window.history.replaceState({}, "", "/login");
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginMessage, setLoginMessage] = useState(null);

  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [isVisibleShowPass, setIsVisibleShowPass] = useState(false);
  
  if (user) {
    return <Navigate to={"/dashboard"} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(false);

    try {
      const userData =  await login(form);
      setUser(userData);
      navigate("/");
    } catch (error) {
      setLoginError(true);
      if (error === "Invalid username or password") {
        setLoginMessage(t("formLogin.usr_or_pass"));
      } else {
        setLoginMessage(t("formLogin.error"));
      }
    } finally {
      setLoading(false);
    }
  }

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
      <SEO title={t("loginPage.metaTitle")} description={t("loginPage.metaDescription")} />

      <section className="login-page">
        <div className="wrapper">
          <h1>{t("loginPage.title")}</h1>
          <p>{t("loginPage.description")}</p>
        </div>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h2>{t("formLogin.title")}</h2>
            <div className="box">
              <div className="inp">
                <label htmlFor="username"><i className="fa fa-user-circle"></i></label>
                <input
                  required
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) => {
                    const value = sanitizeUsername(e.target.value);
                    setForm({ ...form, username: value })
                  }}
                />
              </div>
              <div className="inp">
                <label htmlFor="password"><i className="fa fa-unlock-alt"></i></label>
                <input
                  required
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder={t("formLogin.password")}
                  value={form.password}
                  onChange={onChange}
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
              <p>{t("formLogin.notHaveAcc")} <Link to={"/register"}> {t("register")}</Link></p>
            </div>
            {loading ? <div className="loading"><span></span></div> : null}
            {loginError
              ? <div className="login-error">{loginMessage}</div>
              : null
            }
            <button
              disabled={loading}
            >{t("login")}</button>
            <Link to={"/reset-password"}>Lupa kata sandi</Link>
            <Footer />
          </form>
        </div>
        {loginExpired && (
          <div className="login-expired">
            <p>{loginExpired}</p>
          </div>
        )}
      </section>
    </>
  )
}

export default LoginPage;