import { canvas } from "./index";

export const fullscreen = () => {
  const fullScreenElement =
    document.fullscreenElement || document.fullscreenWebkitElement;

  //close
  if (fullScreenElement) {
    document.webkitExitFullscreen
      ? document.webkitExitFullscreen()
      : document.exitFullscreen();
  }
  //open
  else {
    canvas.webkitRequestFullscreen
      ? canvas.webkitRequestFullscreen()
      : canvas.requestFullscreen();
  }
};
