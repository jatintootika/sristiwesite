3// ============================================
// 🎵 AUTOPLAY MUSIC
// ============================================
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

// ============================================
// 🎵 MUSIC TOGGLE
// ============================================
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

// ============================================
// ⌨️ TYPEWRITER EFFECT
// ============================================
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

// ============================================
// 📊 STATS COUNTER ANIMATION
// ============================================
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

// ============================================
// 📸 PHOTO UPLOAD SYSTEM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const photoPreview = document.getElementById('photoPreview');
    const photoInput = document.getElementById('photoInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const removeBtn = document.getElementById('removeBtn');
    const uploadedPhoto = document.getElementById('uploadedPhoto');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    
    if (!photoPreview || !photoInput) return;
    
    const savedPhoto = localStorage.getItem('sristiMemoryPhoto');
    if (savedPhoto) {
        uploadedPhoto.src = savedPhoto;
        uploadedPhoto.style.display = 'block';
        uploadPlaceholder.style.display = 'none';
        removeBtn.style.display = 'inline-block';
        uploadBtn.textContent = '📸 Change Photo';
    }
    
    photoPreview.addEventListener('click', function() { photoInput.click(); });
    uploadBtn.addEventListener('click', function(e) { e.stopPropagation(); photoInput.click(); });
    
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) { alert('❌ Sirf photo select kar! (JPG, PNG)'); return; }
        if (file.size > 10 * 1024 * 1024) { alert('❌ Photo 10MB se chhoti honi chahiye!'); return; }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageData = event.target.result;
            try { localStorage.setItem('sristiMemoryPhoto', imageData); }
            catch(e) { alert('⚠️ Storage full! Chhoti photo try karo.'); return; }
            uploadedPhoto.src = imageData;
            uploadedPhoto.style.display = 'block';
            uploadPlaceholder.style.display = 'none';
            removeBtn.style.display = 'inline-block';
            uploadBtn.textContent = '📸 Change Photo';
            showUploadCelebration();
        };
        reader.readAsDataURL(file);
    });
    
    removeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (confirm('Sach mein photo hatani hai? 🥺')) {
            localStorage.removeItem('sristiMemoryPhoto');
            uploadedPhoto.style.display = 'none'; uploadedPhoto.src = '';
            uploadPlaceholder.style.display = 'block';
            removeBtn.style.display = 'none'; uploadBtn.textContent = '📸 Choose Photo';
        }
    });
    
    photoPreview.addEventListener('dragover', function(e) { e.preventDefault(); this.style.borderColor='#ff6b9d'; this.style.background='rgba(255,107,157,0.15)'; });
    photoPreview.addEventListener('dragleave', function(e) { e.preventDefault(); this.style.borderColor='rgba(255,107,157,0.4)'; this.style.background='rgba(255,255,255,0.03)'; });
    photoPreview.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor='rgba(255,107,157,0.4)'; this.style.background='rgba(255,255,255,0.03)';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) { photoInput.files = e.dataTransfer.files; photoInput.dispatchEvent(new Event('change')); }
    });
    
    function showUploadCelebration() {
        for (let i = 0; i < 15; i++) {
            const emoji = document.createElement('span');
            emoji.textContent = ['💝', '💖', '📸', '✨', '🎉'][Math.floor(Math.random() * 5)];
            emoji.style.cssText = 'position:fixed;pointer-events:none;font-size:'+(1+Math.random()*2)+'rem;top:50%;left:50%;z-index:9999;animation:uploadBurst '+(1+Math.random()*1.5)+'s ease-out forwards;animation-delay:'+(Math.random()*0.3)+'s;--tx:'+((Math.random()-0.5)*400)+'px;--ty:'+((Math.random()-0.5)*400)+'px;';
            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 2000);
        }
    }
    
    console.log('✅ Photo Upload System Ready! 📸💝');
});

const burstStyle = document.createElement('style');
burstStyle.textContent = '@keyframes uploadBurst { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; } }';
document.head.appendChild(burstStyle);
