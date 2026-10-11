# RE-RENDER Studio portfolio

A static site: plain HTML, CSS and JavaScript. No build step, no dependencies.

```
index.html      page content
style.css       all styling
script.js       the lists you edit (WORKS, TESTIMONIAL) and the page behaviour
fonts/          Schibsted Grotesk and Anton, self-hosted
thumbs/         your 1280x720 JPGs
testimonial/    zack.mp4 and optional zack.jpg
```

## Add thumbnails

1. Export each thumbnail as a **1280x720 JPG**.
2. Put it in `thumbs/`, for example `thumbs/14.jpg`.
3. Open `script.js` and edit the `WORKS` list at the top. One line per thumbnail:

   ```js
   { file: "thumbs/14.jpg", client: "Good Financial Cents", title: "Your video title" },
   ```

The first 9 lines are placeholders (`thumbs/01.jpg` to `thumbs/09.jpg`). Either replace
the files with the same names, or change the lines. Add or delete lines freely.
The grid, the size slider and the enlarge dialog update on their own.

**Missing images.** `SHOW_PLACEHOLDERS` at the top of `script.js` is `true` for now, so
every empty slot shows a labelled dashed frame. Once your real images are in, set it to
`false`. After that, a missing image is hidden on the live site. The empty frame still
appears on localhost, when opening the file directly, and on any URL ending in `?edit`
(for example `https://yoursite.netlify.app/?edit`). If no image loads on the live site,
the Work section shows a short "samples are being added" line instead of the grid.

## Add Zack's video

1. Save the video as `testimonial/zack.mp4`. Vertical and horizontal both work.
2. Optional: add a poster image as `testimonial/zack.jpg`.
3. Optional: edit `TESTIMONIAL` at the top of `script.js` (`name`, `role`, `quote`).
   Leave `quote` as `""` to show only the video.

The testimonial section stays hidden until `testimonial/zack.mp4` exists and loads.
Use H.264 video with AAC audio so it plays in every browser.

## Deploy on Netlify

1. Go to <https://app.netlify.com/drop>.
2. Drag this whole folder onto the page.
3. Netlify gives you a live URL. Rename it under Site configuration, then Change site name.

To update the site later, open the site's Deploys tab and drag the folder on again.

## Before you go live

- Add an Open Graph preview image: save a 1200x630 image as `og.jpg` and add
  `<meta property="og:image" content="https://YOUR-SITE-URL/og.jpg">` and
  `<meta property="og:url" content="https://YOUR-SITE-URL/">` to the `<head>` of
  `index.html`. Social sites need the full URL.
- Large videos load slowly. Keep `zack.mp4` under about 20 MB.
