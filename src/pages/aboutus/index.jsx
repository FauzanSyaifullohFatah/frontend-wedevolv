import Footer from "../../component/Footer";

function AboutUs() {
  return (
    <section className="about-container">
      <div className="about-wrapper">
        <h1><i className="fa fa-info-circle"></i> About Wedevolv</h1>

        <p className="about-intro">
          Wedevolv is a platform designed to help individuals and teams manage
          and showcase their projects efficiently. We believe that every idea
          deserves to be organized, developed, and shared with the world.
        </p>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to simplify project management and empower developers
            and creators to build, track, and present their work in a more
            structured and meaningful way.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Vision</h2>
          <p>
            To become a go-to platform for managing and showcasing digital
            projects, helping users turn ideas into impactful results.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>Project management tools</li>
            <li>Clean and modern dashboard</li>
            <li>Easy project tracking</li>
            <li>Portfolio-ready showcase</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Why Wedevolv?</h2>
          <p>
            Built with modern technologies like React and Django, Wedevolv
            ensures performance, scalability, and a seamless user experience.
          </p>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default AboutUs;