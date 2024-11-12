import * as THREE from "three";
import { gui, debug } from "../scripts";

export class Car {
  constructor(config) {
    return this.#build({
      wheels: this.#buildWheel(config.wheel),
      chassis: this.#buildChassis(config.chassis),
      bodywork: this.#buildBodywork(config.bodywork),
      windshields: this.#buildWindshield(config.windshield),
    });
  }

  #buildWheel = ({ radius, color }) => {
    const wheelBoltsFolder = gui.addFolder("wheel-bolts");

    const geometry = new THREE.CylinderGeometry(radius, radius, radius * 0.75);
    const material = new THREE.MeshBasicMaterial({ color });
    const wheelParts = {
      frontLeft: [1, -1.25],
      frontRight: [1, 1.25],
      backLeft: [-1, -1.25],
      backRight: [-1, 1.25],
    };

    //actual wheel
    Object.keys(wheelParts).map((part) => {
      const wheel = new THREE.Mesh(geometry, material);
      wheel.position.x = wheelParts[part][0];
      wheel.position.z = wheelParts[part][1];
      wheel.rotation.z = 0.5 * Math.PI;

      const getBoltPosition = (mark) => {
        return [
          Math.cos(Math.PI * mark) * (radius * 0.5) + wheel.position.x * 1.25,
          Math.sin(Math.PI * mark) * (radius * 0.5) + wheel.position.y * 1.25,
          wheel.position.z * 0.9,
        ];
      };

      const wheelBoltParts = {
        one: getBoltPosition(0),
        two: getBoltPosition(0.25),
        three: getBoltPosition(0.5),
        four: getBoltPosition(0.75),
        five: getBoltPosition(1),
        six: getBoltPosition(1.25),
        seven: getBoltPosition(1.5),
        eight: getBoltPosition(1.75),
      };

      //wheel bolts
      Object.keys(wheelBoltParts).map((part) => {
        //const colorSpace = THREE.SRGBColorSpace;
        const wheelBolt = new THREE.Mesh(
          new THREE.CylinderGeometry(radius / 10, radius / 10, radius * 0.2),
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("rgb(64, 64, 64)"),
          })
        );
        wheelBolt.position.x = wheelBoltParts[part][0];
        wheelBolt.position.y = wheelBoltParts[part][1];
        wheelBolt.position.z = wheelBoltParts[part][2];
        wheelBolt.rotation.x = 0.5 * Math.PI;
        wheelBoltParts[part] = wheelBolt;
      });

      //group all bolts from one wheel:
      const boltsGroup = new THREE.Group();
      boltsGroup.add(...Object.values(wheelBoltParts));
      //wheelBolt.rotation.z = 0.5 * Math.PI;
      boltsGroup.rotation.y = 0.5 * Math.PI;
      //boltsGroup.position.x = 2.25;
      wheelBoltsFolder
        .add(boltsGroup.position, "x")
        .min(0)
        .max(3)
        .step(0.01)
        .name("x-position");

      //wheelBolt.rotation.x = 0.5 * Math.PI;

      //group wheel with wheel bolts
      const finalWheel = new THREE.Group();
      finalWheel.add(wheel, boltsGroup);

      wheelParts[part] = finalWheel;
    });

    //group everything
    const wheels = new THREE.Group();
    wheels.add(...Object.values(wheelParts));

    return wheels;
  };
  #buildChassis = ({ size, color }) => {
    return new THREE.Mesh(
      new THREE.BoxGeometry(size.x, size.y, size.z),
      new THREE.MeshBasicMaterial({ color })
    );
  };
  #buildBodywork = ({ roof, sides, connector, color }) => {
    const material = new THREE.MeshBasicMaterial({ color });

    //roof;
    const roofObject = new THREE.Mesh(
      new THREE.BoxGeometry(roof.x, roof.y, roof.z),
      material
    );

    //sides;
    const sidesObject = new THREE.Mesh(
      new THREE.BoxGeometry(sides.x, sides.y, sides.z),
      material
    );

    //connectors;
    const connectorGeometry = new THREE.BoxGeometry(
      connector.x,
      connector.y / 2,
      connector.z
    );

    const connectors = {
      frontLeft: [0.9, 0.75, -0.625],
      frontRight: [0.9, 0.75, 0.625],
      backLeft: [-0.9, 0.75, -0.625],
      backRight: [-0.9, 0.75, 0.625],
    };

    Object.keys(connectors).map((part) => {
      const connector = new THREE.Mesh(connectorGeometry, material);
      connector.position.x = connectors[part][0];
      connector.position.y = connectors[part][1];
      connector.position.z = connectors[part][2];
      connectors[part] = connector;
    });

    //group everything
    const bodywork = new THREE.Group();
    roofObject.position.y = 1;
    sidesObject.position.y = 0.375;
    bodywork.add(roofObject, sidesObject, ...Object.values(connectors));

    return bodywork;
  };
  #buildWindshield = ({ sizes, color }) => {
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.5,
    });

    //const windshieldGeometry = new THREE.BoxGeometry(sizes.x, sizes.y, sizes.z);
    const windshieldParts = {
      front: [0, 0.75, -0.72],
      right: [0.95, 0.75, 0.05],
      left: [-0.95, 0.75, -0.05],
      back: [0, 0.75, 0.72],
    };

    Object.keys(windshieldParts).map((part) => {
      const rightX =
        part === "front" || part === "back" ? sizes.x : sizes.x * 0.75;
      const windshield = new THREE.Mesh(
        new THREE.BoxGeometry(rightX, sizes.y, sizes.z),
        material
      );
      windshield.position.x = windshieldParts[part][0];
      windshield.position.y = windshieldParts[part][1];
      windshield.position.z = windshieldParts[part][2];
      if (part === "front" || part === "back") {
        windshield.rotation.x = Math.PI * 0.5;
      } else {
        windshield.rotation.x = Math.PI * 0.5;
        windshield.rotation.z = Math.PI * 0.5;
      }

      windshieldParts[part] = windshield;
    });

    //group everything
    const windshields = new THREE.Group();
    windshields.add(...Object.values(windshieldParts));

    return windshields;
  };
  #build = ({ wheels, chassis, bodywork, windshields }) => {
    //group everything
    const car = new THREE.Group();
    car.add(wheels, chassis, bodywork, windshields);

    return car;
  };

  //   #placeAt = ({ object, target, type, objectPart, targetPart }) => {
  //     //object center at the right corner of target
  //     //type: translate
  //     //objectPart: objectWidth / 2 , objectHeight / 2, objectDepth / 2 //OR USE FRUSTUM
  //     //targetPart: objectDepth /
  //   };
}
