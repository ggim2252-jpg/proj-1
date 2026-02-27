# Project Overview: Modern Clothiers

Modern Clothiers is a bold and vivid framework-less web application designed for a premium clothing brand. It features a high-contrast aesthetic with neon green accents on a dark background.

## Current Features & Design

### Aesthetics
- **Theme:** Dark Mode with Neon Green (`#39ff14`) and Neon Pink (`#ff143c`) highlights.
- **Typography:** Uses 'Montserrat' for headings and 'Poppins' for body text.
- **Visuals:** High-quality imagery, glassmorphism navigation, and bold shadows.

### Components
- **Navigation Bar:** 
    - Sticky header with links (Home, Shop, Inquiry, About, Contact).
    - **Header Cart Status:** Displays a cart icon with a count badge and the total price (e.g., $0.00) integrated into a sleek status pill.
- **Affiliate Inquiry Space:**
    - A dedicated section (`#affiliate`) for partnership proposals.
    - Uses a custom `affiliate-form` Web Component.
    - Integrated with Formspree (`https://formspree.io/f/mykdoonl`) for message handling.
- **Product Grid:** Dynamically rendered product cards with "Add to Cart" functionality.

## Technical Implementation
- **Frontend:** HTML5, CSS3, Modern JavaScript (ES Modules, Custom Elements).
- **Backend:** Firebase (Firestore integration ready).
- **Forms:** Formspree for serverless form handling.

## Recent Changes (February 26, 2026)
- **Moved Cart & Total to Header:** Relocated the cart status (count and dollar amount) to the sticky header for better visibility.
- **Refined Affiliate Inquiry Section:** Created a more comprehensive inquiry space with a polished form and descriptive text.
- **Updated Formspree Integration:** Ensured the correct Formspree endpoint is used for all partnership inquiries.
- **Codebase Sync:** Latest changes committed and pushed to GitHub.
