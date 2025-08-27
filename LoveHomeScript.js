// noinspection SpellCheckingInspection,JSUnresolvedVariable,JSUnresolvedFunction,TypeScriptUMDGlobal,JSUnusedGlobalSymbols
// ==UserScript==
// @name         LoveHomeDownload
// @namespace    https://github.com/MightyKnights
// @author       MightyKnight
// @description  Adds download buttons over the video player to open the direct MP4 link in a new tab on lovehomeporn.com video pages
// @version      2.0.1
// @updateURL    https://github.com/MightyKnights/UserScripts/blob/main/LoveHomeScript.js
// @downloadURL  https://github.com/MightyKnights/UserScripts/blob/main/LoveHomeScript.js
// @match        https://lovehomeporn.com/video/*
// @icon         data:image/gif;*We dont do base⁤ 64 codes here*,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none

// ==/UserScript==
(function () {
    'use strict';

    // Extract video ID from URL
    const match = window.location.pathname.match(/\/video\/(\d+)\//);
    if (!match) return;

    const videoId = match[1];
    const idPrefix = videoId.slice(0, 3);
    const mp4Url = `https://lovehomeporn.com/media/videos/mp4/${idPrefix}/${videoId}.mp4`;
    const mp4Url2 = `https://cdn.static.lovehomeporn.com/media/videos/mp4/${idPrefix}/${videoId}.mp4`;

    // Function to position button over video player
    function hidePlayButtonAndBanner() {
        const hidePlayButton = 'button-play';
        const hideBanner = 'notifi';
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerText = `.${hidePlayButton}, .${hideBanner} { display: none !important; }`;
        document.head.appendChild(style);
    }
    function positionButtonOverPlayer() {
        const videoPlayer = document.querySelector('video') || document.querySelector('.video-player') || document.querySelector('.player');

        if (videoPlayer) {
            const rect = videoPlayer.getBoundingClientRect();

            button.style.position = 'absolute';
            button.style.top = `${rect.top + (rect.height / 2) - 55}px`; // Center vertically
            button.style.left = `${rect.left + (rect.width / 2)}px`;
            button.style.transform = 'translateX(-50%)';
            button2.style.position = 'absolute';
            button2.style.top = `${rect.top + (rect.height / 2) + 10}px`; // Center vertically
            button2.style.left = `${rect.left + (rect.width / 2)}px`;
            button2.style.transform = 'translateX(-50%)';
        } else {
            // Fallback to original position if player not found
            button.style.position = 'fixed';
            button.style.top = '20px';
            button.style.left = '50%';
            button.style.transform = 'translateX(-50%)';
            button2.style.position = 'fixed';
            button2.style.top = '60px';
            button2.style.left = '50%';
            button2.style.transform = 'translateX(-50%)';
        }
    }

    // Create Button Method 1
    const button = document.createElement('button');
    button.textContent = '▶️ Watch/Download video - Method 1';
    button.style.position = 'absolute';
    button.style.zIndex = '9999';
    button.style.padding = '12px 20px';
    button.style.backgroundColor = '#e91e63';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '6px';
    button.style.fontSize = '16px';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.25)';

    button.addEventListener('click', () => {
        window.open(mp4Url, '_blank');
    });

    // Create Button Method 2
    const button2 = document.createElement('button');
    button2.textContent = '▶️ Watch/Download video - Method 2';
    button2.style.position = 'absolute';
    button2.style.zIndex = '9999';
    button2.style.padding = '12px 20px';
    button2.style.backgroundColor = '#e91e63';
    button2.style.color = '#fff';
    button2.style.border = 'none';
    button2.style.borderRadius = '6px';
    button2.style.fontSize = '16px';
    button2.style.cursor = 'pointer';
    button2.style.boxShadow = '0 2px 8px rgba(0,0,0,0.25)';

    button2.addEventListener('click', () => {
        window.open(mp4Url2, '_blank');
    });

    // Add button to the body
    document.body.appendChild(button);
    document.body.appendChild(button2);

    // Position the button initially
    positionButtonOverPlayer();
    hidePlayButtonAndBanner();
    // Reposition on window resize
    window.addEventListener('resize', positionButtonOverPlayer);
})();
