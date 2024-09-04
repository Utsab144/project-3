let songindex = 0;
let audioelement = new Audio('song1.mp3');
let gif = document.getElementById("gif");
let masterplay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let songitem = Array.from(document.getElementsByClassName("songitem"));
let endName = document.getElementsByClassName("endName")[0]; // Assuming there's only one element with this class
let currentlyPlayingButton = null; // Variable to track the currently playing button

let songs = [
    {SongName: "Mera Meheboob", pathName: "song1.mp3", coverPath: "poster1.jpg"},
    {SongName: "Teri Gali", pathName: "song2.mp3", coverPath: "poster2.jpeg"},
    {SongName: "Alvida", pathName: "song3.mp3", coverPath: "poster3.jpg"},
    {SongName: "Hamari Adhuri Kahani", pathName: "song4.mp3", coverPath: "poster4.jpeg"},
    {SongName: "Fitoor", pathName: "song5.mp3", coverPath: "poster5.jpg"},
    {SongName: "Rabta", pathName: "song6.mp3", coverPath: "poster6.jpeg"},
    {SongName: "Apna Bana Le", pathName: "song7.mp3", coverPath: "poster7.jpg"},
];

// Assign the correct cover image and song name
songitem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songname')[0].innerHTML = songs[i].SongName;
    // Assign data-song attribute for each play button
    let playButton = element.getElementsByClassName('songitemplay')[0];
    playButton.setAttribute('data-song', songs[i].pathName);
    playButton.setAttribute('data-name', songs[i].SongName);
});

// Play/pause from the master button
masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove("fa-circle-play");
        masterplay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;

        // Update the currently playing button to match the master play button
        if (currentlyPlayingButton) {
            currentlyPlayingButton.classList.remove("fa-circle-play");
            currentlyPlayingButton.classList.add("fa-circle-pause");
        }
    } else {
        audioelement.pause();
        masterplay.classList.remove("fa-circle-pause");
        masterplay.classList.add("fa-circle-play");
        gif.style.opacity = 0;

        // Pause the currently playing button
        if (currentlyPlayingButton) {
            currentlyPlayingButton.classList.remove("fa-circle-pause");
            currentlyPlayingButton.classList.add("fa-circle-play");
        }
    }
});

// Update the progress bar
audioelement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek using the progress bar
myProgressBar.addEventListener('input', () => {
    audioelement.currentTime = (myProgressBar.value * audioelement.duration) / 100;
});

// Pause all songs and reset play icons
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    });
};

// Play the clicked song
Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        console.log(e.target);

        // Update the currently playing button
        currentlyPlayingButton = e.target;

        // Toggle the play/pause icon for the clicked button
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");

        // Play the specific song associated with the clicked button
        const songSrc = e.target.getAttribute('data-song');
        const songName = e.target.getAttribute('data-name');  // Get the song name

        audioelement.src = songSrc;
        audioelement.currentTime = 0;
        audioelement.play();

        // Update the song name in the endName element
        endName.innerHTML = songName;

        // Update master play icon and GIF
        masterplay.classList.remove("fa-circle-play");
        masterplay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    });
});