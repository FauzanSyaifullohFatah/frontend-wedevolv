import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../utils/api";
import Footer from "../../component/Footer";
import { useLanguage } from "../../hooks/useLanguage";

function ConfirmPassword() {
  const { t } = useLanguage();
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      
      alert("Kata sandi berhasil diubah!");
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.error || "Token tidak valid atau kedaluwarsa.");
    } finally {
      setLoading(false);
    }
  };

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
                type="password"
                placeholder={t("confirmPass.newPass")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="inp">
              <label htmlFor="confirmPassword"><i className="fa fa-lock"></i></label>
              <input
                id="confirmPassword"
                type="password"
                placeholder={t("confirmPass.confirm")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
    </section>
  );
}

export default ConfirmPassword;