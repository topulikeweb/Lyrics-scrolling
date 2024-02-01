let currentSong = 'Ensemble for Polaris'; // 设置当前播放的歌曲

function parseLrc(lrc) {
    let lines = lrc.split('\n');
    const result = [];
    lines.forEach(item => {
        if (item.indexOf(']') !== -1) {
            let parts = item.split(']');
            const timeStr = parts[0].substring(1);
            const obj = {
                time: parseTime(timeStr),
                words: parts[1]
            };
            result.push(obj);
        }
    });
    return result;
}

function parseTime(timeStr) {
    if (!timeStr) {
        return 0;
    }
    let parts = timeStr.split(':');
    let minSec = parts[1].split('.');
    return +parts[0] * 60 + +minSec[0] + (+minSec[1] || 0) / 1000;
}

let dom = {
    audio: document.querySelector('audio'),
    ul: document.querySelector('.container ul'),
    container: document.querySelector('.container')
};

let lrcData = [];

function createLrcElement(lrcData) {
    dom.ul.innerHTML = '';
    let frag = document.createDocumentFragment();
    lrcData.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item.words;
        frag.appendChild(li);
    });
    dom.ul.appendChild(frag);
}

function findIndex(lrcData) {
    let curTime = dom.audio.currentTime;
    for (let i = 0; i < lrcData.length - 1; i++) {
        if (curTime >= lrcData[i].time && curTime < lrcData[i + 1].time) {
            return i;
        }
    }
    return lrcData.length - 1;
}

function changeOffset() {
    let index = findIndex(lrcData);
    const maxOffset = dom.ul.scrollHeight - dom.container.clientHeight;
    let offset = index * 30 - dom.container.clientHeight / 2 + 15;
    if (offset < 0) {
        offset = 0;
    }
    if (offset > maxOffset) {
        offset = maxOffset;
    }
    dom.ul.style.transform = `translateY(-${offset}px)`;
    document.querySelectorAll('.container ul li').forEach((li, idx) => {
        li.classList.toggle('active', idx === index);
    });
}

dom.audio.addEventListener('timeupdate', changeOffset);

function loadLyrics(lyricFile) {
    let currentPlaybackTime = dom.audio.currentTime; // 保存当前播放时间
    fetch(`src/lyrics/${lyricFile}`)
        .then(response => response.text())
        .then(text => {
            lrcData = parseLrc(text);
            createLrcElement(lrcData);
            dom.audio.currentTime = currentPlaybackTime; // 恢复播放时间
        });
}

document.getElementById('languageSelector').addEventListener('change', function() {
    loadLyrics(`${currentSong}.${this.value}.lrc`);
});

loadLyrics(`${currentSong}.cn.lrc`);