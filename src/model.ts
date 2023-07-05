import * as Cesium from "cesium";

export const createModel = (
  viewer: Cesium.Viewer,
  url: string,
  position: Cesium.Cartesian3,
  height: number,
  guiParams: any,
  targetRef: any
) => {
  const heading = Cesium.Math.toRadians(135);
  const pitch = 0;
  const roll = 0;
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
  );
  const orientationProperty = new Cesium.ConstantProperty(orientation);

  let modelEntity = viewer.entities.add({
    name: url,
    position: position,
    orientation: orientationProperty,
    model: {
      show: guiParams.show,
      uri: url,
      scale: guiParams.scale,
    },
  });
  targetRef.getValue = () => {
    return modelEntity;
  };
};

export const flyModel = (
  viewer: Cesium.Viewer,
  targetEntity: Cesium.Entity
) => {
  let headingPitchRange = new Cesium.HeadingPitchRange(
    Cesium.Math.toRadians(0),
    Cesium.Math.toRadians(-45),
    100
  );
  // 视角定位
  let flyResultPromise = viewer.flyTo(targetEntity, {
    duration: 3,
    offset: headingPitchRange,
  });
  flyResultPromise
    .then(() => {
      viewer.trackedEntity = targetEntity;
    })
    .catch(() => {});
};

export const changeModel = (guiParams: any, targetRef: any) => {
  let modelEntity = targetRef.getValue() as Cesium.Entity;
  if (modelEntity) {
    let modelGraphics = modelEntity.model;
    modelGraphics.show = guiParams.show;
    modelGraphics.scale = guiParams.scale;
  }
};
