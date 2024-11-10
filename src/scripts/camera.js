import * as THREE from "three";
import { gui, debug } from "./gui";
import sizes from "./resize";

debug.camera = {
  fov: 75,
  aspect: sizes.width / sizes.height,
  near: 0.1,
  far: 1000,
};

//camera
const perspectiveCamera = new THREE.PerspectiveCamera(
  debug.camera.fov,
  debug.camera.aspect,
  debug.camera.near,
  debug.camera.far
);

const cameraTweaks = gui.addFolder("camera");
cameraTweaks
  .add(debug.camera, "fov")
  .min(10)
  .max(100)
  .step(5)
  .name("field of view")
  .onChange((fov) => {
    perspectiveCamera.fov = fov;
    perspectiveCamera.aspect = sizes.width / sizes.height;
    perspectiveCamera.updateProjectionMatrix();
  });

export { perspectiveCamera };
