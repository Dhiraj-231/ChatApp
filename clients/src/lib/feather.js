import moment from "moment";

const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();
  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg") return "Video";
  if (fileExt === "mp3" || fileExt === "wav") return "Audio";
  if (fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg" || fileExt === "gif") return "image";

  return "file";
}

const TransformImage = (url = "", width = 100) => {
  const new_url = url.replace("upload/", `upload/w_${width}/dpr_auto/`)
  return new_url;
};

const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");
    last7Days.unshift(dayName);
  }
  return last7Days;
};
export { fileFormat, TransformImage, getLast7Days }