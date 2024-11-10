import * as THREE from "three";
import { render, scene, cameras } from "./index";

const clock = new THREE.Clock();

export const tick = (callback) => {
  const delta = clock.getElapsedTime();
  callback(delta);
  render(cameras["perspectiveCamera"]);
  window.requestAnimationFrame(() => tick(callback));
};
