# PompousPlayer Frequently Asked Questions

## Is PompousPlayer open source? Is the JS source code available?
No, it's not. Most use cases fall under the "free to use" license; some users may have to obtain a paid commercial license from us. See more [here](STANDARD_LICENSE). This licensing model gives us a sustainable future.
While the "skins" Javascript source code is readily available, the "player" code is available only in minified (unreadable) form.
The goal of this project is to enable YOU to build awesome presentations without having to know, read, or write Javascript code (aside from the boilerplate copy/paste code in each presentation).
If you are interested in the full source code, it will be available to to you when you obtain a commercial license from us; see [https://www.pompousphotos.com/commercial_license](https://www.pompousphotos.com/commercial_license) for more info.

## How did you minifi the Javascript code?
We use the Google closure compiler.

## The demo-s don't use browser-specific CSS prefixes. Why?
The browsers are best at transitioning (animating) the following CSS properties: "transform" (2D and 3D) and "opacity".
All major modern browsers support these CSS styles without the need of custom CSS prefixes (like "-webkit-transform").
See more [here](https://caniuse.com/#search=transform).

Note: One powerful animation feature that still lacks wide support is the "-webkit-mask-position". Strangely, the Mozilla browser understand it and plays it well. The Chrome browser obviously understands and plays it well, but we found out that Chrome on Mobile in full screen has a bug which prevents such animations from playing. 


## Why do we have to use a custom "--pp-transform-from" CSS style? 

Can't we just set the initial CSS value in another class, and have the animation start from that value, as we usually make CSS transformations?

In "normal" web pages, if you want to animate something, you will place the "transform:the-initial-value-here" in a CSS class separate from the animation class, you will apply that initial class first (e.g. on page load); then upon some event (button click, hover, scroll down, etc), you will apply the "transform:end-value-here; transition-duration: 2s;" CSS styles, and the browser will animate it. 

The pompous player works by feeding each animation slowly (at 60 frames per second), so it needs to know that initial value. However, the browser reports it (by calling DOM APIs) like this: transform:matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 960, 1); from it, the Pompous player cannot figure out which transform "function" is being transitioned, and from which start value.

Therefore, you need to specify the initial value in the custom CSS style "--pp-transform-from" CSS style, e.g:

``` html
.rotate-to-left {
  transition-property: transform;
  --pp-transform-from: translateZ(-960px) rotateY(0deg) ;
  transform:           translateZ(-960px) rotateY(-90deg);
  transition-timing-function: ease;
  transition-duration: 2s;
}
```

 Anyhow, writing CSS this way is much more readable, because the initial and end transition values are in one CSS class! And this is very similar to how you define animations in CSS using "@keyframes".
 
 ## I see an extra div in the browser inspector that isn't there in the html. What is this conspiracy?
 We "insert" this div in the DOM during init, so that the "stage" div is inside it.
 When you click on the "go to full screen" button, we need to properly scale the "stage" div to fit the full screen. We apply the scale on that div. Applying the scale on the "stage" div does not yield the desired result.

 