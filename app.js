// Create Product Objects
class Product {
    constructor(title, price, description, image) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
    }

    // Create Product Cards
    // [Note]:  data-id="${id}"     ---> Stores the Product's ID in HTML
    render(id) { 
        return ` 
            <div class="card" data-id="${id}">
                <img src="${this.image}" alt="${this.title}">
                <h3>${this.title}</h3>
                <p>${this.description}</p>
                <p><strong>Price:</strong> $${this.price}</p>
                <button class="update-btn">Update</button>
                <button class="delete-btn">Delete</button>
            </div>`;
    } 
}

const productContainer = document.getElementById("product-container");

// Fetch Products
async function fetchProducts() {
    try {
    const response = await fetch("https://67855e481ec630ca33a85e27.mockapi.io/products");
    const products = await response.json();

    // Render Products
    products.map((productData) => {
        const product = new Product(
            productData.title,
            productData.price,
            productData.description,
            productData.image
        );
        productContainer.innerHTML += product.render(productData.id);
    });
    
    } catch (error) {
    console.error("Error fetching products:", error);
    }
}

fetchProducts();

// Create New Product
async function createProduct() {
    const newProduct = {
        title: "New Product",
        price: 19.99,
        description: "This is a new product.",
        image: "https://picsum.photos/200/300"
    };

    try {
        const response = await fetch('https://67855e481ec630ca33a85e27.mockapi.io/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
        });

        const product = await response.json();
        console.log('Product created:', product);
        productContainer.innerHTML = "";
        fetchProducts();
    } catch (error) {
        console.error('Error creating product:', error);
    }
}

// Update Product
async function updateProduct(id) {
    const updatedData = {
        title: "Updated Product Title",
        price:"0.0"
    };

    try {
        const response = await fetch(`https://67855e481ec630ca33a85e27.mockapi.io/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        const updatedProduct = await response.json();
        console.log('Product updated:', updatedProduct);

        // Dynamic Update the title in the DOM
        const productCard = document.querySelector(`[data-id="${id}"]`);
        productCard.querySelector('h3').textContent = updatedData.title;
    } catch (error) {
        console.error('Error updating product:', error);
    }
}


async function deleteProduct(id) {
    try {
        const response = await fetch(`https://67855e481ec630ca33a85e27.mockapi.io/products/${id}`, {
            method: 'DELETE',
        });
        console.log('Product deleted:', await response.json());
        
        // Dynamic Delete the Product in the DOM
        document.querySelector(`[data-id="${id}"]`).remove();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

 // Listening for Dynamic Buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('update-btn')) {
        const productId = e.target.parentElement.dataset.id;
        updateProduct(productId);
    }

    if (e.target.classList.contains('delete-btn')) {
        const productId = e.target.parentElement.dataset.id;
        deleteProduct(productId);
    }
});

 // Listening for static Button
document.getElementById("add-item-btn").addEventListener("click", () => {
    createProduct();
});


