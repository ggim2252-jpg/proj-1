# Project Overview: Modern Clothiers

Modern Clothiers is a premium, framework-less web application designed for a modern clothing brand. It features a bold, high-contrast aesthetic with neon green accents on a dark, immersive background.

## Current Features & Design

### Aesthetics
- **Theme:** Dark Mode with Neon Green (`#25ff14`) accents.
- **Background:** Immersive fixed background image with a dark overlay for a premium feel and optimal readability.
- **Typography:** 'Montserrat' for headings and 'Poppins' for body text.
- **Visuals:** High-resolution product images (clothes and shoes), glassmorphism UI elements, and smooth hover animations.

### Components
- **Navigation Bar:** 
    - Sticky header with links (Home, Shop, Inquiry, About, Contact).
    - **Integrated Search & Cart:** Features a search icon and a sleek cart status pill (count and total price).
- **Shopping Cart Modal:**
    - Interactive modal that displays all items added to the cart.
    - Features include item removal, real-time total calculation, and a checkout button.
- **Product Grid:**
    - Custom `product-card` Web Components showcasing premium clothes and shoes.
    - **No Null Values:** All components use `connectedCallback` to ensure data is properly rendered from attributes.
    - **Pricing:** All items are priced between $50.00 and $80.00.
- **Product Filtering (Search):**
    - Functional search feature that filters the product grid in real-time.
- **Affiliate Inquiry Space:**
    - Dedicated partnership section with a professional inquiry form.
- **Customer Feedback (Disqus):**
    - Integrated Disqus comment thread at the bottom of the page.
- **Professional Footer:**
    - Comprehensive footer with about text, quick links, and contact information.

## Technical Implementation
- **Frontend:** HTML5, CSS3, Modern JavaScript (ES Modules, Custom Elements, Shadow DOM).
- **External Integrations:**
    - **Disqus:** For community comments.
    - **Formspree:** For partnership inquiry handling.
    - **Icons8:** For iconography.
    - **Unsplash:** For high-quality background and product imagery.

## Recent Changes (February 27, 2026)
- **Fixed 'null' rendering:** Refactored `ProductCard` to use `connectedCallback`, ensuring attributes are loaded before rendering.
- **Data Cleanup:** Verified `products.js` has no missing images or prices.
- **Price Range Compliance:** Set all product prices within the requested $50-$80 range.
- **Visual Refinement:** Updated product imagery to high-quality clothes and shoes.
- **GitHub Sync:** All latest changes committed and pushed to the repository.
