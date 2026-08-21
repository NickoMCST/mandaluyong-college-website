# MCST Website Redesign Concept

An independent website redesign concept for **Mandaluyong College of Science and Technology (MCST)**, built as a portfolio project to demonstrate UI/UX design and frontend development with React, TypeScript, and Vite.

> ⚠️ **This is an unofficial, independent portfolio project and is not affiliated with, operated by, or endorsed by Mandaluyong College of Science and Technology.** Some content (news, events, program details) is illustrative concept content for demonstration purposes and does not represent official MCST information.

## Live Demo

Once deployed to GitHub Pages, the live site will be available at:

```
https://USERNAME.github.io/REPOSITORY-NAME/
```

_(Replace with the actual URL after deployment — see [Deployment](#deployment) below.)_

## Features

- Multi-page site with client-side routing (Home, About, Programs, Campus Life, Events, Contact)
- Animated hero carousel with auto-advancing slides and manual controls
- Sticky header with a mega-menu, mobile navigation drawer, and in-site search that routes to the relevant page
- Filterable program catalog and a tabbed events/news view
- Scroll-triggered reveal animations and a "back to top" control
- Ambient background music with a floating play/pause control (bottom-left) — starts softly on the visitor's first interaction with the page and loops for the whole session; respects a visitor who turns it off. Swap the track by replacing `public/audio/campus-theme.mp3` (or updating `MUSIC_URL` in `src/data.ts`)
- Demo admissions contact form with client-side validation and a clear success state — no backend, nothing is actually sent
- Concept/demo labeling for features that would require a real backend (e.g. Student Portal)
- Responsive layout for desktop, tablet, and mobile
- SEO metadata (title, description, Open Graph tags, favicon) and a GitHub Pages–ready SPA routing setup

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:8443` by default (or the port set via the `PORT` environment variable).

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project Status

`Portfolio / Concept Project`

This project is feature-complete as a design/frontend showcase. It intentionally has no backend, database, authentication, or admissions system — see [Scope & Limitations](#scope--limitations).

## Scope & Limitations

This is a **static frontend concept**, not a functioning school website. It deliberately does not include:

- Real student authentication or a student portal
- A database or CMS
- An admissions backend or application processing
- Any real data submission (the contact form is a labeled demo)

## Deployment

This project is configured to deploy to **GitHub Pages** via GitHub Actions.

1. Push this repository to GitHub.
2. In the repository settings, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to the `main` branch (or run the workflow manually from the **Actions** tab). The included workflow (`.github/workflows/deploy.yml`) will install dependencies, build the project, and deploy the `dist/` folder automatically.
4. The workflow sets the correct base path automatically from the repository name, so no manual configuration is needed for the standard `https://USERNAME.github.io/REPOSITORY-NAME/` URL.

## Disclaimer

This is an unofficial independent portfolio project and is not affiliated with, operated by, or endorsed by Mandaluyong College of Science and Technology. Photography referenced from MCST's public website is used here only as concept/demo placeholder imagery and is not redistributed as part of this repository.

## Author

A project by **Lenver Nicko V. Andes**
