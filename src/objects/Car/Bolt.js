import * as THREE from "three";
import { RealObject } from "../RealObject";
import _ from "lodash";

export class Bolt extends RealObject {
  #defaults = {
    x: 0.05,
    y: 0.05,
    z: 0.05,
    color: "yellow",
  };

  constructor(config = {}) {
    super();
    this.#build(_.merge(this.#defaults, config));
  }

  #build = ({ x, y, z, color }) => {
    this.mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(x, y, z),
      new THREE.MeshBasicMaterial({
        color,
      })
    );
  };
}
