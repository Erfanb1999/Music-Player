const progressRangeBar = document.querySelector(
    ".progress_bar .range_bar .range"
);
progressRangeBar.value = 0;
progressRangeBar.addEventListener("input", function () {
    this.nextElementSibling.style.width = this.value + "px";
    audio.currentTime = (audio.duration * this.value) / 360;
});

// Geting Elements
const nextMusic = document.querySelector(".next_music");
const previousMusic = document.querySelector(".previous_music");

const currentTimeMusic = document.querySelector(".current_time");
const durationTimeMusic = document.querySelector(".duration_time");

const musicNameTitle = document.querySelector(".title_text_play h3");
const musicTypeFormat = document.querySelector(".title_text_play h5");

const playPauseMusic = document.querySelector(".play_pause_music");
const playMusic = document.querySelector(".play");
const pauseMusic = document.querySelector(".pause");

const audio = document.querySelector("audio");

let allMusics = [
    {
        name: "music1",
        typeFormat: "MP3",
        src: "music/music1.mp3",
    },
    {
        name: "music2",
        typeFormat: "MP3",
        src: "music/music2.mp3",
    },
    {
        name: "music3",
        typeFormat: "MP3",
        src: "music/music3.mp3",
    },
    {
        name: "music4",
        typeFormat: "MP3",
        src: "music/music4.mp3",
    },
    {
        name: "music5",
        typeFormat: "MP3",
        src: "music/music5.mp3",
    },
    {
        name: "music6",
        typeFormat: "MP3",
        src: "music/music6.mp3",
    },
];

function onload(msuic) {
    audio.src = msuic.src;
    audio.addEventListener("loadedmetadata", function () {
        durationTimeMusic.textContent = fixTimers(audio.duration);
    });
    musicNameTitle.textContent = msuic.name.toUpperCase();
    musicTypeFormat.textContent = msuic.typeFormat;
    audio.play();
}
onload(allMusics[0]);

function fixTimers(timer) {
    var minute = Math.floor(timer / 60);
    var second = Math.floor(timer) % 60;
    second < 10 ? (second = "0" + second) : second;
    minute < 10 ? (minute = "0" + minute) : minute;
    return minute + ":" + second;
}

const progressBar = document.querySelector(
    ".progress_bar .range_bar .progress"
);
audio.addEventListener("timeupdate", timeUpdate);
function timeUpdate() {
    progressRangeBar.value = (audio.currentTime * 360) / audio.duration;
    progressBar.style.width =
        progressRangeBar.value < 80
            ? +progressRangeBar.value + 5 + "px"
            : progressRangeBar.value + "px";
    currentTimeMusic.textContent = fixTimers(audio.currentTime);
}

audio.addEventListener("ended", function () {
    if (!this.loop) {
        playNextMusic();
    }
});

playPauseMusic.addEventListener("click", pausePlay);
function pausePlay() {
    if (audio.paused) {
        audio.play();
        playMusic.classList.add("d-none");
        pauseMusic.classList.remove("d-none");
    } else {
        audio.pause();
        playMusic.classList.remove("d-none");
        pauseMusic.classList.add("d-none");
    }
}

nextMusic.addEventListener("click", playNextMusic);
function playNextMusic() {
    playMusic.classList.remove("d-none");
    pauseMusic.classList.add("d-none");
    let check = allMusics.find((e) => e.src == audio.getAttribute("src"));
    if (allMusics.indexOf(check) === allMusics.length - 1) {
        onload(allMusics[0]);
    } else {
        onload(allMusics[allMusics.indexOf(check) + 1]);
    }
}

previousMusic.addEventListener("click", function () {
    playMusic.classList.remove("d-none");
    pauseMusic.classList.add("d-none");
    let check = allMusics.find((e) => e.src == audio.getAttribute("src"));
    if (allMusics.indexOf(check) === 0) {
        onload(allMusics[allMusics.length - 1]);
    } else {
        onload(allMusics[allMusics.indexOf(check) - 1]);
    }
});

let repeatSong = document.querySelector(".repeat");
repeatSong.addEventListener("click", function () {
    let childsRepeat = Object.values(this.children);
    childsRepeat.forEach(function (elem) {
        elem.classList.toggle("d-none");
    });
    !audio.loop ? (audio.loop = true) : (audio.loop = false);
});

const toggleSubMenuTools = document.querySelector(
    ".menu_tools .toggle_submenu_tools"
);
toggleSubMenuTools.addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("d-none");
});

const toggleVolumeRange = document.querySelector(
    ".volume .toggle_volume_range"
);
toggleVolumeRange.addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("d-none");
});

const progressRangeBarVolume = document.querySelector(
    ".volume .range_bar .range"
);
progressRangeBarVolume.value = 100;
progressRangeBarVolume.addEventListener("input", function () {
    this.nextElementSibling.style.width = this.value + "px";
    audio.volume =
        this.value == 100
            ? 1
            : this.value >= 10
                ? `0.${this.value}`
                : `0.0${this.value}`;
});

const deleteFromList = document.querySelector(".delete_music");
deleteFromList.addEventListener("click", function () {
    let check = allMusics.find((e) => e.src == audio.getAttribute("src"));
    if (confirm("Are You Sure Want To Delete This Song?")) {
        if (allMusics.indexOf(check) === allMusics.length - 1) {
            onload(allMusics[0]);
        } else {
            onload(allMusics[allMusics.indexOf(check) + 1]);
        }
        allMusics.splice(allMusics.indexOf(check), 1);
        const lists = Object.values(playListBox.children);
        let deleteElm = lists.find((e) => e.getAttribute("data-src") == check.src);
        console.log(deleteElm);
        console.log(playListBox.children);
        console.log(playListBox.children["2"]);
        deleteElm.remove();
    }
});

const playListBox = document.querySelector(".play_list_box");
for (let key in allMusics) {
    const createLi = document.createElement("li");
    createLi.setAttribute("data-src", allMusics[key].src);
    createLi.addEventListener("click", chooseMusicList);

    let srcIMG = "img/apple_music_macos_bigsur_icon.png";
    const createIMG = document.createElement("img");
    createIMG.setAttribute("src", srcIMG);
    createLi.appendChild(createIMG);

    const createSpan = document.createElement("span");
    createSpan.textContent = allMusics[key].name;
    createLi.appendChild(createSpan);

    playListBox.appendChild(createLi);
}

function chooseMusicList() {
    let check = allMusics.find((e) => e.src == this.getAttribute("data-src"));
    onload(allMusics[allMusics.indexOf(check)]);
}
const togglePlayList = document.querySelector(".toggle_play_list");
togglePlayList.addEventListener("click", function () {
    if (this.getAttribute("data-open") === "false") {
        this.setAttribute("data-open", "true");
        playListBox.style.bottom = "0px";
    } else {
        this.setAttribute("data-open", "false");
        playListBox.style.bottom = "-73%";
    }
});

window.addEventListener("click", function (e) {
    if (
        e.target !== toggleSubMenuTools &&
        e.target !== toggleVolumeRange &&
        e.target !== progressRangeBarVolume &&
        e.target !== togglePlayList
    ) {
        toggleSubMenuTools.nextElementSibling.classList.add("d-none");
        toggleVolumeRange.nextElementSibling.classList.add("d-none");
        if (togglePlayList.getAttribute("data-open") === "true") {
            togglePlayList.setAttribute("data-open", "false");
            playListBox.style.bottom = "-73%";
        }
    }
});
