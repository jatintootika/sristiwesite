// AUTOPLAY MUSIC
(function() {
    const audio = document.getElementById('bgMusic');
    if (!audio) return;
    let unmuted = false;
    function unmute() {
        if (!unmuted && audio) {
            audio.muted = false;
            audio.play().then(() => { unmuted = true; }).catch(() => {});
        }
    }
    ['click', 'touchstart', 'scroll', 'keydown', 'mousemove'].forEach(e => {
        document.addEventListener(e, unmute, { once: true });
    });
    setTimeout(() => { if (!unmuted) { audio.muted = false; audio.play().catch(() => {}); } }, 2000);
})();

// MUSIC TOGGLE
const toggle = document.getElementById('musicToggle');
const bgm = document.getElementById('bgMusic');
if (toggle && bgm) {
    let playing = true;
    toggle.addEventListener('click', () => {
        if (playing) { bgm.pause(); toggle.innerHTML = '<i class="fas fa-music" style="opacity:0.4;"></i>'; }
        else { bgm.muted = false; bgm.play(); toggle.innerHTML = '<i class="fas fa-music" style="color:#ff6b9d;"></i>'; }
        playing = !playing;
    });
    toggle.innerHTML = '<i class="fas fa-music" style="color:#ff6b9d;"></i>';
}

// TYPEWRITER
const typedEl = document.getElementById('typed-text');
if (typedEl) {
    const texts = ["I'm sorry, Sristi... 💔", "Please forgive me... 🥺", "You're my everything... 💝", "Your Jatin loves you... ❤️", "Maaf karde baby... 🫶🏻"];
    let i = 0, j = 0, del = false;
    function type() {
        const txt = texts[i];
        typedEl.textContent = txt.substring(0, j + (del ? -1 : 1));
        j += del ? -1 : 1;
        if (!del && j === txt.length) { del = true; setTimeout(type, 2000); return; }
        if (del && j === 0) { del = false; i = (i + 1) % texts.length; setTimeout(type, 500); return; }
        setTimeout(type, del ? 50 : 100);
    }
    type();
}

// STATS COUNTER
const stats = document.querySelectorAll('.stat-number[data-target]');
if (stats.length) {
    let done = false;
    function animateStats() {
        stats.forEach(s => {
            const t = parseInt(s.getAttribute('data-target')), dur = 2000, step = t / (dur / 16);
            let c = 0;
            const upd = () => { c += step; if (c < t) { s.textContent = Math.floor(c); requestAnimationFrame(upd); } else s.textContent = t; };
            upd();
        });
    }
    window.addEventListener('scroll', function chk() {
        const sec = document.querySelector('.love-stats');
        if (sec && sec.getBoundingClientRect().top < window.innerHeight * 0.8 && !done) { done = true; animateStats(); window.removeEventListener('scroll', chk); }
    });
}