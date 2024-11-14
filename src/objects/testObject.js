import * as THREE from "three";
import { colorTexture, gui, debug } from "../scripts";
debug.testObject = {
  color: "red",
};

export const testObject = new THREE.Mesh(
  new THREE.BoxGeometry(1, 10, 1, 22, 22, 22),
  new THREE.MeshToonMaterial({
    color: debug.testObject.color,
    //map: colorTexture,
  })
);

const testObjectFolder = gui.addFolder("Test Object");

testObjectFolder
  .addColor(debug.testObject, "color")
  .onChange((c) => {
    testObject.material.color.set(debug.testObject.color);
  })
  .name("Color");
