export default class CartModel {
    constructor() {
        this.data = { cart: [] };
    }

    addToCart(item) 
        {this.data.cart.push(item);}

    getCartItems() 
        {return this.data.cart;}

    getTotalPrice() 
        {return this.data.cart.reduce((total, item) => total + item.resell_price, 0).toFixed(2);}
}