// console.log("Hey i will Start");
// // create object of Audio class which take src of song where the song are preseent and then by using obj.play() play the function
// let currentsong = new Audio();
// let songs;
// let currfolder;

// // unction which fetch the song from url and add into song array and return that array
// async function getSongs(folder) {
//   currfolder = folder;
//   let p = await fetch(`${folder}/`);
//   let responce = await p.text();
//   let div = document.createElement("div");
//   div.innerHTML = responce;
//   let as = div.getElementsByTagName("a"); // return html collection HTMLCollection
//   songs = [];
//   for (let i = 0; i < as.length; i++) {
//     let element = as[i];
//     if (element.href.endsWith("mp3")) {
//       songs.push(element.href.split(`/${folder}/`)[1]);
//     }
//   }
//   let songul = document
//     .querySelector(".songlist")
//     .getElementsByTagName("ul")[0];
//   songul.innerHTML = "";
//   for (const song of songs) {
//     songul.innerHTML =
//       songul.innerHTML +
//       ` <li> <div class="maininfo">
//                  <img src="svg/Music.svg" class="invert" style="width: 22px;" alt="">
//                 <div class="info">
//                   <div class="info1">${song.replaceAll("%20", " ")}</div>
//                   <div class="info2">Kaushal</div>
//                 </div>
//                </div>
//                    <div class="playnow">
//                     <span>play Now</span>
//                     <img src="svg/play.svg" class="invert play" style="width: 31px;" alt="photu">
//                   </div></li>`;
//   }

//   // here we play the song when user click on it
//   Array.from(
//     document
//       .querySelector(".songlist")
//       .getElementsByTagName("ul")[0]
//       .getElementsByTagName("li")
//   ).forEach((e) => {
//     console.log(e.querySelector(".info1").innerHTML);
//     e.querySelector(".play").addEventListener("click", () => {
//       playmusic(e.querySelector(".info1").innerHTML);
//     });
//   });
//   return songs;
// }

// // function which play music
// function playmusic(track, pause = true) {
//   currentsong.src = `/${currfolder}/` + track;
//   if (pause) {
//     currentsong.play();
//     play.src = "/svg/pause.svg";
//   }
//   document.querySelector(".songinfo").innerHTML = track.replaceAll("%20", " ");
//   document.querySelector(".songtime").innerHTML = "00:00/00:00";
// }

// // to convert the second into min:sec
// function formatTime(seconds) {
//   if (isNaN(seconds) || seconds < 0) return "00:00";
//   const mins = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
//   const formattedMins = mins < 10 ? "0" + mins : mins;
//   const formattedSecs = secs < 10 ? "0" + secs : secs;

//   return `${formattedMins}:${formattedSecs}`;
// }

// //Dynamically load the function
// async function loadfunction() {
//   let p = await fetch(`/songs/`);
//   let responce = await p.text();
//   let div = document.createElement("div");
//   div.innerHTML = responce;
//   console.log(div);
//   let cardcontainer = document.getElementsByClassName("cardContainer")[0];
//   let arr = Array.from(div.getElementsByTagName("a"));
//   for (let i = 0; i < arr.length; i++) {
//     const e = arr[i];
//     if (e.href.includes("/songs/") && !e.href.includes(".htaccess")) {
//       let f = e.href.split("/songs/")[e.href.split("songs").length - 1];
//       let info = await fetch(`songs/${f}/info.json`);
//       let image = await fetch(`songs/${f}/image.jpeg`);
//       let responce = await info.json();
//       console.log(responce.name + "  " + responce.discription);

//       cardcontainer.innerHTML =
//         cardcontainer.innerHTML +
//         ` <div data-folder="${responce.name}" class="card round">
//               <div class="cardSvg">
//                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="45" height="45">
//                  <circle cx="50" cy="50" r="48" fill="#28a745" stroke="#28a745" stroke-width="4" />
//                    <polygon points="40,30 40,70 70,50" fill="black" />
//                   </svg>
//               </div>
//               <img
//                 src="songs/${f}/image.jpeg"
//                 alt="photu"
//               />
//               <h2>${responce.name}</h2>
//               <p>${responce.discription}</p>
//             </div>`;
//     }
//   }
//   // to load the song into song list
//   Array.from(document.getElementsByClassName("card")).forEach((e) => {
//     e.addEventListener("click", async (item) => {
//       let load = item.currentTarget.dataset.folder;
//       songs = await getSongs(`songs/${load}`);
//       playmusic(songs[0]);
//     });
//   });
// }
// //main method

// (async function main() {
//   // fetch all songs
//   // console.log("songs/hindi");
//   await getSongs("songs/english"); // fetch each song in songs array

//   playmusic(songs[0].replaceAll("%20", " "), false);

//   loadfunction();
//   let songul = document
//     .querySelector(".songlist")
//     .getElementsByTagName("ul")[0]; // select ul list and add all songs into the playlist

//   // for next , previus and stop songs

//   let play = document.getElementById("play");

//   play.addEventListener("click", () => {
//     if (currentsong.paused) {
//       currentsong.play();
//       play.src = "/svg/pause.svg";
//     } else {
//       currentsong.pause();
//       play.src = "/svg/play.svg";
//     }
//   });

//   // for seekbar
//   let circle = document.querySelector(".circle");

//   // for change the time continueslly
//   currentsong.addEventListener("timeupdate", () => {
//     document.querySelector(".songtime").innerHTML = `${formatTime(
//       currentsong.currentTime
//     )}/${formatTime(currentsong.duration)}`;

//     // automatically sick bar is move
//     const percent = (currentsong.currentTime / currentsong.duration) * 100;
//     circle.style.left = `${percent}%`;
//   });

//   // to move the sickbar manually

//   document.querySelector(".sickbar").addEventListener("click", (e) => {
//     let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
//     circle.style.left = percent + "%";
//     currentsong.currentTime = (currentsong.duration * percent) / 100;
//   });

//   // for clicking hangburge we can add new side page
//   document.querySelector(".hamburger").addEventListener("click", () => {
//     document.querySelector(".left").style.left = "0px";
//   });

//   // for cancle the extra space
//   document.querySelector(".cancle").addEventListener("click", () => {
//     document.querySelector(".left").style.left = "-100%";
//   });

//   // add event listner for next
//   document.getElementById("next").addEventListener("click", () => {
//     console.log("next are clicked");
//     let arr = currentsong.src.split("/");
//     let next = arr[arr.length - 1];
//     let index = songs.indexOf(next);
//     console.log(songs[index]);

//     if (index < songs.length - 1) {
//       playmusic(songs[index + 1]);
//     }
//   });

//   // add event listner for previus
//   document.getElementById("previus").addEventListener("click", () => {
//     console.log("previus are clicked");
//     let arr = currentsong.src.split("/"); //take currentsong scr and split from / becouse in songs array we have string after /songs/
//     let next = arr[arr.length - 1]; // to get last element of string
//     let index = songs.indexOf(next); // by using song name we find the index of song in songs array
//     if (index >= 0) {
//       playmusic(songs[index - 1]); // when there is next index present in songs array we cam play these song
//     }
//   });

//   // to change the volume

//   document.querySelector(".range").addEventListener("change", (e) => {
//     currentsong.volume = e.target.value / 100;
//   });

//   // after clicking on volume the volume are mute

//   document.querySelector(".volume").addEventListener("click", (e) => {
//     currentsong.volume = 0;
//     document.querySelector(".range").value = 0;
//   });
//   let currentVolume = currentsong.volume;
//   document.querySelector(".volume").addEventListener("click", (e) => {
//     if (e.target.src.includes("svg/valume.svg")) {
//       e.target.src = "svg/mute.svg";
//     } else {
//       e.target.src = "svg/valume.svg"; // optional
//       document.querySelector(".range").value = 50;
//       currentsong.volume = 0.5;
//     }
//   });
// })();

console.log("Hey i will Start");

let currentsong = new Audio();
let songs;
let currfolder;

// Function to fetch songs from info.json
async function getSongs(folder) {
  currfolder = folder;

  try {
    let p = await fetch(`${folder}/info.json`);
    let data = await p.json();
    songs = data.songs;

    let songul = document
      .querySelector(".songlist")
      .getElementsByTagName("ul")[0];
    songul.innerHTML = "";

    for (const song of songs) {
      songul.innerHTML += `
        <li> 
          <div class="maininfo">
            <img src="svg/Music.svg" class="invert" style="width: 22px;" alt="">
            <div class="info">
              <div class="info1">${song.replaceAll("%20", " ")}</div>
              <div class="info2">Kaushal</div>
            </div>
          </div>
          <div class="playnow">
            <span>play Now</span>
            <img src="svg/play.svg" class="invert play" style="width: 31px;" alt="photu">
          </div>
        </li>`;
    }

    Array.from(
      document
        .querySelector(".songlist")
        .getElementsByTagName("ul")[0]
        .getElementsByTagName("li")
    ).forEach((e) => {
      let trackName = e.querySelector(".info1").innerHTML;
      e.querySelector(".play").addEventListener("click", () => {
        playmusic(trackName);
      });
    });

    return songs;
  } catch (err) {
    console.error("Error loading songs from info.json:", err);
    return [];
  }
}

// function which play music
function playmusic(track, pause = true) {
  currentsong.src = `/${currfolder}/` + track;
  if (pause) {
    currentsong.play();
    play.src = "/svg/pause.svg";
  }
  document.querySelector(".songinfo").innerHTML = track.replaceAll("%20", " ");
  document.querySelector(".songtime").innerHTML = "00:00/00:00";
}

// to convert the second into min:sec
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const formattedMins = mins < 10 ? "0" + mins : mins;
  const formattedSecs = secs < 10 ? "0" + secs : secs;

  return `${formattedMins}:${formattedSecs}`;
}

//Dynamically load folders
async function loadfunction() {
  let p = await fetch(`/songs/folders.json`);
  let folders = await p.json(); // Get folders like ["english", "hindi"]

  let cardcontainer = document.getElementsByClassName("cardContainer")[0];

  for (let i = 0; i < folders.length; i++) {
    let f = folders[i];
    let info = await fetch(`songs/${f}/info.json`);
    let responce = await info.json();

    cardcontainer.innerHTML += `
      <div data-folder="${f}" class="card round">
        <div class="cardSvg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="45" height="45">
            <circle cx="50" cy="50" r="48" fill="#28a745" stroke="#28a745" stroke-width="4" />
            <polygon points="40,30 40,70 70,50" fill="black" />
          </svg>
        </div>
        <img src="songs/${f}/image.jpeg" alt="photu" />
        <h2>${responce.name}</h2>
        <p>${responce.discription}</p>
      </div>`;
  }

  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      let load = item.currentTarget.dataset.folder;
      songs = await getSongs(`songs/${load}`);
      if (songs.length > 0) {
        playmusic(songs[0]);
      }
    });
  });
}

// main method
(async function main() {
  await getSongs("songs/english");
  if (songs.length > 0) {
    playmusic(songs[0].replaceAll("%20", " "), false);
  }

  loadfunction();

  let play = document.getElementById("play");

  play.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play();
      play.src = "/svg/pause.svg";
    } else {
      currentsong.pause();
      play.src = "/svg/play.svg";
    }
  });

  let circle = document.querySelector(".circle");

  currentsong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${formatTime(
      currentsong.currentTime
    )}/${formatTime(currentsong.duration)}`;

    const percent = (currentsong.currentTime / currentsong.duration) * 100;
    circle.style.left = `${percent}%`;
  });

  document.querySelector(".sickbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    circle.style.left = percent + "%";
    currentsong.currentTime = (currentsong.duration * percent) / 100;
  });

  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0px";
  });

  document.querySelector(".cancle").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-100%";
  });

  document.getElementById("next").addEventListener("click", () => {
    let arr = currentsong.src.split("/");
    let next = arr[arr.length - 1];
    let index = songs.indexOf(next);

    if (index < songs.length - 1) {
      playmusic(songs[index + 1]);
    }
  });

  document.getElementById("previus").addEventListener("click", () => {
    let arr = currentsong.src.split("/");
    let next = arr[arr.length - 1];
    let index = songs.indexOf(next);

    if (index > 0) {
      playmusic(songs[index - 1]);
    }
  });

  document.querySelector(".range").addEventListener("change", (e) => {
    currentsong.volume = e.target.value / 100;
  });

  document.querySelector(".volume").addEventListener("click", (e) => {
    if (currentsong.volume > 0) {
      e.target.src = "svg/mute.svg";
      currentsong.volume = 0;
      document.querySelector(".range").value = 0;
    } else {
      e.target.src = "svg/valume.svg";
      document.querySelector(".range").value = 50;
      currentsong.volume = 0.5;
    }
  });
})();
