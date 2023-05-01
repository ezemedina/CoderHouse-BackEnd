const fs = require('fs');

class ProductManager {

    constructor(File) {
        this.file = File || 'Products.json';
    }

    async addProduct(product) {
        
        if (product.title === undefined) throw new Error(`Error Title Undefined`);
        if (product.description === undefined) throw new Error(`Error description Undefined`);
        if (product.price === undefined) throw new Error(`Error price Undefined`);
        if (product.code === undefined) throw new Error(`Error code Undefined`);
        if (product.stock === undefined) throw new Error(`Error stock Undefined`);

        try {
            const content = await fs.promises.readFile(this.file, "utf-8");
            let data = JSON.parse(content);
            let id = (data[(data.length-1)].id + 1);
            product.id = id;
            data.push(product);
            await fs.promises.writeFile(this.file, JSON.stringify(data));
            return (`The product has been saved.`);
        } catch (error) {
            let data = [];
            product.id = 1;
            data.push(product);
            await fs.promises.writeFile(this.file, JSON.stringify(data));
            return (`The product has been saved.`);
        }
    }

    async getProducts() {
        try {
            const content = await fs.promises.readFile(this.file, "utf-8");
            let data = JSON.parse(content);
            return data;
        } catch(error) {
            let data = []
            return data;
        }
    }

    async getProductById(id) {
        const content = await fs.promises.readFile(this.file, "utf-8");
        let data = JSON.parse(content);
        let product = data.find(element => element.id === id)
        if (product === undefined) throw new Error('Not found');
        return product;
    }

    async updateProduct(id,product) {
        try {
            const content = await fs.promises.readFile(this.file, "utf-8");
            let data = JSON.parse(content);
            let index = data.findIndex(element => element.id === id);
            if ( index === -1 )  throw new Error('Errorm ID not found');
            data[index] = product
            await fs.promises.writeFile(this.file, JSON.stringify(data));
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }

    }

     async deleteProduct(id) {
        try{
            const content = await fs.promises.readFile(this.file, "utf-8");
            let data = JSON.parse(content).filter(function (element) {
                return element.id != id;
            });
            await fs.promises.writeFile(this.file, JSON.stringify(data));
            console.log(`ID ${id} has been deleted`);
            return true;
        } catch (error) {
            throw new Error(`Error the code alredy exist with the ID ${element.id}`);
        }
    }
}

module.exports = ProductManager;