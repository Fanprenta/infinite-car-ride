import { RealObject } from "../RealObject";
import _ from "lodash";
import * as THREE from "three";

export class BodyworkSide extends RealObject {
  constructor(config = {}) {
    const defaults = {
      x: 2,
      y: 0.025,
      z: 4,
      color: "blue",
    };
    super(defaults, config);
    return this.build(this.config);
  }

  build = ({ x, y, z, color }) => {
    const material = new THREE.MeshBasicMaterial({ color });
    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(x, y, z), material);
  };
}
