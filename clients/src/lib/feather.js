import moment from "moment";

/**
 * Returns a string describing the file type based on the URL extension
 * @param {string} url - URL of the file
 * @returns {string} Type of file. One of "Video", "Audio", "image" or "file"
 */
const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop(); // Get the last part of the URL after the dot

  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg") {
    // These are all video file extensions
    return "Video";
  }

  if (fileExt === "mp3" || fileExt === "wav") {
    // These are all audio file extensions
    return "Audio";
  }

  if (fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg" || fileExt === "gif") {
    // These are all image file extensions
    return "image";
  }

  // If none of the above, it's a generic file
  return "file";
}


/**
 * Transform an image URL to a new URL with the specified width
 * @param {string} url - The URL of the image
 * @param {number} [width=100] - The desired width of the image in pixels
 * @returns {string} The new URL of the image with the specified width
 */
const TransformImage = (url = "", width = 100) => {
  // Replace the URL with a new URL that resizes the image
  const new_url = url.replace("upload/", `upload/w_${width}/dpr_auto/`);

  return new_url;
};

/**
 * Returns an array of the names of the last 7 days.
 * The names are in the format of "Monday", "Tuesday", etc.
 * The array is in reverse chronological order, with the most recent day being the first element.
 * @returns {string[]} An array of the names of the last 7 days
 */
const getLast7Days = () => {
  // Get the current date and time
  const dateObj = new Date();

  // Get the day of the week for each of the last 7 days
  const days = [0, 1, 2, 3, 4, 5, 6].map(offset => {
    // Get the day of the week for the date offset by `offset` days
    const day = (dateObj.getDay() + 7 - offset) % 7;

    // Return the name of the day
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];
  });

  return days.reverse(); // Reverse the array to get it in reverse chronological order
};

export { fileFormat, TransformImage, getLast7Days }