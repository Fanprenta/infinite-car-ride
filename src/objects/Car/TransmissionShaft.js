import { RealObject } from "../RealObject";
import * as THREE from "three";

export class TransmissionShaft extends RealObject {
  constructor(config = {}) {
    const defaults = {
      x: 1.75,
      y: 0.25,
      z: 4,
      color: "orange",
    };
    super(defaults, config);

    return this.build(this.config);
  }

  build = ({ x, y, z, color }) => {
    this.mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(x, y, z),
      new THREE.MeshBasicMaterial({ color })
    );
  };
}
