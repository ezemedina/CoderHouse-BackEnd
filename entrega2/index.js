const fs = require('fs');

class ProductManager {
    constructor(File) {
        this.file = File || 'file.txt';
    }

    getId() {
        let id = productID;
        productID++;
        return id;
    }

    addProduct(product) {
        
        if (product.title === undefined) throw new Error(`Error Title Undefined`);
        if (product.description === undefined) throw new Error(`Error description Undefined`);
        if (product.price === undefined) throw new Error(`Error price Undefined`);
        if (product.thumbnail === undefined) throw new Error(`Error thumbnail Undefined`);
        if (product.code === undefined) throw new Error(`Error code Undefined`);
        if (product.stock === undefined) throw new Error(`Error stock Undefined`);

        try {
            const contenido =  fs.readFileSync(this.file, "utf-8");
            let data = JSON.parse(contenido);
            let id = (data[(data.length-1)].id + 1);
            product.id = id;
            data.push(product);
            fs.writeFileSync(this.file, JSON.stringify(data));
            console.log("The product has been saved.");
        } catch (error) {
            let data = [];
            product.id = 1;
            data.push(product);
            fs.writeFileSync(this.file, JSON.stringify(data));
            console.log("The product has been saved.");
        }
    }

    getProducts() {
        try {
            const contenido =  fs.readFileSync(this.file, "utf-8");
            return JSON.parse(contenido);
        } catch {
            console.log("Error al abrir el file");
            return undefined;
        }
    }

    getProductById(id) {
        const contenido =  fs.readFileSync(this.file, "utf-8");
        let data = JSON.parse(contenido);
        let product = data.find(element => element.id === id)
        if (product === undefined) throw new Error('Not found');
        return product;
    }

    updateProduct(product) {
        if (product.id === undefined) throw new Error(`Error Id Undefined`);

        try {
            const contenido =  fs.readFileSync(this.file, "utf-8");
            let data = JSON.parse(contenido);
            let index = data.findIndex(element => element.id === product.id);
            data[index] = product
            fs.writeFileSync(this.file, JSON.stringify(data));
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }

    }

     deleteProduct(id) {
        try{
            const contenido =  fs.readFileSync(this.file, "utf-8");
            let data = JSON.parse(contenido).filter(function (element) {
                return element.id != id;
            });
            fs.writeFileSync(this.file, JSON.stringify(data));
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

let productC = {
    title: "Escritorio equipado",
    description: "Super escritorio equipado",
    price: 5000,
    thumbnail: "https://cdn1.iconfinder.com/data/icons/work-from-home-25/512/WorkFromHome_workspace-computer-desk-chair-256.png"
};

Manager.addProduct(productA);
Manager.addProduct(productB);
console.log(Manager.getProducts());
console.log(Manager.getProductById(1));

try {
    Manager.updateProduct(productA1);
} catch (error) {
    console.error(error.message);
}

console.log(Manager.getProducts());

Manager.deleteProduct(2);

console.log(Manager.getProducts());
