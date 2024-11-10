import * as THREE from "three";
import { scene, sizes, canvas } from "./index";

//renderer
export const renderer = new THREE.WebGLRenderer({
  canvas,
});

export const render = (camera) => {
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
};
