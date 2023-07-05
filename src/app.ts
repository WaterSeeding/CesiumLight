import "./app.css";
import * as Cesium from "cesium";
import * as dat from "dat.gui";
import { viewer } from "./main";
import { createModel } from "./model";
import { setCamera } from "./setCamera";
import { getMoonDirection } from "./getMoonDirection";
import { setDirectionalLight } from "./setDirectionalLight";
import { setFlashlight } from "./setFlashlight";
import { setMoonLight } from "./setMoonLight";
import { setCustomColorLight } from "./setCustomColorLight";
import { setTime, getTime, showTime } from "./time";
import { getPosition } from "./getPosition";

let targetRef: any = {
  getValue: (): any => {
    return null;
  },
};

let guiParams: { [key: string]: any } = {
  show: true,
  scale: 7.0,
};

let modelPosition = Cesium.Cartesian3.fromRadians(
  -2.1463338399937277,
  0.6677959688982861,
  32.18991401746337
);

let defaultModelPosition = getPosition(modelPosition);

createModel(
  viewer,
  "./static/CesiumBalloon.glb",
  Cesium.Cartesian3.fromDegrees(
    defaultModelPosition.longitude,
    defaultModelPosition.latitude,
    defaultModelPosition.height
  ),
  0.0,
  guiParams,
  targetRef
);

setCamera(viewer);

const scene = viewer.scene;
scene.globe.enableLighting = true;

const directionalLight = setDirectionalLight();

const flashlight = setFlashlight(scene);

const moonLight = setMoonLight();

const sunLight = new Cesium.SunLight();

const customColorLight = setCustomColorLight();

reset();

scene.preRender.addEventListener(function (scene, time) {
  if (scene.light === flashlight) {
    scene.light.direction = Cesium.Cartesian3.clone(
      scene.camera.directionWC,
      scene.light.direction
    );
  } else if (scene.light === moonLight) {
    scene.light.direction = getMoonDirection(viewer, scene.light.direction);
  }
});

function reset() {
  // Set scene defaults
  scene.light = sunLight;
  scene.globe.dynamicAtmosphereLighting = true;
  scene.globe.dynamicAtmosphereLightingFromSun = false;
  setTime(viewer);
}

const gui = new dat.GUI({ name: "Cesium GUI", width: 450, autoPlace: true });
gui.domElement.id = "gui";

let lightGui = {
  light: 4,
  getTime: () => {
    getTime(viewer);
  },
};

let listen_light = gui.add(lightGui, "light", {
  "Fixed lighting": 1,
  "Flash lighting": 2,
  "Moon lighting": 3,
  "Sun lighting": 4,
  "Custom color": 5,
});
listen_light.onChange((v) => {
  switch (Number(v)) {
    case 1:
      reset();
      scene.light = directionalLight;
      break;
    case 2:
      reset();
      scene.light = flashlight;
      scene.globe.dynamicAtmosphereLighting = false;
      break;
    case 3:
      reset();
      scene.light = moonLight;
      scene.globe.dynamicAtmosphereLightingFromSun = true;
      setTime(viewer, "2023-07-01 16:00:00");
      break;
    case 4:
      reset();
      break;
    case 5:
      reset();
      scene.light = customColorLight;
      break;
  }
});

gui.add(lightGui, "getTime").name("Get Time");
