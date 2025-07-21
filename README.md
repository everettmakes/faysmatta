# Faysmatta – Handwoven Rag Rugs Website

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
   git clone https://github.com/yourusername/faysmatta.git
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
