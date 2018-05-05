---
title: How to scrub a video while scrolling
slug: how-to-scrub-a-video-while-scrolling
date: 2017-12-23
excerpt: Use the scroll event to scrub a video
---

In this post, we'll take a look at how we can "scrub" a video while scrolling. Apple popularized this neat interactive effect with their <a href="https://www.apple.com/mac-pro/" target="_blank">Mac Pro product page</a>. The product page uses a variety of CSS and JS to help power its animations, but the main attraction is the video of the Mac Pro in the center of view. Notice that as you scroll, the video will play whenever you scroll and then pauses whenever you stop scrolling. Neat right?

I thought the scroll scrubbing effect was really cool, so I made a demo that replicates it. Check it out below:

<p data-height="265" data-theme-id="0" data-slug-hash="mLwWQw" data-default-tab="result" data-user="ozywuli" data-embed-version="2" data-pen-title="How to scrub a video while scrolling (with unmodified video)" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/mLwWQw/">How to scrub a video while scrolling (with unmodified video)</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<hr />

But wait, something's wrong. When you scroll, the video does indeed play, but the progress isn't smooth and jerks from frame to frame. The issue here is that the MP4 video file needs to be <a href="https://rigor.com/blog/2016/01/optimizing-mp4-video-for-fast-streaming" target="_blank">optimized for faster streaming and seeking</a>. But how? One method (and the only method I know) is to through a command line tool called <a  href="https://www.ffmpeg.org/" target="_blank">FFmpeg</a>. It's a nifty tool for manipulating video, audio, and other multimedia files. The downside is that since it's developed for the command line, you have to be comfortable with using the command line. If you don't already have FFmpeg installed, then do so now. <a href="https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/wiki/Installing-ffmpeg-on-Mac-OS-X" target="_blank">Here is my recommended guide</a> for installing FFmpeg on Mac OSX.

Once you've installed FFmpeg, then run the following command to convert your MP4 into a quick seeking video:

```bash
// "input.mp4" is the name of the original video. "output.mp4" is the name of the optimized video
ffmpeg -i input.mp4 -c:v libx264 -profile:v baseline -x264opts keyint=3:min-keyint=2 -movflags +faststart+rtphint output.mp4
```

Plug in the optimized video and then, bam, we've got a smooth scrolling video:

<p data-height="265" data-theme-id="dark" data-slug-hash="JvEeXV" data-default-tab="result" data-user="ozywuli" data-embed-version="2" data-pen-title="How to scrub a video while scrolling" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/ozywuli/pen/JvEeXV/">How to scrub a video while scrolling</a> by ozywuli (<a href="https://codepen.io/ozywuli">@ozywuli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<hr />

