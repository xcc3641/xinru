import Canvas from "./components/canvas";
import Viewport from "./components/viewport";
import Animation from "./components/animation";
import Constants from "./components/constants";
import StateManager from "./components/stateManager";
import Stars from "./components/stars";
import metadata from "../site.config.json";

import * as utils from "./components/utils";

window.addEventListener("DOMContentLoaded", function () {
  window.onclick = () => document.querySelector("audio").play();

  fetchData();
});

async function fetchData() {
  const {
    innerWidth
  } = window;

  const data = metadata;

  const headerText = document.querySelector(".header-text");
  const mainText = document.querySelector(".main-text");
  const footerText = document.querySelector(".footer-text");
  const loading = document.querySelector(".loading");

  headerText.textContent = data.ocupation;
  mainText.textContent = data.title;
  footerText.textContent = data.bio;

  const particlesColor = data.particles.color;
  const song = data.song;

  setMusic(song);
  setFireColor(particlesColor);
  setCssVariables(particlesColor);

  enableBackground("#a", 12, innerWidth / 50, particlesColor);
  enableBackground("#b", 26, 2, particlesColor);
  enableBackground("#c", 4, innerWidth / 20, particlesColor);

  loading.classList.remove("visible");
  loading.classList.add("hidden");

  initToggleText()
  initToogleNext()
}

function setMusic(song) {
  const songName = song.name;
  const songFile = song.file;
  const songUrl = song.url;

  const songPath = window.location.pathname + "music/";

  const audioPlayer = document.querySelector("#music");
  const songLabel = document.querySelector(".song-label");

  audioPlayer.setAttribute("src", songPath + songFile);
  // songLabel.setAttribute("href", songUrl);

  songLabel.innerText += songName;
}

function getRgbaFromAny(color, alpha) {
  function getRgbaFromRgb(rgb) {
    const {
      r,
      g,
      b
    } = utils.splitRgbColors(rgb);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const result = utils.isRgba(color) ?
    color :
    utils.isRgb(color) ?
    getRgbaFromRgb(color) :
    (() => {
      const parsed = utils.hexToRgb(color);

      return getRgbaFromRgb(`rgb(${parsed.r}, ${parsed.g}, ${parsed.b})`);
    })();

  return result;
}

function setFireColor(color) {
  const defaultAlpha = 0.5;

  const finalColor = getRgbaFromAny(color, defaultAlpha);

  const fire = document.getElementById("fire");

  fire.style.background = `linear-gradient(to top, ${finalColor}, transparent)`;
}

function setCssVariables(color) {
  const rgb =
    utils.isRgba(color) || utils.isRgb(color) ?
    utils.splitRgbColors(color) :
    (() => {
      const parsed = utils.hexToRgb(color);

      return parsed;
    })();

  const hsl = utils.rgbToHsl(rgb.r, rgb.g, rgb.b);

  const titleColor = {
    ...hsl,
    l: 90
  };
  const textColor = {
    ...hsl,
    l: 85
  };

  const newRgb = utils.hslToRgb(hsl.h, hsl.s, 85);

  document.documentElement.style.setProperty(
    "--title-color",
    `hsl(${titleColor.h}, ${titleColor.s}%, ${titleColor.l}%)`
  );
  document.documentElement.style.setProperty(
    "--text-color",
    `hsl(${textColor.h}, ${textColor.s}%, ${textColor.l}%)`
  );
  document.documentElement.style.setProperty(
    "--light-text-color",
    `rgba(${newRgb.r}, ${newRgb.g}, ${newRgb.b}, 0.5)`
  );
}

function enableBackground(selector, size, maxCount, color) {
  let context;

  const stateManager = StateManager();
  stateManager.createInstance("viewport", Viewport(selector));
  stateManager.createInstance("constants", Constants(size, maxCount, color));

  context = stateManager;

  stateManager.createInstance("canvas", Canvas.apply(context, [selector]));
  stateManager.createInstance("stars", Stars.apply(context));

  context = stateManager;

  const animation = Animation.apply(context);
  animation.start();
}


var showText = false
var birthPageIndex = 0

function initToggleText() {
  const birth = document.querySelector('.birth-toggle')
  birth.onclick = function () {
    showText = !showText;
    birthPageIndex = 0;

    const birthPage = document.querySelectorAll('.birth')
    const birthText = document.querySelector('.birth-text')
    const birthTitle = document.querySelector('.birth-title')

    const list = document.querySelectorAll(".homepage");
    if (showText) {
      list.forEach((e) => {
        e.classList.remove("visible");
        e.classList.add("hidden")
      })

      birthPage.forEach((e) => {
        e.classList.remove('hidden')
        e.classList.add('visible')
      })

      birthTitle.innerText = metadata.birth[birthPageIndex].title
      birthText.innerText = metadata.birth[birthPageIndex].content
    } else {
      list.forEach((e) => {
        e.classList.remove("hidden");
        e.classList.add("visible")
      })

      birthPage.forEach((e) => {
        e.classList.remove('visible')
        e.classList.add('hidden')
      })
    }
  }
}

function initToogleNext() {
  const next = document.querySelector('.birth-next')
  next.onclick = function () {
    const birthText = document.querySelector('.birth-text')
    const birthTitle = document.querySelector('.birth-title')
    const isLastPageOnClick = birthPageIndex == metadata.birth.length - 1
    if (isLastPageOnClick) {
      next.innerText = " ➡️ "
      const birth = document.querySelector('.birth-toggle')
      birth.onclick()
      return
    }

    birthPageIndex++
    const valid = metadata.birth.length > birthPageIndex
    if (valid) {
      birthTitle.innerText = metadata.birth[birthPageIndex].title
      birthText.innerText = metadata.birth[birthPageIndex].content
    }

    if (birthPageIndex == metadata.birth.length - 1) {
      next.innerText = "  🎂  "
    }
  }
}
