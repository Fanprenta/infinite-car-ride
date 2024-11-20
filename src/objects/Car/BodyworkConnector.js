import { RealObject } from "../RealObject";
import _ from "lodash";
import * as THREE from "three";

export class BodyworkConnector extends RealObject {
  constructor(config = {}) {
    const defaults = {
      x: 0.2,
      y: 0.75,
      z: 0.2,
      color: "red",
    };
    super(defaults, config);
    return this.build(this.config);
  }

  build = ({ x, y, z, color }) => {
    const material = new THREE.MeshBasicMaterial({ color });
    const connectorGeometry = new THREE.BoxGeometry(x, y, z);
    this.mesh = new THREE.Mesh(connectorGeometry, material);
  };
}
