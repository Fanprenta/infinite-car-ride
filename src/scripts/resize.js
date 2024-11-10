import { renderer, cameras } from "./index";

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const resize = (scene, camera, cameraTypes = ["perspectiveCamera"]) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //handle camera updates
  cameraTypes.forEach((cameraType) => {
    const camera = cameras[cameraType];
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  });

  //handle renderer update
  renderer.setSize(sizes.width / sizes.height);
  renderer.setPixelRatio();
  renderer.render(scene, camera);
};
export default sizes;
export { resize };
