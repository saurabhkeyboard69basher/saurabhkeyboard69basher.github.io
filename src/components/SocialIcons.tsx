import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";
import { portfolioData } from "../data/portfolioData";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      {/* Social icons removed per user request */}
      <div className="social-icons" data-cursor="icons" id="social" style={{ display: "none" }}></div>
      <a className="resume-button" href={portfolioData.social.resumeUrl} target="_blank" rel="noreferrer">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
