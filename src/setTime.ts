import * as Cesium from "cesium";

export const setTime = (
  viewer: Cesium.Viewer,
  time: string = "2023-07-01 08:00:00"
): void => {
  const currentDate = new Date(time);
  const currentJulianDate = Cesium.JulianDate.fromDate(currentDate);
  const endTime = Cesium.JulianDate.addDays(
    currentJulianDate,
    2,
    new Cesium.JulianDate()
  );

  viewer.clock.currentTime = currentJulianDate;
  viewer.timeline.zoomTo(currentJulianDate, endTime);
};
