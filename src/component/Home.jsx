import PropTypes from "prop-types";
import { getImageUrl } from "../utils";

function Home({ user }){
  return(
    <section className="portfolio-home" id="home">
      <div className="wrapper">
        <span>
          <h1>{user?.fullname}</h1>
          <b className="role">{user?.role}</b>
        </span>
        <p className="descriptions">{user?.bio}</p>
        <div className="social-media">
          <a href={user?.email} target="_blank" rel="noreferrer">
            <i className="fa-solid fa-envelope"></i>
          </a>
          <a href={user?.linkedin} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href={user?.github} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href={user?.instagram} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          </div>
      </div>

      <div className="wrapper">
        <img src={getImageUrl(user?.image)} alt={user?.fullname} />
      </div>
    </section>
  )
}

Home.propTypes = {
  user: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    instagram: PropTypes.string.isRequired,
    image: PropTypes.string
  })
}

export default Home;