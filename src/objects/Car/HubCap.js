import { RealObject } from "../RealObject";
import * as THREE from "three";
import _ from "lodash";
import { Bolt } from "./Bolt";
import { PositionHelper } from "../../helpers/PositionHelper";

export class HubCap extends RealObject {
  #defaults = {
    x: 2.2,
    color: "blue",
  };

  constructor(config = {}) {
    super();
    this.#build(_.merge(this.#defaults, config));
  }

  #build = ({ x, color }) => {
    this.mesh = new THREE.Mesh(
      new THREE.TorusGeometry(x, (x * 3) / 4, 4),
      new THREE.MeshBasicMaterial({ color })
    );

    this.x = x;
    this.y = x;
    this.z = x / 8;
  };
}
