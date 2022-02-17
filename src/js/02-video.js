import throttle from "lodash.throttle";

// 3
const iframe = document.querySelector("iframe");
const player = new Vimeo.Player(iframe);

// 4
const onPlay = function (data) {
  // data is an object containing properties specific to that event
  console.log(data);
  onTimeupdate(data);
};

player.on("timeupdate", throttle(onPlay, 1000)); // 7

// 5
function onTimeupdate(evt) {
    const playTime = evt.seconds;
 
  localStorage.setItem("videoplayer-current-time", playTime);
}

function gettingTime() {
    const savedTime = +localStorage.getItem("videoplayer-current-time");
  
    if (savedTime) {
    console.log(savedTime);
    // 6
    player
      .setCurrentTime(savedTime)
      .then(function (seconds) {
        // seconds = the actual time that the player seeked to
      })
      .catch(function (error) {
        switch (error.name) {
          case "RangeError":
            // the time was less than 0 or greater than the video’s duration
            break;
          default:
            // some other error occurred
            break;
        }
      });
  }
}
gettingTime();

