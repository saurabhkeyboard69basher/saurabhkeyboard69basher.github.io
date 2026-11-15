import * as THREE from "three";

export interface StudyBookController {
  group: THREE.Group;
  openBook: (progress: number) => void;
  update: (elapsedTime: number) => void;
  lampLight: THREE.PointLight;
}

// Generate realistic academic page texture with chapter title, text lines & physics formulas
function createPageTexture(isLeft: boolean): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Warm cream page background
  ctx.fillStyle = "#faf6ed";
  ctx.fillRect(0, 0, 512, 512);

  // Subtle page margin line
  ctx.strokeStyle = "#e8dfcc";
  ctx.lineWidth = 1;
  ctx.strokeRect(30, 30, 452, 452);

  // Chapter Header
  ctx.fillStyle = "#553a6e";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText(
    isLeft ? "QUANTUM MECHANICS & DYNAMICS" : "DIGITAL BUSINESS & VALUATION",
    45,
    65
  );

  ctx.strokeStyle = "#aa42ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(45, 75);
  ctx.lineTo(465, 75);
  ctx.stroke();

  // Paragraph text lines (simulated printed text)
  ctx.fillStyle = "#3c3842";
  for (let y = 105; y < 320; y += 18) {
    const lineWidth = 380 + Math.sin(y * 11) * 35;
    ctx.fillRect(45, y, Math.min(lineWidth, 420), 4);
  }

  // Equations / formulas callout box
  ctx.fillStyle = "#f0e6fa";
  ctx.fillRect(45, 335, 420, 95);
  ctx.strokeStyle = "#cbb2e6";
  ctx.strokeRect(45, 335, 420, 95);

  ctx.fillStyle = "#2a1542";
  ctx.font = "italic 18px serif";
  if (isLeft) {
    ctx.fillText("iħ ∂ψ/∂t = (-ħ²/2m ∇² + V) ψ", 65, 370);
    ctx.fillText("E² = (pc)² + (m₀c²)²  |  S = k_B ln Ω", 65, 405);
  } else {
    ctx.fillText("NPV = ∑ [ CF_t / (1 + r)^t ] - C₀", 65, 370);
    ctx.fillText("Enterprise Value = Market Cap + Debt - Cash", 65, 405);
  }

  // Page numbers at bottom
  ctx.fillStyle = "#8a8294";
  ctx.font = "14px monospace";
  ctx.fillText(isLeft ? "p. 108" : "p. 109", isLeft ? 55 : 420, 465);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function createStudyBook(): StudyBookController {
  const group = new THREE.Group();
  group.name = "studyBookGroup";

  // Heavy academic leather cover material
  const coverMat = new THREE.MeshStandardMaterial({
    color: 0x24113a,
    roughness: 0.4,
    metalness: 0.25,
  });

  // Pages material (clean ivory with edge strata)
  const pageStackMat = new THREE.MeshStandardMaterial({
    color: 0xf5eedb,
    roughness: 0.8,
  });

  // Textures for open top faces
  const leftPageTex = createPageTexture(true);
  const rightPageTex = createPageTexture(false);

  const leftTopMat = new THREE.MeshStandardMaterial({
    map: leftPageTex,
    roughness: 0.65,
  });

  const rightTopMat = new THREE.MeshStandardMaterial({
    map: rightPageTex,
    roughness: 0.65,
  });

  // Multi-material for thick page stacks: [right, left, top, bottom, front, back]
  const leftMaterials = [
    pageStackMat,
    pageStackMat,
    leftTopMat,
    pageStackMat,
    pageStackMat,
    pageStackMat,
  ];

  const rightMaterials = [
    pageStackMat,
    pageStackMat,
    rightTopMat,
    pageStackMat,
    pageStackMat,
    pageStackMat,
  ];

  // Thick book dimensions: ~1.55 width, ~1.9 depth, ~0.24 thickness
  const stackWidth = 0.74;
  const stackHeight = 0.18; // Big & thick page stack!
  const stackDepth = 1.85;

  const stackGeo = new THREE.BoxGeometry(stackWidth, stackHeight, stackDepth);

  // Left page block (pivots near spine)
  const pivotLeft = new THREE.Group();
  pivotLeft.position.set(-0.02, 0, 0);

  const meshLeft = new THREE.Mesh(stackGeo, leftMaterials);
  meshLeft.position.set(-stackWidth / 2, stackHeight / 2, 0);
  meshLeft.castShadow = true;
  meshLeft.receiveShadow = true;
  pivotLeft.add(meshLeft);

  // Right page block
  const pivotRight = new THREE.Group();
  pivotRight.position.set(0.02, 0, 0);

  const meshRight = new THREE.Mesh(stackGeo, rightMaterials);
  meshRight.position.set(stackWidth / 2, stackHeight / 2, 0);
  meshRight.castShadow = true;
  meshRight.receiveShadow = true;
  pivotRight.add(meshRight);

  // Spine & hardback base
  const spineGeo = new THREE.BoxGeometry(0.1, stackHeight + 0.05, stackDepth + 0.05);
  const spineMesh = new THREE.Mesh(spineGeo, coverMat);
  spineMesh.position.y = stackHeight / 2;
  group.add(spineMesh);

  const coverBaseGeo = new THREE.BoxGeometry(stackWidth * 2 + 0.16, 0.04, stackDepth + 0.08);
  const coverBaseMesh = new THREE.Mesh(coverBaseGeo, coverMat);
  coverBaseMesh.position.y = -0.02;
  group.add(coverBaseMesh);

  // Animated turning page (flips from right to left while reading)
  const turningPagePivot = new THREE.Group();
  turningPagePivot.position.set(0, stackHeight + 0.005, 0);

  const turningPageMat = new THREE.MeshStandardMaterial({
    map: rightPageTex,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const turningPageGeo = new THREE.BoxGeometry(stackWidth * 0.98, 0.012, stackDepth * 0.98);
  const turningPageMesh = new THREE.Mesh(turningPageGeo, turningPageMat);
  turningPageMesh.position.set(stackWidth * 0.49, 0, 0);
  turningPagePivot.add(turningPageMesh);
  group.add(turningPagePivot);

  group.add(pivotLeft);
  group.add(pivotRight);

  // Soft warm study desk reading lamp light
  const lampLight = new THREE.PointLight(0xffe0a3, 0, 8, 1.8);
  lampLight.position.set(0, 0.8, 0.2);
  group.add(lampLight);

  // Initial flat table position (on desk surface in front of character)
  group.position.set(0.08, 9.15, 3.42);
  group.rotation.set(-0.05, -0.1, 0);

  // Initially closed / scaled down
  pivotLeft.rotation.z = Math.PI / 2;
  pivotRight.rotation.z = -Math.PI / 2;
  turningPagePivot.rotation.z = 0;
  group.scale.set(0.001, 0.001, 0.001);

  let isOpen = false;

  const openBook = (progress: number) => {
    const p = Math.max(0, Math.min(1, progress));
    if (p <= 0.01) {
      group.scale.set(0.001, 0.001, 0.001);
      lampLight.intensity = 0;
      isOpen = false;
      return;
    }

    isOpen = true;
    group.scale.set(1, 1, 1);

    // Book lifts up slightly from the desk and tilts towards the reader
    group.position.y = THREE.MathUtils.lerp(9.15, 9.28, p);
    group.position.z = THREE.MathUtils.lerp(3.42, 3.48, p);
    group.rotation.x = THREE.MathUtils.lerp(-0.05, -0.28, p); // Tilted up toward reader!

    // Pages unfold flat on the lifted book
    pivotLeft.rotation.z = THREE.MathUtils.lerp(Math.PI / 2, 0.05, p);
    pivotRight.rotation.z = THREE.MathUtils.lerp(-Math.PI / 2, -0.05, p);

    lampLight.intensity = p * 2.5;
  };

  // Smooth page-turning animation loop while reading
  const update = (elapsedTime: number) => {
    if (!isOpen) return;

    // A periodic page-turn cycle every 4.5 seconds
    const cycle = (elapsedTime % 4.5) / 4.5; // 0 to 1

    if (cycle < 0.35) {
      // Resting on right page reading
      turningPagePivot.rotation.z = 0.02;
    } else if (cycle < 0.75) {
      // Turning page from right (0) to left (Math.PI)
      const turnProgress = (cycle - 0.35) / 0.4;
      const smoothTurn = THREE.MathUtils.smoothstep(turnProgress, 0, 1);
      turningPagePivot.rotation.z = smoothTurn * Math.PI;
    } else {
      // Settled on left page
      turningPagePivot.rotation.z = Math.PI - 0.02;
    }
  };

  return {
    group,
    openBook,
    update,
    lampLight,
  };
}
