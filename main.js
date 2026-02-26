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
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
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
                .product-card {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 1rem;
                    text-align: center;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    box-sizing: border-box;
                }
                .product-card img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 4px;
                }
                h3 {
                    font-size: 1.2rem;
                    margin: 1rem 0 0.5rem;
                }
                p {
                    color: #555;
                    font-weight: bold;
                    margin: 0.5rem 0 1rem;
                }
                button {
                    background-color: var(--accent-color, #e44d26);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background-color 0.3s;
                }
                button:hover {
                    background-color: #333;
                }
            </style>
            <div class="product-card">
                <div>
                    <img src="${imageSrc}" alt="${name}">
                    <h3>${name}</h3>
                    <p>${price}</p>
                </div>
                <button>Add to Cart</button>
            </div>
        `;

        const button = shadow.querySelector('button');
        button.addEventListener('click', () => {
            addToCart(this.getAttribute('id'));
        });
    }
}

customElements.define('product-card', ProductCard);

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
});
