export default class ShoppingModel {
    constructor() {
        this.localStorageKey = 'customShopping';
        this.data = {
            results: [

            ],
        };
        this.loadCart();
    }

    loadCart() {
        const savedCart = localStorage.getItem(this.localStorageKey);
        if (savedCart) {
            try {
                this.data.results = JSON.parse(savedCart); // Set cart to saved data
            } catch (err) {
                console.error('Error parsing saved cart data:', err);
                this.data.results = []; // Reset cart if there is an error
            }
        }
    }

    addToCart(itemID) {
            this.data.results.push({ itemID });
            this.saveCart(); // Save updated cart to localStorage
    }

    removeFromCart(itemID) {
        const index = this.data.results.findIndex(item => item.itemID === itemID);
        if (index !== -1) {
            this.data.results.splice(index, 1);
            this.saveCart(); // Save updated cart to localStorage
        }
    }

    saveCart() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.data.results));
    }

    getCartItems() {
        return this.data.results;
    }
}
