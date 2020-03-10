/**
 * @preserve Pompous Player v24 Skins.
 * 
 * @license Copyright (c) 2020 Pompous Media LLC. All rights reserved.
 * Subject to the terms at 
 * https://github.com/TorZidan/PompousPlayer/blob/master/STANDARD_LICENSE 
 * and https://www.pompousphotos.com/commercial_license
 * 
 * There are two ways to use the PompousPlayer: 
 * - use files pp-dependencies.js and pp-player.min.js and pp-skins.js 
 * - use file pp-all-in-one.min.js
 * 
 * The code is annotated so that it can be minified/compiled using the google
 * closure compiler, but there is no need to do that: file pp-player.min.js
 * already includes this code, minified.
 */

/*
 * A simple listener for mobile touch and swipe events, so that swiping
 * left/right could mimic clicking the "<<, ">>" buttons. It sends callback-s
 * which indicate the swipe direction. The callback subscriber can do whatever
 * he likes when called.
 */
class PompousMobileTouchListener {
  /**
   * @param {(Element|string|null)}
   *          element
   * @param {function(string)}
   *          swipeCallback
   * 
   * Needed to suppress a warning in the "if(element !== document) {...}" check
   * below:
   * @suppress {checkTypes}
   */
  constructor(element, swipeCallback) {
    let xdown = null;
    let yDown = null;
    element = typeof(element) === 'string' ? document.querySelector(element) : element;
    
    element.addEventListener(
      'touchstart',
      evt => {
        xdown = evt.touches[0].clientX;                                      
        yDown = evt.touches[0].clientY; 
      },
      false);
         
    element.addEventListener(
      'touchmove',
      evt => {
        // Don't propagate this event, otherwise the browser may "go back"
        // when swiping back; we don't want that.
        // Note: This can't be done on the "document" element, as we get an
        // error :
        // "Unable to preventDefault inside passive event listener".
        if(element !== document) {
          evt.preventDefault();
        }
        
        if ( ! xdown || ! yDown ) {
          return;
        }
        const xDiff = xdown - evt.touches[0].clientX;
        const yDiff = yDown - evt.touches[0].clientY;      
        if (Math.abs(xDiff) + Math.abs(yDiff) > 100) { 
          // to filter-out short swipes:
          if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) {
              swipeCallback('left');
            } else {
              swipeCallback('right');
            }                       
          } else {
            if ( yDiff > 0 ) {
              swipeCallback('up');
            } else {
              swipeCallback('down');
            }                                                                 
          }
          // reset values:
          xdown = null;
          yDown = null;
        }
      }, 
      false);
  }
}
window["PompousMobileTouchListener"]=PompousMobileTouchListener;


/*
 * Please instantiate after the page loads and the dom document is "ready".
 * Listens for touch events on mobile devices (actually on all devices, and that's ok).
 * Useful for carsousel-style presentations.
 * See a demo at https://github.com/TorZidan/PompousPlayer/blob/master/demos/ThePerfectCarousel.html
 * The 1st argument is the "player" instance.
 * Limitations/ requirements:
 *  - Each carousel "slide" animation should be marked as non-skippable (should not have the data-class?-skippable attribute); this way the left/right swipe will get to the next/previous "slide".
 *  - There should be some (>0 millis) "pause" before next "slide" animation (does not need to be the same for all images).
 *  - It works best with the following easing functions: "linear", "ease", "ease-in", "ease-out", "ease-in-out".
 */
class PompousCarouselMobileTouchListener {
  /**
   * @param {PompousPlayerInterface} pompousPlayer
   */
  constructor(pompousPlayer) {
    const mirrorEasingFunctions = {
      "linear":      (t) => {return t;},
      // A mirror of the "ease" (BezierEasing(0.25, 0.1, 0.25, 1.0 )), over the
      // x=y axis:
      // To come up with it, we just swapped the 1st with 2nd argument, and the
      // 3rd with 4th of "ease":
      "ease":        BezierEasing(0.1, 0.25, 1.0, 0.25),
      "ease-in":     BezierEasing(0.0, 0.42, 1.0, 1.0),
      "ease-out":    BezierEasing(0.0, 0.0,  1.0, 0.58),
      "ease-in-out": BezierEasing(0.0, 0.42, 1.0, 0.58),
    };
    let slideAnimMirrorEasingFunction = undefined;
    let slideAnimMirrorEasingFunctionAtTime1 = undefined;
    let touchMoveJustStarted = false;
    let playDurationMillisAtTouchJustStart = undefined;
    let xdown = null;
    const stageElement = pompousPlayer.getStageElement();
    const stageWidth = pompousPlayer.getStageScale() * stageElement.offsetWidth;
    let wasPaused = false;
    let wasAudioOn = false;
    // Has two purposes: 1. To check if another swipe is ongoing. 2. To pause
    // the lay at the end of the swipe, if needed.
    let timeoutId = undefined;
    let maxPlayTimeForSwipeToLeftMillis = undefined;
    let maxPlayTimeForSwipeToRightMillis = undefined;
    
    // undefined = nothing is unfinished; true = go-forward swipe (right to
    // left); false = go-backward swipe.
    let directionOfOngoingTouchmove = undefined;
    
    stageElement.addEventListener(
      'touchstart',
      evt => {
        if(!pompousPlayer.isReady() || pompousPlayer.isAnyVideoBuffering()) {
          return;
        }
        
        touchMoveJustStarted = true;
        // How much have we played so far (from the play start). Will be set
        // actually in 'touchmove':
        playDurationMillisAtTouchJustStart = undefined;
        xdown = evt.touches[0].clientX;
        
        if(!timeoutId) {
          wasAudioOn = pompousPlayer.isAudioOn();
          wasPaused = pompousPlayer.isPaused();
        } else {
          // Another swiping has not finished. Do not set again the wasAudioOn, wasPaused, use the other swipe's values.
          // Prevent that timeout form firing. We'll fire another one once swipe finished:
          clearTimeout(timeoutId);
          // Do not set timeoutId to undefined here. We need it later, to check
          // if another swipe is ongoing
        }    
        
        if(!pompousPlayer.isPaused()) {
          // We pause the play, so that later in "touchmove" we'll just
          // "seek/jump" the play as the user keeps swiping:
          pompousPlayer.togglePlayPauseResume(undefined);
        }
        
        if(pompousPlayer.isAudioOn()) {
          pompousPlayer.toggleAudioOnOff();
        }
       
      }, false);
         
    stageElement.addEventListener(
      'touchmove',
      evt => {
        // Don't propagate this event, otherwise the browser may "go back" when
        // swiping back; we don't want that.
        evt.preventDefault();
        
        if(!pompousPlayer.isReady() || pompousPlayer.isAnyVideoBuffering()) {
          // We are not in a good mood:
          return;
        }
        
        // Distance in pixels in horiz. direction from the swipe-starting-point.
        // It's > when swiping right-to-left, and vice versa:
        const xDiff = xdown - evt.touches[0].clientX;
        if(touchMoveJustStarted && Math.abs(xDiff) <= 5) {
          // Ignore shorter=than-5-pixel swipes:
          return;
        }
        
        if(touchMoveJustStarted) {
          touchMoveJustStarted = false;
          
          // If swiping right-to-left (the case where xDiff>=0), then make sure
          // we are playing forward; otherwise, make sure we are playing
          // backward:
          const swipingForward = xDiff>=0;
          pompousPlayer.changePlayDirection(swipingForward);
          const currentPlayTimeMs = pompousPlayer.getCurrentPlayTimeCountedFromLeftStart();
          // An object with info about what nonskippable anim. is playing at the given time:
          let whatIsAtTouchJustStart = pompousPlayer.whatNonskippableAnimationIsAt(currentPlayTimeMs);
          //console.log("In touchmove: whatIsAtTouchJustStart time "+currentPlayTimeMs+" millis: "+JSON.stringify(whatIsAtTouchJustStart));
          const currentlyPlayingNonSkippableAnimRemainingtimeMs = whatIsAtTouchJustStart? whatIsAtTouchJustStart.remainingPlayTimeMs : undefined;          
          
          if(currentlyPlayingNonSkippableAnimRemainingtimeMs===undefined || (timeoutId!==undefined && directionOfOngoingTouchmove===swipingForward)) {
            // None of the nonskippable animations are currently playing, or a
            // previous swipe is ongoing in the same direction of the current
            // swipe:
            // If swiping right-to-left (in this case we are playing forward,
            // see above), then jump forward to the beginning of the next
            // nonskippable anim, so that we'll start "playing it" as we
            // continue to swipe.
            // If playing left-to-right (in this case we are playing backward,
            // see above), then jump backward to the end of the previous
            // nonskippable anim, so that we'll start "playing it" as we
            // continue to swipe.
            playDurationMillisAtTouchJustStart = (xDiff>=0)? pompousPlayer.playNextAnimation() : pompousPlayer.playPreviousAnimation();
          } else {
            // Some nonskippable animation is currently playing. Do not disturb
            // it, just get the current play duration (from the "left start",
            // even if playing backwards):
            playDurationMillisAtTouchJustStart = currentPlayTimeMs;
          }
          
          // Get this info again, because above we may have jumped to previous or next animation:
          whatIsAtTouchJustStart = pompousPlayer.whatNonskippableAnimationIsAt(playDurationMillisAtTouchJustStart);
          //console.log("In touchmove: whatIsAtTouchJustStart time "+currentPlayTimeMs+" millis: "+JSON.stringify(whatIsAtTouchJustStart));
          if(!whatIsAtTouchJustStart) {
            console.warn("Cound not find what's playing at touch-start play position "+playDurationMillisAtTouchJustStart+" millis. Choosing some default values.");
            whatIsAtTouchJustStart = {
                durationMs: 1000,
                overallTransitionTimingStr: "linear",
            }
          }
          
          const currentSlideAnimDurationMs = whatIsAtTouchJustStart.durationMs || 1000;
          maxPlayTimeForSwipeToLeftMillis  =  currentSlideAnimDurationMs*(xdown)/stageWidth;
          maxPlayTimeForSwipeToRightMillis =  currentSlideAnimDurationMs*(stageWidth - xdown)/stageWidth;
          const currentSlideEasingFunctionStr = whatIsAtTouchJustStart.overallTransitionTimingStr;
          slideAnimMirrorEasingFunction = mirrorEasingFunctions[currentSlideEasingFunctionStr] || mirrorEasingFunctions["linear"];
          slideAnimMirrorEasingFunctionAtTime1 = slideAnimMirrorEasingFunction(1);
          directionOfOngoingTouchmove = swipingForward;
          return;
        }  
                
        if (!xdown || !playDurationMillisAtTouchJustStart) {
          return;
        }

        if(pompousPlayer.isForward()) {
          // The use case of swiping left-to-right (and playing forward as we do
          // so, to keep the current anim. time under the finger):
          // If the carousel transition timing was "transition-timing-function:
          // linear;", the line below would have been sufficient:
          // const jumpByMillis = maxPlayTimeForSwipeToLeftMillis * xDiff/xdown;
          const jumpByMillis = maxPlayTimeForSwipeToLeftMillis * slideAnimMirrorEasingFunction(xDiff/xdown) / slideAnimMirrorEasingFunctionAtTime1;          
          pompousPlayer.jumpToTime(playDurationMillisAtTouchJustStart + jumpByMillis, false);
        } else {
          // The use case of swiping left-to-right (and playing backward as we
          // do so, to keep the current anim. time under the finger):
          // If the carousel transition timing was "transition-timing-function:
          // linear;", the line below would have been sufficient:
          // const jumpByMillis = maxPlayTimeForSwipeToRightMillis * (-1)*
          // xDiff/(stageWidth - xdown);
          const easing = slideAnimMirrorEasingFunction((( (stageWidth - xdown) -  (-1)*xDiff))/(stageWidth - xdown)) / slideAnimMirrorEasingFunctionAtTime1;
          const jumpByMillis = maxPlayTimeForSwipeToRightMillis * (1.0 - easing);
          // As we keep swiping left-to-right, we increment jumpByMillis, so
          // that we jump the "play" more and more backward:
          pompousPlayer.jumpToTime(playDurationMillisAtTouchJustStart - jumpByMillis, false);
        }
        
      }, false);
    
    stageElement.addEventListener(
        'touchend',
        evt => {
          if(!pompousPlayer.isReady() || pompousPlayer.isAnyVideoBuffering()) {
            return;
          }
          
          touchMoveJustStarted = false;
          playDurationMillisAtTouchJustStart = undefined;
          
          const currentPlayTimeMs = pompousPlayer.getCurrentPlayTimeCountedFromLeftStart();
          let whatIsAtTouchEnd = pompousPlayer.whatNonskippableAnimationIsAt(currentPlayTimeMs);
          //console.log("In touchend: whatIsAtTouchEnd "+currentPlayTimeMs+" millis: "+JSON.stringify(whatIsAtTouchEnd));
          const currentlyPlayingNonSkippableAnimRemainingtimeMs = whatIsAtTouchEnd? whatIsAtTouchEnd.remainingPlayTimeMs : undefined;
          
          if(pompousPlayer.isPaused() && (currentlyPlayingNonSkippableAnimRemainingtimeMs!==undefined || !wasPaused)) {
            // Let the current swipe finish. "undefined" below means "do not change
            // the play direction".
            pompousPlayer.togglePlayPauseResume(undefined);
          }
          
          if(currentlyPlayingNonSkippableAnimRemainingtimeMs!==undefined) {
            timeoutId = setTimeout(()=> {
              // Important: This indicates in the code above that no swiping is
              // currently ongoing.
              timeoutId = undefined;
              directionOfOngoingTouchmove = undefined;
              if(wasPaused && !pompousPlayer.isPaused()) {
                // If playing was paused when swiping started, then pause it
                // once the current slide has played:
                pompousPlayer.togglePlayPauseResume(undefined);
              }
              if(wasAudioOn && !pompousPlayer.isAudioOn()) {
                // Turn on the audio again:
                pompousPlayer.toggleAudioOnOff();
              }
              
            }, currentlyPlayingNonSkippableAnimRemainingtimeMs+50);
          } else {
            // Important: This indicates in the code above that no swiping is
            // currently ongoing.
            timeoutId = undefined;
            directionOfOngoingTouchmove = undefined;
            if(wasPaused && !pompousPlayer.isPaused()) {
              // If playing was paused when swiping started, then pause it
              // once the current slide has played:
              pompousPlayer.togglePlayPauseResume(undefined);
            }
            if(wasAudioOn && !pompousPlayer.isAudioOn()) {
              // Turn on the audio again:
              pompousPlayer.toggleAudioOnOff();
            }
          }
       }, false);
  }
}
window["PompousCarouselMobileTouchListener"]=PompousCarouselMobileTouchListener;


/**
 * This is a video-like navigation bar, with a progress bar.
 * 
 * @extends {PompousNavigationInterface}
 */
class PompousVideoLikeNavigation {
  constructor(navigationOptions) {
    /**
     * Set in initStarted():
     * 
     * @type {PompousPlayerInterface|undefined}
     */ 
    this.pompousPlayer = undefined;
    this.presentationOptions = undefined;
    this.stageId = navigationOptions["stageId"];
    this.$stage = undefined;
    this.$sliderNavigationDiv = undefined;
    this.$playPauseResumeButton = undefined;
    this.$prevAnimationButton = undefined;
    this.$nextAnimationButton = undefined;
    this.$rewindToBeginningButton = undefined;
    this.$audioOnOffButton = undefined;
    this.$fullScreenButton = undefined;
    this.$statusBar = undefined;
    this.$progressContainerDiv = undefined;
    this.$progressTrackDiv = undefined;
    this.$progressHandleDiv = undefined;
    this.$currentPlayTimeDiv = undefined;
    this.$shareButton = undefined;
    this.$shareMenu = undefined;
    // Needed to auto-hide the bottom nav. bar during playing:
    this.idleMouseTimer = undefined;
    this.isMouseInNavigationDiv = false;
    this.skipMouseMovedEvent = false;
    this.imagesLoadedSoFar = 0;
    this.currentlyPlaying = false;
    this.performanceFinishedBool = false;
    // Set initially to "true", because at page load we start playing from the "left end":
    this.performanceFinishedBackwardBool = true;
    this.draggingTheProgressHandle = false;
    this.resumePlayAfterProgressHandleDragComplete = false;
    this.lastUpdatedPlayDurationMs = 0;
    
    // Invoked at page load, once the document is ready:
    ppDocumentReady( () => {
      this.$stage = $("#"+this.stageId);
      if(this.$stage.length===0) {
        alert("Invalid play script! Developer, see the browser console for more info.");
        throw Error("No such stage element in the DOM document: '"+this.stageId+"'!");
      }
      this.$sliderNavigationDiv = $("#"+this.stageId+" .pp-selector-video-like-navigation");      
      this.$playPauseResumeButton = this.$sliderNavigationDiv.find(".pp-selector-play-pause-resume-button");
      this.$prevAnimationButton = this.$sliderNavigationDiv.find(".pp-selector-prev-animation-button");
      this.$nextAnimationButton = this.$sliderNavigationDiv.find(".pp-selector-next-animation-button");
      this.$rewindToBeginningButton = this.$sliderNavigationDiv.find(".pp-selector-rewind-to-beginning-button");
      this.$audioOnOffButton = this.$sliderNavigationDiv.find(".pp-selector-audio-on-off-button");
      this.$fullScreenButton = this.$sliderNavigationDiv.find(".pp-selector-full-screen-button");
      this.$statusBar = this.$sliderNavigationDiv.find(".pp-selector-status-bar");
      this.$progressContainerDiv = this.$sliderNavigationDiv.find(".pp-selector-progress-container");
      this.$progressTrackDiv = this.$sliderNavigationDiv.find(".pp-selector-progress-track");
      this.$progressHandleDiv = this.$sliderNavigationDiv.find(".pp-selector-progress-handle");
      this.$currentPlayTimeDiv = this.$sliderNavigationDiv.find(".pp-selector-nav-current-play-time");
      this.$shareButton = this.$sliderNavigationDiv.find(".pp-selector-share-button");
      this.$shareMenu = this.$sliderNavigationDiv.find(".pp-selector-share-menu");
      
      this.$sliderNavigationDiv.css("opacity", 1.0);
      this.$prevAnimationButton.css("cursor", "default");
      this.$prevAnimationButton.css("opacity", 0.5);
      this.$nextAnimationButton.css("cursor", "default");
      this.$nextAnimationButton.css("opacity", 0.5);
      // Show a blank icon:
      this.$rewindToBeginningButton.html("<i class='fas fa-fw'></i>");
      this.$rewindToBeginningButton.css("cursor", "default");
      this.$playPauseResumeButton.html("<i class='fas fa-play'></i>");
      this.$playPauseResumeButton.css("cursor", "default");
      this.$playPauseResumeButton.css("opacity", 0.5);
      
      if(this.$shareButton.length && (navigationOptions["hideShareButton"]===true || getPompousUrlParams()["hideShareButton"]==="true")) {
        this.$shareButton.css("display", "none");
      } else {
        this.$shareButton.css("cursor", "pointer");
      }
      if(navigationOptions["hideAudioButton"]===true || getPompousUrlParams()["hideAudioButton"]==="true") {
        this.$audioOnOffButton.css("display", "none");
      }
      if(navigationOptions["hideFullScreenButton"]===true || getPompousUrlParams()["hideFullScreenButton"]==="true") {
        this.$fullScreenButton.css("display", "none");
      } else {
        this.$fullScreenButton.css("cursor", "pointer");
      }
      
      // Disable touch events on the navigation bar
      ["touchstart", "touchmove", "touchend"].forEach( (e) => {
        this.$sliderNavigationDiv.get(0).addEventListener(e,  (e) => {
            e.stopPropagation();
        });
      });
      
      ["mousedown", "touchstart"].forEach( (e) => {
        this.$progressHandleDiv.get(0).addEventListener(e,  (e) => {
            e.stopPropagation();
            this.draggingTheProgressHandle = true;    
            // console.info("Progress handle dragging started.");
            if(this.currentlyPlaying) {
              // Undefined means "continue playing in the already-chosen
              // direction", do not change it.
              this.pompousPlayer.togglePlayPauseResume(undefined);
              this.resumePlayAfterProgressHandleDragComplete = true;
            }
          }
        );
      });
      
      ["mousemove", "touchmove"].forEach( (e) => {
        this.$stage.get(0).addEventListener(e, (e) => {
            if(this.draggingTheProgressHandle && this.pompousPlayer) {
              // The scale adjustment below is needed only for mousemove-s, not
              // for mousedown-s:
              var jumpToHorizOffsetPx = (e.pageX - this.$progressContainerDiv.offset().left)/this.pompousPlayer.getStageScale();
              if(jumpToHorizOffsetPx < 10) {
                jumpToHorizOffsetPx = 0;
              }
              if(jumpToHorizOffsetPx > this.$progressContainerDiv.width()/this.pompousPlayer.getStageScale() -2) {
                jumpToHorizOffsetPx = this.$progressContainerDiv.width()/this.pompousPlayer.getStageScale();
              }
              this.$progressHandleDiv.css("left", jumpToHorizOffsetPx);
            }
          }
        );
      });
      
      // Do not propagate clicks on the progress handle:
      this.$progressHandleDiv.get(0).addEventListener("click",  (e) => {
        e.stopPropagation();
      });
      
      // Clicks on the progress bar should cause fast-forward or rewind:
      this.$progressContainerDiv.get(0).addEventListener("click",  (e) => {
        if(!this.pompousPlayer) {
          return;
        }
        var jumpToHorizOffsetPx = e.pageX - this.$progressContainerDiv.offset().left;
        if(jumpToHorizOffsetPx < 10) {
          jumpToHorizOffsetPx = 0;
        } else if(jumpToHorizOffsetPx > this.$progressContainerDiv.width() - 2) {
          jumpToHorizOffsetPx = this.$progressContainerDiv.width();
        }
        const jumpToPercent = 100.0 * jumpToHorizOffsetPx / this.$progressContainerDiv.width();
        // console.info("Progress bar clicked.
        // jumpToHorizOffsetPx="+jumpToHorizOffsetPx+";
        // jumpToPercent="+jumpToPercent);
        this.$progressHandleDiv.css("left", jumpToHorizOffsetPx+"");      
        this.pompousPlayer.jumpTo(jumpToPercent, null);
      });
  
      // On mouse up, if dragging the progress handle, jump the play to the new
      // position:
      ["mouseup", "touchend"].forEach( (e) => {
        document.addEventListener(e, (e) => {          
            if(this.draggingTheProgressHandle) {
              var jumpToHorizOffsetPx = e.pageX - this.$progressContainerDiv.offset().left;
              if(jumpToHorizOffsetPx < 10) {
                jumpToHorizOffsetPx = 0;
              } else if(jumpToHorizOffsetPx > this.$progressContainerDiv.width() - 2) {
                jumpToHorizOffsetPx = this.$progressContainerDiv.width();
              }
              const jumpToPercent = 100.0 * jumpToHorizOffsetPx / this.$progressContainerDiv.width();
              // console.info("Progress handle dragging stopped.
              // jumpToHorizOffsetPx="+jumpToHorizOffsetPx+"jumpToPercent="+jumpToPercent);
              this.$progressHandleDiv.css("left", jumpToHorizOffsetPx+"");
              this.pompousPlayer.jumpTo(jumpToPercent, this.resumePlayAfterProgressHandleDragComplete);
            }
            this.draggingTheProgressHandle = false;
            this.resumePlayAfterProgressHandleDragComplete = false;
          }
        );
      });
      
      // Needed so that we don't hide the mouse if it's inside the navigation
      // div:
      this.$sliderNavigationDiv.get(0).onmouseenter = (e) => {this.isMouseInNavigationDiv=true;};
      this.$sliderNavigationDiv.get(0).onmouseleave = (e) => {this.isMouseInNavigationDiv=false;};
      
      // Auto-hide the bottom navigation menu during playing:
      this.$stage.get(0).onmousemove = (e) => {
        if(!this.skipMouseMovedEvent) {
          this.skipMouseMovedEvent = true;
          setTimeout( () => {
            this.skipMouseMovedEvent = false;
          }, 1000);
          clearTimeout(this.idleMouseTimer);
          //console.log("Showing the $sliderNavigationDiv");
          this.$sliderNavigationDiv.css("opacity", 1.0);
          //this.$sliderNavigationDiv.css("visibility", "visible");
          this.idleMouseTimer = setTimeout( () => {
            // info("Idle mouse timer fired!");
            // make the nav bar invisible:
            if(!this.isMouseInNavigationDiv && this.currentlyPlaying) { // &&
                                                              // !Modernizr.touchevents
              //console.log("Hiding the $sliderNavigationDiv");
              this.$sliderNavigationDiv.css("opacity", 0.0);
              //this.$sliderNavigationDiv.css("visibility", "hidden");
            }
          }, 5000); // Hide the bottom navigation menu after 5 seconds of mouse
                    // inactivity
        }
      }
      
      // Hide the share menu (if shown) on clicking outside of the share menu
      // and
      // the share button:
      document.addEventListener("click", (e) => {
        const et = e.target;
        // By checking ... && et instanceof Node && ... , we avoid a closure
        // compiler warning here:
        if(et && (et instanceof Node) && this.$shareMenu.length>0 && !this.$shareMenu.get(0).contains(et) && this.$shareButton.length && !this.$shareButton.get(0).contains(et)) {
          this.$shareMenu.css("display", "none");
        }
      });
      
      var keydownEventListenerDomElement;
      if($("meta[property='pp:presentation_id']").length) {
        // We are running in a standalone web page generated by us. Listen for
        // keydown-s on the document.
        keydownEventListenerDomElement = document;
      } else {
        // Listen for keydown-s only when the stage div has the focus!
        keydownEventListenerDomElement = this.$stage.get(0);
      } 
      keydownEventListenerDomElement.addEventListener("keydown", (e) => {
        // Show the navigation bar (if it's hidden), and schedule it to hide
        // again
        // after 5 seconds:
        clearTimeout(this.idleMouseTimer);
        this.$sliderNavigationDiv.css("opacity", 1.0);
        this.idleMouseTimer = setTimeout( () => {
          // info("Idle mouse timer fired!");
          // make the nav bar invisible:
          if(!this.isMouseInNavigationDiv && this.currentlyPlaying) { // &&
                                                            // !Modernizr.touchevents
            this.$sliderNavigationDiv.css("opacity", 0.0);
          }
        }, 5000);

        if(e.key !== "s") {
          // Hide the share menu (if shown) on any key except "s". We handle key
          // "s" further down.
          this.$shareMenu.css("display", "none");
        }
        
        if(e.ctrlKey || e.altKey || e.shiftKey) {
          // One of ctrl/alt/shift keys are pressed too. Ignore this key press.
          return;
        }
        
        // See
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
        switch(e.key) {
          // Space bar key down = toggle play forward / pause:
          case " ":
            this.pompousPlayer.togglePlayPauseResume(true);
            break;
          // the "<-" arrow key:
          case "ArrowLeft":
            this.pompousPlayer.playPreviousAnimation();
            break;
          // the "->" arrow key:
          case "ArrowRight":
            this.pompousPlayer.playNextAnimation();
            break;
          // "b" = toggle play backwards / pause:
          case "b":
            this.pompousPlayer.togglePlayPauseResume(false);
            break;
          // "m" = mute/un-mute:
          case "m":
            this.pompousPlayer.toggleAudioOnOff();
            break;
          // "r" = "rewind/reset" to play from beginning:
          case "r":
            this.pompousPlayer.restartFromBeginning();
            break;
          // "s" = show/hide share menu:
          case "s":
            this.toggleShowHideShareMenu(e);
            break;
          // Jump the play 100ms forward:
          case "f":
            this.pompousPlayer.jumpBy(100, false);
            break;
          // Jump the play 100ms backward:
          case "d":
            this.pompousPlayer.jumpBy(-100, false);
            break;
        }
      });
      
    }); // end ppDocumentReady
  } // end of constructor
  
  initStarted(presentationOptions, thePompousPlayer) {
    this.pompousPlayer = thePompousPlayer;
    this.presentationOptions = presentationOptions;
    
    if(presentationOptions["loadNImagesAhead"]!==0) {
      this.$statusBar.html("Loading presentation ... "+this.imagesLoadedSoFar+ " images out of "+presentationOptions["loadNImagesAhead"]+ " loaded");
    } else {
      this.$statusBar.html("Loading presentation ... ");
    }
  }
  
  initFinished(presentationOptions, totalPlayDurationMs) {
    // Hide the splash div:
    $("#"+this.stageId+" .pp-selector-video-like-splash").css("visibility", "hidden");
    
    // Remove any "Loading presentation ..." visuals:
    this.$statusBar.html("");
    this.$playPauseResumeButton.html("<i class='fas fa-play'></i>");
    this.$playPauseResumeButton.css("cursor", "pointer");
    this.$playPauseResumeButton.css("opacity", 1.0);
    this.$nextAnimationButton.css("cursor", "pointer");
    this.$nextAnimationButton.css("opacity", 1.0);
    
    this.$currentPlayTimeDiv.text("0:00");
    $("#"+this.stageId+" .pp-selector-nav-slash").text("/");
    $("#"+this.stageId+" .pp-selector-nav-total-play-time").text(this._playDurationTimeMsToStr(totalPlayDurationMs));
  
    if(this.pompousPlayer.hasAudioOrVideos()) {
      if(this.pompousPlayer.isAudioOn()) {
        this.$audioOnOffButton.html("<i class='fas fa-volume-up'></i>");        
      } else {
        this.$audioOnOffButton.html("<i class='fas fa-volume-mute'></i>");
      }
      this.$audioOnOffButton.css("cursor", "pointer");
    } else {
      this.$audioOnOffButton.html("");
      this.$audioOnOffButton.css("cursor", "default");
    }
  }
  
  _playDurationTimeMsToStr(totalPlayDurationMs) {
    const totalPlayDurationSeconds = Math.round(totalPlayDurationMs/1000.0);
    const minutes = Math.floor(totalPlayDurationSeconds/60);
    const seconds = totalPlayDurationSeconds % 60;
    return minutes+":"+(seconds<10 ? "0":"") + seconds;
  }
  
  /* Similar to above, but shows milliseconds too */
  _playDurationTimeMsToStrVer2(totalPlayDurationMs) {
    const totalPlayDurationSeconds = Math.floor(totalPlayDurationMs/1000.0);
    const millis = Math.round(totalPlayDurationMs)%1000;
    const minutes = Math.floor(totalPlayDurationSeconds/60);
    const seconds = totalPlayDurationSeconds % 60;
    return minutes+":"+(seconds<10 ? "0":"") + seconds+ ":" + (millis+"").padStart(3, "0");
  }  
  
  playStarted(playDurationMs, totalPlayDurationMs) {
    this.currentlyPlaying = true;
    this.$playPauseResumeButton.html("<i class='fas fa-pause'></i>");
    playDurationMs = playDurationMs<0? 0 : playDurationMs;
    playDurationMs = playDurationMs>totalPlayDurationMs? totalPlayDurationMs : playDurationMs;
    const progressPercent = (100*playDurationMs/totalPlayDurationMs) + "%";
    this.$progressTrackDiv.css("width", progressPercent);
    this.$progressHandleDiv.css("left", progressPercent);
    this.$progressTrackDiv.css("transition", "none");
    this.$progressHandleDiv.css("transition", "none");
    this.$currentPlayTimeDiv.text(this._playDurationTimeMsToStr(playDurationMs));
    this.lastUpdatedPlayDurationMs = playDurationMs;
  }
  
  playPaused(playDurationMs, totalPlayDurationMs) {
    this.currentlyPlaying = false;
    this.$playPauseResumeButton.html("<i class='fas fa-play'></i>");
    playDurationMs = playDurationMs<0? 0 : playDurationMs;
    playDurationMs = playDurationMs>totalPlayDurationMs? totalPlayDurationMs : playDurationMs;
    const progressPercent = (100*playDurationMs/totalPlayDurationMs) + "%";
    this.$progressTrackDiv.css("width", progressPercent);
    this.$progressHandleDiv.css("left", progressPercent);
    this.$progressTrackDiv.css("transition", "none");
    this.$progressHandleDiv.css("transition", "none");
    this.$currentPlayTimeDiv.text(this._playDurationTimeMsToStr(playDurationMs));
    this.lastUpdatedPlayDurationMs = playDurationMs;
  }
  
  waitingForVideoToPlay() {
    this.$statusBar.html("Loading video ...");
  }
  
  videoPlayStarted() {
    this.$statusBar.html("");
    // this.$statusBar.html("Video is playing ...");
  }
  
  videoPlayPaused() {
    this.$statusBar.html("");
  }
  
  videoPlayErrored(error) {
    if(error && error.name !== "AbortError" && error.name !=="NotAllowedError") {
      // Don't show these errors, as there is no work around them:
      // AbortError: The play() request was interrupted by a call to pause().
      // NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.
      this.$statusBar.html("Could not play video!");
    } else {
      this.$statusBar.html("");
    }
  }
  
  progressUpdate(progressText, playDurationMs, totalPlayDurationMs, isInstant) {
    if(this.draggingTheProgressHandle) {
      // The user is currently dragging the progress handle. Ignore progress
      // updates coming from the player:
      this.$progressTrackDiv.css("transition", "none");
      this.$progressHandleDiv.css("transition", "none");
      return;
    }
        
    if(progressText) {
      this.$statusBar.html(progressText);
    }
    
    if(playDurationMs===totalPlayDurationMs) {
      this.performanceFinishedBool = true;
      this.$nextAnimationButton.css("cursor", "default");
      this.$nextAnimationButton.css("opacity", 0.5);
    } else if(this.performanceFinishedBool && playDurationMs<totalPlayDurationMs) {
      this.performanceFinishedBool = false;
      // Show again the play button:
      this.$nextAnimationButton.css("cursor", "pointer");
      this.$nextAnimationButton.css("opacity", 1.0);
      
      this.$playPauseResumeButton.css("cursor", "pointer");
      this.$playPauseResumeButton.css("opacity", 1.0);
      // Hide the "restart from beginning" button by showing a blank icon:
      this.$rewindToBeginningButton.html("<i class='fas fa-fw'></i>");
      this.$rewindToBeginningButton.css("cursor", "default");
    }
    
    if(playDurationMs===0) {
      this.performanceFinishedBackwardBool = true;
      this.$prevAnimationButton.css("opacity", 0.5);
      this.$prevAnimationButton.css("cursor", "default");
    } else if(this.performanceFinishedBackwardBool && playDurationMs>0) {
      this.performanceFinishedBackwardBool = false;
      this.$prevAnimationButton.css("opacity", 1.0);
      this.$prevAnimationButton.css("cursor", "pointer");
    }
    
    if(playDurationMs>=0 && playDurationMs<=totalPlayDurationMs) {
      const progressPercentStr = (100.0*playDurationMs/totalPlayDurationMs) + "%";        
      this.$progressTrackDiv.css("width", progressPercentStr);
      this.$progressHandleDiv.css("left", progressPercentStr);
      // Makes the progress handle movement smoother. The value 200ms must be
      // same as the progressUpdateIntervalMs=200ms in PompousPlayer
      if(!isInstant) {
        this.$progressTrackDiv.css("transition", "width 200ms linear");
        this.$progressHandleDiv.css("transition", "left 200ms linear");
      } else {
        this.$progressTrackDiv.css("transition", "none");
        this.$progressHandleDiv.css("transition", "none");
      }
      // Update the current play time div once per second
      // (vs. at every progressUpdate call, which happens at every 200ms).
      // This means the displayed play duration may be +/- 200ms inaccurate.
      // if(Math.abs(playDurationMs-this.lastUpdatedPlayDurationMs) >= 1000) {
        this.$currentPlayTimeDiv.text(this._playDurationTimeMsToStr(playDurationMs));
        this.lastUpdatedPlayDurationMs = playDurationMs;
      // }
    }
  }
  
  imageLoaded(image, totalImagesToBeLoaded, message) {
    this.imagesLoadedSoFar ++;   
    this.$statusBar.html("Loading presentation ... "+this.imagesLoadedSoFar+ " images out of "+totalImagesToBeLoaded+ " loaded");
  }
  
  onPrevOrNextAnimationChange(playing, currentAnimationGroupIndex, totalAnimationGroups, displayIndex) {
    // Deal with the "prevAnimationButton":
    if(currentAnimationGroupIndex==-1) {
      // Happens when clicking on "prev" button. Cannot go back any more:
      this.performanceFinishedBackwardBool = true;
      this.$prevAnimationButton.css("cursor", "default");
      this.$prevAnimationButton.css("opacity", 0.5);
    } else {
      this.performanceFinishedBackwardBool = false;
      this.$prevAnimationButton.css("cursor", "pointer");
      this.$prevAnimationButton.css("opacity", 1.0);
    }
    
    // Deal with the "nextAnimationButton":
    if(currentAnimationGroupIndex>(totalAnimationGroups-1)) {
      // Can't play further:
      this.performanceFinishedBool = true;
      this.$nextAnimationButton.css("cursor", "default");
      this.$nextAnimationButton.css("opacity", 0.5);
      this.$playPauseResumeButton.css("cursor", "default");
      this.$playPauseResumeButton.css("opacity", 0.5);
      // Show the "restart from beginning" button:
      this.$rewindToBeginningButton.html("<i class='fas fa-sync-alt'></i>");
      this.$rewindToBeginningButton.css("cursor", "pointer");   
    } else {
      this.performanceFinishedBool = false;
      this.$nextAnimationButton.css("opacity", 1.0);
      this.$playPauseResumeButton.css("opacity", 1.0);
      
      if(this.currentlyPlaying) {
        this.$stage.find(".pp-selector-play").css("display", "none");
        this.$stage.find(".pp-selector-pause").css("display", "block");
      } else {
        this.$stage.find(".pp-selector-play").css("display", "block");
        this.$stage.find(".pp-selector-pause").css("display", "none");            
      }      
      this.$stage.find(".pp-selector-rewind").css("display", "none"); 
    }
  }
  
  reset(hasAudio, isAudioMuted) {
    this.currentlyPlaying = false;
    // Change playPauseResume button to look like "play", but also
    // non-active:
    this.$playPauseResumeButton.html("<i class='fas fa-play'></i>");
    this.$playPauseResumeButton.css("opacity", 1.0);
    
    // Set initially to "true", because after reset we start playing from the "left end":
    this.performanceFinishedBackwardBool = true;
    this.performanceFinishedBool = false;
    // Set the "prev" button initially to not-enabled:
    this.$prevAnimationButton.css("cursor", "default");
    this.$prevAnimationButton.css("opacity", 0.5);
    
    this.$nextAnimationButton.css("cursor", "pointer");
    this.$nextAnimationButton.css("opacity", 1.0);
    
    // Hide the "restart from beginning" button by showing a blank icon:
    this.$rewindToBeginningButton.html("<i class='fas fa-fw'></i>");
    this.$rewindToBeginningButton.css("cursor", "default");
    
    if(hasAudio) {
      if(isAudioMuted) {
        this.$audioOnOffButton.html("<i class='fas fa-volume-mute'></i>");
      } else {
        this.$audioOnOffButton.html("<i class='fas fa-volume-up'></i>");
      }
      this.$audioOnOffButton.css("cursor", "pointer");
    } else {
      this.$audioOnOffButton.html("");
    }
    this.$progressTrackDiv.css("width", "0%");
    this.$progressHandleDiv.css("left", "0%");
    this.$progressTrackDiv.css("transition", "none");
    this.$progressHandleDiv.css("transition", "none");
  }
  
  /**
   * Invoked only when playing forward and finishing the play at the "right"
   * end.
   */
  performanceFinished() {
    // Can't play further:
    this.performanceFinishedBool = true;
    this.$nextAnimationButton.css("cursor", "default");
    this.$nextAnimationButton.css("opacity", 0.5);
    this.$playPauseResumeButton.css("cursor", "default");
    this.$playPauseResumeButton.css("opacity", 0.5);
    // Show the "restart from beginning" button:
    this.$rewindToBeginningButton.html("<i class='fas fa-sync-alt'></i>");
    this.$rewindToBeginningButton.css("cursor", "pointer");
  }
  
  performanceFinishedBackward() {
    // Can't play further to the left:
    this.performanceFinishedBackwardBool = true;
    this.$prevAnimationButton.css("opacity", 0.5);
    this.$prevAnimationButton.css("cursor", "default");
  }
  
  audioMutedUnmuted(isNowMuted) {
    if(isNowMuted) {          
      // There is no "volume crossed" icon, so we improvise something by
      // concatenating 2 icons:
      this.$audioOnOffButton.html("<i class='fas fa-volume-mute'></i>");
    } else {
      this.$audioOnOffButton.html("<i class='fas fa-volume-up'></i>");
    }
  }
  
  fullScreenChanged(isNowInFulScreen) {
    if(isNowInFulScreen) {
      this.$fullScreenButton.html("<i class='fas fa-compress'></i>");
    } else {
      this.$fullScreenButton.html("<i class='fas fa-expand'></i>");
    }
  }    
  
  copyPresentationUrlToClipboard() {
    const el = document.createElement("textarea");
    el.value = window.location.href;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
  
  shareViaGmail() {
    const subject = "Check out this slideshow";
    const body = "\n" + document.title + "\n" + window.location.href + "\n";
    const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&su="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
    window.open(gmailUrl, "_blank");
  }
  
  toggleShowHideShareMenu(e) {
    if(this.$shareButton.length && this.$shareButton.css("display") === "none") {
      // the "share" button is hidden. Do nothing.
      return;
    }
    if(this.$shareMenu.css("display") == "none" ) { 
      this.$shareMenu.css("display", "block");
      // See https://ellisonleao.github.io/sharer.js/ for more info about this
      // feature
      this.$shareMenu.find("button").attr("data-url", window.location.href);
      this.$shareMenu.find("button").attr("data-title", document.title);
    } else {
      this.$shareMenu.css("display", "none");
    }
  }
} // end of PompousVideoLikeNavigation
window["PompousVideoLikeNavigation"]=PompousVideoLikeNavigation;

/**
 * @extends {PompousNavigationInterface}
 */
class PompousCarouselNavigation {
  constructor(navigationOptions) {
    /**
     * Set in initStarted():
     * 
     * @type {PompousPlayerInterface|undefined}
     */ 
    this.pompousPlayer = undefined;
    this.presentationOptions = undefined;
    this.stageId = navigationOptions["stageId"];
    this.$stage = undefined;
    this.$playPauseResumeButton = undefined;
    this.$prevAnimationButton = undefined;
    this.$nextAnimationButton = undefined;
    this.$audioOnOffButton = undefined;
    this.$fullScreenButton = undefined;
    this.$statusBar = undefined;
    this.$shareButton = undefined;
    this.$shareMenu = undefined;
    // Needed to auto-hide the bottom nav. bar during playing:
    this.idleMouseTimer = undefined;
    this.isMouseInNavigationDiv = false;
    this.skipMouseMovedEvent = false;
    this.imagesLoadedSoFar = 0;
    this.currentlyPlaying = false;
    this.performanceFinishedBool = false;
    // Set initially to "true", because at page load we start playing from the "left end":
    this.performanceFinishedBackwardBool = true;    
  
    ppDocumentReady( () => {
      this.$stage = $("#"+this.stageId);
      if(this.$stage.length===0) {
        alert("Invalid play script! Developer, see the browser console for more info.");
        throw Error("No such stage element in the DOM document: '"+this.stageId+"'!");
      }
      this.$playPauseResumeButton = $("#"+this.stageId+" .pp-selector-play-pause-resume-button");
      this.$prevAnimationButton = $("#"+this.stageId+" .pp-selector-prev-animation-button");
      this.$nextAnimationButton = $("#"+this.stageId+" .pp-selector-next-animation-button");
      this.$audioOnOffButton = $("#"+this.stageId+" .pp-selector-audio-on-off-button");
      this.$fullScreenButton = $("#"+this.stageId+" .pp-selector-full-screen-button");
      this.$statusBar = $("#"+this.stageId+" .pp-selector-status-bar");
      this.$shareButton = $("#"+this.stageId+" .pp-selector-share-button");
      this.$shareMenu = $("#"+this.stageId+" .pp-selector-share-menu");
      
      this.$playPauseResumeButton.css("opacity", 0.5);
      this.$prevAnimationButton.css("opacity", 0.5);
      this.$nextAnimationButton.css("opacity", 0.5);
      
      if(this.$shareButton.length && (navigationOptions["hideShareButton"]===true || getPompousUrlParams()["hideShareButton"]==="true")) {
        this.$shareButton.css("display", "none");
      }
      if(navigationOptions["hideAudioButton"]===true || getPompousUrlParams()["hideAudioButton"]==="true") {
        this.$audioOnOffButton.css("display", "none");
      }
      if(navigationOptions["hideFullScreenButton"]===true || getPompousUrlParams()["hideFullScreenButton"]==="true") {
        this.$fullScreenButton.css("display", "none");
      }
      
      // Hide the share menu (if shown) on clicking outside of the share menu
      // and
      // the share button:
      document.addEventListener("click", (e) => {
        const et = e.target;
        if(et && (et instanceof Node) && this.$shareMenu.length>0 && !this.$shareMenu.get(0).contains(et) && this.$shareButton.length && !this.$shareButton.get(0).contains(et)) {
          this.$shareMenu.css("display", "none");
        }
      });
      
      // Disable touch events on the navigation buttons:
      ["touchstart", "touchmove", "touchend"].forEach( (e) => {
        this.$playPauseResumeButton.get(0).addEventListener(e,  (e) => {
            e.stopPropagation();
        });
        this.$prevAnimationButton.get(0).addEventListener(e,  (e) => {
          e.stopPropagation();
        });
        this.$nextAnimationButton.get(0).addEventListener(e,  (e) => {
          e.stopPropagation();
        });
        this.$audioOnOffButton.get(0).addEventListener(e,  (e) => {
          e.stopPropagation();
        });
        this.$fullScreenButton.get(0).addEventListener(e,  (e) => {
          e.stopPropagation();
        });
        if(this.$shareButton.length) {
          this.$shareButton.get(0).addEventListener(e,  (e) => {
            e.stopPropagation();
          });
        }
      });
      
      var keydownEventListenerDomElement;
      if($("meta[property='pp:presentation_id']").length) {
        // We are running in a standalone web page generated by us. Listen for
        // keydown-s on the document.
        keydownEventListenerDomElement = document;
      } else {
        // Listen for keydown-s only when the stage div has the focus!
        keydownEventListenerDomElement = this.$stage.get(0);
      } 
      keydownEventListenerDomElement.addEventListener("keydown", (e) => {
        if(e.key !== "s") {
          // Hide the share menu (if shown) on any key except "s". We handle key
          // "s" further down.
          this.$shareMenu.css("display", "none");
        }
        
        if(e.ctrlKey || e.altKey || e.shiftKey) {
          // One of ctrl/alt/shift keys are pressed too. Ignore this key press.
          return;
        }
        
        // See
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
        switch(e.key) {
          // Space bar key down = toggle play forward / pause:
          case " ":
            this.pompousPlayer.togglePlayPauseResume(true);
            break;
          // the "<-" arrow key:
          case "ArrowLeft":
            this.pompousPlayer.playPreviousAnimation();
            break;
          // the "->" arrow key:
          case "ArrowRight":
            this.pompousPlayer.playNextAnimation();
            break;
          // "b" = toggle play backwards / pause:
          case "b":
            this.pompousPlayer.togglePlayPauseResume(false);
            break;
          // "m" = mute/un-mute:
          case "m":
            this.pompousPlayer.toggleAudioOnOff();
            break;
          // "r" = "rewind/reset" to play from beginning:
          case "r":
            this.pompousPlayer.restartFromBeginning();
            break;
          // "s" = show/hide share menu:
          case "s":
            this.toggleShowHideShareMenu(e);
            break;
          // Jump the play 100ms forward:
          case "f":
            this.pompousPlayer.jumpBy(100, false);
            break;
          // Jump the play 100ms backward:
          case "d":
            this.pompousPlayer.jumpBy(-100, false);
            break;
        }
      });
      
    }); // end ppDocumentReady
  } // end constructor
  
  initStarted(presentationOptions, thePompousPlayer) {
    this.pompousPlayer = thePompousPlayer;    
    this.presentationOptions = presentationOptions;
  }
  
  initFinished(presentationOptions, totalPlayDurationMs) {
    // Hide the splash div:
    $("#"+this.stageId+" .pp-selector-carousel-splash").css("visibility", "hidden");
    
    this.$playPauseResumeButton.css("opacity", 1.0);
    this.$nextAnimationButton.css("opacity", 1.0);
    
    if(this.pompousPlayer.hasAudioOrVideos()) {
      if(this.pompousPlayer.isAudioOn()) {
        this.$audioOnOffButton.find(".pp-selector-audio-on").css("display", "block");
        this.$audioOnOffButton.find(".pp-selector-audio-off").css("display", "none");
      } else {
        this.$audioOnOffButton.find(".pp-selector-audio-on").css("display", "none");
        this.$audioOnOffButton.find(".pp-selector-audio-off").css("display", "block");
      }
      this.$audioOnOffButton.css("cursor", "pointer");
    } else {
      this.$audioOnOffButton.html("");
      this.$audioOnOffButton.css("visibility", "hidden");
    }
  }
  
  imageLoaded(image, totalImagesToBeLoaded, message) {
    this.imagesLoadedSoFar ++;   
    // this.$statusBar.html("Loading presentation ... "+this.imagesLoadedSoFar+
    // " images
    // out of "+totalImagesToBeLoaded+ " loaded");
  }
  
  onPrevOrNextAnimationChange(playing, currentAnimationGroupIndex, totalAnimationGroups, displayIndex) {
    // Deal with the "prevAnimationButton":
    if(currentAnimationGroupIndex==-1) {
      // Happens when clicking on "prev" button. Cannot go back any
      // more:
      this.performanceFinishedBackwardBool = true;
      this.$prevAnimationButton.css("opacity", 0.5);
    } else {
      this.performanceFinishedBackwardBool = false;
      this.$prevAnimationButton.css("opacity", 1.0);
    }

    // Deal with the "nextAnimationButton":
    if(currentAnimationGroupIndex>(totalAnimationGroups-1)) {
      // Can't play further forward:
      this.performanceFinishedBool = true;
      // Show the "restart from beginning" button:
      this.$stage.find(".pp-selector-play").css("display", "none");
      this.$stage.find(".pp-selector-pause").css("display", "none");
      this.$stage.find(".pp-selector-rewind").css("display", "block");
      this.$nextAnimationButton.css("opacity", 0.5);
    } else {
      this.performanceFinishedBool = false;
      this.$nextAnimationButton.css("opacity", 1.0);
      this.$playPauseResumeButton.css("opacity", 1.0);
      
      if(this.currentlyPlaying) {
        this.$stage.find(".pp-selector-play").css("display", "none");
        this.$stage.find(".pp-selector-pause").css("display", "block");
      } else {
        this.$stage.find(".pp-selector-play").css("display", "block");
        this.$stage.find(".pp-selector-pause").css("display", "none");            
      }      
      this.$stage.find(".pp-selector-rewind").css("display", "none"); 
    }
  }
  
  reset(hasAudio, isAudioMuted) {
    this.currentlyPlaying = false;
    // Change playPauseResume button to look like "play", but also
    // non-active:
    this.$stage.find(".pp-selector-play").css("display", "block");
    this.$stage.find(".pp-selector-pause").css("display", "none");
    this.$stage.find(".pp-selector-rewind").css("display", "none");
    this.$playPauseResumeButton.css("opacity", 1.0);
    
    this.performanceFinishedBool = false;
    // Set initially to "true", because at page load we start playing from the "left end":
    this.performanceFinishedBackwardBool = true;
    
    // Set the "prev" button initially to not-enabled:
    this.$prevAnimationButton.css("opacity", 0.5);    
    this.$nextAnimationButton.css("opacity", 1.0);
    
    if(hasAudio) {
      if(isAudioMuted) {
        this.$audioOnOffButton.find(".pp-selector-audio-on").css("display", "none");
        this.$audioOnOffButton.find(".pp-selector-audio-off").css("display", "block");
      } else {
        this.$audioOnOffButton.find(".pp-selector-audio-on").css("display", "block");
        this.$audioOnOffButton.find(".pp-selector-audio-off").css("display", "none");
      }
    } else {
      this.$audioOnOffButton.html("");
      this.$audioOnOffButton.css("visibility", "hidden");
    }
  }
  
  playStarted(playDurationMs, totalPlayDurationMs) {
    this.currentlyPlaying = true;
    // Change playPauseResume button to look like "pause":
    this.$stage.find(".pp-selector-play").css("display", "none");
    this.$stage.find(".pp-selector-pause").css("display", "block"); 
    this.$stage.find(".pp-selector-rewind").css("display", "none");
  }
  
  playPaused(playDurationMs, totalPlayDurationMs) {
    this.currentlyPlaying = false;
    this.$stage.find(".pp-selector-play").css("display", "block");
    this.$stage.find(".pp-selector-pause").css("display", "none"); 
  }
  
  waitingForVideoToPlay() {
    // To do: show a spinner here
  }
  
  videoPlayStarted() {
  }
  
  videoPlayPaused() {
  }
  
  videoPlayErrored(error) {
  }
  
  /**
   * Invoked only when playing forward and finishing the play at the "right"
   * end.
   */
  performanceFinished() {
    // Can't play further forward:
    this.performanceFinishedBool = true;
    // Show the "restart from beginning" button:
    this.$stage.find(".pp-selector-play").css("display", "none");
    this.$stage.find(".pp-selector-pause").css("display", "none");
    this.$stage.find(".pp-selector-rewind").css("display", "block");
    this.$nextAnimationButton.css("opacity", 0.5);
  }
  
  performanceFinishedBackward() {
    // Can't play further backward:
    this.performanceFinishedBackwardBool = true;
    this.$prevAnimationButton.css("opacity", 0.5);
  }
  
  progressUpdate(progressText, playDurationMs, totalPlayDurationMs, isInstant) {
    if(playDurationMs===totalPlayDurationMs) {
      this.performanceFinishedBool = true; 
      this.$nextAnimationButton.css("opacity", 0.5);
    } else if(this.performanceFinishedBool && playDurationMs<totalPlayDurationMs) {
      this.performanceFinishedBool = false;
      this.$nextAnimationButton.css("opacity", 1.0);
    }
    
    if(playDurationMs===0) {
      this.performanceFinishedBackwardBool = true;
      this.$prevAnimationButton.css("opacity", 0.5);
    } else if(this.performanceFinishedBackwardBool && playDurationMs>0) {
      this.performanceFinishedBackwardBool = false;
      this.$prevAnimationButton.css("opacity", 1.0);
    }
  }
  
  audioMutedUnmuted(isNowMuted) {
    if(isNowMuted) {          
      this.$audioOnOffButton.find(".pp-selector-audio-on").css("display", "none");
      this.$audioOnOffButton.find(".pp-selector-audio-off").css("display", "block");
    } else {
      this.$audioOnOffButton.find(".pp-selector-audio-on").css("display", "block");
      this.$audioOnOffButton.find(".pp-selector-audio-off").css("display", "none");
    }
  }
  
  fullScreenChanged(isNowInFulScreen) {
    if(isNowInFulScreen) {
      this.$fullScreenButton.find(".pp-selector-full-screen-on").css("display", "none");
      this.$fullScreenButton.find(".pp-selector-full-screen-off").css("display", "block");
    } else {
      this.$fullScreenButton.find(".pp-selector-full-screen-on").css("display", "block");
      this.$fullScreenButton.find(".pp-selector-full-screen-off").css("display", "none");
    }
  }
  
  toggleShowHideShareMenu() {
    if(this.$shareButton.length && this.$shareButton.css("display") === "none") {
      // the "share" button is hidden. Do nothing.
      return;
    }
    if(this.$shareMenu.css("display") == "none" ) {
      this.$shareMenu.css("display", "block");
      // See https://ellisonleao.github.io/sharer.js/ for more info about this
      // feature
      this.$shareMenu.find("button").attr("data-url", window.location.href);
      this.$shareMenu.find("button").attr("data-title", document.title);
    } else {
      this.$shareMenu.css("display", "none");
    }
  }
  
  copyPresentationUrlToClipboard() {
    const el = document.createElement("textarea");
    el.value = window.location.href;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
  
  shareViaGmail() {
    const subject = "Check out this slideshow";
    const body = "\n" + document.title + "\n" + window.location.href + "\n";
    const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&su="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
    window.open(gmailUrl, "_blank");
  }
} // end of PompousCarouselNavigation
window["PompousCarouselNavigation"]=PompousCarouselNavigation;


/**
 * No navigation. Useful when recording a video of the browser tab of the play.
 * 
 * @extends {PompousNavigationInterface}
 */
class PompousBlankNavigation {
  constructor(navigationOptions) {
    /**
     * Set in initStarted():
     * 
     * @type {PompousPlayerInterface|undefined}
     */ 
    this.pompousPlayer = undefined;
    this.presentationOptions = undefined;
    this.stageId = navigationOptions["stageId"];
    this.$currentStateDiv = undefined;
    
    ppDocumentReady( () => {
      this.$currentStateDiv = $("#"+this.stageId+" .pp-selector-no-navigation-current-state-div");
    });
  } // end constructor
  
  initStarted(presentationOptions, thePompousPlayer) {
    this.pompousPlayer = thePompousPlayer;
    this.presentationOptions = presentationOptions;
  }
  
  initFinished(presentationOptions, totalPlayDurationMs) {
    // Hide the splash div:
    $("#"+this.stageId+" .pp-selector-no-navigation-splash").css("visibility", "hidden");
    
    this.$currentStateDiv.text("INIT_FINISHED");
  }
  
  imageLoaded(image, totalImagesToBeLoaded, message) {}
  waitingForVideoToPlay() {}
  videoPlayStarted() {}
  videoPlayPaused() {}
  videoPlayErrored(error) {}
  progressUpdate(progressText, playDurationMs, totalPlayDurationMs, isInstant) {}
  onPrevOrNextAnimationChange(playing, currentAnimationGroupIndex, totalAnimationGroups, displayIndex) {}
  reset(hasAudio, isAudioMuted) {}
  
  playStarted(playDurationMs, totalPlayDurationMs) {
    this.$currentStateDiv.text("PLAYING");
  }
  
  playPaused(playDurationMs, totalPlayDurationMs) {
    this.$currentStateDiv.text("PAUSED");
  }
  
  performanceFinished() {
    this.$currentStateDiv.text("PERFORMANCE_FINISHED");
  }
  
  performanceFinishedBackward() {
    this.$currentStateDiv.text("PERFORMANCE_FINISHED_BACKWARD");
  }
  
  audioMutedUnmuted(isNowMuted) {}
  fullScreenChanged(isNowInFulScreen) {}
  toggleShowHideShareMenu(e) {}
  copyPresentationUrlToClipboard() {}
  shareViaGmail() {}
} // end of PompousBlankNavigation
window["PompousBlankNavigation"]=PompousBlankNavigation;
