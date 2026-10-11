# Ifham Ishaq portfolio

A static site: plain HTML, CSS and JavaScript. No build step, no dependencies.

```
index.html      home page
portfolio.html  full portfolio page (all thumbnails)
style.css       all styling
script.js       the lists you edit (WORKS, TESTIMONIAL) and the page behaviour
fonts/          Roboto and Anton, self-hosted
thumbs/         your 1280x720 JPGs
testimonial/    your testimonial videos (MP4) and optional poster images
```

## Add thumbnails

1. Export each thumbnail as a **1280x720 JPG**.
2. Put it in `thumbs/`, for example `thumbs/14.jpg`.
3. Open `script.js` and edit the `WORKS` list at the top. One line per thumbnail:

   ```js
   { file: "thumbs/14.jpg", client: "Client name", title: "Your video title" },
   ```

Add as many lines as you have thumbnails. `client` is optional: leave it `""` to show only
the title. `niche` is the topic chip on the portfolio page (for example `"Medicare"`, `"Finance"`,
`"Business"`). Leave it `""` for none. The chips appear once two or more topics are used. The 26 lines that come with the site are your thumbnails from your Canva
portfolio, in the same order, with titles taken from the text on each thumbnail. Change
any title, reorder lines, or delete lines freely.

**Two places show your work:**

- **Home page (`index.html`):** a YouTube-style watch page. A "Selected work" block shows the first
  6 lines of `WORKS` (or the ones marked `featured: true`), and the "Up next" list shows the next 8.
  Both link to "View all works". The old first-8 rule of `WORKS`. To choose which ones, add `featured: true` to
  those lines instead, for example
  `{ file: "thumbs/14.jpg", client: "...", title: "...", featured: true },`.
  Change how many show by default with `FEATURED_COUNT`.
- **Full portfolio (`portfolio.html`):** every line of `WORKS`, with a search box and topic chips.
  Visitors can also search from any page, and press `/` to jump to the search box.

The visitor's theme choice (dark or light) is remembered in their browser. Dark is the default.

**Missing images.** `SHOW_PLACEHOLDERS` at the top of `script.js` is `false`, so a missing image is hidden
on the live site. Set it to `true` while you are adding images if you want every empty slot
to show a labelled dashed frame. The empty frame still
appears on localhost, when opening the file directly, and on any URL ending in `?edit`
(for example `https://yoursite.netlify.app/portfolio.html?edit`). If no image loads on the
live site, the work sections show a short "samples are being added" line instead.

## Profile picture

Your photo is `images/ifham.jpg` (a square crop). It is used for the channel avatar, the small
circle under each thumbnail, and the "Start a project" card. Replace the file to change it
(square, about 480 x 480 pixels works best).

## Replace a step animation with your own video

The three "how it works" panels are built-in animations. To swap one for
your own video, save it as 16:9 MP4 (muted is fine) in `process/`:

- `process/step-1.mp4` for "Send title and topic"
- `process/step-2.mp4` for "I send 2 to 3 concepts"
- `process/step-3.mp4` for "I polish the pick"

If the file exists it plays (muted, looping, only while on screen) in place of the animation.
If it is missing, the animation stays. Keep each video under about 5 MB.

The hero player picks a new colour style at random each time it plays. Visitors can click its
play button to replay it.

## Add testimonial videos

The Testimonials section holds a grid of video cards. Each card is one line in the
`TESTIMONIALS` list at the top of `script.js`:

```js
{ video: "testimonial/zack.mp4", poster: "testimonial/zack.jpg", name: "Zack", role: "", quote: "" },
```

1. Save the video in `testimonial/` (MP4, H.264 video with AAC audio plays everywhere).
   Vertical and horizontal videos both work: each sits in a 16:9 frame without cropping.
2. Optional: add a poster image (a still from the video) with the same name and `.jpg`.
3. Optional: fill in `name`, `role` and `quote`. Leave any of them as `""` to hide it.
4. Add more lines for more videos. Three slots come ready: `zack.mp4`, `client-2.mp4`
   and `client-3.mp4`.

A slot stays hidden on the live site until its video file exists, and the whole section
stays hidden until at least one video does. To preview the empty slots, add `?edit` to
the page address (for example `https://yoursite.netlify.app/?edit`) or open the site on
your computer. Keep each video under about 20 MB.

## Deploy on Netlify

1. Go to <https://app.netlify.com/drop>.
2. Drag this whole folder onto the page.
3. Netlify gives you a live URL. Rename it under Site configuration, then Change site name.

To update the site later, open the site's Deploys tab and drag the folder on again.

## Contact form

The contact form on the home page is a Netlify Form named `contact`, with the fields
name, email, service and message. Submissions appear under Forms in your Netlify
dashboard, in the same `contact` form you already have. Netlify finds the form when you
deploy, so deploy the site once and it starts collecting. It does not work when you open
the file on your computer. The visitor sees a confirmation under the button, or
`thanks.html` if JavaScript is off. If sending fails, the page tells them to email you.

## Before you go live

- Add an Open Graph preview image: save a 1200x630 image as `og.jpg` and add
  `<meta property="og:image" content="https://YOUR-SITE-URL/og.jpg">` and
  `<meta property="og:url" content="https://YOUR-SITE-URL/">` to the `<head>` of
  `index.html`. Social sites need the full URL.
- Large videos load slowly. Keep `zack.mp4` under about 20 MB.
