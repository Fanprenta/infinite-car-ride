import * as THREE from "three";
import { gui } from "../../scripts";
import _ from "lodash";
import { scene } from "../../scripts";
import { RealObject } from "../RealObject";
import { Chassis } from "./Chassis";
import { Bodywork } from "./Bodywork";
import { Windshield } from "./Windshield";
import { PositionHelper } from "../../helpers/PositionHelper";
import { HubCap } from "./HubCap";

export class Car extends RealObject {
  constructor(config = {}) {
    const defaults = {
      chassis: {
        transmissionShaft: {},
        wheel: {
          hubCap: {},
          tire: {},
        },
        bottomPlate: {
          x: 1.8,
          y: 0.2,
          z: 3,
        },
      },
      bodywork: {
        roof: {
          // x: 2,
          y: 0.2,
          // z: 1.5,
        },
        side: {
          sideBase: { x: 2, y: 0.5 },
          //z: 6,}
        },
        connector: {
          //x: 0.2,
          y: 1,
          //z: 0.2,
        },
        color: "blue",
      },
      // light: {
      //   sizes: { radius: 0.15625, height: 0.125 },
      //   color: "purple",
      // },
    };

    super(defaults, config);

    return this.build(this.config);
  }

  run = (delta) => {
    this.chassis.rollWheels(delta);
    this.chassis.turnWheels();

    const coords = {
      x: Math.cos(delta * 2) * 3,
      z: Math.sin(delta * 2) * 3,
      y: 0,
      rotationY: -delta * 2,
    };

    this.mesh.position.x = Math.cos(delta * 2) * 3;
    this.mesh.position.z = Math.sin(delta * 2) * 3;
    this.mesh.rotation.y = -delta * 2;

    return coords;
  };

  build = ({ chassis, bodywork }) => {
    //chassis:
    const chassisObject = new Chassis(chassis);

    this.chassis = chassisObject;
    console.log(bodywork);
    //bodywork:
    const bodyworkObject = new Bodywork(bodywork);

    const carGroup = new THREE.Group();
    carGroup.add(bodyworkObject.mesh, chassisObject.mesh);

    this.mesh = carGroup;

    const posHelper = new PositionHelper({});
    posHelper;
  };
}
