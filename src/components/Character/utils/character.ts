import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";
import { createStudyBook } from "./studyBook";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const setupCharacter = async (gltf: GLTF) => {
    const character = gltf.scene;
    try {
      await renderer.compileAsync(character, camera, scene);
    } catch (e) {
      console.warn("Renderer compilation warning:", e);
    }
    character.traverse((child: any) => {
      if (child.isMesh) {
        const mesh = child as THREE.Mesh;
        child.castShadow = true;
        child.receiveShadow = true;
        mesh.frustumCulled = true;
      }
    });
    const studyBook = createStudyBook();
    character.add(studyBook.group);
    character.userData.studyBook = studyBook;
    setCharTimeline(character, camera, studyBook);
    setAllTimeline();
    const footR = character.getObjectByName("footR");
    if (footR) footR.position.y = 3.36;
    const footL = character.getObjectByName("footL");
    if (footL) footL.position.y = 3.36;
    dracoLoader.dispose();
  };

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve) => {
      // 1. Attempt direct GLB load (fastest, no extra HEAD request)
      loader.load(
        "/models/character.glb",
        async (gltf) => {
          await setupCharacter(gltf);
          resolve(gltf);
        },
        undefined,
        async (error) => {
          console.warn("Direct GLB load failed, trying encrypted fallback:", error);
          // 2. Attempt encrypted fallback
          try {
            const encryptedBlob = await decryptFile(
              "/models/character.enc",
              "Character3D#@"
            );
            const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));
            loader.load(
              blobUrl,
              async (gltf) => {
                await setupCharacter(gltf);
                resolve(gltf);
              },
              undefined,
              (encErr) => {
                console.warn("Encrypted model fallback failed:", encErr);
                resolve(null);
              }
            );
          } catch (decryptErr) {
            console.warn("Decryption failed:", decryptErr);
            resolve(null);
          }
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
