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

export const getTime = (viewer: Cesium.Viewer) => {
  const clock = viewer.clock;
  let jsCurrentDate = new Date(clock.currentTime.toString());
  console.warn(
    "获取场景当前时间jsCurrentDate Date",
    clock.currentTime.toString()
  );
  console.warn("获取场景当前时间jsCurrentDate", jsCurrentDate);
  console.warn("获取场景当前时间", showTime(jsCurrentDate));
};

export const showTime = (date: Date) => {
  let year = date.getFullYear(); //获取当前年份
  let mon = date.getMonth() + 1; //获取当前月份
  let da = date.getDate(); //获取当前日
  let h = date.getHours(); //获取小时
  let m = date.getMinutes(); //获取分钟
  let s = date.getSeconds(); //获取秒
  let time = `${year} ${mon} ${da} ${h}:${m}:${s}`;
  return time;
};
