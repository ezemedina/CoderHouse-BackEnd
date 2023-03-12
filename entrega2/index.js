const fs = require('fs');

class ProductManager {
    constructor(File) {
        this.file = File || 'file.txt';
    }

    async addProduct(product) {
        
        if (product.title === undefined) throw new Error(`Error Title Undefined`);
        if (product.description === undefined) throw new Error(`Error description Undefined`);
        if (product.price === undefined) throw new Error(`Error price Undefined`);
        if (product.thumbnail === undefined) throw new Error(`Error thumbnail Undefined`);
        if (product.code === undefined) throw new Error(`Error code Undefined`);
        if (product.stock === undefined) throw new Error(`Error stock Undefined`);

        try {
            const content = await fs.promises.readFile(this.file, "utf-8");
            let data = JSON.parse(content);
            let id = (data[(data.length-1)].id + 1);
            product.id = id;
            data.push(product);
            await fs.writeFileSync(this.file, JSON.stringify(data));
            console.log("The product has been saved.");
        } catch (error) {
            let data = [];
            product.id = 1;
            data.push(product);
            await fs.promises.writeFile(this.file, JSON.stringify(data));
            console.log("The product has been saved.");
        }
    }

    async getProducts() {
        try {
            const content =  await fs.promises.readFile(this.file, "utf-8");
            let data = JSON.parse(content);
            return data;
        } catch(error) {
            console.log(error.message);
            return undefined;
        }
    }

    async getProductById(id) {
        const content = await fs.promises.readFile(this.file, "utf-8");
        let data = JSON.parse(content);
        let product = data.find(element => element.id === id)
        if (product === undefined) throw new Error('Not found');
        return product;
    }

    async updateProduct(product) {
        if (product.id === undefined) throw new Error(`Error Id Undefined`);

        try {
            const content = await fs.promises.readFile(this.file, "utf-8");
            let data = JSON.parse(content);
            let index = data.findIndex(element => element.id === product.id);
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


const Manager = new ProductManager();

let productA = {
    title: "casita",
    description: "casita",
    price: 1000,
    thumbnail: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678085-house-256.png",
    code: "SKU#381",
    stock: 1
};

let productA1 = {
    title: "casita",
    description: "casita",
    price: 1000,
    thumbnail: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678085-house-256.png",
    code: "SKU#388",
    stock: 70,
    id: 1
};

let productB = {
    title: "Lampara inteligente",
    description: "Super lampara inteligente",
    price: 1000,
    thumbnail: "https://cdn2.iconfinder.com/data/icons/artificial-intelligence-6/64/ArtificialIntelligence24-256.png",
    code: "SKU#45667",
    stock: 1
};


new Promise(async () => {
    console.log("Adding products");
    await Manager.addProduct(productA);
    await Manager.addProduct(productB);

    console.log("Get all products");
    console.log( await Manager.getProducts());

    console.log("Get product by id");
    console.log( await Manager.getProductById(1));

    try {
        console.log("Updating Product");
        await Manager.updateProduct(productA1);
    } catch (error) {
        console.error(error.message);
    }

    console.log("Get all products");
    console.log( await Manager.getProducts());

    console.log("Delete Product by ID");
    await Manager.deleteProduct(2);

    console.log("Get all products");
    console.log( await Manager.getProducts());
});