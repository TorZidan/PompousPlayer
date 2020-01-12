
The Pompous Player can be customized to have different looks:

- [skin-carousel-001.html  : carousel](https://www.pompousphotos.com/html/GitHub/skins/skin-carousel-001.html), with < and > buttons on each side, and muuuch mooore.
- [skin-no-navigation-001.html : have no buttons at all](https://www.pompousphotos.com/html/GitHub/skins/skin-no-navigation-001.html). 
- [skin-video-like-001.html:  video-like](https://www.pompousphotos.com/html/GitHub/skins/skin-video-like-001.html), with a progress bar on the bottom. Can you tell it's not video?

We call these "skins". Each file above is a full slideshow, with just one slide in it.

How does it work?
Look for the "skin" comments in the CSS and HTML sections of the files.
Diff a couple of skin files to see the diff!
Each skin is composed of CSS and HTML code (in the files above), plus it's own "navigation" JS object in [/js/pp-skins.js](https://github.com/TorZidan/PompousPlayer/tree/master//js/pp-skins.js)
Things are stitched together with few lines of JS code; you'll find something like this in every slideshow html file:

```html
<script>
// Use the "like-a-video" skin:
const pompousNavigation = new PompousVideoLikeNavigation({skinName:"video-like-001, anything goes here", stageId:"the-pompous-stage", hideShareButton:false});

const pompousOptions = {
   // ... some optional options here
   // Let the player know about the skin navigation object, so that it can call functions on it, at will:
   pompousEventNotifier: pompousNavigation,
};

// This will also initialize the Pompous Player at the right time (at page load, upon "document ready"):
const pompousPlayer = new PompousPlayer(pompousOptions);

// Then, optionally, add a window resize listener:
window.addEventListener("resize", () => {updateStageScale(pompousPlayer)});

// Then, optionally, add a mobile swipe listener (not shown)
</script>

```

Interested in implementing your own skin? Are you a bioengineer of sort?
Here's all you need to know. 

Each skin navigation object (e.g. PompousVideoLikeNavigation) must have the following method signature;
these are functions that the Pompous Player invokes on the navigation object, to let it know of the play progress:

```html
/** @constructor */
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
PompousNavigationInterface.prototype.copyPresentationUrlToClipboard = function(a) {};
PompousNavigationInterface.prototype.shareViaGmail = function(a) {};
```
Note: what you see above is a set of google closure compiler "externs" that we use to closure-compile the code in [pp-skins.js](../js/pp-skins.js). If you don't know what this is, don't worry about it.

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
PompousPlayerInterface.prototype.hasAnyVideos = function() {};
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
```

Make sure to share your new skin by emailing us at support@pompousphotos.com. We don't accept skins via regular nail!

