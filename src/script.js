//app lives here
import { scene, cameras, windowEvents, controls, tick, gui } from "./scripts";
import { testObject, loadText } from "./objects";

//here be dragons!!!

//camera
const camera = cameras["perspectiveCamera"];
camera.position.z = 5;
scene.add(camera);

//controls
controls("orbitControls");

//objects
scene.add(testObject);
loadText("helvetiker_regular", "Base Project", (text) => {
  // text.center;
  text.position.set(-1.8, -1.4, -0.4);
  const textFolder = gui.addFolder("Text");

  textFolder
    .add(text.position, "x")
    .min(-5)
    .max(5)
    .step(0.2)
    .name("position-x");
  textFolder
    .add(text.position, "y")
    .min(-5)
    .max(5)
    .step(0.2)
    .name("position-y");
  textFolder
    .add(text.position, "z")
    .min(-5)
    .max(5)
    .step(0.2)
    .name("position-z");

  scene.add(text);
});

//animation
tick((delta) => {
  testObject.rotation.y = delta;
});

//resize, fullscreen, gui
windowEvents(camera);
