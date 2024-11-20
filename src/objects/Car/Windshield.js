import { RealObject } from "../RealObject";
import * as THREE from "three";

export class Windshield extends RealObject {
  constructor(config = {}) {
    const defaults = {
      x: 1.75,
      y: 0.05,
      z: 0.3,
      color: "white",
      opacity: 0.25,
    };
    super(defaults, config);

    return this.build(this.config);
  }

  build = ({ x, y, z, color, opacity }) => {
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
    });
    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(x, y, z), material);
  };
}
