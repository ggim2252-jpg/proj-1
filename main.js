class ProductCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const imageSrc = this.getAttribute('image');
        const name = this.getAttribute('name');
        const price = this.getAttribute('price');

        const card = document.createElement('div');
        card.setAttribute('class', 'product-card');

        const image = document.createElement('img');
        image.src = imageSrc;
        image.alt = name;

        const productName = document.createElement('h3');
        productName.textContent = name;

        const productPrice = document.createElement('p');
        productPrice.textContent = price;

        const style = document.createElement('style');
        style.textContent = `
            .product-card {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 1rem;
                text-align: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .product-card img {
                max-width: 100%;
                height: auto;
                border-radius: 4px;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(card);
        card.appendChild(image);
        card.appendChild(productName);
        card.appendChild(productPrice);
    }
}

customElements.define('product-card', ProductCard);

// Sample product data
const products = [
    {
        name: 'Classic White Tee',
        price: '$25',
        image: 'https://via.placeholder.com/250x250.png?text=White+Tee'
    },
    {
        name: 'Denim Jeans',
        price: '$75',
        image: 'https://via.placeholder.com/250x250.png?text=Denim+Jeans'
    },
    {
        name: 'Leather Jacket',
        price: '$150',
        image: 'https://via.placeholder.com/250x250.png?text=Leather+Jacket'
    },
    {
        name: 'Sneakers',
        price: '$100',
        image: 'https://via.placeholder.com/250x250.png?text=Sneakers'
    }
];

const productGrid = document.querySelector('.product-grid');

products.forEach(product => {
    const productCard = document.createElement('product-card');
    productCard.setAttribute('name', product.name);
    productCard.setAttribute('price', product.price);
    productCard.setAttribute('image', product.image);
    productGrid.appendChild(productCard);
});
