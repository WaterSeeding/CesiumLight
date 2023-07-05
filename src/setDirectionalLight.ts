import * as Cesium from "cesium";
import { getPosition } from "./getPosition";

export const setDirectionalLight = (): Cesium.DirectionalLight => {
  let directionalLightDestination = new Cesium.Cartesian3(
    0.2454278300540191,
    0.8842635425193919,
    0.39729481195458805
  );

  let defaultDirectionalLightDestination = getPosition(
    directionalLightDestination
  );

  console.log('defaultDirectionalLightDestination 1', defaultDirectionalLightDestination);

  defaultDirectionalLightDestination.height = -defaultDirectionalLightDestination.height

  console.log('defaultDirectionalLightDestination 2', defaultDirectionalLightDestination);

  const directionalLight = new Cesium.DirectionalLight({
    direction: Cesium.Cartesian3.fromDegrees(
      defaultDirectionalLightDestination.longitude,
      defaultDirectionalLightDestination.latitude,
      defaultDirectionalLightDestination.height
    ),
  });
  return directionalLight;
};
