let currentSong = 'Ensemble for Polaris'; // 设置当前播放的歌曲

/**
 * 解析歌词字符串
 * 得到一个歌词对象的数组
 * 将时间和歌词分隔开
 * 每个歌词对象 { time: 开始时间, words: 歌词内容 }
 */
function parseLrc(lrc) {
  let lines = lrc.split('\n');
  const result = [];
  lines.forEach(item => {
    let parts = item.split(']');
    const timeStr = parts[0].substring(1);
    const obj = {
      time: parseTime(timeStr),
      words: parts[1]
    };
    result.push(obj);
  });
  return result;
}

/**
 * 将字符串的时间转换为数字
 * @param {String} timeStr
 * @returns
 */
function parseTime(timeStr) {
  let parts = timeStr.split(':');
  let minSec = parts[1].split('.');
  return +parts[0] * 60 + +minSec[0] + +minSec[1] / 1000;
}

/**
 * 获取需要的DOM
 */
let dom = {
  audio: document.querySelector('audio'),
  ul: document.querySelector('.container ul'),
  container: document.querySelector('.container')
};

// 初始化空的歌词数据
let lrcData = [];

/**
 * 创建歌词元素
 */
function createLrcElement(lrcData) {
  dom.ul.innerHTML = ''; // 清空现有歌词
  let frag = document.createDocumentFragment();
  lrcData.forEach(item => {
    let li = document.createElement('li');
    li.textContent = item.words;
    frag.appendChild(li);
  });
  dom.ul.appendChild(frag);
}

/**
 * 根据当前播放器时间来找到需要高亮显示的歌词
 * 如果没有任何一句歌词找到，则返回-1
 */
function findIndex(lrcData) {
  let curTime = dom.audio.currentTime;
  for (let i = 0; i < lrcData.length - 1; i++) {
    if (curTime >= lrcData[i].time && curTime < lrcData[i + 1].time) {
      return i;
    }
  }
  return lrcData.length - 1;
}

/**
 * 设置ul的偏移量
 */
function changeOffset() {
  let index = findIndex(lrcData);
  const maxOffset = dom.ul.scrollHeight - dom.container.clientHeight;
  let offset = index * 30 - dom.container.clientHeight / 2 + 15; // 假设每行高度为30px
  if (offset < 0) {
    offset = 0;
  }
  if (offset > maxOffset) {
    offset = maxOffset;
  }
  dom.ul.style.transform = `translateY(-${offset}px)`;
  // 更新激活的歌词
  document.querySelectorAll('.container ul li').forEach((li, idx) => {
    li.classList.toggle('active', idx === index);
  });
}

// 事件监听 - 播放时间变化了
dom.audio.addEventListener('timeupdate', changeOffset);

// 加载并显示歌词
function loadLyrics(lyricFile) {
  fetch(`src/lyrics/${lyricFile}`)
      .then(response => response.text())
      .then(text => {
        lrcData = parseLrc(text);
        createLrcElement(lrcData);
      });
}

// 在页面加载时，绑定事件监听器
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('lyricLanguage').addEventListener('change', function() {
    const selectedLanguage = this.value;
    loadLyrics(`${currentSong}.${selectedLanguage}.lrc`);
  });

  // 默认加载中文歌词
  loadLyrics(`${currentSong}.cn.lrc`);
});
