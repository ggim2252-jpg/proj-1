# Project Overview: Modern Clothiers

Modern Clothiers is a premium, framework-less web application designed for a modern clothing brand. It features a vibrant, high-contrast aesthetic using neon green accents on a dark background, providing a premium and tactile feel.

## Current Features & Design

### Aesthetics
- **Color Palette:** Near-black backgrounds (`#1a1a1a`, `#2a2a2a`) with vibrant neon green accents (`#39ff14`).
- **Typography:** Uses the 'Poppins' font family for a clean and professional look.
- **Visual Effects:** Subtle noise texture on the background, multi-layered drop shadows for depth, and neon glow effects on interactive elements.
- **Responsiveness:** Fully responsive design that adapts to various screen sizes.

### Components
- **Navigation Bar:** Sticky header with a glassmorphism effect (backdrop-filter: blur), featuring links for Home, Shop, Partnership, About, and Contact.
- **Hero Section:** High-impact section with a bold headline and a "Shop Now" call-to-action button.
- **Product Grid:** Dynamically populated grid of featured products using a custom `product-card` Web Component.
- **Shopping Cart:** Interactive cart icon with a live count badge. (Modal functionality pending full implementation).
- **Affiliate Program Form:** A specialized section for potential partners to apply.
    - **Implementation:** Custom `affiliate-form` Web Component.
    - **Integration:** Powered by Formspree (`https://formspree.io/f/mykdoonl`) for seamless form submissions.
    - **Fields:** Full Name, Email Address, Social Media/Website URL, and a partnership message.

## Technical Implementation

### Frontend
- **HTML5:** Semantic structure with custom elements.
- **CSS3 (Baseline):** Container queries, CSS variables, logical properties, and modern color spaces.
- **Modern JavaScript:** ES Modules, Custom Elements (Web Components), and Shadow DOM for encapsulation.
- **Firebase:** Integrated for future backend functionality (Firestore).

### External Integrations
- **Formspree:** Used for handling affiliate application submissions.
- **Google Fonts:** Providing the Poppins typeface.
- **Icons8:** Providing clean, consistent iconography.

## Recent Changes (February 26, 2026)
- **Added Affiliate Program Form:** Created the `affiliate-form` Web Component and integrated it with Formspree endpoint `https://formspree.io/f/mykdoonl`.
- **Navigation Update:** Added a "Partnership" link to the main navigation that scrolls to the affiliate section.
- **Cart UI Enhancement:** Implemented a persistent cart count badge on the navigation bar.
- **Codebase Sync:** Uploaded all project files to the GitHub repository at `https://github.com/ggim2252-jpg/proj-1`.
