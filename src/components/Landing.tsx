import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { portfolioData } from "../data/portfolioData";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {portfolioData.personal.firstName} <span>{portfolioData.personal.lastName}</span>
            </h1>
            {portfolioData.personal.nativeName && (
              <p className="landing-native-name">{portfolioData.personal.nativeName}</p>
            )}
          </div>
          <div className="landing-info">
            <h3>{portfolioData.personal.tagline}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{portfolioData.personal.role1}</div>
              <div className="landing-h2-2">{portfolioData.personal.role2}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{portfolioData.personal.role2}</div>
              <div className="landing-h2-info-1">{portfolioData.personal.role1}</div>
            </h2>
            <p className="landing-education-sub">
              {portfolioData.personal.educationSubtitle}
            </p>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
