import { RealObject } from "../RealObject";
import _ from "lodash";
import * as THREE from "three";

export class BodyworkRoof extends RealObject {
  constructor(config = {}) {
    const defaults = {
      x: 2,
      y: 0.2,
      z: 1.5,
      color: "red",
    };
    super(defaults, config);
    return this.build(this.config);
  }

  build = ({ x, y, z, color }) => {
    const material = new THREE.MeshBasicMaterial({ color });
    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(x, y, z), material);
  };
}
