import * as THREE from "three";
import _ from "lodash";

export class RealObject {
  // positions = {
  //   center: [0, 0, 0],
  //   ["center-left"]: [this.#w / 2, 0, 0],
  //   ["middle-height"]: [0, -this.#h / 2, 0],
  //   ["bottom"]: [0, -this.#h / 2, 0],
  //   ["bottom-back"]: [0, -this.#h / 2, this.#l / 2],
  //   // ["front-left-wheel"]: [w / 2, -(h / 2) * 0.9, (l / 2) * 0.6],
  //   // ["front-right-wheel"]: [-w / 2, -(h / 2) * 0.9, (l / 2) * 0.6],
  //   // ["back-left-wheel"]: [w / 2, -(h / 2) * 0.9, -(l / 2) * 0.6],
  //   // ["back-right-wheel"]: [-w / 2, -(h / 2) * 0.9, -(l / 2) * 0.6],
  //   ["outer-left-border"]: [this.#w / 2, 0, 0],
  //   ["outer-right-border"]: [-this.#w / 2, 0, 0],
  //   ["outer-right-border-back"]: [-this.#w / 2, 0, -this.#l / 2],
  //   ["outer-left-border-back"]: [this.#w / 2, 0, -this.#l / 2],
  //   ["top"]: [0, this.#h / 2, 0],
  //   ["back"]: [0, 0, -this.#l / 2],
  //   ["back-top"]: [0, this.#h / 2, -this.#l / 2],
  // };
  constructor(defaults, config) {
    this.config = _.merge(defaults, config);

    this.x = this.config.x;
    this.y = this.config.y;
    this.z = this.config.z;
  }
}
