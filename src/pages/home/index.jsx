import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../../component/Logo";
import Footer from "../../component/Footer";

function HomePage(){
  const { authedUser } = useAuth();

  if (authedUser) {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <section className="home-page">
      <div className="hero">
        <Logo />
        <h1>Developer Portfolio Builder</h1>
        <p>
          Build your professional developer portfolio in minutes. Showcase your
          skills, projects, and experience with a beautiful and modern portfolio.
        </p>
        <div className="link-button">
          <Link to="/register">Get Started</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
      <div className="fitur">
        <div className="card">
          <span><i className="fa fa-list-alt"></i></span>
          <p>Menampilkan project dengan struktur yang rapi, terorganisir, dan mudah dipahami sehingga memudahkan siapa pun untuk mengeksplorasi hasil karya.</p>
        </div>
        <div className="card">
          <span><i className="fa fa-address-card"></i></span>
          <p>Membangun profil developer yang menarik, modern, dan profesional sebagai representasi diri di dunia digital.</p>
        </div>
        <div className="card">
          <span><i className="fa-solid fa-briefcase"></i></span>
          <p>Menyediakan akses portfolio dalam satu link yang praktis, sehingga mudah dibagikan ke recruiter, client, maupun rekan developer.</p>
        </div>
        <div className="card">
          <span><i className="fa fa-search"></i></span>
          <p>Dilengkapi fitur pencarian untuk menemukan project dengan cepat dan efisien.</p>
        </div>
        <div className="card">
          <span><i className="fa fa-address-card"></i></span>
          <p>Tampilan responsif yang optimal di berbagai perangkat, baik desktop maupun mobile.</p>
        </div>
        <div className="card">
          <span><i className="fa-solid fa-briefcase"></i></span>
          <p>Pengalaman pengguna yang sederhana namun tetap interaktif dan nyaman digunakan.</p>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default HomePage;