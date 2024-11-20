import { BodyworkConnector } from "./BodyworkConnector";
import { BodyworkRoof } from "./BodyworkRoof";
import { Windshield } from "./Windshield";
import { RealObject } from "../RealObject";
import _ from "lodash";
import * as THREE from "three";
import { PositionHelper } from "../../helpers/PositionHelper";

export class BodyworkCabin extends RealObject {
  constructor(config = {}) {
    const defaults = {
      roof: {
        x: 3,
        y: 0.2,
        z: 6,
      },
      connector: {
        x: 0.4,
        y: 6.75,
        z: 0.25,
      },
      windshield: {},
    };
    super(defaults, config);
    return this.build(this.config);
  }

  build = ({ roof, connector, windshield }) => {
    //roof
    const roofObject = new BodyworkRoof(roof);

    //connectors
    const frontLeftConnector = new BodyworkConnector(connector);
    const frontRightConnector = new BodyworkConnector(connector);
    const backLeftConnector = new BodyworkConnector(connector);
    const backRightConnector = new BodyworkConnector(connector);

    //windshields:
    const frontWindshield = new Windshield(
      _.merge({ x: roof.x - connector.x / 2, z: connector.y }, windshield)
    );
    const backWindshield = new Windshield(
      _.merge({ x: roof.x - connector.x / 2, z: connector.y }, windshield)
    );
    const leftWindshield = new Windshield(
      _.merge({ z: connector.y, x: roof.z - connector.x / 2 }, windshield)
    );
    const rightWindshield = new Windshield(
      _.merge({ z: connector.y, x: roof.z - connector.x / 2 }, windshield)
    );

    this.positions = {
      //connectors:
      frontLeftConnectorPlace: [
        -roofObject.x / 2,
        0, //-(-frontRightConnector.y + roofObject.y / 2),
        roofObject.z / 2 - frontLeftConnector.z / 2,
      ],
      frontRightConnectorPlace: [
        roofObject.x / 2,
        0, //-(-frontRightConnector.y + roofObject.y / 2),
        roofObject.z / 2 - frontRightConnector.z / 2,
      ],
      backLeftConnectorPlace: [
        -roofObject.x / 2,
        0, //-(-frontRightConnector.y + roofObject.y / 2),
        -roofObject.z / 2 + backLeftConnector.z / 2,
      ],
      backRightConnectorPlace: [
        roofObject.x / 2,
        0, //-(-frontRightConnector.y + roofObject.y / 2),
        -roofObject.z / 2 + backRightConnector.z / 2,
      ],
      connectorBottomLeft: [
        frontLeftConnector.x / 2,
        -frontLeftConnector.y / 2,
        0,
      ],
      connectorBottomRight: [
        -frontRightConnector.x / 2,
        -frontRightConnector.y / 2,
        0,
      ],
      //windshields
      frontWindshieldPlace: [
        0,
        -frontWindshield.z / 2,
        roofObject.z / 2 - frontWindshield.y,
      ],
      backWindshieldPlace: [
        0,
        -frontWindshield.z / 2,
        -(roofObject.z / 2 - frontWindshield.y),
      ],
      leftWindshieldPlace: [
        -roofObject.x / 2 + leftWindshield.y,
        -leftWindshield.z / 2,
        -roofObject.z / 2 + backLeftConnector.x / 2 + leftWindshield.x / 2,
      ],
      rightWindshieldPlace: [
        roofObject.x / 2 - rightWindshield.y,
        -rightWindshield.z / 2,
        -roofObject.z / 2 + backRightConnector.x / 2 + rightWindshield.x / 2,
      ],
    };

    const posHelper = new PositionHelper(this.positions);

    this.mesh = new THREE.Group();
    this.mesh.add(
      roofObject.mesh,
      frontLeftConnector.mesh,
      frontRightConnector.mesh,
      backLeftConnector.mesh,
      backRightConnector.mesh,
      frontWindshield.mesh,
      backWindshield.mesh,
      leftWindshield.mesh,
      rightWindshield.mesh
    );

    //manually set x, y, z for the whole bodywork:
    this.x = roofObject.x + frontLeftConnector.x;
    this.y = roofObject.y + frontLeftConnector.y;
    this.z = roofObject.z + frontLeftConnector.z;

    //move the whole mesh so its centered
    this.mesh.position.y = frontLeftConnector.y;

    posHelper
      //conectors
      .place(frontLeftConnector, "connectorBottomLeft")
      .at(roofObject, "frontLeftConnectorPlace")
      .place(frontRightConnector, "connectorBottomRight")
      .at(roofObject, "frontRightConnectorPlace")
      .place(backLeftConnector, "connectorBottomLeft")
      .at(roofObject, "backLeftConnectorPlace")
      .place(backRightConnector, "connectorBottomRight")
      .at(roofObject, "backRightConnectorPlace");

    posHelper
      .place(frontWindshield, "center")
      .at(roofObject, "frontWindshieldPlace")
      .place(backWindshield, "center")
      .at(roofObject, "backWindshieldPlace")
      .place(leftWindshield, "center")
      .at(roofObject, "leftWindshieldPlace")
      .place(rightWindshield, "center")
      .at(roofObject, "rightWindshieldPlace");

    frontWindshield.mesh.rotation.x = Math.PI * 0.5;
    backWindshield.mesh.rotation.x = Math.PI * 0.5;
    leftWindshield.mesh.rotation.x = Math.PI * 0.5;
    leftWindshield.mesh.rotation.z = Math.PI * 0.5;
    rightWindshield.mesh.rotation.x = Math.PI * 0.5;
    rightWindshield.mesh.rotation.z = Math.PI * 0.5;
  };
}
