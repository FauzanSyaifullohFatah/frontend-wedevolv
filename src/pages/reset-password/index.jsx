import { useState } from "react";
import { API } from "../../utils/api";
import Footer from "../../component/Footer";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    <section className="reset-password">
      <div className="wrapper">
        <h1>Lupa kata sandi</h1>
        <p>Masukkan alamat email Anda dan kami akan mengirimkan instruksi untuk mengatur ulang kata sandi Anda.</p>
      </div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Pulihkan akun anda</h2>
          <div className="box">
            <div className="inp">
              <label htmlFor="email"><i className="fa fa-envelope"></i></label>
              <input
                id="email"
                type="email"
                placeholder="Masukan email anda"
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
            {loading ? "Mengirim..." : "Kirim"}
          </button>
          <Footer />
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
