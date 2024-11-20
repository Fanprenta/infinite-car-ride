//app lives here
import * as THREE from "three";
import {
  scene,
  cameras,
  windowEvents,
  controls,
  tick,
  gui,
  debug,
} from "./scripts";
import { Car } from "./objects/Car/Car";
import { Light } from "./objects/Car/Light";
import _ from "lodash";

//camera
const camera = cameras["perspectiveCamera"];
camera.position.z = 5;
scene.add(camera);

//controls
controls("orbitControls");

//objects
const car = new Car({
  bodywork: {
    side: { y: 0.75, z: 3.8 },
    bodyworkCabin: { connector: { y: 0.9, x: 0.15 } },
    headLight: {
      intensity: 0,
    },
  },
  chassis: {
    bottomPlate: {
      // z: 3.5,
    },
    wheel: {
      hubCap: { x: 0.25, color: new THREE.Color("rgb(73,73,73)") },
      tire: { x: 0.35 },
    },
    transmissionShaft: {
      color: "green",
    },
  },
});

car.mesh.rotation.y = Math.PI * 1.7;

gui
  .add(car.mesh.rotation, "y")
  .min(0)
  .max(Math.PI * 2)
  .step(Math.PI * 0.125)
  .name("car-rotation");

scene.add(car.mesh);

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((val) => {
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    new THREE.MeshToonMaterial({ color: "blue" })
  );
  sphere.position.x = Math.cos(Math.PI * 0.125 * val) * 5;
  sphere.position.z = Math.sin(Math.PI * 0.125 * val) * 5;

  scene.add(sphere);
});

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1),
  new THREE.MeshToonMaterial({ color: "blue" })
);

//animation
tick((delta) => {
  const coords = car.run(delta);
  // camera.position.set(Math.cos(delta * 2) * 3, 1, Math.sin(delta * 2) * 3);
  // camera.rotation.y = -delta * 2;
});

//resize, fullscreen, gui
windowEvents(camera);
