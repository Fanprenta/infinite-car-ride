import { PositionHelper } from "../../helpers/PositionHelper";
import { RealObject } from "../RealObject";
import * as THREE from "three";
import { TransmissionShaft } from "./TransmissionShaft";
import { Wheel } from "./Wheel";
import { BottomPlate } from "./BottomPlate";
import _ from "lodash";

export class Chassis extends RealObject {
  constructor(config = {}) {
    const defaults = {
      transmissionShaft: {
        x: 0.125,
        y: 0.125,
        color: "red",
      },
      wheel: { hubCap: {}, tire: {} },
    };
    super(defaults, config);

    return this.build(this.config);
  }

  turnWheels = (delta) => {
    this.frontWheels.map(({ mesh }) => (mesh.rotation.x = Math.PI * 0.5));
  };
  rollWheels = (delta) => {
    this.frontWheels.map(({ mesh }) => (mesh.rotation.z = Math.PI * delta * 2));
    this.backWheels.map(({ mesh }) => (mesh.rotation.z = Math.PI * delta * 2));
  };

  build = ({ transmissionShaft, wheel, bottomPlate }) => {
    const shaftConfig = _.merge({ z: bottomPlate.x * 1.15 }, transmissionShaft);

    const transmission_shaft_front = new TransmissionShaft(shaftConfig);
    const transmission_shaft_back = new TransmissionShaft(shaftConfig);

    const front_left_wheel = new Wheel(_.merge({ side: "left" }, wheel));
    const front_right_wheel = new Wheel(_.merge({ side: "right" }, wheel));
    const back_left_wheel = new Wheel(_.merge({ side: "left" }, wheel));
    const back_right_wheel = new Wheel(_.merge({ side: "right" }, wheel));

    this.frontWheels = [front_left_wheel, front_right_wheel];
    this.backWheels = [back_left_wheel, back_right_wheel];

    const bottomPlateObject = new BottomPlate(bottomPlate);

    const chassisGroup = new THREE.Group();

    chassisGroup.add(
      transmission_shaft_front.mesh,
      transmission_shaft_back.mesh,
      bottomPlateObject.mesh,
      front_left_wheel.mesh,
      front_right_wheel.mesh,
      back_left_wheel.mesh,
      back_right_wheel.mesh
    );

    const posHelper = new PositionHelper({
      center: [0, 0, 0],
      frontAxis: [0, bottomPlate.y / 2, (bottomPlate.z / 2) * 0.65],
      backAxis: [0, bottomPlate.y / 2, -(bottomPlate.z / 2) * 0.65],
      frontLeftWheel: [
        (-bottomPlate.x / 2) * 1.045,
        bottomPlate.y / 2,
        (bottomPlate.z / 2) * 0.65,
      ],
      frontRightWheel: [
        (bottomPlate.x / 2) * 1.045,
        bottomPlate.y / 2,
        (bottomPlate.z / 2) * 0.65,
      ],
      backLeftWheel: [
        (-bottomPlate.x / 2) * 1.045,
        bottomPlate.y / 2,
        -(bottomPlate.z / 2) * 0.65,
      ],
      backRightWheel: [
        (bottomPlate.x / 2) * 1.045,
        bottomPlate.y / 2,
        -(bottomPlate.z / 2) * 0.65,
      ],
    });

    posHelper
      .place(transmission_shaft_front, "center")
      .at(bottomPlateObject, "frontAxis")
      .place(transmission_shaft_back, "center")
      .at(bottomPlateObject, "backAxis")
      .place(front_left_wheel, "center")
      .at(bottomPlateObject, "frontLeftWheel")
      .place(front_right_wheel, "center")
      .at(bottomPlateObject, "frontRightWheel")
      .place(back_left_wheel, "center")
      .at(bottomPlateObject, "backLeftWheel")
      .place(back_right_wheel, "center")
      .at(bottomPlateObject, "backRightWheel");

    front_left_wheel.mesh.rotation.y = Math.PI * 0.5;
    back_left_wheel.mesh.rotation.y = Math.PI * 0.5;
    front_right_wheel.mesh.rotation.y = Math.PI * 0.5;
    back_right_wheel.mesh.rotation.y = Math.PI * 0.5;

    transmission_shaft_front.mesh.rotation.z = Math.PI * 0.5;
    transmission_shaft_back.mesh.rotation.z = Math.PI * 0.5;

    this.mesh = chassisGroup;
  };
}
