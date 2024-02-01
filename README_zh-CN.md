中文简体 | [English](README.md) 
# 动态歌词显示项目 README
## 可以点击下面的链接查看演示
## [Demo](https://corddt.github.io/Lyrics-scrolling/)
## 简介
本项目创建了一个具有语言切换功能的动态歌词显示系统。它设计用于加载并显示与歌曲“Ensemble for Polaris”音频播放同步的歌词。用户可以在播放过程中无缝切换不同语言的歌词（支持中文、日语、英语、俄语）。

## 特点
- 动态歌词滚动，与音频播放同步。
- 歌词显示的语言选择下拉菜单（支持中文、日语、英语、俄语）。
- 响应式设计，页面底部有音频控制。

## 技术栈
- HTML
- CSS
- JavaScript

## 项目结构
```
project/
│
├── src/
│   ├── MP3/
│   │   └── Ensemble for Polaris.mp3
│   │
│   ├── lyrics/
│   │   ├── Ensemble for Polaris.cn.lrc
│   │   ├── Ensemble for Polaris.jp.lrc
│   │   ├── Ensemble for Polaris.en.lrc
│   │   └── Ensemble for Polaris.ru.lrc
│   │
│   ├── main.js
│   └── style.css
│
└── index.html
```

## 使用说明
1. 在网页浏览器中打开 `index.html`。
2. 歌曲将自动开始播放，歌词将显示并与音频同步滚动。
3. 要更改歌词语言，请将鼠标悬停在右上角的语言选择器上并从下拉菜单中选择所需的语言。

## 实现细节

### main.js
- 处理 `.lrc` 文件的加载和解析。
- 同步歌词显示与音频的当前播放时间。
- 添加动态切换歌词语言的功能。

### style.css
- 为歌词显示、音频控制和语言选择器提供样式。
- 确保不同设备上的响应式布局。

### index.html
- 包含歌词显示、音频播放器和语言选择器的标记。

## 贡献
欢迎 fork 本项目并贡献。如果您发现任何错误或对额外功能或改进有建议，请提交 issue 或 pull request。

