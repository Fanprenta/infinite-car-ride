import * as THREE from "three";

const loaderManager = new THREE.LoadingManager(
  () => {},
  () => {},
  (url) => {
    console.log(url);
  }
);

const loader = new THREE.TextureLoader(loaderManager);

//load basic texture
const colorTexture = loader.load("/textures/door/color.jpg");
colorTexture.colorSpace = THREE.SRGBColorSpace;

export { colorTexture };
