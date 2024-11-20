import * as THREE from "three";
import _ from "lodash";

export class PositionHelper {
  positions = [];
  constructor(positions) {
    this.positions = positions;
  }
  place = (subject, subjectPosition) => {
    this.subject = subject;

    //if no position passed, will assume the center of the object
    this.subjectPosition = subjectPosition; //vector3
    return this;
  };

  at = (target, targetPosition) => {
    this.target = target;

    // same as before if no position passed assume center
    this.targetPosition = targetPosition; //vector3

    this.#setPosition();

    return this;
  };
  #resolveObjectPosition = (positionKeyword, object) => {
    const defaultPositions = {
      center: [0, 0, 0],
      ["center-left"]: [object.x / 2, 0, 0],
      ["middle-height"]: [0, -object.y / 2, 0],
      ["bottom"]: [0, -object.x / 2, 0],
      ["bottom-back"]: [0, -object.y / 2, object.z / 2],
      // ["front-left-wheel"]: [w / 2, -(h / 2) * 0.9, (l / 2) * 0.6],
      // ["front-right-wheel"]: [-w / 2, -(h / 2) * 0.9, (l / 2) * 0.6],
      // ["back-left-wheel"]: [w / 2, -(h / 2) * 0.9, -(l / 2) * 0.6],
      // ["back-right-wheel"]: [-w / 2, -(h / 2) * 0.9, -(l / 2) * 0.6],
      ["outer-left-border"]: [object.x / 2, 0, 0],
      ["outer-right-border"]: [-object.x / 2, 0, 0],
      ["outer-right-border-back"]: [-object.x / 2, 0, -object.z / 2],
      ["outer-left-border-back"]: [object.x / 2, 0, -object.z / 2],
      ["top"]: [0, object.y / 2, 0],
      ["back"]: [0, 0, -object.y / 2],
      ["back-top"]: [0, object.y / 2, -object.z / 2],
    };

    _.merge(this.positions, defaultPositions);

    return this.positions[positionKeyword ? positionKeyword : "center"];
  };

  #calculateFinalSubjectPosition = (
    resolvedSubjectPosition,
    resolvedTargetPosition
  ) => {
    return new THREE.Vector3().addVectors(
      new THREE.Vector3(...resolvedTargetPosition),
      new THREE.Vector3(...resolvedSubjectPosition)
    );
  };

  #setPosition = () => {
    let finalPosition = this.#calculateFinalSubjectPosition(
      this.#resolveObjectPosition(this.subjectPosition, this.subject),
      this.#resolveObjectPosition(this.targetPosition, this.target)
    );

    this.subject.mesh.position.set(..._.values(finalPosition));
  };
}
