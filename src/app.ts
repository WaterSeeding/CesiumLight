import "./app.css";
import * as dat from "dat.gui";
import { viewer } from "./main";
import { createModel, flyModel, changeModel } from "./model";

let targetRef: any = {
  getValue: (): any => {
    return null;
  },
};

const gui = new dat.GUI({ name: "Cesium GUI", width: 450, autoPlace: true });
gui.domElement.id = "gui";

let guiParams: { [key: string]: any } = {
  show: true,
  scale: 1.0,
};

guiParams["Add a Cesium_Air"] = () => {
  let modelEntity = targetRef.getValue();
  if (modelEntity) {
    viewer.entities.removeAll();
  }
  createModel(
    viewer,
    "./static/CesiumAir/Cesium_Air.glb",
    0.0,
    guiParams,
    targetRef
  );
};

guiParams["Fly to Cesium_Air"] = () => {
  let modelEntity = targetRef.getValue();
  if (modelEntity) {
    flyModel(viewer, modelEntity);
  }
};

gui.add(guiParams, "Add a Cesium_Air");
gui.add(guiParams, "Fly to Cesium_Air");

let listen_show = gui.add(guiParams, "show");
listen_show.onChange(() => {
  changeModel(guiParams, targetRef);
});

let listen_scale = gui
  .add(guiParams, "scale")
  .min(1)
  .max(guiParams.maximumScale)
  .step(1);
listen_scale.onChange(() => {
  changeModel(guiParams, targetRef);
});
