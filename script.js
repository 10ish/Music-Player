const audioImg = document.getElementById('audioImg');
const audioTitle = document.getElementById("title");
const audioArtist = document.getElementById("artist");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const audioCurrentTime = document.getElementById('current-time');
const audioDuration = document.getElementById('duration');
let isPlaying = false;
// Music
let songIndex = 0;

const songs = [{
    name: 'jacinto-1',
    title: 'The 18th Letter',
    artist: 'Rakim'

}, {
    name: 'jacinto-2',
    title: 'Ride',
    artist: 'Twenty One Pilots'


}, {
    name: 'jacinto-3',
    title: 'It Aint hard to tell',
    artist: 'Nas'
}, {
    name: 'metric-1',
    title: 'I can do it',
    artist: 'ShowBizz'
}]

function play() {
    isPlaying = true;
    audio.play();

    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause')
}

function pause() {
    isPlaying = false;
    audio.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}



function playPrev() {
    if (songIndex > 0) {
        songIndex--;

    } else {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    play();



}

function playNext() {

    if (songIndex < songs.length - 1) {
        songIndex++;

    } else {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    play();




}
playBtn.addEventListener('click', () => (
    (isPlaying ? pause() : play())));
prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);
audio.addEventListener('ended', playNext);
// Update DOM

function loadSong(song) {
    audioTitle.textContent = song.title;
    audioImg.src = `img/${song.name}.jpg`;
    audioArtist.textContent = song.artist;
    audio.src = `music/${song.name}.mp3`
}
// Update Progress Bar
function updateProgressBar(event) {
    if (isPlaying === true) {
        const {
            currentTime,
            duration
        } = event.target;
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60)
        let currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        // Update Progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        if (currentTimeSeconds < 10) {
            currentTimeSeconds = `0${currentTimeSeconds}`
        }

        audioCurrentTime.innerHTML = `${currentTimeMinutes}:${currentTimeSeconds}`;
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        //Delaying switching duration content to avoid NaN
        if (durationSeconds) {
            audioDuration.innerHTML = `${durationMinutes}:${durationSeconds}`;
        }
    }
}
audio.addEventListener('timeupdate', updateProgressBar);
function setProgressBar(event){
   
    const width = this.clientWidth;
    const targetWidth = event.offsetX;
    const {duration} = audio;
    const targetWidthPercent = (targetWidth/width) * 100;
    const targetCurrentTime = (targetWidth/width) * duration;
    audio.currentTime = targetCurrentTime;
 
    progress.style.width = `${targetWidthPercent}%`

}
progressContainer.addEventListener('click', setProgressBar)
//On Load 
loadSong(songs[songIndex]);
