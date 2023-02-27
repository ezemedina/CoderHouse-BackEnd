let products = [];
let productID = products.length

class ProductManager {
    constructor() {}

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

        products.forEach(element => {
            if (element.code === product.code) {
                throw new Error(`Error the code alredy exist with the ID ${element.id}`);
            }
        });

        product.id = this.getId();

        products.push(product);
        return product;
    }

    getProducts() {
        return products;
    }

    getProductById(id) {
        let product = products.find(element => element.id === id)
        if (product === undefined) throw new Error('Not found');
        return product;
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


// Expected error duplicated code
try {
    Manager.addProduct(productA); 
} catch (error) {
    console.error(error.message);
}

// Expected error undefined item
try {
    Manager.addProduct(productC); 
} catch (error) {
    console.error(error.message);
}

// Expected an array with products
console.log(Manager.getProducts());

// Expected productB
console.log(Manager.getProductById(1));

// Expercted error not found
try {
    Manager.getProductById(5);
} catch (error) {
    console.error(error.message);
}