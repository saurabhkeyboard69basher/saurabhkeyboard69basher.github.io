import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
import { portfolioData } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);

  // Projects 1 through 4 in the horizontal glide reel
  const horizontalProjects = portfolioData.projects.slice(0, 4);

  useEffect(() => {
    // Refresh ScrollTrigger once DOM and images settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const flex = flexRef.current;
      if (!section || !flex) return;

      const getDistance = () => {
        const boxes = flex.querySelectorAll<HTMLElement>(".work-box");
        if (boxes.length >= 2) {
          const firstBox = boxes[0];
          const lastBox = boxes[boxes.length - 1];
          const dist = lastBox.offsetLeft - firstBox.offsetLeft;
          if (dist > 0) return dist;
        }
        const box = flex.querySelector<HTMLElement>(".work-box");
        const w = box
          ? box.getBoundingClientRect().width
          : window.innerWidth > 1400
          ? 600
          : 350;
        return (horizontalProjects.length - 1) * w;
      };

      const getScrollLength = () => {
        return Math.max(getDistance() * 1.3, 2600);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollLength()}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          id: "work",
          invalidateOnRefresh: true,
        },
      });

      // Smooth horizontal glide of projects 1 through 4
      tl.to(flex, {
        x: () => -getDistance(),
        ease: "none",
      });

      return () => {
        tl.kill();
        ScrollTrigger.getById("work")?.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex" ref={flexRef}>
          {horizontalProjects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{index < 9 ? `0${index + 1}` : index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    {project.category && <p>{project.category}</p>}
                  </div>
                </div>
                {project.tools && <h4>Tools and features</h4>}
                <p>{project.description || project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                link={project.link}
                video={project.video}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
