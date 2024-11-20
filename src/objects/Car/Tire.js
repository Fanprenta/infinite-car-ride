import { RealObject } from "../RealObject";
import * as THREE from "three";
import _ from "lodash";

export class Tire extends RealObject {
  #defaults = {
    x: 2.7,
    //y: 1.5,
    //z: 2,
    color: "grey",
  };

  constructor(config = {}) {
    super();
    this.#build(_.merge(this.#defaults, config));
  }

  #build = ({ x, y, z }) => {
    this.mesh = new THREE.Mesh(
      //geom
      new THREE.TorusGeometry(x, x * 0.512), //(2.7, 1.35, 11, 55),

      //mat
      new THREE.MeshBasicMaterial({ color: "grey" })
    );
  };
}
