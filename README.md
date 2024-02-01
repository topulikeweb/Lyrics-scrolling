English | [简体中文](README.zh-CN.md) 
# Dynamic Lyric Display Project
## You can click the link below to see the demo
## [Demo](https://corddt.github.io/Lyrics-scrolling/)
## Introduction
This project creates a dynamic lyric display system with language switching functionality. It is designed to load and display the lyrics of the song "Ensemble for Polaris" synchronized with its audio playback. Users can switch between different language lyrics (Chinese, Japanese, English, Russian) seamlessly during the playback.

## Features
- Dynamic lyric scrolling synchronized with audio playback.
- Language selection dropdown for lyric display (supports Chinese, Japanese, English, Russian).
- Responsive design with audio controls at the bottom of the page.

## Technologies
- HTML
- CSS
- JavaScript

## Project Structure
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

## Usage
1. Open `index.html` in a web browser.
2. The song will start playing automatically, and the lyrics will be displayed and scrolled in sync with the audio.
3. To change the lyric language, hover over the language selector at the top right corner and select the desired language from the dropdown menu.

## Implementation Details

### main.js
- Handles the loading and parsing of `.lrc` files.
- Synchronizes lyric display with the current playback time of the audio.
- Adds functionality to switch lyrics language dynamically.

### style.css
- Provides styling for the lyric display, audio controls, and language selector.
- Ensures responsive layout across different devices.

### index.html
- Contains the markup for the lyric display, audio player, and language selector.

## Contribution
Feel free to fork this project and contribute. If you find any bugs or have suggestions for additional features or improvements, please submit an issue or a pull request.

