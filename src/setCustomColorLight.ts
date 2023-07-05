import * as Cesium from "cesium";
import { getPosition } from "./getPosition";

export const setCustomColorLight = (): Cesium.DirectionalLight => {
  let customColorLightDirection = new Cesium.Cartesian3(
    -0.2454278300540191,
    0.8842635425193919,
    0.39729481195458805
  );

  let defaultCustomColorLightDirection = getPosition(customColorLightDirection);
  const customColorLight = new Cesium.DirectionalLight({
    direction: Cesium.Cartesian3.fromDegrees(
      defaultCustomColorLightDirection.longitude,
      defaultCustomColorLightDirection.latitude,
      defaultCustomColorLightDirection.height
    ),
    color: Cesium.Color.fromCssColorString("#deca7c"),
  });
  return customColorLight;
};
