const fs = require('fs');

class CartManager {

    constructor(File) {
        this.file = File || 'Carts.json';
    }

    async createCart() {
        try {
            const content = await fs.promises.readFile(this.file, "utf-8");
            let carts = JSON.parse(content);
            let id = (carts[(carts.length-1)].id + 1);
            cart = {
                id: id,
                products: []
            };
            carts.push(cart);
            await fs.promises.writeFile(this.file, JSON.stringify(carts));
            return (cart);
        } catch (error) {
            let carts = [];
            cart = {
                id: 1,
                products: []
            };
            carts.push(cart);
            await fs.promises.writeFile(this.file, JSON.stringify(carts));
            return (cart);
        }
    }

    async addProduct(cartID,productID, productQty) {
        try {
            let product = {
                id: productID,
                quantity: productQty
            };
            const content = await fs.promises.readFile(this.file, "utf-8");
            let carts = JSON.parse(content);
            let index = carts.findIndex(element => element.id === cartID);
            if ( index === -1 )  throw new Error('Error cart not found');
            cart = carts[index];
            cart.products.push(product);
            await fs.promises.writeFile(this.file, JSON.stringify(data));
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    async getCartProducts(cartID) {
        const content = await fs.promises.readFile(this.file, "utf-8");
        let carts = JSON.parse(content);
        let cart = carts.find(element => element.id === cartID)
        if (cart === undefined) throw new Error('Not found');
        return cart.products;
    }

}

module.exports = CartManager;