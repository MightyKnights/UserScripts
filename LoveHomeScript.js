// ==UserScript==
// @name         LoveHomeDownload
// @namespace    https://github.com/MightyKnights
// @author       MightyKnight
// @description  Adds download buttons over the video player to open the direct MP4 link in a new tab on lovehomeporn.com video pages
// @version      3.0
// @updateURL    https://github.com/MightyKnights/UserScripts/raw/main/LoveHomeScript.js
// @downloadURL  https://github.com/MightyKnights/UserScripts/blob/main/LoveHomeScript.js
// @match        https://lovehomeporn.com/video/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// ==/UserScript==
(function () {
  "use strict";
  // Extract video ID from URL
  const match = window.location.pathname.match(/\/video\/(\d+)\//);
  if (!match) return;
  const videoId = match[1];
  const idPrefix = videoId.slice(0, 3);
  // Function to hide the original play button and banner from the video player
  function hidePlayButtonAndBanner() {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerText = `.button-play, .notifi { display: none !important; }`;
    document.head.appendChild(style);
  }
  // Function to position button over video player
  function positionButtonOverPlayer() {
    const videoPlayer = document.querySelector('video') || document.querySelector('.video-player') || document.querySelector('.player');
    if (videoPlayer) {
      const rect = videoPlayer.getBoundingClientRect();
      method1.style.position = method2.style.position = "absolute";
      method1.style.top = `${rect.top + rect.height / 2 - 55}px`; // Center vertically
      method2.style.top = `${rect.top + rect.height / 2 + 10}px`; // Center vertically
      method1.style.left = method2.style.left = `${rect.left + (rect.width / 2)}px`;
      method1.style.transform = method2.style.transform = "translateX(-50%)";
    } else {
      // Fallback to original position if player not found
      method1.style.position = method2.style.position = "fixed";
      method1.style.top = "20px";
      method2.style.top = "60px";
      method1.style.left = method2.style.left = "50%";
      method1.style.transform = method2.style.transform = "translateX(-50%)";
    }
  }
  // An object to hold the styles for the buttons
  const buttonStyles = {
    position: "absolute",
    zIndex: "9999",
    padding: "12px 20px",
    backgroundColor: "#e91e63",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
  };
  //Creates and configures a button element.
  function createButton(text, url) {
    const button = document.createElement("button");
    button.textContent = text;
    // Apply all button styles
    Object.assign(button.style, buttonStyles);
    // Add the click event listener
    button.addEventListener("click", () => {
      window.open(url, "_blank");
    });
    return button;
  }
  // Create the buttons and pass their content and urls
  const method1 = createButton('▶️ Watch/Download video - Method 1', `https://lovehomeporn.com/media/videos/mp4/${idPrefix}/${videoId}.mp4`);
  const method2 = createButton('▶️ Watch/Download video - Method 2', `https://cdn.static.lovehomeporn.com/media/videos/mp4/${idPrefix}/${videoId}.mp4`);
  // Add the buttons to the page
  document.body.append(method1, method2);
  // Position the buttons and Hide the original play button and banner
  positionButtonOverPlayer(); hidePlayButtonAndBanner();
  // Reposition on window resize
  window.addEventListener("resize", positionButtonOverPlayer);
})();
