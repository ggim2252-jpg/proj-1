import { products } from './products.js';

const productGrid = document.querySelector('.product-grid');
const cartBadge = document.querySelector('.cart-badge');
const cartTotalHeader = document.getElementById('cart-total-header');
const cartModal = document.getElementById('cart-modal');
const cartIcon = document.querySelector('.cart-status-header');
const closeModal = document.querySelector('.close-modal');
const cartItemsContainer = document.getElementById('cart-items-container');
const modalCartTotal = document.getElementById('modal-cart-total');
const searchIcon = document.querySelector('img[alt="Search"]');

let cart = [];

function renderProducts(filteredProducts = products) {
    if (!productGrid) return;
    productGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = document.createElement('product-card');
        productCard.dataset.productId = product.id;
        productCard.setAttribute('name', product.name);
        productCard.setAttribute('price', `$${product.price.toFixed(2)}`);
        productCard.setAttribute('image', product.image);
        productGrid.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push({ ...product, cartId: Date.now() }); // Unique cartId for removal
        updateCartStatus();
        renderCartItems();
    }
}

function removeFromCart(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    updateCartStatus();
    renderCartItems();
}

function updateCartStatus() {
    if (cartBadge) {
        cartBadge.textContent = cart.length;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const formattedTotal = `$${total.toFixed(2)}`;
    
    if (cartTotalHeader) cartTotalHeader.textContent = formattedTotal;
    if (modalCartTotal) modalCartTotal.textContent = formattedTotal;
}

function renderCartItems() {
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-item" data-cart-id="${item.cartId}">Remove</button>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartId = parseInt(e.target.dataset.cartId);
            removeFromCart(cartId);
        });
    });
}

// --- Event Listeners ---

if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
        renderCartItems();
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Basic Search Functionality
if (searchIcon) {
    searchIcon.addEventListener('click', () => {
        const query = prompt("Search for products:");
        if (query !== null) {
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(query.toLowerCase())
            );
            renderProducts(filtered);
            if (filtered.length === 0) {
                alert("No products found matching your search.");
                renderProducts(products);
            }
        }
    });
}

// --- Web Components ---

class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const imageSrc = this.getAttribute('image') || '';
        const name = this.getAttribute('name') || 'Product';
        const price = this.getAttribute('price') || '$0.00';

        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; height: 100%; }
                .product-card {
                    background: #111;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    border: 1px solid rgba(255,255,255,0.05);
                    position: relative;
                }
                .product-card:hover {
                    transform: translateY(-10px);
                    border-color: var(--accent-color);
                    box-shadow: 0 20px 40px rgba(37, 255, 20, 0.15);
                }
                .image-container {
                    width: 100%;
                    height: 350px;
                    overflow: hidden;
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }
                .product-card:hover img {
                    transform: scale(1.1);
                }
                .card-content {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }
                h3 {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 1.1rem;
                    margin: 0 0 0.5rem 0;
                    color: #fff;
                    letter-spacing: 0.5px;
                }
                p {
                    color: var(--accent-color);
                    font-weight: 800;
                    font-size: 1.25rem;
                    margin: 0 0 1.5rem 0;
                }
                button {
                    background-color: transparent;
                    color: var(--accent-color);
                    border: 2px solid var(--accent-color);
                    width: 100%;
                    padding: 0.8rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: all 0.3s;
                    margin-top: auto;
                }
                button:hover {
                    background-color: var(--accent-color);
                    color: #000;
                    box-shadow: 0 0 15px rgba(37, 255, 20, 0.4);
                }
            </style>
            <div class="product-card">
                <div class="image-container">
                    <img src="${imageSrc}" alt="${name}">
                </div>
                <div class="card-content">
                    <h3>${name}</h3>
                    <p>${price}</p>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            const productId = this.getAttribute('id') || this.dataset.productId;
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
    updateCartStatus();
});
