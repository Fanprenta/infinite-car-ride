import { BodyworkSide } from "./BodyworkSide";
import { RealObject } from "../RealObject";
import _ from "lodash";
import * as THREE from "three";
import { PositionHelper } from "../../helpers/PositionHelper";
import { BodyworkCabin } from "./BodyworkCabin.js";
import { Light } from "./Light";
export class Bodywork extends RealObject {
  constructor(config = {}) {
    const defaults = {
      side: { color: "blue", x: 2, y: 0.5, z: 4 },
      bodyworkCabin: { connector: { y: 4 }, roof: { y: 0.3 } },
      headLight: {},
    };
    super(defaults, config);
    return this.build(this.config);
  }

  build = ({ bodyworkCabin, side, headLight }) => {
    //side
    const sideObject = new BodyworkSide(side);
    const bodyworkCabinObject = new BodyworkCabin(
      _.merge(
        {
          roof: { x: side.x, z: side.z / 2 },
          connector: {
            x: 0.25, //bodyworkCabin.connector.y / 4,
            z: 0.25, //bodyworkCabin.connector.y / 4,
          },
        },
        bodyworkCabin
      )
    );
    //headLights
    const rightHeadLight = new Light(headLight);
    const leftHeadLight = new Light(headLight);

    this.positions = {
      center: [0, 0, 0],
      cabinPlace: [0, -sideObject.y / 2, 0],
      rightHeadLightPlace: [
        -sideObject.x * 0.35,
        -sideObject.y / 2,
        sideObject.z / 2,
      ],
      leftHeadLightPlace: [
        sideObject.x * 0.35,
        -sideObject.y / 2,
        sideObject.z / 2,
      ],
    };

    const posHelper = new PositionHelper(this.positions);

    this.mesh = new THREE.Group();
    this.mesh.add(
      sideObject.mesh,
      bodyworkCabinObject.mesh,
      rightHeadLight.mesh,
      leftHeadLight.mesh
    );

    posHelper
      .place(rightHeadLight, "center")
      .at(sideObject, "rightHeadLightPlace")
      .place(leftHeadLight, "center")
      .at(sideObject, "leftHeadLightPlace")
      .place(sideObject, "center")
      .at(bodyworkCabinObject, "cabinPlace");

    this.mesh.position.y = side.y;
  };
}
