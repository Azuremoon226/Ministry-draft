# Grace of God Ministry

A responsive, single-page ministry preview site built with HTML, CSS, and vanilla JavaScript. The slideshow images and video poster are stored locally in `assets/images/`, so the background does not rely on a third-party image server at runtime.

## Project files

- `index.html` contains the page content, accessible navigation, and HTML5 video player.
- `style.css` contains the responsive layout, typography, slideshow layers, transitions, and reduced-motion styles.
- `script.js` preloads and advances the background slideshow, handles the mobile menu and smooth scrolling, updates the year, and reports a missing trailer.
- `assets/images/` contains four locally stored slideshow photos, smaller mobile versions, and the video poster.
- `video/ministry vid.mp4` is the current ministry trailer file.

## Add your ministry trailer

The supplied trailer is currently stored at `video/ministry vid.mp4`. The HTML player points to that local file using the relative URL `./video/ministry%20vid.mp4` (the space is URL-encoded).

The video has controls, plays inline on phones, does not autoplay, and displays a helpful message if the MP4 is missing or cannot be read. MP4 files encoded with H.264 video and AAC audio are broadly compatible. Keep the poster in `assets/images/video-thumbnail.jpg`, or replace it with a suitable 16:9 image. If you move or rename the trailer, update the `<source>` in `index.html` to match.

If the MP4 is too large to upload through the GitHub website, compress/export it at a practical 1080p or 720p bitrate. GitHub blocks regular Git files larger than 100 MB, and browser uploads have a much smaller limit. Git LFS can store large files in a repository, but check the account's LFS storage/bandwidth allowance and confirm the deployment method can retrieve it; for a large public video, a video host (such as YouTube or Vimeo) is often the simpler choice. If you host it elsewhere, update the `<source>` in `index.html` to that hosted video URL.

## Images and licensing

Five JPEGs were downloaded from Unsplash's image CDN and saved in the project. The `fm=jpg` URLs request JPEG images at useful display widths. Their local copies mean the published slideshow will keep working if the source CDN is unavailable.

| Local file | Image source |
| --- | --- |
| `assets/images/background-1.jpg` | [Unsplash image](https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?fm=jpg&fit=crop&w=2400&q=88) |
| `assets/images/background-2.jpg` | [Unsplash image](https://images.unsplash.com/photo-1519491050282-cf00c82424b4?fm=jpg&fit=crop&w=2400&q=88) |
| `assets/images/background-3.jpg` | [Unsplash image](https://images.unsplash.com/photo-1501785888041-af3ef285b470?fm=jpg&fit=crop&w=2400&h=1600&q=88) |
| `assets/images/background-4.jpg` | [Unsplash image](https://images.unsplash.com/photo-1507692049790-de58290a4334?fm=jpg&fit=crop&w=2400&q=88) |
| `assets/images/video-thumbnail.jpg` | [Unsplash image](https://images.unsplash.com/photo-1470770841072-f978cf4d019e?fm=jpg&fit=crop&w=1600&h=900&q=88) |

Unsplash's free-image license generally allows images to be downloaded and used without required attribution, subject to its [license terms](https://unsplash.com/license). Attribution is appreciated. This project records the source URLs as a courtesy; check the provider terms if the use changes or if you replace these photos. The photo CDN links identify the source images; no individual photographer attribution was included in the downloaded metadata.

The smaller files named `background-1-mobile.jpg` through `background-4-mobile.jpg` are also local Unsplash downloads (the same four photos requested at 1200 pixels wide). The JavaScript selects these versions on screens up to 700 pixels wide to reduce mobile downloads; larger screens use the 2400-pixel versions.

To replace a slideshow photo later, save a landscape JPEG in `assets/images/` with one of the existing background filenames and its matching `-mobile` filename. Keep the desktop version reasonably high-resolution and the mobile one around 1200 pixels wide. CSS uses `background-size: cover` and viewport-specific positioning to preserve the images' proportions while filling the screen. You can adjust the focal point in `.slideshow__layer` and the portrait media query in `style.css`.

## Edit the ministry details

Update the email address, phone number, location, social URLs, ministry text, and church name directly in `index.html`. Contact and social values are examples/placeholders; use your real details before publishing. Replace each social platform's generic link with the ministry's own channel or page.

## Preview in Visual Studio Code

1. Open Visual Studio Code.
2. Choose **File → Open Folder…** and select the `ministry-website` folder.
3. Open `index.html`. For the most reliable local preview, use VS Code's Live Server extension and select **Open with Live Server** from the editor context menu. You can also open `index.html` directly in a browser.
4. If the trailer does not load, confirm `video/ministry vid.mp4` is present.

The slideshow crossfades between the four local photos approximately every 5.5 seconds. It preloads images before displaying them and leaves a CSS fallback background in place if an image is unavailable. With reduced motion enabled in the operating system/browser, it shows a single static slide rather than automatically animating.

## Publish with GitHub Pages

1. Confirm `video/ministry vid.mp4` is included in the repository, and replace all example ministry/contact details.
2. Create a new public repository on GitHub. Upload the contents of the `ministry-website` folder (the `index.html` file should be at the repository root, not inside an extra nested folder). Or use Git to push this folder to the repository.
3. On GitHub, open the repository's **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, choose the branch containing the site (usually `main`) and the `/ (root)` folder, then save.
5. After GitHub Pages finishes deploying, its Pages panel will show the public URL. A project site normally uses `https://USERNAME.github.io/REPOSITORY/`.

All CSS, JavaScript, image, poster, and video paths in the page are relative, so they work below a GitHub Pages repository subpath.

## Troubleshooting

- **Images are missing:** check the filenames and capitalization in `assets/images/`; confirm that folder is included in the published repository and that the relative paths in `script.js` match.
- **Images look oddly framed:** image proportions are preserved with `cover`; adjust the focal point using `background-position` in `style.css`. Replace images with high-resolution landscape sources when necessary.
- **Trailer is missing or will not play:** make sure `video/ministry vid.mp4` is committed and pushed to GitHub, encoded as a browser-compatible MP4, and not over GitHub's regular-file size limit. If you rename or move it, update the video `<source>` path in `index.html`.
- **Page does not update after publishing:** wait for the Pages workflow to finish and refresh the published URL. Check the repository Pages settings for deployment status.
- **Social buttons go to generic sites:** replace the sample platform URLs with the ministry's real profile links before going live.
