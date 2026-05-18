import PropTypes from "prop-types";
import { getImageUrl } from "../utils";
import { countries } from "../utils/countries";

function Home({ user }) {
  const socialLinks = [
    {
      condition: user?.email,
      href: `mailto:${user?.email}`,
      icon: "fa-solid fa-envelope",
      label: "Email",
    },
    {
      condition: user?.linkedin,
      href: user?.linkedin,
      icon: "fa-brands fa-linkedin",
      label: "LinkedIn",
    },
    {
      condition: user?.github,
      href: user?.github,
      icon: "fa-brands fa-github",
      label: "GitHub",
    },
    {
      condition: user?.instagram,
      href: user?.instagram,
      icon: "fa-brands fa-instagram",
      label: "Instagram",
    },
    {
      condition: user?.whatsapp,
      href: user?.whatsapp,
      icon: "fa-brands fa-whatsapp",
      label: "WhatsApp",
    },
    {
      condition: user?.phone,
      href: `tel:${user?.phone}`,
      icon: "fa fa-phone",
      label: "Phone",
    },
  ];

  const findContry = countries
    .find((c) => c.name === user?.country
  );

  return (
    <section className="portfolio-home" id="home">
      <div className="wrapper">
        <span>
          <h1>{user?.fullname}</h1>

          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            {user?.role && <b className="role"><i className="fa fa-briefcase"></i> {user.role}</b>}
            {user?.country && <b>{findContry.flag} {findContry.name}</b>}
          </div>
        </span>

        {user?.bio && (
          <p className="descriptions">{user.bio}</p>
        )}

        <div className="social-media">
          {socialLinks.map((social) =>
            social.condition ? (
              <a
                key={social.label}
                href={social.href}
                target={
                  social.label === "Email" ||
                  social.label === "Phone"
                    ? undefined
                    : "_blank"
                }
                rel="noreferrer"
                aria-label={social.label}
              >
                <i className={social.icon}></i>
              </a>
            ) : null
          )}
        </div>
      </div>
      <div className="wrapper">
        <img
          src={getImageUrl(user?.image)}
          alt={user?.fullname || "Profile"}
        />
      </div>
    </section>
  );
}

Home.propTypes = {
  user: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    linkedin: PropTypes.string,
    github: PropTypes.string,
    instagram: PropTypes.string,
    image: PropTypes.string,
    country: PropTypes.string,
    whatsapp: PropTypes.string,
    phone: PropTypes.string,
  })
}

export default Home;