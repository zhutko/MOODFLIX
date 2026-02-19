<script>
        const video = document.getElementById('mainVideo');
        const playBtn = document.getElementById('playBtn');
        const playIcon = document.getElementById('playIcon');
        const progressBar = document.getElementById('progressBar');
        const progressContainer = document.getElementById('progressContainer');
        const currentTimeEl = document.getElementById('currentTime');
        const durationEl = document.getElementById('duration');
        const volumeIcon = document.getElementById('volumeIcon');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const videoContainer = document.getElementById('videoContainer');

        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        function showPlayButton() {
            playBtn.style.opacity = '1';
            playBtn.style.transform = 'translate(-50%, -50%) scale(1)';
            playIcon.className = 'fas fa-play';
        }

        function hidePlayButton() {
            playBtn.style.opacity = '0';
            playBtn.style.transform = 'translate(-50%, -50%) scale(0.8)';
        }

        function togglePlay() {
            if (video.paused) {
                video.play();
                hidePlayButton();
                playIcon.className = 'fas fa-pause';
            } else {
                video.pause();
                showPlayButton();
            }
        }

        video.addEventListener('loadedmetadata', function() {
            durationEl.textContent = formatTime(video.duration);
        });

        video.addEventListener('timeupdate', function() {
            const percent = (video.currentTime / video.duration) * 100;
            progressBar.style.width = percent + '%';
            currentTimeEl.textContent = formatTime(video.currentTime);
        });

        progressContainer.addEventListener('click', function(e) {
            const rect = progressContainer.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            video.currentTime = percent * video.duration;
        });

        volumeIcon.addEventListener('click', function() {
            video.muted = !video.muted;
            volumeIcon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        });

        fullscreenBtn.addEventListener('click', function() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoContainer.requestFullscreen();
            }
        });

        playBtn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);

        video.addEventListener('pause', function() {
            showPlayButton();
        });

        video.addEventListener('play', function() {
            hidePlayButton();
        });

        video.addEventListener('ended', function() {
            showPlayButton();
            progressBar.style.width = '0%';
        });
    </script>