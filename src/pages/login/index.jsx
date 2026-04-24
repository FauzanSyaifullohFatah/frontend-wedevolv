import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";
import { sanitizeUsername } from "../../utils";
import Footer from "../../component/Footer";

function LoginPage(){
  const [form, setForm] = useState({
    username: "",
    password: "",
  })
  const { authedUser, setAuthedUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginMessage, setLoginMessage] = useState(null);
  const navigate = useNavigate();
  
  if (authedUser) {
    return <Navigate to={"/dashboard"} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(false);

    try {
      const userData =  await login(form);
      setAuthedUser(userData);
      navigate("/");
    } catch (error) {
      setLoginError(true);
      if (error === "User not found") {
        setLoginMessage("username tidak terdaftar");
      } else if (error === "Invalid password") {
        setLoginMessage("Wrong password!");
      } else {
        setLoginMessage("Terjadi kesalahan, coba lagi");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-page">
      <form onSubmit={handleSubmit}>
        <h1>LOGIN ACCOUNT</h1>
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
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => {
              const value = e.target.value.replace(/\s/g, "");
              setForm({ ...form, password: value })
            }}
          />
        </div>
        <p>Not have account ? <Link to={'/register'}> Register now</Link></p>
        {loading ? <div className="loading"><span></span></div> : null}
        {loginError
          ? <div className="login-error">{loginMessage}</div>
          : null
        }
        <button
          disabled={loading}
        >LOGIN</button>
      </form>
      <Footer />
    </section>
  )
}

export default LoginPage;