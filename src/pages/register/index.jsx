import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";
import { sanitizeUsername } from "../../utils";
import Footer from "../../component/Footer";

function RegisterPage(){
  const navigate = useNavigate();
  const { authedUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  if (authedUser) {
    return <Navigate to={"/"} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (form.password !== confirmPassword) {
      setMessage("Password tidak sama");
      setLoading(false);
      return;
    }
  
    try {
      setMessage("");
  
      await register(form);
  
      navigate('/dashboard');
    } catch (error) {
      setMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-page">
      <form onSubmit={handleSubmit}>
        <h1>CREATE ACCOUNT</h1>
        <div className="inp">
          <label htmlFor="fullname"><i className="fa fa-address-card"></i></label>
          <input
            id="fullname"
            type="text"
            placeholder="Fullname"
            value={form.fullname}
            onChange={(e) =>
              setForm({ ...form, fullname: e.target.value })
            }
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
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />
        </div>
        <div className="inp">
          <label htmlFor="confirm-password"><i className="fa fa-unlock-alt"></i></label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <p>have account ? <Link to={'/login'}> Login</Link></p>
          {message
            ? <p><i className="fa fa-exclamation-triangle" style={{color: "yellow"}}></i> {message}</p>
            : null}
        </div>
        {loading ? <div className="loading"><span></span></div> : null}
        <button>REGISTER</button>
      </form>
      <Footer />
    </section>
  )
}

export default RegisterPage;