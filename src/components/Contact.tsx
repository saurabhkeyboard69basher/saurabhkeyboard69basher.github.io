import { FaGithub } from "react-icons/fa6";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { portfolioData } from "../data/portfolioData";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${portfolioData.personal.email}`} data-cursor="disable">
                {portfolioData.personal.email}
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href={`tel:${portfolioData.personal.phone}`} data-cursor="disable">
                {portfolioData.personal.phone}
              </a>
            </p>
            <h4>Location</h4>
            <p>{portfolioData.personal.location}</p>
          </div>
          <div className="contact-box">
            <h4>GitHub</h4>
            <a
              href={portfolioData.social.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-github-link"
            >
              <FaGithub className="contact-github-icon" />
              <span>My GitHub Profile</span>
              <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by{" "}
              <span>
                {portfolioData.personal.firstName} {portfolioData.personal.lastName}
              </span>
            </h2>
            <h5>
              <MdCopyright /> {portfolioData.personal.copyrightYear}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
