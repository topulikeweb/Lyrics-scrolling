/**
 * 解析歌词字符串
 * 得到一个歌词对象的数组
 * 将时间和歌词分隔开
 * 每个歌词对象 { time: 开始时间, words: 歌词内容 }
 */
function parseLrc () {
  let lines = lrc.split('\n')
  const result = []
  lines.forEach(item => {
    let parts = item.split(']')
    const timeStr = parts[0].substring(1)
    const obj = {
      time: parseTime(timeStr),
      words: parts[1]
    }
    result.push(obj)
  })
  return result
}

/**
 * 将字符串的时间转换为数字
 * @param {String} timeStr
 * @returns
 */
function parseTime (timeStr) {
  let parts = timeStr.split(':')
  return +parts[0] * 60 + +parts[1]
}

let lrcData = parseLrc()

/**
 * 获取需要的dom
 */
let dom = {
  audio: document.querySelector('audio'),
  ul: document.querySelector('.container ul'),
  container: document.querySelector('.container')
}

/**
 * 根据当前播放器时间来找到需要高亮显示的歌词
 * 如果没有任何一句歌词找到，则返回-1
 */
function findIndex () {
  let curTime = dom.audio.currentTime;
  for (let i = 1; i < lrcData.length; i++) {
    if (lrcData[i - 1].time <= curTime && curTime < lrcData[i].time) {
      return i - 1;
    }
  }
  return lrcData.length - 1;
}


/**
 * 创建歌词元素
 */
function createLrcElement () {
  // 创建一个空的文档片段，优化每创建一个li添加到ul中，可以避免频繁的操作dom
  let frag = document.createDocumentFragment()
  lrcData.forEach(item => {
    let li = document.createElement('li')
    li.textContent = item.words
    frag.appendChild(li)
  });
  dom.ul.appendChild(frag)
}

createLrcElement()

// 获取几何高度会导致reflow
// 获取容器高度
const containerHeight = dom.container.clientHeight
// 每个li高度
const liHeight = dom.ul.children[0].clientHeight
// 最大偏移量
const maxOffset = dom.ul.clientHeight - containerHeight

/**
 * 设置ul的偏移量
 */
function changeOffset () {
  let index = findIndex()
  let offset = liHeight * index + liHeight / 2 - containerHeight / 2
  if (offset < 0) {
    offset = 0
  }
  if (offset > maxOffset) {
    offset = maxOffset
  }
  dom.ul.style.transform = `translateY(-${offset}px)`
  // 去掉之前的active样式
  let li = dom.ul.querySelector('.active')
  if (li) {
    li.classList.remove('active')
  }
  // 给最新的li添加样式
  li = dom.ul.children[index]
  if (li) {
    li.classList.add('active')
  }
}

// 事件监听 - 播放时间变化了
dom.audio.addEventListener('timeupdate', changeOffset)
