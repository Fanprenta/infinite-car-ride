//app lives here
import { scene, cameras, windowEvents, controls, tick, gui } from "./scripts";
import { Car, testObject } from "./objects";
import _ from "lodash";

//camera
const camera = cameras["perspectiveCamera"];
camera.position.z = 5;
scene.add(camera);

//controls
controls("orbitControls");

//objects

const car = new Car();
//car.rotation.y = Math.PI / 2;
// const anotherCar = new Car({
//   chassis: {
//     color: "rgb(0,128,128)",
//   },
//   bodywork: {
//     color: "rgb(255,72,72)",
//   },
// });
// anotherCar.position.x = 5;
car.rotation.y = Math.PI / 2;
testObject.position.x = 10;
//const obj2 = testObject.clone();

const car2 = new Car();
const car3 = new Car();
const car4 = new Car();
const car5 = new Car();

scene.add(car, testObject, car2, car3, car4, car5);
car2.rotation.y = Math.PI / 2;
car3.rotation.y = Math.PI / 2;
car4.rotation.y = Math.PI / 2;
car5.rotation.y = Math.PI / 2;
car2.position.set(8, 0, -3);

//animation
tick((delta) => {
  car.position.x = delta * 5;
  camera.position.set(..._.values(car.position));
  camera.position.y += 0.75;
  camera.rotation.y = -0.5 * Math.PI;
  camera.updateProjectionMatrix();
});

//resize, fullscreen, gui
windowEvents(camera);
