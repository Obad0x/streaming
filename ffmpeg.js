const Ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");


Ffmpeg.setFfmpegPath(ffmpegInstaller.path);

Ffmpeg("videos/video.mp4", {timeout: 432000}).addOptions([
    "-profile:v baseline", // baseline profile (level 3.0) for H264 video codec
    "-level 3.0",   // Level 3.0 for H264 Baseline Profile video.
    "-start_number 0",
    "-hls_time 10", //set the segment duration
    "-hls_list_size 0", //maxmimum number of playlist entries (0 means all entries/infinite)
    "-f hls" //format
]).output("videos/output.m3u8").on("end", () => {
    console.log("end");
}).run();
