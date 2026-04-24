import Image from "./Image";
import PropTypes from "prop-types";

function Home({ user }){
  return(
    <section id="home">
      <div className="container">
        <div className="introduction">
          <div className="nameAndTitle">
            <h1>{user.fullname}</h1>
            <b className="role">{user.role}</b>
          </div>
          <p>{user.bio}</p>
          <div className="socialMedia">
            <a href={user.email} target="_blank" rel="noreferrer">
              <i className="fa-solid fa-envelope"></i>
            </a>
            <a href={user.linkedin} target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href={user.github} target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.instagram.com/fauzan_s.f" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        <Image src={user.image} alt={user.image} id="profile-picture" />
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
    image: PropTypes.string.isRequired

  })
}

export default Home;