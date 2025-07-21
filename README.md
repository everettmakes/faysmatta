# Faysmatta – Handwoven Rag Rugs Website

![Node.js](https://img.shields.io/badge/node.js-14.x-green)
![Next.js](https://img.shields.io/badge/next.js-13-blue)
![TypeScript](https://img.shields.io/badge/typescript-4.9-blue)
![License: MIT](https://img.shields.io/badge/license-MIT-green)

## Live Demo

[https://faysmatta.vercel.app](https://faysmatta.vercel.app)  
![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black?logo=vercel)

## Public View

[https://faysmatta.com](https://faysmatta.com)  
![faysmatta](https://img.shields.io/badge/-Faysmatta-ff69b4?style=flat&logo=yarn&logoColor=white)


## Overview

Faysmatta is a handcrafted rag rug (trasmatta) e-commerce site built with Next.js and TypeScript. It showcases unique woven mats made from upcycled fabrics, combining traditional techniques with modern web design.

The site pulls product data dynamically from a Google Sheets CSV, displays an engaging gallery, and offers a contact/request form for interested buyers.

---

## Features

- **Dynamic product gallery** sourced from Google Sheets CSV parsed via PapaParse
- Responsive grid layout optimized for mobile and desktop
- Individual mat detail pages with product info and images
- “Request to Buy” form with real-time validation and server API integration
- Custom “Welcome / My Story” section telling the artisan’s journey
- User-friendly UI with accessible form inputs and smooth interactions

---

## Tech Stack

- **Next.js** (React framework for server/client rendering)
- **TypeScript** for type safety
- **PapaParse** for CSV parsing
- **Cloudinary** for image hosting
- Custom CSS with responsive grid layouts

---

## Setup & Installation

1. **Clone the repo:**

   ```bash
   git clone https://github.com/everettmakes/faysmatta.git
   cd faysmatta
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- Edit product data in the linked Google Sheets document to update mats.
- Upload images to your Cloudinary account and update the CSV accordingly.
- Customize styles in `styles.css` or use Tailwind/other frameworks if preferred.
- Extend the API route `/api/request-to-buy` to handle form submissions (e.g., send emails or store in a database).

---

## License

MIT License © 2025 Joshua Everett
