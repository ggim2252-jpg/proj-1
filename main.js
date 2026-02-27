import { products } from './products.js';

const productGrid = document.querySelector('.product-grid');
const cartCount = document.getElementById('cart-count');
let cart = [];

function renderProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('product-card');
        productCard.setAttribute('id', product.id);
        productCard.setAttribute('name', product.name);
        productCard.setAttribute('price', `$${product.price}`);
        productCard.setAttribute('image', product.image);
        productGrid.appendChild(productCard);
    });
}

function updateCartCount() {
    if(cartCount){
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function addToCart(productId) {
    const productInCart = cart.find(item => item.id === productId);

    if (productInCart) {
        productInCart.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    updateCartCount();
    console.log('Cart:', cart);
}

class ProductCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const imageSrc = this.getAttribute('image');
        const name = this.getAttribute('name');
        const price = this.getAttribute('price');

        shadow.innerHTML = `
            <style>
                :host { 
                    display: block; 
                    height: 100%;
                }
                .product-card {
                    background: #1f1f1f;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                    transition: transform 0.3s;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    box-sizing: border-box;
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
                    <button>Add to Cart</button>
                </div>
            </div>
        `;

        const button = shadow.querySelector('button');
        button.addEventListener('click', () => {
            addToCart(this.getAttribute('id'));
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
                    gap: 1rem;
                    max-width: 500px;
                    margin: 2rem auto;
                }
                input {
                    background: #2a2a2a;
                    border: 1px solid #444;
                    color: #fff;
                    padding: 0.8rem;
                    border-radius: 5px;
                }
                button {
                    background-color: var(--accent-color);
                    color: var(--primary-color);
                    border: none;
                    padding: 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: 700;
                    text-transform: uppercase;
                    transition: all 0.3s;
                }
                button:hover {
                    background-color: var(--accent-hover);
                    color: var(--secondary-color);
                }
            </style>
            <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
                <input type="text" name="name" placeholder="Your Name" required>
                <input type="email" name="email" placeholder="Your Email" required>
                <input type="text" name="social_media" placeholder="Your Social Media Handle (e.g., @yourstyle)" required>
                <button type="submit">Apply Now</button>
            </form>
        `;
    }
}

customElements.define('product-card', ProductCard);
customElements.define('affiliate-form', AffiliateForm);

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
});