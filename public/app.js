document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
});

document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const productName = document.getElementById('product-name').value;
    const productDescription = document.getElementById('product-description').value;
    const productSize = document.getElementById('product-size').value;
    const productPrice = parseFloat(document.getElementById('product-price').value);
    const productQuantity = parseInt(document.getElementById('product-quantity').value);

    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: productName,
            description: productDescription,
            size: productSize,
            price: productPrice,
            quantity: productQuantity
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto agregado:', data);
        fetchProducts(); // Actualiza la lista de productos después de agregar uno nuevo
    })
    .catch(error => console.error('Error:', error));

    document.getElementById('product-form').reset();
});

function fetchProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Limpia la lista antes de agregar los productos
            data.products.forEach(product => {
                const listItem = document.createElement('li');
                listItem.textContent = `${product.name} - ${product.description} - Talle: ${product.size} - Precio: $${product.price} - Cantidad: ${product.quantity}`;
                productList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error al obtener productos:', error));
} 