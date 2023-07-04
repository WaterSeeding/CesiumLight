import "./app.css";
import * as Cesium from "cesium";
import * as dat from "dat.gui";
import { viewer } from "./main";
import { createModel } from "./model";

let targetRef: any = {
  getValue: (): any => {
    return null;
  },
};

let guiParams: { [key: string]: any } = {
  show: true,
  scale: 7.0,
};

createModel(viewer, "./static/CesiumBalloon.glb", 0.0, guiParams, targetRef);

viewer.entities.add({
  position: Cesium.Cartesian3.fromRadians(
    -2.14633449752228,
    0.667796065242357,
    24.47647034111423
  ),
  cylinder: {
    length: 8.0,
    topRadius: 2.0,
    bottomRadius: 2.0,
    material: Cesium.Color.WHITE,
  },
});

viewer.entities.add({
  position: Cesium.Cartesian3.fromRadians(
    -2.1463332294173365,
    0.6677959755384729,
    26.2876064083145
  ),
  ellipsoid: {
    radii: new Cesium.Cartesian3(2.5, 2.5, 2.5),
    material: Cesium.Color.WHITE.withAlpha(0.5),
  },
});

viewer.scene.camera.setView({
  destination: new Cesium.Cartesian3(
    -2729490.8390059783,
    -4206389.878855597,
    3928671.2763356343
  ),
  orientation: new Cesium.HeadingPitchRoll(
    2.2482480507178426,
    -0.20084951548781982,
    0.002593933673552762
  ),
  endTransform: Cesium.Matrix4.IDENTITY,
});

const scene = viewer.scene;
scene.globe.enableLighting = true;

const scratchIcrfToFixed = new Cesium.Matrix3();
const scratchMoonPosition = new Cesium.Cartesian3();
const scratchMoonDirection = new Cesium.Cartesian3();

function getMoonDirection(result?: any) {
  result = Cesium.defined(result) ? result : new Cesium.Cartesian3();
  const icrfToFixed = scratchIcrfToFixed;
  const date = viewer.clock.currentTime;
  if (
    !Cesium.defined(
      Cesium.Transforms.computeIcrfToFixedMatrix(date, icrfToFixed)
    )
  ) {
    Cesium.Transforms.computeTemeToPseudoFixedMatrix(date, icrfToFixed);
  }
  const moonPosition =
    Cesium.Simon1994PlanetaryPositions.computeMoonPositionInEarthInertialFrame(
      date,
      scratchMoonPosition
    );
  Cesium.Matrix3.multiplyByVector(icrfToFixed, moonPosition, moonPosition);
  const moonDirection = Cesium.Cartesian3.normalize(
    moonPosition,
    scratchMoonDirection
  );
  return Cesium.Cartesian3.negate(moonDirection, result);
}

const directionalLight = new Cesium.DirectionalLight({
  direction: new Cesium.Cartesian3(
    0.2454278300540191,
    0.8842635425193919,
    0.39729481195458805
  ),
});

const flashlight = new Cesium.DirectionalLight({
  direction: scene.camera.directionWC, // Updated every frame
});

const moonLight = new Cesium.DirectionalLight({
  direction: getMoonDirection(), // Updated every frame
  color: new Cesium.Color(0.9, 0.925, 1.0),
  intensity: 0.5,
});

const sunLight = new Cesium.SunLight();

const customColorLight = new Cesium.DirectionalLight({
  direction: new Cesium.Cartesian3(
    -0.2454278300540191,
    0.8842635425193919,
    0.39729481195458805
  ),
  color: Cesium.Color.fromCssColorString("#deca7c"),
});

scene.preRender.addEventListener(function (scene, time) {
  if (scene.light === flashlight) {
    scene.light.direction = Cesium.Cartesian3.clone(
      scene.camera.directionWC,
      scene.light.direction
    );
  } else if (scene.light === moonLight) {
    scene.light.direction = getMoonDirection(scene.light.direction);
  }
});

function setTime(iso8601: string) {
  const currentTime = Cesium.JulianDate.fromIso8601(iso8601);
  const endTime = Cesium.JulianDate.addDays(
    currentTime,
    2,
    new Cesium.JulianDate()
  );

  viewer.clock.currentTime = currentTime;
  viewer.timeline.zoomTo(currentTime, endTime);
}

function reset() {
  console.log("重置")
  // Set scene defaults
  scene.light = sunLight;
  scene.globe.dynamicAtmosphereLighting = true;
  scene.globe.dynamicAtmosphereLightingFromSun = false;
  setTime("2020-01-09T23:00:39.018261982600961346Z");
}

const gui = new dat.GUI({ name: "Cesium GUI", width: 450, autoPlace: true });
gui.domElement.id = "gui";

let listen_light = gui.add({ light: 1 }, "light", {
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
      setTime("2020-01-10T05:29:41.17946898164518643Z");
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
