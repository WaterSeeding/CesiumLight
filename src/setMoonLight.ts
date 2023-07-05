import * as Cesium from "cesium";
import { viewer } from "./main";
import { getMoonDirection } from "./getMoonDirection";

export const setMoonLight = (): Cesium.DirectionalLight => {
  const moonLight = new Cesium.DirectionalLight({
    direction: getMoonDirection(viewer), // Updated every frame
    color: new Cesium.Color(0.9, 0.925, 1.0),
    intensity: 0.5,
  });
  return moonLight;
};
