# PompousPlayer
Pompous Player is the future of online video editing. That future is now.

It's a Javascript-based slideshow &amp; presentation player that can play any CSS animation like a video: you can play/pause/continue/seek the "video" at any time. 

This enables us to develop professional online WYSIWYG presentation editors with a "timeline", that can instantly save the user's changes (there is no need to "render" the video each time it is edited). 
By using HTML+CSS (instead of JS code) to define each presentation, it is extremely easy to automate the presentation creation by utilizing templates, wizards, etc.

When we say "presentations", we don't mean the PowerPoint kind. We mean "videos" with slick animations of images, texts, short html5 videos and 3D panoramas.

For the common user who is NOT developing an online presentation editing tool: You can create rich animated presentations without having to write a single line of JavaScript code (still, you may need basic JS knowledge). If you know CSS, you'll be right at home. 

## Contents
* [Installation and Getting Started](#installation-and-getting-started)
* [Demos](#demos)
* [Traits of a good slideshow player](#traits-of-a-good-slideshow-player)
* [Developer Documentation](#developer-documentation)
* [FAQ](#faq)

## Installation and Getting Started
There is nothing to install. Just clone or download this git repository to your pc. You can find the Pompous Player Javascript code in the [/js subfolder](https://github.com/TorZidan/PompousPlayer/tree/master/js). 

There are few different ways to get started:
- Look at the [demos](https://github.com/TorZidan/PompousPlayer/tree/master/demos) and [skins](https://github.com/TorZidan/PompousPlayer/tree/master/skins), choose the one you like, copy the html file, edit it, then host it on your own webserver. Have no webserver handy, but still want to get your hands dirty? Save any of the .html files to your PC and double-click on it to open and play it in your favorite web browser; then edit it using your favorite text editor. 
- Try our online slideshow builder at [https://www.pompousphotos.com](https://www.pompousphotos.com/) : sign-in (it's free), and create a new presentation. Then, optionally, share it with others, embed it on your web site, or download it and continue from there to edit it manually, host it elsewhere, or do whatever you like with it.

## Demos
are in the in the [/demos subfolder](https://github.com/TorZidan/PompousPlayer/tree/master/demos). 

## Sooo WHAT IS the use of this?
Web browsers are powerful presentation tools. Still, creating a professional slideshow using pure CSS is mostly impossible: it's hard to pause/resume CSS animations, to synchronize the animation with an audio track, to have a responsive layout that scales the way you want, etc.

We've solved all these challenges in Pompous Player. 

Think of it as a video player for a mix of css-based animations of images, texts and (optionally) html5 videos and 3D panoramas.
Furthermore, it could be used in an online WYSYWIG (what you see is what you get) video editing tool, so that users can instantly preview the "video" and "jump" into any point of time in the "video" play.

Web developers can create rich online presentations with animated images, texts and videos using html and css; they can be played like a video with this player, even though they are not videos.
In addition to the "video-like" skin, we've included a "carousel" skin as well.

Typical usages include: splash screens for web sites, ads, slideshows of open houses and short-term rentals, your vacation pictures slideshows, walk-down-the-memory-lane slideshows, weddings, events, etc.

Optionally (not included), a web browser screen recording tool can be utilized (e.g. by running a "headless" browser on a server), to record a presentation as a video file that can be shared on popular social platforms.

## Traits of a good slideshow player
Here are the major features of Pompous Player:
- It plays like a video, looks like a video, but it's just a set of images, styles and (optionally) short videos. As such, it loads much faster over slow internets.
- You can play/pause/resume the "video" at any moment; also, it pauses automatically when the browser tab becomes inactive.
- You can jump to any offset in the "video" by clicking on, or dragging the progress bar (just like when playing a video).
- You can use "fast forward/backward" buttons that can jump to "interesting" places (defined by you) in the "video".
- You can play the "video" forward OR even backwards! Woooah, a time machine?
- You can play slideshows offline, from files on your PC, without a webserver, and without internet connection.
- You can embed a slideshow on another web page either by using an iframe (recommended), or by directly placing the presentation css, html and js code on the page.
- You can have responsive presentations that fit the browser width or the with+height, and scale nicely on resize.
- You can toggle the presentation in full screen, or exit full screen at any time.
- You can add multiple html5 videos and 3D panoramas, and show/hide, play/pause them at any desired time.
- You can add an audio track, and it will be synchronized with the "video" at all times; play, pause, resume, jump work as expected.
- Unlike in videos, you can have clickable buttons and links in your slideshow, and wire them up to do whatever you want.
- You can set a presentation to auto-loop forever, until you faint!
- It supports mobile swipe left and right ("Swiper, No Swiping!").
- It plays the same slideshow exactly the same in all major browsers, including mobile devices (but not on rotary phones); it's scaled proportionally, as needed, to fit every screen.
- The player javascript code is self-sufficient (does not require 3rd part libraries) and fits in one 50kB file (when minimized).
- If you know CSS, you'll be right at home. All the slideshow CSS and html code is in your capable hands (not in our Javascript code).

## Developer Documentation

is [here](DOCUMENTATION.md).

## FAQ
is [here](FAQ.md).
