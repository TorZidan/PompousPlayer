
## Available Skins

The Pompous Player can be customized to have different looks:

- [skin-carousel-001.html](https://www.pompousphotos.com/html/GitHub/skins/skin-carousel-001.html) : a carousel with < (previous) and > (next) buttons on each side, and muuuch mooore.
- [skin-no-navigation-001.html](https://www.pompousphotos.com/html/GitHub/skins/skin-no-navigation-001.html) : have no buttons at all. 
- [skin-video-like-001.html](https://www.pompousphotos.com/html/GitHub/skins/skin-video-like-001.html) :  video-like, with a progress bar and play controls at the bottom. Can you tell it's not video?

We call these "skins". Each file above is a full slideshow, with just one "slide" in it.

How does it work?
Look for the "skin" comments in the CSS and HTML sections of the files.
Diff a couple of skin files to see the diff.
Each skin is composed of CSS, HTML and Javascript code.

Let's take a closer look at the "video-like" skin:
It provides a video-like progress bar and play controls at the bottom of the presentation.

- the html for the progress bar is in [skin-video-like-001.html](./skin-video-like-001.html). Look at the html code between the `<!-- ================= Begin video-like-001 skin html ... -->` comment and the `<!-- ================= End video-like-001 skin html ================= -->` comment. This is boilerplate html code that you should copy/paste into your stage html element, after the actual presentation html content.
- the CSS for this skin is in file [skin-video-like-001.css](./skin-video-like-001.css). You should include this CSS file in your presentation html file, like this: `<link rel="stylesheet" href=".path.to.file./skin-video-like-001.css" />`

- the javascript code for this skin is in file [pp-skins.js](../js/pp-skins.js), look for "class PompousVideoLikeNavigation". You should include it into your presentation like this: `<script type="text/javascript" src=".path.to.file./js/pp-skins.js"></script>` or `<script type="text/javascript" src=".path.to.file./js/pp-all-in-one.min.js"></script>`

The best part is: YOU CAN REUSE ALL OF THIS, WITHOUT HAVING TO CHANGE A SINGLE LINE OF CODE. Or you can tweak a skin to match your needs. The code is clean, simple, and easy to understand.

## Implementing a new Skin

Interested in implementing your own skin? Are you a bioengineer of sort?
Here's all you need to know. 

Each skin navigation object (e.g. PompousVideoLikeNavigation) must have the following method signature;
these are functions that the Pompous Player invokes on the navigation object, to let it know of the play progress:

```html
/** 
 * All play durations below are in milliseconds, and are always counted 
 * from the "left beginning" of the play (even if the presentation is currently playing backwards).
 * This way they can be used directly to draw e.g. a progress bar of the play.
 * 
 * @constructor */
function PompousNavigationInterface(navigationOptions) {};
PompousNavigationInterface.prototype.initStarted = function(presentationOptions, thePompousPlayer) {};
PompousNavigationInterface.prototype.initFinished = function(presentationOptions, totalPlayDurationMs) {};
PompousNavigationInterface.prototype.imageLoaded = function(image, totalImagesToBeLoaded, message) {};
PompousNavigationInterface.prototype.waitingForVideoToPlay = function() {};
PompousNavigationInterface.prototype.videoPlayStarted = function() {};
PompousNavigationInterface.prototype.videoPlayPaused = function() {};
PompousNavigationInterface.prototype.videoPlayErrored = function(error) {};
PompousNavigationInterface.prototype.progressUpdate = function(progressText, playDurationMs, totalPlayDurationMs, isInstant) {};
PompousNavigationInterface.prototype.onPrevOrNextAnimationChange = function(a, b, c, d) {};
PompousNavigationInterface.prototype.reset = function(hasAudio, isAudioMuted) {};
PompousNavigationInterface.prototype.playStarted = function(playDurationMs, totalPlayDurationMs) {};
PompousNavigationInterface.prototype.audioMutedUnmuted = function(a) {};
PompousNavigationInterface.prototype.playPaused = function(playDurationMs, totalPlayDurationMs) {};
/** Invoked when playing forward and finishing the play at the "right" end. Can be used to show the "rewind and replay" button. */
PompousNavigationInterface.prototype.performanceFinished = function() {};
/** Invoked when playing backward and finishing the play at the "left" end. Can be used to disable the "<<" button. */
PompousNavigationInterface.prototype.performanceFinishedBackward = function() {};
PompousNavigationInterface.prototype.fullScreenChanged = function(a) {};
PompousNavigationInterface.prototype.toggleShowHideShareMenu = function(event) {};
PompousNavigationInterface.prototype.copyPresentationUrlToClipboard = function() {};
PompousNavigationInterface.prototype.shareViaGmail = function() {};
```
Note: what you see above is a set of google closure compiler "externs" that we use to [closure-compile](https://github.com/google/closure-compiler/) the code in [pp-skins.js](../js/pp-skins.js). 

In addition, your navigation object can (and should) invoke certain functions on the Pompous Player object to command it, e.g.:

```html
/** @constructor */
function PompousPlayerInterface(userOptions) {};
PompousPlayerInterface.prototype.init = function() {};
PompousPlayerInterface.prototype.isReady = function() {};
PompousPlayerInterface.prototype.togglePlayPauseResume = function(playForwardBool) {};
PompousPlayerInterface.prototype.togglePlayPauseResumeRewind = function(playForwardBool) {};
PompousPlayerInterface.prototype.scaleStage = function(newScale) {};
PompousPlayerInterface.prototype.getStageScale = function() {};
PompousPlayerInterface.prototype.jumpTo = function(jumpToPercent, resumePlayingBool) {};
PompousPlayerInterface.prototype.jumpToTime = function(jumpToTimeMillis, resumePlayingBool) {};
PompousPlayerInterface.prototype.jumpBy = function(jumpByMillis, resumePlayingBool) {};
PompousPlayerInterface.prototype.playPreviousAnimation = function() {};
PompousPlayerInterface.prototype.playPreviousAnimationBackward = function() {};
PompousPlayerInterface.prototype.playNextAnimation = function() {};
PompousPlayerInterface.prototype.playNextAnimationForward = function() {};
PompousPlayerInterface.prototype.restartFromBeginning = function() {};
PompousPlayerInterface.prototype.toggleAudioOnOff = function() {};
PompousPlayerInterface.prototype.isAudioOn = function() {};
PompousPlayerInterface.prototype.hasAudioOrVideos = function() {};
PompousPlayerInterface.prototype.isAnyVideoBuffering = function() {};
PompousPlayerInterface.prototype.toggleFullScreen = function() {};
PompousPlayerInterface.prototype.isInFullScreen = function() {};
PompousPlayerInterface.prototype.getOptions = function() {};
PompousPlayerInterface.prototype.getStageElement = function() {};
PompousPlayerInterface.prototype.isPaused = function() {};
PompousPlayerInterface.prototype.isForward = function() {};
PompousPlayerInterface.prototype.changePlayDirection = function(wantToPlayForwardBool) {};
PompousPlayerInterface.prototype.getCurrentPlayTime = function() {};
PompousPlayerInterface.prototype.getCurrentPlayTimeCountedFromLeftStart = function() {};
PompousPlayerInterface.prototype.getTotalPlayDuration = function() {};
PompousPlayerInterface.prototype.whatNonskippableAnimationIsAt = function(playDurationMs) {};
PompousPlayerInterface.prototype.getPompousEventNotifier = function() {};
```

To use your "skin" with the "Zero JS code" way of writing presentations, add a few lines [here](../js/pp-dependencies.js#L218).
Otherwise, see [this example](../demos/ZoomInOut.html) for how to instantiate your "skin" navigation JS object and wire it up into a presentation.

Make sure to share your new skin by emailing us at support@pompousphotos.com. We don't accept skins via regular nail!

