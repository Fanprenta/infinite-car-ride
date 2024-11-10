import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { canvas, cameras } from "./index";

const orbitControls = new OrbitControls(cameras["perspectiveCamera"], canvas);
const controlObject = {
  orbitControls,
};

export const controls = (type) => {
  return controlObject[type];
};
