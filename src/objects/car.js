import * as THREE from "three";
import { gui } from "../scripts";
import _ from "lodash";
import { scene } from "../scripts";

export class Car {
  #defaults = {
    wheel: {
      radius: 0.4,
      color: "grey",
    },
    chassis: {
      size: {
        x: 2,
        y: 0.25,
        z: 4,
      },
      color: "orange",
    },
    bodywork: {
      roof: {
        x: 2,
        y: 0.2,
        z: 1.5,
      },
      sides: {
        x: 2,
        y: 0.5,
        z: 4,
      },
      connector: {
        x: 0.2,
        y: 1,
        z: 0.2,
      },
      color: "blue",
    },
    windshield: {
      sizes: {
        x: 1.75,
        y: 0.05,
        z: 0.3,
      },
      color: "white",
    },
    lights: {
      sizes: { radius: 0.15625, height: 0.125 },
      color: "purple",
    },
  };
  constructor(config = {}) {
    config = _.merge(this.#defaults, config);
    return this.#build([
      this.#buildWheel(config.wheel),
      this.#buildChassis(config.chassis),
      this.#buildBodywork(config.bodywork),
      this.#buildWindshield(config.windshield),
      this.#buildLights(config.lights),
    ]);
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
      opacity: 0.25,
    });

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
  #buildLights = ({ sizes, color }) => {
    const geometry = new THREE.CylinderGeometry(
      sizes.radius,
      sizes.radius,
      sizes.height
    );
    const material = new THREE.MeshBasicMaterial({ color });

    const lightsParts = {
      left: [0.7, 2],
      right: [-0.7, 2],
    };

    _.keys(lightsParts).map((part) => {
      const light = new THREE.Mesh(geometry, material);
      light.position.x = lightsParts[part][0];
      light.position.y = 0.35;
      light.position.z = lightsParts[part][1];
      light.rotation.x = Math.PI * 0.5;
      //pointLight
      const spotLight = new THREE.SpotLight(0xffffff, 300);
      spotLight.angle = Math.PI / 2;
      spotLight.castShadow = true;
      // const spotLightsFolder = gui.addFolder("spotLights");
      // spotLightsFolder
      //   .add(spotLight, "angle")
      //   .min(Math.PI / 3)
      //   .max(Math.PI * 2)
      //   .step(Math.PI / 3)
      //   .onFinishChange(() => {
      //     spotLight.updateMatrixWorld();
      //     spotLight.updateMatrixWorld();
      //   })
      //   .name("angle");

      spotLight.position.set(
        light.position.x,
        light.position.y,
        light.position.z
      );

      spotLight.target.position.set(
        spotLight.position.x + 1,
        spotLight.position.y + 1,
        spotLight.position.z + 1
      );

      light.add(spotLight);
      light.add(spotLight.target);
      lightsParts[part] = light;
    });

    const lights = new THREE.Group();
    lights.add(..._.values(lightsParts));

    return lights;
  };

  #build = (parts) => {
    //group everything
    const car = new THREE.Group();
    car.add(...parts);

    return car;
  };
}
