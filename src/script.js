//app lives here
import { scene, cameras, windowEvents, controls, tick, gui } from "./scripts";
import { Car } from "./objects";

//camera
const camera = cameras["perspectiveCamera"];
camera.position.z = 5;
scene.add(camera);

//controls
controls("orbitControls");

//objects
const carConfig = {
  wheel: {
    radius: 0.4,
    color: "grey",
  },
  chassis: {
    size: {
      x: 2,
      y: 0.25,
      z: 4,
    },
    color: "orange",
  },
  bodywork: {
    roof: {
      x: 2,
      y: 0.2,
      z: 1.5,
    },
    sides: {
      x: 2,
      y: 0.5,
      z: 4,
    },
    connector: {
      x: 0.2,
      y: 1,
      z: 0.2,
    },
    color: "blue",
  },
  windshield: {
    sizes: {
      x: 1.75,
      y: 0.05,
      z: 0.3,
    },
    color: "white",
  },
};
const car = new Car(carConfig);
scene.add(car);

//animation
tick((delta) => {
  car.rotation.y = delta;
});

//resize, fullscreen, gui
windowEvents(camera);
