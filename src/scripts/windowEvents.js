import { scene, resize, fullscreen, guiHandler } from "./index";

export const windowEvents = (camera) => {
  window.addEventListener("resize", () => resize(scene, camera));
  window.addEventListener("dblclick", () => fullscreen());
  window.addEventListener("keydown", (e) => guiHandler(e.key));
};
