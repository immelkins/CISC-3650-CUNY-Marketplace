import { searchListener } from './results.js';
import Model from "./updatedlist.js";
import ShoppingModel from './updatedshoppingcart.js';

searchListener();

document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById("cart-content");
    const model = new Model(); // This will be used to fetch full item details
    const shoppingCart = new ShoppingModel();

    // Function to generate and render the cart HTML
    function generateCartHTML() {
        // Check if the shopping cart is empty
        if (shoppingCart.data.results.length == 0) {
            cartContainer.innerHTML = `
        <div class="cart-header">
            <h1>Your Shopping Cart</h1>
            <div class="cart-subheader">
            <span class="item-count">0 items</span>
            <a href="#" class="deselect-all">Deselect all items</a>
            </div>
        </div>

        <div class="cart-items">
            <div class="empty-cart-message">
            <div class="empty-cart-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Browse our marketplace to find supplies</p>
            <a href="./categories.html" class="browse-btn homepage-container">Browse Marketplace</a>
            </div>
        </div>

        <div class="cart-subtotal">
            <span>Subtotal (<span class="subtotal-count">0</span> items):</span>
            <span class="subtotal-price">$0.00</span>
        </div>
        `;
        }
        else {
            let cartItemsHTML = '';
            let subtotal = 0;

            // Loop through the items in the shopping cart
            shoppingCart.data.results.forEach(cartItem => {
                const fullItem = model.getById(cartItem.itemID);

                if (fullItem) {
                    const itemHTML = `
                    <div class="cart-item">
                        <div class="item-image">
                            <img src="${fullItem.image_url[0]}" alt="${fullItem.title}">
                        </div>
                        <div class="item-info">
                            <h4>${fullItem.title}</h4>
                            <p>${fullItem.description[0]}</p>
                            <span class="item-price">$${fullItem.resell_price}</span>
                            <span class="item-quantity">Quantity: ${cartItem.quantity}</span>
                        </div>
                        <button class="remove-item browse-btn homepage-container" data-item-id="${fullItem.itemID}">Remove</button>
                    </div>
                `;
                    cartItemsHTML += itemHTML;
                    subtotal += fullItem.resell_price;
                }
            });

            // Insert the cart items into the cart container
            cartContainer.innerHTML = `
        <div class="cart-header">
            <h1>Your Shopping Cart</h1>
            <div class="cart-subheader">
                <span class="item-count">${shoppingCart.data.results.length} items</span>
            </div>
        </div>

        <div class="cart-items">
            ${cartItemsHTML}
        </div>

        <div class="cart-subtotal">
            <span>Subtotal (<span class="subtotal-count">${shoppingCart.data.results.length}</span> items):</span>
            <span class="subtotal-price">$${subtotal.toFixed(2)}</span>
        </div>
        `;
        }

        // Add event listener for removing items
        const removeButtons = cartContainer.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const itemId = event.target.getAttribute('data-item-id');
                removeItemFromCart(itemId);
            });
        });
    }

    function removeItemFromCart(itemID) {
        const index = shoppingCart.data.results.findIndex(item => item.itemID == itemID);

        if (index !== -1) {
            shoppingCart.data.results.splice(index, 1);
            localStorage.setItem(shoppingCart.localStorageKey, JSON.stringify(shoppingCart.data.results));
            generateCartHTML();
        }
    }

    generateCartHTML();
});
