import { products } from './products.js';

const productGrid = document.querySelector('.product-grid');
const cartBadge = document.querySelector('.cart-badge');

let cart = [];

function renderProducts() {
    if (!productGrid) return;
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('product-card');
        productCard.dataset.productId = product.id; // Use dataset for easier access
        productCard.setAttribute('name', product.name);
        productCard.setAttribute('price', `$${product.price}`);
        productCard.setAttribute('image', product.image);
        productGrid.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartBadge();
        console.log('Cart:', cart); // For debugging
    }
}

function updateCartBadge() {
    if (cartBadge) {
        cartBadge.textContent = cart.length;
    }
}

// --- Web Components ---

class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const imageSrc = this.getAttribute('image');
        const name = this.getAttribute('name');
        const price = this.getAttribute('price');

        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; height: 100%; }
                .product-card {
                    background: #1f1f1f;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                    transition: transform 0.3s, border-color 0.3s;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .product-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--accent-color);
                }
                img {
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                }
                .card-content {
                    padding: 1.5rem;
                    text-align: left;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }
                h3 {
                    font-size: 1.2rem;
                    margin: 0 0 0.5rem 0;
                    color: var(--secondary-color);
                }
                p {
                    color: var(--accent-color);
                    font-weight: bold;
                    font-size: 1.1rem;
                    margin: 0 0 1rem 0;
                }
                button {
                    background-color: transparent;
                    color: var(--accent-color);
                    border: 2px solid var(--accent-color);
                    width: 100%;
                    padding: 0.75rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: 700;
                    text-transform: uppercase;
                    transition: all 0.3s;
                    margin-top: auto;
                }
                button:hover {
                    background-color: var(--accent-color);
                    color: var(--primary-color);
                }
            </style>
            <div class="product-card">
                <img src="${imageSrc}" alt="${name}">
                <div class="card-content">
                    <h3>${name}</h3>
                    <p>${price}</p>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            const productId = this.dataset.productId;
            addToCart(productId);
        });
    }
}

class AffiliateForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.2rem;
                    max-width: 600px;
                    margin: 2rem auto 0;
                    background: rgba(255, 255, 255, 0.03);
                    padding: 2.5rem;
                    border-radius: 15px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                input, textarea {
                    background: #1a1a1a;
                    border: 1px solid #333;
                    color: #fff;
                    padding: 1rem;
                    border-radius: 8px;
                    font-family: inherit;
                    font-size: 1rem;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: var(--accent-color);
                    box-shadow: 0 0 10px rgba(57, 255, 20, 0.2);
                }
                button {
                    background-color: var(--accent-color);
                    color: var(--primary-color);
                    border: none;
                    padding: 1.2rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: all 0.3s;
                    margin-top: 1rem;
                }
                button:hover {
                    background-color: var(--accent-hover);
                    color: var(--secondary-color);
                    transform: translateY(-2px);
                }
            </style>
            <form action="https://formspree.io/f/mbdabjdy" method="POST">
                <input type="text" name="name" placeholder="Your Full Name" required>
                <input type="email" name="email" placeholder="Your Email Address" required>
                <input type="text" name="subject" placeholder="Inquiry Subject" required>
                <textarea name="message" rows="5" placeholder="Your Message / Partnership Proposal" required></textarea>
                <button type="submit">Send Inquiry</button>
            </form>
        `;
    }
}

// --- Initialization ---

customElements.define('product-card', ProductCard);
customElements.define('affiliate-form', AffiliateForm);

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartBadge(); // Initial cart badge update
});
