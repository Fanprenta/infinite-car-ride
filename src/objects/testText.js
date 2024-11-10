import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const loader = new FontLoader();

export const loadText = (fontName, phrase, callback, config = {}) => {
  loader.load(`/fonts/${fontName}.typeface.json`, (font) => {
    const text = new THREE.Mesh(
      new TextGeometry(
        phrase,
        Object.assign(
          {
            font,
            size: 0.5,
            height: 0.5,
            curveSegments: 11,
          },
          config
        )
      ),
      new THREE.MeshBasicMaterial({ color: "white" })
    );

    callback(text);
  });
};
