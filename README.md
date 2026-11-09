# Dheeraj Kumar — Portfolio

A zine-style portfolio for Dheeraj Kumar, full stack developer. Built with plain HTML, CSS and JavaScript — no build step required.

## Live site

Deployed with GitHub Pages through the workflow in `.github/workflows/deploy.yml`.

## Local preview

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## What gets published

GitHub Pages only receives the files copied into `_site` by the workflow:

- `index.html`
- `404.html`
- `robots.txt`
- `favicon.ico`, `favicon.svg` and `favicon.png`
- `og-image.png`
- `css/style.css`
- `js/data.js` and `js/app.js`
- `Dheeraj_Kumar_CV.pdf`

Everything else (including `archive/`, `README.md`, `.github/` and the old design variants) stays in the repository but is **not** accessible on the live site.

## Deploy to GitHub Pages

1. Create a new GitHub repository and push this project to your default branch (`main` or `master`).
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to your default branch (or run the workflow manually from the **Actions** tab).
5. The site will be available at `https://USERNAME.github.io/REPO/`.

## Updating content

- **Projects, stack, profile:** edit `js/data.js`.
- **CV download:** replace `Dheeraj_Kumar_CV.pdf` with a new PDF using the same filename.
- **Social preview URL:** after the first deploy, open `index.html` and replace the placeholder note near the `og:image` tags with your absolute GitHub Pages URL, then add the `og:url` meta tag.
- **Copy and sections:** edit `index.html`.
- **Styling:** edit `css/style.css`.

## Notes

- The old design iterations are kept in `archive/` for reference and are excluded from deployment.
- The contact links use `mailto:` and `tel:` so no backend is needed.
