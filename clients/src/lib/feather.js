const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();
  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg") return "Video";
  if (fileExt === "mp3" || fileExt === "wav") return "Audio";
  if (fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg" || fileExt === "gif") return "image";

  return "file";
}

const TransformImage = (url = "", width = 100) => url;
export { fileFormat, TransformImage }