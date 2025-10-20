// Data carousel - menggunakan file foto asli
const carouselSlides = [
    {
        image: './image/bg1.png',
        title: 'WELCOME to my store',
    },  
    {
        image: './image/bg2.jpg',
        title: 'Teknologi Terbaru 2025',
        description: 'Temukan inovasi terbaru dalam dunia elektronik dengan kualitas premium'
    },
    {
        image: './image/bg3.jpg',
        title: 'Garansi Resmi 2 Tahun',
        description: 'Nikmati ketenangan berbelanja dengan garansi resmi dari distributor terpercaya'
    }
];

// Data produk dengan foto asli
const products = [
    { 
        id: 1, 
        name: 'SAMSUNG Smart LED TV 43 Inch', 
        category: 'TV', 
        price: 5700000, 
        image: './image/tv.jpg', 
        rating: 4.8, 
        stock: 15, 
    },
    { 
        id: 2, 
        name: 'SHARP Aquos 55 inch', 
        category: 'TV', 
        price: 6999000, 
        image: './image/tvsharp.jpg', 
        rating: 4.7, 
        stock: 20, 
    },
    { 
        id: 3, 
        name: 'JBL Xtreme 3', 
        category: 'Sound', 
        price: 139000, 
        image: './image/jbl.webp', 
        rating: 4.9, 
        stock: 8, 
    },
    { 
        id: 4, 
        name: 'JBL EON208P', 
        category: 'Sound', 
        price: 2499000, 
        image: './image/jbleon.jpg', 
        rating: 4.6, 
        stock: 12, 
    },
    { 
        id: 5, 
        name: 'ANTENA TV Digital', 
        category: 'Antena', 
        price: 129000, 
        image: './image/antena1.png', 
        rating: 4.5, 
        stock: 25, 
    },
    { 
        id: 6, 
        name: 'K-VISION ANTENA PARABOLA', 
        category: 'Antena', 
        price: 279000, 
        image: './image/antena2.jpg', 
        rating: 4.4, 
        stock: 30, 
    },
    { 
        id: 7, 
        name: 'AC SAMSUNG 1/2 PK', 
        category: 'AC', 
        price: 2699000, 
        image: './image/acsamsung.jpg', 
        rating: 4.9, 
        stock: 5, 
    },
    { 
        id: 8, 
        name: 'AC AKARI Turbo Cool 1 PK', 
        category: 'AC', 
        price: 2499000, 
        image: './image/acakari.jpg', 
        rating: 4.7, 
        stock: 7, 
    },
    { 
        id: 9, 
        name: 'SHARP 2 Tabung', 
        category: 'Mesin Cuci', 
        price: 1199000, 
        image: './image/mcsharp.jpg', 
        rating: 4.8, 
        stock: 40, 
    },
    { 
        id: 10, 
        name: 'TOSHIBA 2 Tabung', 
        category: 'Mesin Cuci', 
        price: 1399000, 
        image: './image/mctoshiba.jpg', 
        rating: 4.6, 
        stock: 35, 
    },
    { 
        id: 11, 
        name: 'LG Kulkas 2 pintu', 
        category: 'Kulkas', 
        price: 4999000, 
        image: './image/kulkaslg.jpg', 
        rating: 4.8, 
        stock: 10, 
    },
    { 
        id: 12, 
        name: 'POLYTRON Kulkas 2 pintu', 
        category: 'Kulkas', 
        price: 3499000, 
        image: './image/kulkaspolytron.jpg', 
        rating: 4.7, 
        stock: 12, 
    }
];

// Data kategori sesuai dengan data produk asli
const categories = [
    { id: 'all', name: 'Semua Produk' },
    { id: 'TV', name: 'TV' },
    { id: 'Sound', name: 'Sound' },
    { id: 'AC', name: 'AC' },
    { id: 'Kulkas', name: 'Kulkas' },
    { id: 'Mesin Cuci', name: 'Mesin Cuci' },
    { id: 'Antena', name: 'Antena' }
];

// State aplikasi
let currentCategory = 'all';
let currentSlide = 0;
let carouselInterval;

// Format harga ke Rupiah
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Initialize carousel
function initCarousel() {
    const carouselContainer = document.getElementById('carouselContainer');
    const carouselDots = document.getElementById('carouselDots');
    
    if (!carouselContainer || !carouselDots) return;
    
    carouselSlides.forEach((slide, index) => {
        // Create slide
        const slideElement = document.createElement('div');
        slideElement.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slideElement.style.backgroundImage = `url('${slide.image}')`;
        
        const contentElement = document.createElement('div');
        contentElement.className = 'carousel-content';
        contentElement.innerHTML = `
            <h2>${slide.title}</h2>
            ${slide.description ? `<p>${slide.description}</p>` : ''}
            <button class="shop-now-btn" onclick="showNotification('Selamat datang di RandikaElektro!')">Belanja Sekarang</button>
        `;
        
        slideElement.appendChild(contentElement);
        carouselContainer.appendChild(slideElement);
        
        // Create dot
        const dotElement = document.createElement('div');
        dotElement.className = `dot ${index === 0 ? 'active' : ''}`;
        dotElement.addEventListener('click', () => goToSlide(index));
        carouselDots.appendChild(dotElement);
    });

    // Auto slide change
    carouselInterval = setInterval(nextSlide, 5000);
}

// Navigate to specific slide
function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Next slide
function nextSlide() {
    const nextIndex = (currentSlide + 1) % carouselSlides.length;
    goToSlide(nextIndex);
}

// Previous slide
function prevSlide() {
    const prevIndex = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    goToSlide(prevIndex);
}

// Initialize categories
function initCategories() {
    const categoryList = document.getElementById('categoryList');
    if (!categoryList) return;
    
    categoryList.innerHTML = '';
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = `category-btn ${category.id === 'all' ? 'active' : ''}`;
        button.textContent = category.name;
        button.addEventListener('click', () => selectCategory(category.id));
        categoryList.appendChild(button);
    });
}

// Select category
function selectCategory(categoryId) {
    currentCategory = categoryId;
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter and display products
    filterProducts();
}

// Filter products based on category and search
function filterProducts() {
    let filteredProducts = products;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
    }
    
    // Filter by search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
            );
        }
    }
    
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        displayProducts(filteredProducts, productsGrid);
    }
}

// Display products in grid
function displayProducts(productsArray, gridElement) {
    gridElement.innerHTML = '';
    
    if (productsArray.length === 0) {
        gridElement.innerHTML = '<div class="no-products" style="color: white; text-align: center; padding: 40px;">Tidak ada produk yang ditemukan</div>';
        return;
    }
    
    productsArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span>${product.rating} | Stok: ${product.stock}</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        🛒 + Keranjang
                    </button>
                </div>
            </div>
        `;
        gridElement.appendChild(productCard);
    });
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    
    if (notification && notificationMessage) {
        notificationMessage.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Clean up interval when page is unloaded
window.addEventListener('beforeunload', () => {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
});

// Event listeners for carousel navigation
document.addEventListener('DOMContentLoaded', function() {
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    
    if (carouselPrev) {
        carouselPrev.addEventListener('click', prevSlide);
    }
    
    if (carouselNext) {
        carouselNext.addEventListener('click', nextSlide);
    }
});