let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    saveCart();
    showNotification(`${product.name} telah ditambahkan ke keranjang!`);
}

// Remove from cart
function removeFromCart(productId) {
    const product = products.find(p => p.id === productId);
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
    showNotification(`${product.name} telah dihapus dari keranjang`);
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        updateCart();
        saveCart();
    }
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    const cartBadge = document.getElementById('cartBadge');
    
    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <p>Keranjang masih kosong</p>
                    <p style="margin-top: 10px; font-size: 14px;">Silakan tambahkan produk ke keranjang</p>
                </div>
            `;
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${formatPrice(item.price)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span style="font-weight: bold; min-width: 20px; text-align: center;">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">×</button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
        }
    }
    
    // Update total price
    if (totalPrice) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPrice.textContent = formatPrice(total);
    }
    
    // Update cart badge
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Keranjang belanja masih kosong!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Terima kasih! Pesanan sebesar ${formatPrice(total)} berhasil dibuat.`);
    
    cart = [];
    updateCart();
    saveCart();
    
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.add('hidden');
    }
    
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Open cart
function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.querySelector('.overlay');
    
    if (cartSidebar) {
        cartSidebar.classList.remove('hidden');
    }
    
    if (overlay) {
        overlay.classList.add('active');
    }
}

// Close cart
function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.querySelector('.overlay');
    
    if (cartSidebar) {
        cartSidebar.classList.add('hidden');
    }
    
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cartBtn');
    const closeCartBtn = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Create overlay if it doesn't exist
    if (!document.querySelector('.overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.addEventListener('click', closeCart);
        document.body.appendChild(overlay);
    }
    
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
    
    // Initial cart update
    updateCart();
});