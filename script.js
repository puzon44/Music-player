console.log("hello");

//IMG SongTitle and SingerName
const changeImage = document.querySelector("#changeImage");
const songTitle = document.querySelector("#songTitle");
const singerName = document.querySelector("#singerName");
// Music Durations
const duration = document.querySelector(".duration");
const currentDuration = document.querySelector(".currentDuration");
const curntTime = document.querySelector(".curntTime");
// Play/Pause and forward/backward
const backward = document.querySelector("#backward");
const playPause = document.querySelector("#playPause");
const forward = document.querySelector("#forward");
//Play ALl and volume section
const playAll = document.querySelector(".playAll");
const volumeChange = document.querySelector("#volumeChange");
const volumeIcon = document.querySelector("#volumeIcon");
const volumeDuration = document.querySelector("#volumeDuration");
// hamBurger
const hamBurger = document.querySelector("#hamBurger");
const closeIcon = document.querySelector("#closeIcon");
const musicPlayList = document.querySelector(".musicPlayList");
const musicItem = document.querySelector(".musicItem");
const playList = document.querySelector(".musicList");
const songIndex = document.querySelector(".songIndex");
const songName = document.querySelector(".songName");

let timer = 0;
let autoplay = 0;
let indexMusic = 0;
let currentTime = 0;
let song = document.createElement("audio");

//!! Event Listener
playPause.addEventListener("click", playPauseSong);
backward.addEventListener("click", previousSong);
forward.addEventListener("click", forwardSong);
playAll.addEventListener("click", autoPlay);
volumeIcon.addEventListener("click", muteUnmute);
volumeDuration.addEventListener("change", changeVolume);
song.addEventListener("timeupdate", musicDuration);
duration.addEventListener("change", sliderChange);
hamBurger.addEventListener("click", showMusicList);
closeIcon.addEventListener("click", hideMusicList);

//!! Functions

//load songs
loadSong(indexMusic);

function loadSong(indexMusic) {
  //   clearInterval(timer);
  //   sliderReset();
  changeImage.src = trackList[indexMusic].image;
  songTitle.innerText = trackList[indexMusic].name;
  singerName.innerText = trackList[indexMusic].singer;
  song.src = trackList[indexMusic].path;
  song.load();
  //   timer = setInterval(sliderUpdate, 1000);
}

function playPauseSong() {
  {
    if (song.paused) {
      song.play();
      playPause.classList.replace("fa-play", "fa-pause");
    } else {
      song.pause();
      playPause.classList.replace("fa-pause", "fa-play");
    }
  }
}

function forwardSong() {
  if (indexMusic < trackList.length - 1) {
    indexMusic++;
    loadSong(indexMusic);
    playPauseSong();
  } else {
    indexMusic = 0;
    loadSong(indexMusic);
    playPauseSong();
  }
}

function previousSong() {
  if (indexMusic > 0) {
    indexMusic--;
    loadSong(indexMusic);
    playPauseSong();
  } else {
    indexMusic = trackList.length - 1;
    loadSong(indexMusic);
    playPauseSong();
  }
}

function muteUnmute() {
  song.volume = 0;
  volumeChange.innerText = 0;
  volumeDuration = 0;
  volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute')
}

function changeVolume() {
  volumeChange.value = volumeDuration.value;
  console.log(volumeChange.value);
  volumeChange.innerText = volumeChange.value;
  song.volume = volumeDuration.value / 100;
}

function autoPlay() {
  if (autoplay === 0) {
    autoplay = 1;
    playAll.style.background = "#b39bba";
  } else {
    autoplay = 0;
    playAll.style.background = "white";
  }
}

function musicDuration() {
  if (song.duration) {
    let currentMinutes = Math.floor(song.currentTime / 60);
    let currentSeconds = Math.floor(song.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(song.duration / 60);
    let durationSeconds = Math.floor(song.duration - durationMinutes * 60);

    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    console.log("hello mf");

    curntTime.innerHTML = `${currentMinutes}:${currentSeconds}`;
    currentDuration.innerHTML = `${durationMinutes}:${durationSeconds}`;
  } else {
    curntTime.innerHTML = "00" + ":" + "00";
    currentDuration.innerHTML = "00" + ":" + "00";
  }

  // Song Duration part
  progress = parseInt((song.currentTime / song.duration) * 100);
  duration.value = progress;
  // Play another song after one ends
  if (song.ended) {
    if (autoplay == 1 && indexMusic < trackList.length - 1) {
      indexMusic++;
      loadSong(indexMusic);
      playPauseSong();
    } else if (autoplay == 1 && indexMusic == trackList.length - 1) {
      indexMusic = 0;
      loadSong(indexMusic);
      playPauseSong();
    }
  }
}

function sliderChange() {
  song.currentTime = (duration.value * song.duration) / 100;
}
// Hamburger showing music list

function showMusicList() {
  musicPlayList.style.transform = "translateX(0)";
}
function hideMusicList() {
  musicPlayList.style.transform = "translateX(-100%)";
}

// Display track in Hamburger

let count = 1;
function displaySong() {
  for (let i = 0; i < trackList.length; i++) {
    let div = document.createElement("div");
    div.classList.add("musicItem");
    div.innerHTML = `
        <span class="songIndex">${count++}</span>
        <p class="songName">${trackList[i].name}</p>
    `;
    playList.appendChild(div);
  }
  playSongFromList();
}
displaySong();

function playSongFromList() {
  playList.addEventListener("click", (e) => {
    if (e.target.classList.contains("songName")) {
      const indexFromTrackList = trackList.findIndex((item, index) => {
        if (item.name === e.target.innerText) {
          return true;
        }
      });
      loadSong(indexFromTrackList);
      playPauseSong();
      hideMusicList();
    }
  });
}
