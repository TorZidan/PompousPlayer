# PompousPlayer Developer Documentation

## How does it work?
The pompous player uses CSS transitions to animate things, as you normally would do with CSS.

Normally, CSS transitions cannot be paused: You can either "pause" them in their initial position, end position, but not somewhere in between. We overcome this issue by feeding each animation slowly to the browser, at about 60 "frames" per second, using [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) :  a feature specifically designed for web browser animations, and supported for many years in all major browsers. See a nice performance comparison of the two approaches [here](https://developer.mozilla.org/en-US/docs/Web/Performance/CSS_JavaScript_animation_performance).

All CSS transitions must be arranged in CSS classes; the player cannot "play" individual CSS styles. The player applies these classes at specific times. This data model (what classes to apply at what time) is specified in attribute "data-classes" on &lt;div&gt; (or other DOM) elements in the html code.
The player parses this "model" and the CSS classes when the presentation web page loads (at "document ready"), and becomes ready to play.

Unlike other online presentation software on the market which use a &lt;canvas&gt;, we don't draw on a &lt;canvas&gt;, which gives us improved performance.
The player can't play animations defined as "@keyframes", and there is no need to do so . If you want, you can still use them, as you usually do, but those animations will not be pausable and "seekable" (being able to jump in time via the video progress bar), and you don't want that.   

By feeding each CSS transition slowly to the browser, at 60 frames per second, we get some nice "freebies". For example, in addition to the standard "easing" functions (ease-in, sease-out, ease, etc) we can define our own custom easing functions that do anything we like, for example we can make a "scale from 0% to 100%" transition to bounce like jelly once it reaches towards the 100%.

Again, here are the major features of Pompous Player:
- It plays like a video, looks like a video, but it's just a set of images, styles and (optionally) short videos. As such, it loads much faster over slow internets.
- You can play/pause/resume the "video" at any moment; also, it pauses automatically when the browser tab becomes inactive.
- You can jump to any offset in the "video" by clicking on, or dragging the progress bar (just like when playing a video).
- You can use "fast forward/backward" buttons that can jump to "interesting" places (defined by you) in the "video".
- You can play the "video" forward OR even backwards! Woooah, a time machine?
- You can play slideshows offline, from files on your PC, without a webserver, and without internet connection.
- You can embed a slideshow on another web page either by using an iframe (recommended), or by directly placing the presentation css, html and js code on the page.
- You can have responsive presentations that fit the browser width or the with+height, and scale nicely on resize.
- You can toggle the presentation in full screen, or exit full screen at any time.
- You can add multiple html5 videos and show/hide, play/pause them at any desired time.
- You can add an audio track, and it will be synchronized with the "video" at all times; play, pause, resume, jump work as expected.
- Unlike in videos, you can have clickable buttons and links in your slideshow, and wire them up to do whatever you want.
- You can set a presentation to auto-loop forever, until you faint!
- It supports mobile swipe left and right ("Swiper, No Swiping!").
- It plays the same slideshow exactly the same in all major browsers, including mobile devices (but not on rotary phones); it's scaled proportionally, as needed, to fit every screen.
- The player javascript code is self-sufficient (does not require 3rd part libraries) and fits in one 50kB file (when minimized).
- If you know CSS, you'll be right at home. All the slideshow CSS and html code is in your capable hands (not in our Javascript code).


## Anatomy of a presentation

Each presentation should be in an html file (obviously), but  nothing stops you from having multiple presentations on a web page (as long as they use unique JS variable names, etc).
A presentation consists of:
- CSS styles for the presentation "stage" (it's main &lt;div&gt; html element). This is standard boilerplate code.
- CSS styles for the presentation "skin" (e.g. video-like navigation bar at the bottom of the page). We've got some nice skins you can wear for free! No need to fret about this, unless you're picky.
- CSS styles for the presentation animations: These could be stored directly in the html file in a &lt;style&gt; tag, or imported from a CSS file (NOTE: the origin of that file MUST be the same as the html file).
- A &lt;script&gt; tag that imports the pompous player JS code.
- A bunch of JS code to instantiate the presentation JS objects. If you just copy/paste from the demos, we've got you covered!
- Html code for the presentation visual elements (images, texts and videos). We've'got well defined best practices on this one, read on.
- Html code for the "stage &lt;div&gt; and for the "skin". Ctrl +c/+v are your best friends.

See these things in this [demo](demos/ZoomInOut.html).

## The Javascript

Here is the minimum JS code for a presentation:

```javascript
<script>
// Use the "like-a-video" skin:
const pompousNavigation = new PompousVideoLikeNavigation({stageId:"the-pompous-stage", hideShareButton:false});

const pompousOptions = {
  // Required: The id of the "stage" div html element, 
  // e.g. <div id="the-pompous-stage">...the...presentation..html...here...</div>
  stageId: "the-pompous-stage",
  autoStart: "true",
  designWidth: 1920,
  designHeight: 1080,
  // ... some more presentation options here ...
  // Important: Let the player know about the skin navigation object, so that it can call functions on it, at will:
  pompousEventNotifier: pompousNavigation,
  // Upon page load, resize the stage div element to fit the window/iframe width AND height:
  afterInit: () => {updateStageScale(pompousPlayer)},
};

// This will also initialize the Pompous Player at the right time (at page load, upon "document ready"):
const pompousPlayer = new PompousPlayer(pompousOptions);

// Then, optionally, add a window resize listener:
window.addEventListener("resize", () => {updateStageScale(pompousPlayer)});

// Then, optionally, add a mobile swipe listener (not shown, but you can see it in the demos)
</script>

```

Note: The code above can be written in even more condensed way:

```javascript
<script>
const pompousPlayer = new PompousPlayer({
  stageId: "the-pompous-stage",
  autoStart: "true",
  designWidth: 1920,
  designHeight: 1080,
  pompousEventNotifier: new PompousVideoLikeNavigation({stageId:"the-pompous-stage", hideShareButton:false}),
});
window.addEventListener( "resize", () => {updateStageScale(pompousPlayer)});
// Then, optionally, add a mobile swipe listener (not shown, but you can see it in the demos)
</script>

```

Above we created a navigation object, an "options" object, a player object, and we wire them up.
The code gets executed when the presentation web page loads, even before the "document ready" (aka "DOMContentLoaded" event), and that's ok, as we don't do much at that time. The player internals will subscribe for the "document ready" event; when it fires, the player will start pre-loading images, audio, videos, fonts, etc, and will eventually be ready to play; it will also start auto playing, if it finds the player option `autoStart: "true",`.

The PompousPlayer is defined in file [js/pp-player.min.js](js/pp-player.min.js) and in [js/pp-all-in-one.min.js](js/pp-all-in-one.min.js) ; You can use either.
The PompousVideoLikeNavigation contains the JS code for the video-like skin. It is in file [js/pp-skins.js](js/pp-skins.js) and in [js/pp-all-in-one.min.js](js/pp-all-in-one.min.js) ; You can use either. 

## The presentation options

The presentation "options" object is just a plain old JS object with a few name/value pairs. 

Below we list all player options and their default values (if you don't specify any option yourself, the default value below will be used).
Only the first two options are required : 'stageId' and 'pompousEventNotifier'; there are no default value for them. See the Javascript section above for how to set them.

```javascript
const pompousOptions = {
      // Required: The id of the "stage" div html element, 
      // e.g. "stageId": "the-pompous-stage"      
      // for <div id="the-pompous-stage">...the...presentation..html...here...</div>
      "stageId": undefined,
      
      // Required. The "skin" JS code, 
      // e.g. pompousEventNotifier: new PompousVideoLikeNavigation({stageId:"the-pompous-stage", hideShareButton:false}),
      "pompousEventNotifier": undefined,
      
      // An optional function that will be invoked at the end of init();
      // This is a good place to add code to scale the stage elem. to fit the
      // browser width or height or both.
      // If not set, the following will be used: afterInit: () => {updateStageScale(...the..pompous..player...)}
      "afterInit" : undefined,
      
      // - "false": Do not start playing on page load. Keep the stage div's CSS style "visibility:hidden" until the user requests play.
      // - "true": Start playing as soon as the web page loads:
      // - "jump_to_1st_nonskippable": Once the web page loads, jumps to the beginning of the 1st non-skippable animation and pauses.
      // - "jump_to_time_0": Once the web page loads, plays the animation at time 0, and pauses.
      "autoStart": "true",
      
      // If set to "true": When the end was reached while playing forward,
      // then wait 2 seconds, and then restart playing from the start, forward.
      "autoRestartAtEnd":false,
      
      // could be a bit confusing: If set to "true", when playing backwards and
      // the start was reached,
      // then wait 2 seconds, and then reverse the play direction and start
      // playing forward, from the start.
      "autoRestartAtStart": false,
      
      // Not documented: Shows a blank screen before starting auto- or manual- playing
      // v.s. show the 1st slide image before starting auto- or manual- playing
      "startBlank": true,
      
      // The following stage div width and height was used when designing the presentation.
      // Now that we know this, we can scale the stage div up/down as needed to fit all screens,
      // like the way a video does. 
      // Most phones and TVs have 16:9 screen ratio. 1920x1080 = 16:9 = Full HD, 1080p ;
      "designWidth": 1920,      
      "designHeight": 1080,
      
      // Border size to leave on each of the four sides, in pixels. Used when
      // calculating the stage scale.
      "stageBorderSize": 0, 
      
      // Allows specifying an audio track for the presentation.
      // e.g. audio: "https://.... my-audio.mp3"
      // The audio is synchronized with the "play" at all times.
      "audio":undefined,
      
      // When autoStart is true: We have a choice to mute the audio ("true"
      // means it's muted), or not (which may cause bad user experience)      
      // Avoid changing this, as the Chrome browser won't let you anyways. See more here:
      // https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
      "autoStartAudioMuted":true,
      
      // When the audio track ends but the presentation is not over, loop the audio
      // again and again:
      "audioAutoLoop":true,
      
      // List here the fonts to be used in this presentation.
      // For more info, see https://github.com/typekit/webfontloader
      // Example: webfonts: {"google": {"families": ["Cute Font:400", ]},},
      "webfonts":undefined,
      
      // The browser will load these N images during init, BEFORE starting playing.
      // As soon as it starts playing, it will load all remaining images.
      // -1 means "wait for all images to load before playing presentation"; 
      //  0 means "don't wait for any images to load".
      "loadNImagesAhead": 10,
      
      // Useful for JS debugging. Enables logging of log messages through the
      // code into the browser console.
      "logLevel": 2, // 0 = none, 1 = ERROR, 2 = WARN and above, 3 = INFO and
                     // above, 4 = DEBUG and above, meaning all.
    };
```


## The HTML

Consider the following html code:

```html
<body>
  <div id="the-pompous-stage" class="pompous-stage" tabindex="0">
    <div class="initially-hidden" data-classes="show delay-1.5s, hide delay-3.5s"></div>      
  </div>
</html>
```

The class(es) in `class="initially-hidden"` will be applied, as usual, at page load, before  the presentation is ready to play.

The presence of the `data-classes="..one or more class names separated by comma..."` denotes that this div will be animated (the player ignores to "play" it otherwise).
The class `show` will be applied at 1.5 second from the play start (as defined by `delay-1.5s`);
The class `hide` will be applied at 3.5 second from the play start (as defined by `delay-3.5s`);
You can add more such "animations" to each div.

The CSS class name "delay-*" (e.g. "delay-1.5s") is special. There is no such class in the presentation; but the player looks for it, recognizes it, and extracts the "delay of this animation from the presentation start", e.g. 1.5 seconds.

The player also supports jumping through "interesting" places in the "play" via "<<" (fast rewind to previous interesting place) and ">>" (fast forward to next interesting place) buttons (these buttons are present in most "skins"). 
We call these non-skippable places in the "play".
By default, every animation start offset in the play (e.g. offset 2.0 seconds as in `..., move-to-left delay-2s, ...`) is non-skippable.
But if you want a specific animation to be skipped (not stopped-at via the "<<", ">>" buttons), you can define it like so: `data-classes="show delay-1.5s, hide skippable delay-3.5s"`
Again: the `skippable` class is optional; if not present for a given animation, then it will be non-skippable (will be stopped-at via the "<<", ">>" buttons). Note: There is no such class in the presentation, but the player looks for it and recognizes it.

## The CSS

As we said above, the player will apply specific CSS classes at specific times.
Note: the player does not "remove" any CSS classes from the DOM elements in the "stage" div; but by adding more classes to a given div you can change (override) specific CSS styles that were set earlier.

Some CSS classes may have animations (e.g. by transitioning the CSS "transform" property); their animation duration is specified in the CSS (e.g. `transition-duration: 1.5s;`). Other CSS classes may contain just "static" (non-animated styles, e.g. `visibility: hidden;`); they are applied exactly and immediately at the specified time.

Example of a "static" class that has no animations (and is applied immediately):

```html
/* Prepares a div to slide-in from bottom to top, by placing it outside of the stage, below it */
.slide-in-from-bottom-initial {
  transform: translateY(100%);
}
```

Example of an "animated" class:

```html
/* Slides-in a div from outside of the screen (from bottom to top) onto the stage, for 1 second */
.slide-in-from-bottom {
  --pp-transform-from: translateY(100%);
  transform: translateY(0%);
  transition-property: transform;
  transition-timing-function: ease-in;
  transition-duration: 1s;
  --pp-transition-precision: 3; 
}
```

The class above will transition the "transform" CSS style from value "translateY(100%)" to value "translateY(0%) translateY(-100%)" for 1 second.

Notice the `--pp-transform-from` CSS style above. This is a custom CSS style that the browser does not understand (and ignores), but the pompous player needs and requires.
It specifies the initial value of the "transform" style (at the start of the animation), similar to the "from" in CSS @keyframes. More discussion on why we did it this way is [here](FAQ.md#why-do-we-have-to-use-a-custom-pp-transform-from-css-style). The property name is different for different styles being transitioned; it's in the format `--pp-<theTransitionProperty>-from`, for example:

```html
.transform-example {
  --pp-transform-from: translateY(100%);
  transform: translateY(0%);
  transition-property: transform;
  transition-timing-function: ease-in;
  transition-duration: 1.5s;
}

.opacity-example {
  --pp-opacity-from: 0;
  opacity: 1;
  transition-property: opacity;
  transition-timing-function: linear;
  transition-duration: 0.5s;
}

/* This one is a bit weird: There are two similar --pp-...-from styles below, for the same thing. This way it works in all major browsers */
.webkit-mask-example {
  --pp--webkit-mask-position-x-from: 70%;
  --pp-mask-position-x-from: 70%;
  -webkit-mask-position-x: 30%;
  transition-property: -webkit-mask-position-x;
  transition-timing-function: ease;
  transition-duration: 3s;
}

/* Here we transition (animate) both the "transform" and "opacity" CSS styles.
   Any "static" CSS styles (e.g. "visibility: visible;") is applied at the animation start.
*/
.bounceInLeft
{
  visibility: visible;
  transition-property: transform, opacity;
  --pp-opacity-from: 0;
  opacity: 1;
  --pp-transform-from: translateX(-2000px);
  transform:           translateX(0px);
  transition-timing-function: ease;
  transition-duration: 1s;
}

/* Similar to above, but defines specific values at specific times during the animation, similar to CSS @keyframes: 
   --pp-opacity-from: 0  means: The opacity will be 0 at the start of the animation (0 means "fully transparent").
   --pp-opacity-60: 1    means: The opacity will be 1 at 60% of the animation duration (60% of 1 second = 0.6 seconds). It will transition from 0 to 1 from the 0 to 0.6s mark.
   opacity: 1            means  The opacity will be 1 at the presentation end. It will stay at one from the 0.6 to 1 seconds mark.
   */
.bounceInLeftSophisticated
{
  visibility: visible;
  transition-property: transform, opacity;
  --pp-opacity-from: 0;
  --pp-opacity-60: 1;
  opacity: 1;
  --pp-transform-from: translateX(-2000px);
  --pp-transform-60:   translateX(25px);
  --pp-transform-75:   translateX(-10px);
  --pp-transform-90:   translateX(5px); 
  transform:           translateX(0px);
  --pp-transition-timing-function: easeOutCubic;
  --pp-transition-precision: 3;
  transition-duration: 1s;
  --pp-delay: 0s;
}
```

Above, we use the "--pp-delay: 0s" custom CSS style, which can be used instead of the "delay-0s" class, for specifying the delay of this animation from the presentation start (e.g. 0 seconds). 

Also, notice the `--pp-transition-precision: 3;` custom CSS style above.
A precision of 3 means that each small animation "step" (from 100% to 0%) will be in 0.001 increments (3 digits after the decimal point). This CSS style is optional; if not specified, we use a value of 2 (meaning steps in 0.01 increments). The allowed range is from 0 (steps in increments of 1) to 5 (steps in increments of 0.00001).
A higher-than-2 value may be useful if you're transitioning small numbers (e.g. from 0 to 1); In this case, an 0.01 increment played over 5 seconds will look too choppy. Hence the choice of "4".

Also, notice the `--pp-transition-timing-function: easeOutCubic;` custom CSS style above. It uses a custom transition timing function. Read on more about "easings" below.

Limitations:
The start and end transform values must "look alike", so that the player would be able to understand what is being transformed, and from where-to-where. 

```html
Examples of correct, look-alike values: 
  --pp-transform-from: scale(0) translateY(100%) translateZ(-100px); 
   transform:          scale(1) translateY(0%)   translateZ(0px)   ;
  
  --pp-transform-from: rotate(0deg) ; 
   transform:          rotate(90deg);
  
  --pp-opacity-from: 1; 
  opacity:           0.1;
  

Examples of incorrect values (they result in an error during page load):
  --pp-transform-from: scale(0); 
  transform:           rotate(90deg); // "scale" does not match "rotate"
  
  --pp-transform-from: translateX(100%); 
  transform:           translateX(500px); // "%" does not match "px"
  
  --pp-transform-from: rotate(0rad); 
  transform:           rotate(90deg); // "rad" does not match "deg"
```
## CSS Easings: The sky is the limit

In CSS transformations you can specify an "easing" function which specifies the speed trajectory at which the animation will be played, e.g. `transition-timing-function: ease-in;`. Typical easing functions are "linear", "ease", "ease-in", ease-out", etc.

In addition to these, the pompous player can use ANY custom easing function.
How come? As we mentioned earlier, we feed each CSS animation slowly to the browser, usually at 60 times per second, via calls to [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) (the player is smart to account for any missing "frames"); the player calculates the animated value (e.g. "opacity:0.322") for each frame; this allows the player to use ANY custom easing function.

For instance, we can achieve a "bounce at the end" effect to a "scale from 0 to 1" css transformation by utilizing the custom easing function "EaseOutBounce". See it's graph (and others) [here](https://easings.net/) ; note: All these functions are defined in file [pp-dependencies.js](js/pp-dependencies.js).

How do I specify a custom easing function in my animation? We can't use the `transition-timing-function` CSS style, because the browser validates the value and ignores unknown easings.
However, you can specify it using this custom CSS style: `--pp-transition-timing-function: EaseInBack;`.
Here is a full example:

```html
/* Scales the html element from 1 to 0 in 1 second, with a bit of a bouncy effect at the beginning  */
.bounceOutInPlace {
  transition-property: transform;
  --pp-transform-from: scaleX(1) scaleY(1) scaleZ(1);
  transform:           scaleX(0) scaleY(0) scaleZ(0);
  --pp-transition-timing-function: EaseInBack;
  --pp-transition-precision: 4;
  transition-duration: 1s;
}
```

See all currently available easing functions [here](js/pp-dependencies.js#L142)
All of them have a value of 0 at time 0, and value of 1 at time 1 (similar to all browser easing functions); however, this is not strictly required. You can go wild, but try to keep the values between 0 and 1 at all times. See demo [CustomEasing.html](demos/CustomEasing.html)

If you want to define and use your own custom easing function, add it to the presentation html file:

```
<script>
transitionTimingFunctions.MyAwesomeEasingFunction = (t) => {return (t *= 2) < 1 ? 1 / 2 * t * t * t : 1 / 2 * ((t -= 2) * t * t + 2);};
</script>

... and then use it:

<style>
.MyAwesomeAnimation {
  ...
  --pp-transition-timing-function: MyAwesomeEasingFunction;
  ...
}
</style>
```

More easing function resources: [https://easings.net/](https://easings.net/), [https://dbaron.org/css/timing-function-graphs](https://dbaron.org/css/timing-function-graphs), [https://developer.mozilla.org/en-US/docs/Web/CSS/timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/timing-function), [http://cubic-bezier.com/](http://cubic-bezier.com/#.15,1.52,.57,1.22).

## The player "skins"
The Pompous Player can be customized to have different looks:
- [skin-video-like-001.html](https://www.pompousphotos.com/html/GitHub/skins/skin-video-like-001.html) :  video-like, with a progress bar on the bottom. Can you tell it's not video?
- [skin-carousel-001.html](https://www.pompousphotos.com/html/GitHub/skins/skin-carousel-001.html) : carousel, with < and > buttons on each side, and muuuch mooore.
- [skin-no-navigation-001.html](https://www.pompousphotos.com/html/GitHub/skins/skin-no-navigation-001.html) : have no buttons at all (actually has a hidden button in the upper left corner). Useful for recording the browser window into a video file.  

We call these "skins". Each file above is a full presentation, with just one slide in it. You can implement your own skin. See more info in folder [skins](skins).

## Embedding in other web pages

It's super easy. Use an "iframe" html element inside a "div" element with a custom CSS style. See options [one](https://www.pompousphotos.com/html/EmbedInWebPageOption1.html) (recommended, easiest), [two](https://www.pompousphotos.com/html/EmbedInWebPageOption2.html) and [three](https://www.pompousphotos.com/html/EmbedInWebPageOption3.html).

## Tips for creating well-performing browser animations
Please read through these articles while we add more tips:

[High Performance Animations](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)
[CSS and JavaScript animation performance](https://developer.mozilla.org/en-US/docs/Web/Performance/CSS_JavaScript_animation_performance)
[CSS vs. JS Animation: Which is Faster?](https://davidwalsh.name/css-js-animation)

## FAQs

... are [here](FAQ.md).

