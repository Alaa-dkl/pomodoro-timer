let time = 25 * 60; // 25 minutes
let timer;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const stopButton = document.getElementById('stop');
const sessionCount = document.getElementById('session-count');
const forest = document.getElementById('forest');
const treeMessage = document.getElementById('tree-message');
const alarmSound = new Audio('sounds/smile-ringtone.mp3');
let sessions = 0;
alarmSound.volume = 0.6; // 60% volume
const audio = new Audio();
const playlist = ['music/Howls Moving Castle - Merry go round of Life cover by Grissini Project.mp3', 'music/Kikis Delivery Service - Umi No Mieru Machi Piano.mp3', 'music/always with me flute - spirited away.mp3']; 
let currentTrackIndex = 0;
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const stopBtn = document.getElementById('stop');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const trackName = document.getElementById('track-name');
const progressBar = document.getElementById('progress-bar');
const currentTimeText = document.getElementById('current-time');
const durationText = document.getElementById('duration');
const playlistEl = document.getElementById('playlist');
const musicToggle = document.getElementById('toggle-music');
const musicWindow = document.getElementById('music-window');
const minimizeBtn = document.getElementById('minimize');
const resizeBtn = document.getElementById('resize');
const closeBtn = document.getElementById('close');

let isMinimized = false;


// Show the music popup
musicToggle.addEventListener('click', () => {
  musicWindow.classList.remove('hidden');
  musicWindow.classList.remove('minimized');
  musicWindow.classList.remove('fullscreen');
});

// Minimize (hide the panel, keep music playing)
minimizeBtn.addEventListener('click', () => {
  musicWindow.classList.add('hidden');
});

// Resize toggle
resizeBtn.addEventListener('click', () => {
  musicWindow.classList.toggle('fullscreen');
});

// Close (stop music + hide panel)
closeBtn.addEventListener('click', () => {
  audio.pause();
  audio.currentTime = 0;
  musicWindow.classList.add('hidden');
});



function loadTrack(index) {
  audio.src = playlist[index];
  trackName.textContent = `Track: ${playlist[index].split('/').pop()}`;
}

function playTrack() {
  audio.play();
}

function pauseTrack() {
  audio.pause();
}

function stopTrack() {
  audio.pause();
  audio.currentTime = 0;
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

playBtn.addEventListener('click', playTrack);
pauseBtn.addEventListener('click', pauseTrack);
stopBtn.addEventListener('click', stopTrack);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

// Progress bar
audio.addEventListener('timeupdate', () => {
  progressBar.value = audio.currentTime;
  currentTimeText.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  progressBar.max = audio.duration;
  durationText.textContent = formatTime(audio.duration);
});

progressBar.addEventListener('input', () => {
  audio.currentTime = progressBar.value;
});

const volumeSlider = document.getElementById('volume');
audio.volume = 0.5; // Default volume

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});


function formatTime(sec) {
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Generate playlist
playlist.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = song.split('/').pop();
  li.addEventListener('click', () => {
    currentTrackIndex = index;
    loadTrack(currentTrackIndex);
    playTrack();
  });
  playlistEl.appendChild(li);
});

// Load first track by default
loadTrack(currentTrackIndex);


function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (time > 0) {
        time--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        sessions++;
        sessionCount.textContent = `Sessions Completed: ${sessions}`;

        // Play sound
        alarmSound.play();

        // Add a tree
        const tree = document.createElement('div');
        tree.classList.add('tree');
        tree.textContent = '🌲';
        forest.appendChild(tree);

        // Show message
        treeMessage.classList.add('show');
        treeMessage.textContent = "You planted a new tree! 🌱";
        setTimeout(() => {
          treeMessage.classList.remove('show');
        }, 2000);

        alert("Time's up! Take a break.");
        time = 25 * 60;
        updateDisplay();

      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer);
  time = 25 * 60;
  isRunning = false;
  updateDisplay();
}

function stopTimer() {
   clearInterval(timer);
   isRunning = false;
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
stopButton.addEventListener('click', stopTimer);

updateDisplay(); // show initial time
