import * as Cesium from "cesium";
import { getPosition } from "./getPosition";

export const setCamera = (viewer: Cesium.Viewer) => {
  let cameraDestination = new Cesium.Cartesian3(
    -2729490.8390059783,
    -4206389.878855597,
    3928671.2763356343
  );
  let defaultCameraDirection = getPosition(cameraDestination);

  // console.log("defaultCameraDirection", defaultCameraDirection);

  let headingRadiansValue = 2.2482480507178426;
  let pitchRadiansValue = -0.20084951548781982;
  let rollRadiansValue = 0.002593933673552762;

  viewer.scene.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(
      defaultCameraDirection.longitude,
      defaultCameraDirection.latitude,
      defaultCameraDirection.height
    ),
    orientation: new Cesium.HeadingPitchRoll(
      Cesium.Math.toRadians(Cesium.Math.toDegrees(headingRadiansValue)),
      Cesium.Math.toRadians(Cesium.Math.toDegrees(pitchRadiansValue)),
      Cesium.Math.toRadians(Cesium.Math.toDegrees(rollRadiansValue))
    ),
    endTransform: Cesium.Matrix4.IDENTITY,
  });
};
