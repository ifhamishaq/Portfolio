# Ifham Ishaq portfolio

A static site: plain HTML, CSS and JavaScript. No build step, no dependencies.

```
index.html      home page
portfolio.html  full portfolio page (all thumbnails)
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
   { file: "thumbs/14.jpg", client: "Client name", title: "Your video title" },
   ```

Add as many lines as you have thumbnails. The 9 lines that come with the site are
placeholders (`thumbs/01.jpg` to `thumbs/09.jpg`): replace the files, or change the lines.

**Two places show your work:**

- **Home page (`index.html`):** a short selection with a "View all works" button.
  It shows the first 6 lines of `WORKS`. To choose which ones, add `featured: true` to
  those lines instead, for example
  `{ file: "thumbs/14.jpg", client: "...", title: "...", featured: true },`.
  Change how many show by default with `FEATURED_COUNT`.
- **Full portfolio (`portfolio.html`):** every line of `WORKS`, with a filter by client.
  The filter buttons appear on their own once you have two or more client names.

Spell a client name the same way on every line, because the filter groups by exact name.

**Missing images.** `SHOW_PLACEHOLDERS` at the top of `script.js` is `true` for now, so
every empty slot shows a labelled dashed frame. Once your real images are in, set it to
`false`. After that, a missing image is hidden on the live site. The empty frame still
appears on localhost, when opening the file directly, and on any URL ending in `?edit`
(for example `https://yoursite.netlify.app/portfolio.html?edit`). If no image loads on the
live site, the work sections show a short "samples are being added" line instead.

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
