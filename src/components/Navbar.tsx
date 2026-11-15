import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";
import { portfolioData } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export interface SmootherController {
  scrollTop: (top?: number) => number;
  paused: (isPaused?: boolean) => boolean;
  scrollTo: (target: string | HTMLElement, smooth?: boolean, position?: string) => void;
  refresh: (hard?: boolean) => void;
}

export const smoother: SmootherController = {
  scrollTop: (top?: number) => {
    if (typeof top === "number") {
      window.scrollTo({ top });
      return top;
    }
    return window.scrollY;
  },
  paused: (isPaused?: boolean) => {
    if (typeof isPaused === "boolean") {
      document.body.style.overflow = isPaused ? "hidden" : "auto";
      return isPaused;
    }
    return document.body.style.overflow === "hidden";
  },
  scrollTo: (target: string | HTMLElement, smooth = true) => {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    }
  },
  refresh: () => {
    ScrollTrigger.refresh();
  },
};

const Navbar = () => {
  useEffect(() => {
    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        e.preventDefault();
        const section = element.getAttribute("data-href");
        if (section) {
          smoother.scrollTo(section, true);
        }
      });
    });

    const resizeHandler = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <img
            src="/images/logo-avatar.jpg"
            alt="Saurabh Kumar"
            className="navbar-logo-avatar"
          />
        </a>
        <a
          href={`mailto:${portfolioData.personal.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {portfolioData.personal.email}
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#education" href="#education">
              <HoverLinks text="EDUCATION" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
