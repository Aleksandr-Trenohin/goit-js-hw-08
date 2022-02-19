import throttle from "lodash.throttle";

// 3
const iframe = document.querySelector("iframe");
const player = new Vimeo.Player(iframe);

// 4
const onPlay = function (data) {
    const playTime = data.seconds;
 // 5
  localStorage.setItem("videoplayer-current-time", playTime);
  };

player.on("timeupdate", throttle(onPlay, 1000)); // 7

// Самовызывающаяся функция
(function gettingTime() {
  const savedTime = +localStorage.getItem("videoplayer-current-time");
  
  if (savedTime) {
       // 6
    player
      .setCurrentTime(savedTime)
      }
}());
  


