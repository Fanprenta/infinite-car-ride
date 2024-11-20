import * as THREE from "three";
import { HubCap } from "./HubCap";
import { Tire } from "./Tire";
import { RealObject } from "../RealObject";
import { Bolt } from "./Bolt";
import _ from "lodash";
import { PositionHelper } from "../../helpers/PositionHelper";

export class Wheel extends RealObject {
  constructor(config = {}) {
    const defaults = {
      hubCap: {},
      tire: {},
    };
    super(defaults, config);
    this.#build(this.config);
  }

  #build = ({ hubCap, tire, bolt }) => {
    const hubcapObject = new HubCap(hubCap);
    const tireObject = new Tire(tire);
    const backTopBoltObject = new Bolt(bolt);
    const frontTopBoltObject = new Bolt(bolt);
    const backBottomBoltObject = new Bolt(bolt);
    const frontBottomBoltObject = new Bolt(bolt);

    const posHelper = new PositionHelper({
      backTopBoltPosition: [
        (Math.cos(Math.PI * 0.25) * hubcapObject.x) / 2,
        (Math.sin(Math.PI * 0.25) * hubcapObject.x) / 2,
        (hubcapObject.y / 2) * (this.config.side === "left" ? -1 : 1),
      ],
      frontTopBoltPosition: [
        (Math.cos(Math.PI * 0.75) * hubcapObject.x) / 2,
        (Math.sin(Math.PI * 0.75) * hubcapObject.x) / 2,
        (hubcapObject.y / 2) * (this.config.side === "left" ? -1 : 1),
      ],
      backBottomBoltPosition: [
        (Math.cos(Math.PI * 1.25) * hubcapObject.x) / 2,
        (Math.sin(Math.PI * 1.25) * hubcapObject.x) / 2,
        (hubcapObject.y / 2) * (this.config.side === "left" ? -1 : 1),
      ],
      frontBottomBoltPosition: [
        (Math.cos(Math.PI * 1.75) * hubcapObject.x) / 2,
        (Math.sin(Math.PI * 1.75) * hubcapObject.x) / 2,
        (hubcapObject.y / 2) * (this.config.side === "left" ? -1 : 1),
      ],
    });

    const wheel = new THREE.Group();
    wheel.add(
      hubcapObject.mesh,
      tireObject.mesh,
      backTopBoltObject.mesh,
      frontTopBoltObject.mesh,
      backBottomBoltObject.mesh,
      frontBottomBoltObject.mesh
    );
    backTopBoltObject.mesh.rotation.x = Math.PI / 2;
    frontTopBoltObject.mesh.rotation.x = Math.PI / 2;
    backBottomBoltObject.mesh.rotation.x = Math.PI / 2;
    frontBottomBoltObject.mesh.rotation.x = Math.PI / 2;
    posHelper
      .place(backTopBoltObject, "center")
      .at(hubcapObject, "backTopBoltPosition")
      .place(frontTopBoltObject, "center")
      .at(hubcapObject, "frontTopBoltPosition")
      .place(backBottomBoltObject, "center")
      .at(hubcapObject, "backBottomBoltPosition")
      .place(frontBottomBoltObject, "center")
      .at(hubcapObject, "frontBottomBoltPosition");

    this.mesh = wheel;
  };
}
