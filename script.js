document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio();
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const volumeControl = document.getElementById('volume-control');
    const seekBar = document.getElementById('seek-bar');
    const currentSong = document.getElementById('current-song');
    const playlist = document.getElementById('playlist');
    
    let currentIndex = 0;
    let songs = [
        { title: "Chaleya", url: "Chaleya.mp3" },
        { title: "Shayarana", url: "Shayarana.mp3" },
        { title: "Heeriye", url: "Heeriye.mp3" },
        { title: "Kushi", url: "Kushi.mp3" },
        { title: "Sooseki", url: "Sooseki.mp3" }
    ];

    function loadSong(index) {
        audio.src = songs[index].url;
        currentSong.textContent = songs[index].title;
    }

    function playPauseSong() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        }
    }

    function prevSong() {
        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
        loadSong(currentIndex);
        audio.play();
        playPauseBtn.textContent = 'Pause';
    }

    function nextSong() {
        currentIndex = (currentIndex + 1) % songs.length;
        loadSong(currentIndex);
        audio.play();
        playPauseBtn.textContent = 'Pause';
    }

    function updateSeekBar() {
        seekBar.value = audio.currentTime / audio.duration * 100;
    }

    function seekSong() {
        audio.currentTime = seekBar.value / 100 * audio.duration;
    }

    function displayPlaylist(songsList) {
        playlist.innerHTML = '';
        songsList.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = song.title;
            li.addEventListener('click', () => {
                currentIndex = index;
                loadSong(currentIndex);
                audio.play();
                playPauseBtn.textContent = 'Pause';
            });
            playlist.appendChild(li);
        });
    }

    loadSong(currentIndex);
    displayPlaylist(songs);

    playPauseBtn.addEventListener('click', playPauseSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    volumeControl.addEventListener('input', () => audio.volume = volumeControl.value);
    seekBar.addEventListener('input', seekSong);
    audio.addEventListener('timeupdate', updateSeekBar);
    search.addEventListener('input', searchSongs);
});
