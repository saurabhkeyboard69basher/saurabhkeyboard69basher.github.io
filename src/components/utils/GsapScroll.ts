import * as THREE from "three";
import gsap from "gsap";
import { StudyBookController } from "../Character/utils/studyBook";

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera,
  studyBook?: StudyBookController | null
) {
  let intensity: number = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  let screenLight: any, monitor: any;
  character?.children.forEach((object: any) => {
    if (object.name === "Plane004") {
      object.children.forEach((child: any) => {
        child.material.transparent = true;
        child.material.opacity = 0;
        if (child.material.name === "Material.027") {
          monitor = child;
          child.material.color.set("#FFFFFF");
        }
      });
    }
    if (object.name === "screenlight") {
      object.material.transparent = true;
      object.material.opacity = 0;
      object.material.emissive.set("#C8BFFF");
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(object.material, {
        emissiveIntensity: () => intensity * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
      screenLight = object;
    }
  });
  let neckBone = character?.getObjectByName("spine005");
  let headBone = character?.getObjectByName("spine006");
  let monitorGroup = character?.getObjectByName("Plane004") || character?.getObjectByName("Plane.004");
  let keyboardObj = character?.getObjectByName("Keyboard") || character?.getObjectByName("keyboard");
  if (window.innerWidth > 1024) {
    if (character) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "30%" }, { y: "0%" }, 0);

      tl2
        .to(
          camera.position,
          { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
          0
        )
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0);
      if (neckBone) {
        tl2.to(neckBone.rotation, { x: 0.6, delay: 2, duration: 3 }, 0);
      }
      if (monitor?.material) {
        tl2.to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0);
      }
      if (screenLight?.material) {
        tl2.to(screenLight.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0);
      }
      tl2
        .fromTo(
          ".what-box-in",
          { display: "none" },
          { display: "flex", duration: 0.1, delay: 6 },
          0
        );
      if (monitor?.position) {
        tl2.fromTo(
          monitor.position,
          { y: -10, z: 2 },
          { y: 0, z: 0, delay: 1.5, duration: 3 },
          0
        );
      }
      tl2.fromTo(
        ".character-rim",
        { opacity: 1, scaleX: 1.4 },
        { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
        0.3
      );

      tl3
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
        .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);

      const tlEdu = gsap.timeline({
        scrollTrigger: {
          trigger: ".education-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
          onEnter: () => {
            if (character) {
              character.userData.isStudyingMode = true;
              character.userData.setTypingActive?.(false);
            }
          },
          onEnterBack: () => {
            if (character) {
              character.userData.isStudyingMode = true;
              character.userData.setTypingActive?.(false);
            }
          },
          onLeave: () => {
            if (character) {
              character.userData.isStudyingMode = false;
              character.userData.setTypingActive?.(false);
            }
          },
          onLeaveBack: () => {
            if (character) {
              character.userData.isStudyingMode = false;
              character.userData.setTypingActive?.(true);
            }
          },
        },
      });

      // 1. Make avatar small and glide cleanly to the far left (no overlap with heading/navbar)
      tlEdu
        .to(
          ".character-model",
          {
            x: "-38%",
            y: "14%",
            scale: 0.66,
            opacity: 1,
            duration: 2.5,
            ease: "power2.out",
          },
          0
        )
        .to(character.rotation, { y: 1.18, x: 0.16, duration: 2.5, ease: "power2.inOut" }, 0)
        .to(camera.position, { z: 58, y: 7.4, duration: 2.5, ease: "power2.inOut" }, 0);

      // 2. Stop laptop typing animation and switch to studying
      const typingProxy = { weight: 1 };
      tlEdu.to(
        typingProxy,
        {
          weight: 0,
          duration: 0.6,
          ease: "power2.out",
          onUpdate: () => {
            if (character?.userData?.setTypingActive) {
              if (typingProxy.weight <= 0.2) {
                character.userData.setTypingActive(false);
              }
            }
          },
        },
        0
      );

      // 3. Hide the laptop monitor, screenlight, and keyboard in education section
      if (monitorGroup) {
        tlEdu.to(monitorGroup.position, { y: -20, duration: 0.8 }, 0);
      }
      if (monitor?.material) {
        tlEdu.to(monitor.material, { opacity: 0, duration: 0.8 }, 0);
      }
      if (screenLight?.material) {
        tlEdu.to(screenLight.material, { opacity: 0, duration: 0.8 }, 0);
      }
      if (keyboardObj) {
        tlEdu.to(keyboardObj.position, { y: -20, duration: 0.8 }, 0);
      }
      character?.traverse((child: any) => {
        if (child.name && child.name.startsWith("KEYS")) {
          tlEdu.to(child.position, { y: -20, duration: 0.8 }, 0);
        }
      });

      // 4. Avatar tilts head down studying the open book on the table
      if (neckBone) {
        tlEdu.to(neckBone.rotation, { x: 0.96, y: -0.06, duration: 2, ease: "power2.out" }, 0);
      }
      if (headBone) {
        tlEdu.to(headBone.rotation, { x: 0.35, duration: 2, ease: "power2.out" }, 0);
      }

      // 5. Smoothly open the 3D book on the table with warm study lamp glow
      const bookProxy = { progress: 0 };
      tlEdu.to(
        bookProxy,
        {
          progress: 1,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => {
            studyBook?.openBook(bookProxy.progress);
          },
        },
        0.2
      );

      // 6. Smoothly close book & transition avatar upward when leaving education towards career:
      tlEdu
        .to(
          bookProxy,
          {
            progress: 0,
            duration: 0.8,
            onUpdate: () => {
              studyBook?.openBook(bookProxy.progress);
            },
          },
          3.2
        )
        .to(
          typingProxy,
          {
            weight: 1,
            duration: 0.8,
            onUpdate: () => {
              if (character?.userData?.typingAction) {
                character.userData.typingAction.setEffectiveWeight(typingProxy.weight);
              }
            },
          },
          3.2
        )
        .to(
          ".character-model",
          { y: "-120%", opacity: 0, duration: 2.5, ease: "power2.in" },
          3.6
        );
    }
  } else {
    if (character) {
      const tM2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".what-box-in",
          start: "top 70%",
          end: "bottom top",
        },
      });
      tM2.to(".what-box-in", { display: "flex", duration: 0.1, delay: 0 }, 0);
    }
  }
}

export function setAllTimeline() {
  const eduTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".education-section",
      start: "top 75%",
      end: "center center",
      scrub: false,
    },
  });
  eduTimeline.fromTo(
    ".education-card",
    { opacity: 0, y: 40, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
  );

  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )

    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}
