import { useRef, useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolioData";
import "./styles/FeaturedWork.css";

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  // Projects 5 and 6
  const project5 = portfolioData.projects[4]; // Metaverse Dog
  const project6 = portfolioData.projects[5]; // Theory of Animate

  useEffect(() => {
    const cards = [card1Ref.current, card2Ref.current];

    cards.forEach((card) => {
      if (!card) return;

      // 3D Rolling reveal as you scroll down
      gsap.fromTo(
        card,
        {
          rotateX: 28,
          y: 70,
          scale: 0.94,
          opacity: 0.3,
          transformOrigin: "center top",
        },
        {
          rotateX: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "top 45%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === card1Ref.current || st.vars.trigger === card2Ref.current) {
          st.kill();
        }
      });
    };
  }, []);

  // Interactive 3D rolling tilt on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardRef: React.RefObject<HTMLDivElement | null>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1200,
    });
  };

  const handleMouseLeave = (cardRef: React.RefObject<HTMLDivElement | null>) => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <section className="featured-work-section" ref={containerRef}>
      <div className="featured-work-container section-container">
        <div className="featured-header">
          <h2>
            Featured <span>Ventures</span>
          </h2>
          <p>Interactive agency and startup collaborations</p>
        </div>

        {/* Card 05: Metaverse Dog */}
        {project5 && (
          <div className="rolling-card-stage">
            <div
              className="rolling-card"
              ref={card1Ref}
              onMouseMove={(e) => handleMouseMove(e, card1Ref)}
              onMouseLeave={() => handleMouseLeave(card1Ref)}
            >
              <div className="rolling-glow" style={{ top: "10%", right: "15%" }} />
              <div className="rolling-card-content">
                <div className="rolling-badge-row">
                  <span className="rolling-num">05</span>
                  <span className="rolling-tag">Startup Venture</span>
                </div>
                <h3>{project5.title}</h3>
                {project5.category && <div className="rolling-category">{project5.category}</div>}
                <p>{project5.description}</p>
                {project5.link && (
                  <a
                    href={project5.link}
                    target="_blank"
                    rel="noreferrer"
                    className="rolling-link-btn"
                    data-cursor="disable"
                  >
                    Explore Project <MdArrowOutward />
                  </a>
                )}
              </div>
              <div className="rolling-card-visual">
                <div className="rolling-image-wrap">
                  <img src={project5.image} alt={project5.title} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card 06: Theory of Animate */}
        {project6 && (
          <div className="rolling-card-stage">
            <div
              className="rolling-card reverse"
              ref={card2Ref}
              onMouseMove={(e) => handleMouseMove(e, card2Ref)}
              onMouseLeave={() => handleMouseLeave(card2Ref)}
            >
              <div className="rolling-glow" style={{ bottom: "10%", left: "15%" }} />
              <div className="rolling-card-content">
                <div className="rolling-badge-row">
                  <span className="rolling-num">06</span>
                  <span className="rolling-tag">Agency Co-Founder</span>
                </div>
                <h3>{project6.title}</h3>
                {project6.category && <div className="rolling-category">{project6.category}</div>}
                <p>{project6.description}</p>
                {project6.link && (
                  <a
                    href={project6.link}
                    target="_blank"
                    rel="noreferrer"
                    className="rolling-link-btn"
                    data-cursor="disable"
                  >
                    View Agency on Fiverr <MdArrowOutward />
                  </a>
                )}
              </div>
              <div className="rolling-card-visual">
                <div className="rolling-image-wrap">
                  <img src={project6.image} alt={project6.title} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedWork;
