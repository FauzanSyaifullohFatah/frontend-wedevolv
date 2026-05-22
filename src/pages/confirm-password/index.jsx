import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../utils/api";
import Footer from "../../component/Footer";
import { useLanguage } from "../../hooks/useLanguage";
import GLobalLoading from "../../component/GlobalLoading";

function ConfirmPassword() {
  const { t } = useLanguage();
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isVisibleShowPass, setIsVisibleShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        await API.post("auth/password-reset/validate-token/", { token: token });
        setIsValidating(false);
      } catch (error) {
        navigate("/page-not-found", { replace: true });
      }
    };

    validateToken();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setMessage("Kata sandi tidak cocok!");
    }

    setLoading(true);
    try {
      await API.post("auth/password-reset-confirm/", {
        token: token,
        password: password,
      });
      
      setSuccess(true)

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.error || "Token tidak valid atau kedaluwarsa.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setPassword(value);

    if (value.length > 0) {
      setIsVisibleShowPass(true);
    } else {
      setIsVisibleShowPass(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setConfirmPassword(value);
  };

  if (isValidating) {
    return <GLobalLoading />;
  }

  return (
    <section className="reset-password">
      <div className="wrapper">
        <h1>{t("confirmPass.title")}</h1>
        <p>{t("confirmPass.description")}</p>
      </div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>{t("confirmPass.subTitle")}</h2>
          <div className="box">
            <div className="inp">
              <label htmlFor="password"><i className="fa fa-lock"></i></label>
              <input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder={t("confirmPass.newPass")}
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {isVisibleShowPass && (
                <button
                  type="button"
                  id="show-pass"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"></i>}
                </button>
              )}
            </div>
            <div className="inp">
              <label htmlFor="confirmPassword"><i className="fa fa-lock"></i></label>
              <input
                id="confirmPassword"
                type={showPass ? "text" : "password"}
                placeholder={t("confirmPass.confirm")}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            {message && <p style={{ color: "red", fontSize: "12px" }}>{message}</p>}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? t("confirmPass.sending") : t("confirmPass.submit")}
          </button>
          <Footer />
        </form>
      </div>
      {success && (
        <div className="message">
          <img src="/wedevolv-fav-icon.svg" alt="Logo Wedevolv" />
          <span>
            <p>{t("confirmPass.message")}</p>
            <p>{t("confirmPass.backTolog")}</p>
          </span>
        </div>
      )}
    </section>
  );
}

export default ConfirmPassword;