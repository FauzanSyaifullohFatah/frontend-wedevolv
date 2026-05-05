import { useState } from "react";
import { API } from "../../utils/api";
import { useLanguage } from "../../hooks/useLanguage";
import Footer from "../../component/Footer";
import SEO from "../../component/SEO";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      const response = await API.post("auth/password-reset/", { email });
      setMessage(response.data.message || "Link pemulihan telah dikirim ke email anda.");
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.response?.data?.detail || "Terjadi kesalahan.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title={t("forgotPassword.metaTitle")} description={t("forgotPassword.metaDescription")} />
      <section className="reset-password">
        <div className="wrapper">
          <h1>{t("forgotPassword.title")}</h1>
          <p>{t("forgotPassword.description")}</p>
        </div>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h2>{t("forgotPassword.subTitle")}</h2>
            <div className="box">
              <div className="inp">
                <label htmlFor="email"><i className="fa fa-envelope"></i></label>
                <input
                  id="email"
                  type="email"
                  placeholder={t("forgotPassword.email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {message && (
                <p style={{ 
                  fontSize: "12px", 
                  marginTop: "10px", 
                  color: message.includes("kesalahan") || message.includes("tidak") ? "red" : "green" 
                }}>
                  {message}
                </p>
              )}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? t("forgotPassword.process") : t("forgotPassword.submit")}
            </button>
            <Footer />
          </form>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;
