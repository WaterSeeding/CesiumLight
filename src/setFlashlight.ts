import * as Cesium from "cesium";
import { getPosition } from "./getPosition";

export const setFlashlight = (scene: Cesium.Scene): Cesium.DirectionalLight => {
  let flashlightDestination = scene.camera.directionWC;

  let defaultFlashlightDestination = getPosition(flashlightDestination);

  const flashlight = new Cesium.DirectionalLight({
    // Updated every frame
    direction: Cesium.Cartesian3.fromDegrees(
      defaultFlashlightDestination.longitude,
      defaultFlashlightDestination.latitude,
      defaultFlashlightDestination.height
    ),
  });

  return flashlight;
};
