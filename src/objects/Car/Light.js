import * as THREE from "three";
import _ from "lodash";
import { RealObject } from "../RealObject";
import { PositionHelper } from "../../helpers/PositionHelper";
import { gui, debug } from "../../scripts";
import { scene } from "../../scripts";

export class Light extends RealObject {
  constructor(config = {}) {
    const defaults = {
      sizes: { radius: 0.15625, height: 0.125 },
      color: "purple",
    };
    super(defaults, config);
    this.build(this.config);
  }

  createLight = (config) => {
    const { color, intensity, angle, shadow, bulb } = _.merge(
      {
        color: 0xffffff,
        intensity: 20,
        angle: Math.PI / 8,
        shadow: true,
      },
      config
    );

    const spotLight = new THREE.SpotLight(color, intensity);
    spotLight.angle = angle;
    spotLight.castShadow = shadow;

    debug.intensity = 300;
    debug.angle = Math.PI / 2;

    gui
      .add(debug, "intensity")
      .min(0)
      .max(300)
      .step(5)
      .onChange((i) => {
        debug.intensity = i;
        spotLight.intensity = i;
      })
      .name("light-intensity");

    gui
      .add(debug, "angle")
      .min(0)
      .max(Math.PI / 2)
      .step(0.125)
      .onChange((a) => {
        debug.angle = a;
        spotLight.angle = a;
      })
      .name("light-angle");

    // spotLight.position.set(...bulb.position);

    // spotLight.target.position.set(
    //   bulb.position.x + 1,
    //   bulb.position.y + 1,
    //   bulb.position.z + 1
    // );

    return spotLight;
  };

  build = ({ sizes, color }) => {
    const lightBulb = new THREE.Mesh(
      new THREE.CylinderGeometry(sizes.radius, sizes.radius, sizes.height),
      new THREE.MeshBasicMaterial({ color })
    );

    const spotLight = this.createLight({ bulb: lightBulb });

    lightBulb.add(spotLight);
    lightBulb.add(spotLight.target);

    const lightGroup = new THREE.Group();
    lightGroup.add(lightBulb, spotLight);

    lightGroup.rotation.z = -Math.PI * 0.5;
    lightGroup.rotation.y = 0.5 * Math.PI;

    // spotLight.rotation.z = Math.PI * 0.5;
    // spotLight.target.rotation.z = Math.PI * 0.5;

    this.mesh = lightGroup;

    // const lightsParts = {
    //   left: [0.7, 2],
    //   right: [-0.7, 2],
    // };

    // _.keys(lightsParts).map((part) => {
    //   const light = new THREE.Mesh(geometry, material);
    //   light.position.x = lightsParts[part][0];
    //   light.position.y = 0.35;
    //   light.position.z = lightsParts[part][1];
    //   light.rotation.x = Math.PI * 0.5;
    //   //pointLight
    //   const spotLight = new THREE.SpotLight(0xffffff, 300);
    //   spotLight.angle = Math.PI / 2;
    //   spotLight.castShadow = true;

    //   spotLight.position.set(
    //     light.position.x,
    //     light.position.y,
    //     light.position.z
    //   );

    //   spotLight.target.position.set(
    //     spotLight.position.x + 1,
    //     spotLight.position.y + 1,
    //     spotLight.position.z + 1
    //   );

    //   light.add(spotLight);
    //   light.add(spotLight.target);
    //   lightsParts[part] = light;
    // });

    // const lights = new THREE.Group();
    // lights.add(..._.values(lightsParts));
  };
}
