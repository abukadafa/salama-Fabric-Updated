/**
 * SALAMA Fabrics & Bedding - Application Logic
 * Modern, accessible e-commerce application with LocalStorage cart, Paystack, Flutterwave, and POD
 */

// Payment Gateway Configuration
// Note: These are public client keys for checkout modal popups. Replace with your live keys anytime.
const PAYMENT_CONFIG = {
  paystackPublicKey: "pk_test_d34d852033c467a84e9c7ea1b5853bca512f458e",
  flutterwavePublicKey: "FLWPUBK_TEST-5f80b2a759160d5b74c8c7f9-X",
  businessName: "SALAMA Fabrics & Bedding",
  businessLogo: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=150&q=80",
  whatsappNumber: "2348147709019",
  bankDetails: {
    bankName: "Guaranty Trust Bank (GTBank)",
    accountName: "SALAMA Fabrics & Bedding Ltd",
    accountNumber: "0147709019"
  }
};

// Application State
const AppState = {
  activeCategory: "all",
  sortBy: "featured",
  searchQuery: "",
  cart: [],
  selectedPaymentMethod: "paystack",
  selectedProductForModal: null,
  modalSelectedColor: null,
  modalSelectedSize: null,
  modalQuantity: 1
};

// SVG Placeholder Fallback in case external image fails
const FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23071D40%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23B58A22%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22url(%23g)%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23F3EBDD%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%3ESALAMA%20FABRICS%3C%2Ftext%3E%3C%2Fsvg%3E";

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  initCart();
  initCategoryTabs();
  initSortSelector();
  initProductGrid();
  initSearch();
  initModals();
  initMobileMenu();
  initContactForm();
  initPwa();
});

/* ==========================================================================
   Full-Screen Hero Slideshow Logic
   ========================================================================== */
let heroCurrentIndex = 0;
let heroSlideTimer = null;

function initHeroSlider() {
  const slideshow = document.getElementById("hero-slideshow");
  if (!slideshow) return;

  if (typeof getMergedHeroSlides === "function") {
    const slidesData = getMergedHeroSlides();
    if (slidesData && slidesData.length > 0) {
      slideshow.innerHTML = slidesData.map((s, idx) => `
        <div class="hero-slide ${idx === 0 ? 'active' : ''}">
          <img src="${s.image}" alt="${s.title.replace(/<[^>]*>/g, '')}" class="hero-slide-img">
          <div class="hero-slide-overlay"></div>
        </div>
      `).join("");

      const dotsContainer = document.getElementById("hero-slider-dots");
      if (dotsContainer) {
        dotsContainer.innerHTML = slidesData.map((_, idx) => `
          <button type="button" class="dot ${idx === 0 ? 'active' : ''}" onclick="setHeroSlide(${idx})" aria-label="Slide ${idx + 1}"></button>
        `).join("");
      }
    }
  }

  startHeroAutoPlay();

  const heroSec = document.querySelector(".full-screen-hero");
  if (heroSec) {
    heroSec.addEventListener("mouseenter", stopHeroAutoPlay);
    heroSec.addEventListener("mouseleave", startHeroAutoPlay);
    heroSec.addEventListener("touchstart", stopHeroAutoPlay, { passive: true });
  }
}

function startHeroAutoPlay() {
  stopHeroAutoPlay();
  heroSlideTimer = setInterval(() => {
    moveHeroSlide(1);
  }, 5000);
}

function stopHeroAutoPlay() {
  if (heroSlideTimer) {
    clearInterval(heroSlideTimer);
    heroSlideTimer = null;
  }
}

function moveHeroSlide(delta) {
  const slides = document.querySelectorAll(".hero-slide");
  if (!slides.length) return;
  heroCurrentIndex = (heroCurrentIndex + delta + slides.length) % slides.length;
  updateHeroSlideUI();
}

function setHeroSlide(index) {
  heroCurrentIndex = index;
  updateHeroSlideUI();
  startHeroAutoPlay();
}

function updateHeroSlideUI() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll("#hero-slider-dots .dot");

  slides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === heroCurrentIndex);
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === heroCurrentIndex);
  });
}

// Global scope helpers for window onclick handlers
window.moveHeroSlide = moveHeroSlide;
window.setHeroSlide = setHeroSlide;

/* ==========================================================================
   Product Catalog & Filtering
   ========================================================================== */
function initProductGrid() {
  renderPartitionedGrid("bedding-products-grid", "bedding");
  renderPartitionedGrid("fabrics-products-grid", "fabrics");
  renderPartitionedGrid("curtains-products-grid", ["curtains", "accessories"]);
  renderProducts();
  updateCategoryCounts();
}

function renderPartitionedGrid(containerId, categoryFilter) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const sourceProducts = typeof getMergedProducts === "function" ? getMergedProducts() : PRODUCTS;
  const list = sourceProducts.filter(p => {
    if (Array.isArray(categoryFilter)) {
      return categoryFilter.includes(p.category);
    }
    return p.category === categoryFilter;
  });

  container.innerHTML = list.map(renderSingleProductCard).join("");
}

function renderSingleProductCard(product) {
  const badgeHtml = product.badge ? `
    <span class="prod-badge ${product.badge.toLowerCase().includes('sale') ? 'sale' : ''}">
      ${product.badge}
    </span>
  ` : '';

  const oldPriceHtml = product.oldPrice ? `
    <span class="old-price">${formatNaira(product.oldPrice)}</span>
  ` : '';

  const starsHtml = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));

  return `
    <article class="prod-card" data-id="${product.id}">
      <div class="prod-media">
        ${badgeHtml}
        <img src="${product.image}" alt="${product.name}" class="prod-img" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';">
        <button type="button" class="quick-view-overlay-btn" onclick="openQuickView('${product.id}')" aria-label="Quick View for ${product.name}">
          Quick View
        </button>
      </div>
      <div class="prod-body">
        <div class="prod-cat-tag">${product.categoryName}</div>
        <h3 class="prod-title" onclick="openQuickView('${product.id}')">${product.name}</h3>
        <div class="prod-rating" aria-label="Rated ${product.rating} out of 5 stars">
          <span class="stars">${starsHtml}</span>
          <span>(${product.reviewsCount})</span>
        </div>
        <div class="prod-bottom-row">
          <div class="price-box">
            <span class="price">${formatNaira(product.price)}${oldPriceHtml}</span>
          </div>
          <div class="card-actions">
            <button type="button" class="add-cart-btn" onclick="quickAddToCart('${product.id}')" aria-label="Add ${product.name} to Cart">
              Add to Cart
            </button>
            <button type="button" class="whatsapp-direct-btn" onclick="orderDirectWhatsApp('${product.id}')" title="Inquire on WhatsApp" aria-label="Order on WhatsApp">
              💬
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function updateCategoryCounts() {
  const counts = {
    all: PRODUCTS.length,
    bedding: PRODUCTS.filter(p => p.category === "bedding").length,
    fabrics: PRODUCTS.filter(p => p.category === "fabrics").length,
    curtains: PRODUCTS.filter(p => p.category === "curtains").length,
    accessories: PRODUCTS.filter(p => p.category === "accessories").length
  };

  document.querySelectorAll(".filter-tab").forEach(tab => {
    const cat = tab.dataset.category;
    const countBadge = tab.querySelector(".tab-count");
    if (countBadge && counts[cat] !== undefined) {
      countBadge.textContent = counts[cat];
    }
  });
}

function initCategoryTabs() {
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      AppState.activeCategory = tab.dataset.category;
      renderProducts();
    });
  });
}

function initSortSelector() {
  const sortSelect = document.getElementById("catalog-sort");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      AppState.sortBy = e.target.value;
      renderProducts();
    });
  }
}

function getFilteredAndSortedProducts() {
  const sourceProducts = typeof getMergedProducts === "function" ? getMergedProducts() : PRODUCTS;
  let list = [...sourceProducts];

  // Filter by category
  if (AppState.activeCategory !== "all") {
    list = list.filter(p => p.category === AppState.activeCategory);
  }

  // Filter by search query if any
  if (AppState.searchQuery.trim()) {
    const q = AppState.searchQuery.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q)
    );
  }

  // Sort products
  switch (AppState.sortBy) {
    case "price-low":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "name":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "featured":
    default:
      break;
  }

  return list;
}

function renderProducts() {
  const container = document.getElementById("products-grid");
  if (!container) return;

  const products = getFilteredAndSortedProducts();

  if (products.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <p style="font-size: 1.1rem; color: var(--navy); margin-bottom: 8px;">No products found</p>
        <p style="color: var(--muted); font-size: 0.9rem;">Try selecting a different category or clearing your search.</p>
        <button type="button" class="btn btn-gold" style="margin-top: 16px;" onclick="resetFilters()">View All Collections</button>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(product => {
    const badgeHtml = product.badge ? `
      <span class="prod-badge ${product.badge.toLowerCase().includes('sale') ? 'sale' : ''}">
        ${product.badge}
      </span>
    ` : '';

    const oldPriceHtml = product.oldPrice ? `
      <span class="old-price">${formatNaira(product.oldPrice)}</span>
    ` : '';

    const starsHtml = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));

    return `
      <article class="prod-card" data-id="${product.id}">
        <div class="prod-media">
          ${badgeHtml}
          <img src="${product.image}" alt="${product.name}" class="prod-img" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';">
          <button type="button" class="quick-view-overlay-btn" onclick="openQuickView('${product.id}')" aria-label="Quick View for ${product.name}">
            Quick View
          </button>
        </div>
        <div class="prod-body">
          <div class="prod-cat-tag">${product.categoryName}</div>
          <h3 class="prod-title" onclick="openQuickView('${product.id}')">${product.name}</h3>
          <div class="prod-rating" aria-label="Rated ${product.rating} out of 5 stars">
            <span class="stars">${starsHtml}</span>
            <span>(${product.reviewsCount})</span>
          </div>
          <div class="prod-bottom-row">
            <div class="price-box">
              <span class="price">${formatNaira(product.price)}${oldPriceHtml}</span>
            </div>
            <div class="card-actions">
              <button type="button" class="add-cart-btn" onclick="quickAddToCart('${product.id}')" aria-label="Add ${product.name} to Cart">
                Add to Cart
              </button>
              <button type="button" class="whatsapp-direct-btn" onclick="orderDirectWhatsApp('${product.id}')" title="Inquire on WhatsApp" aria-label="Order on WhatsApp">
                💬
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function resetFilters() {
  AppState.activeCategory = "all";
  AppState.searchQuery = "";
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.category === "all");
  });
  renderProducts();
}

/* ==========================================================================
   Shopping Cart Management (LocalStorage)
   ========================================================================== */
function initCart() {
  try {
    const savedCart = localStorage.getItem("salama_cart");
    if (savedCart) {
      AppState.cart = JSON.parse(savedCart);
    }
  } catch (e) {
    AppState.cart = [];
  }
  updateCartBadge();
  renderCartItems();

  const backdrop = document.getElementById("cart-backdrop");
  if (backdrop) {
    backdrop.addEventListener("click", closeCartDrawer);
  }
}

function saveCart() {
  try {
    localStorage.setItem("salama_cart", JSON.stringify(AppState.cart));
  } catch (e) {
    console.error("Could not save cart to localStorage", e);
  }
  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() {
  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".cart-count-badge").forEach(badge => {
    badge.textContent = totalCount;
  });
}

function quickAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const defaultColor = product.colors && product.colors[0] ? product.colors[0].name : "Standard";
  const defaultSize = product.sizes && product.sizes[0] ? product.sizes[0] : "Standard";

  addToCart(product, 1, defaultColor, defaultSize);
  showToast(`Added "${product.name}" to your cart.`);
}

function addToCart(product, quantity = 1, color = "Standard", size = "Standard") {
  const existingIndex = AppState.cart.findIndex(
    item => item.id === product.id && item.color === color && item.size === size
  );

  if (existingIndex > -1) {
    AppState.cart[existingIndex].quantity += quantity;
  } else {
    AppState.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      categoryName: product.categoryName,
      color: color,
      size: size,
      quantity: quantity
    });
  }

  saveCart();
}

function updateItemQuantity(index, delta) {
  if (AppState.cart[index]) {
    AppState.cart[index].quantity += delta;
    if (AppState.cart[index].quantity <= 0) {
      AppState.cart.splice(index, 1);
    }
    saveCart();
  }
}

function removeCartItem(index) {
  if (AppState.cart[index]) {
    const removedName = AppState.cart[index].name;
    AppState.cart.splice(index, 1);
    saveCart();
    showToast(`Removed "${removedName}" from your cart.`);
  }
}

function getCartSubtotal() {
  return AppState.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function renderCartItems() {
  const listContainer = document.getElementById("cart-items-list");
  const subtotalEl = document.getElementById("cart-subtotal-val");
  const drawerHeaderCount = document.getElementById("drawer-cart-count");

  if (!listContainer) return;

  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (drawerHeaderCount) drawerHeaderCount.textContent = `(${totalCount})`;

  if (AppState.cart.length === 0) {
    listContainer.innerHTML = `
      <div class="cart-empty-state">
        <div class="empty-icon">🛍️</div>
        <h4>Your Shopping Bag is Empty</h4>
        <p style="font-size: 0.85rem; margin-top: 6px;">Discover our luxury bedding sets, fine fabrics, and curtains.</p>
        <button type="button" class="btn btn-gold" style="margin-top: 18px;" onclick="closeCartDrawer(); window.location.href='#shop';">
          Explore Collection
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatNaira(0);
    return;
  }

  listContainer.innerHTML = AppState.cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-meta">${item.size !== "Standard" ? item.size + ' • ' : ''}${item.color}</div>
        <div class="cart-item-price">${formatNaira(item.price)}</div>
        <div class="quantity-stepper" style="margin-top: 6px;">
          <button type="button" class="qty-btn" onclick="updateItemQuantity(${index}, -1)" aria-label="Decrease quantity">−</button>
          <span class="qty-val">${item.quantity}</span>
          <button type="button" class="qty-btn" onclick="updateItemQuantity(${index}, 1)" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div>
        <button type="button" class="remove-item-btn" onclick="removeCartItem(${index})" title="Remove item" aria-label="Remove item">
          🗑️
        </button>
      </div>
    </div>
  `).join("");

  if (subtotalEl) {
    subtotalEl.textContent = formatNaira(getCartSubtotal());
  }
}

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  if (drawer && backdrop) {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  if (drawer && backdrop) {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }
}

/* ==========================================================================
   Quick-View Modal Dialog
   ========================================================================== */
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  AppState.selectedProductForModal = product;
  AppState.modalSelectedColor = product.colors && product.colors[0] ? product.colors[0].name : "Standard";
  AppState.modalSelectedSize = product.sizes && product.sizes[0] ? product.sizes[0] : "Standard";
  AppState.modalQuantity = 1;

  const dialog = document.getElementById("quick-view-dialog");
  if (!dialog) return;

  document.getElementById("modal-img").src = product.image;
  document.getElementById("modal-img").alt = product.name;
  document.getElementById("modal-cat").textContent = product.categoryName;
  document.getElementById("modal-title").textContent = product.name;
  document.getElementById("modal-desc").textContent = product.description;
  document.getElementById("modal-price").textContent = formatNaira(product.price);
  document.getElementById("modal-qty-val").textContent = "1";

  // Color Swatches
  const colorsContainer = document.getElementById("modal-colors");
  if (product.colors && product.colors.length > 0) {
    colorsContainer.parentElement.style.display = "block";
    colorsContainer.innerHTML = product.colors.map((c, i) => `
      <button type="button" 
        class="color-swatch ${i === 0 ? 'active' : ''}" 
        style="background-color: ${c.hex};" 
        title="${c.name}" 
        aria-label="Color ${c.name}"
        onclick="selectModalColor('${c.name}', this)">
      </button>
    `).join("");
    document.getElementById("selected-color-name").textContent = product.colors[0].name;
  } else {
    colorsContainer.parentElement.style.display = "none";
  }

  // Size Dropdown
  const sizeSelect = document.getElementById("modal-size");
  if (product.sizes && product.sizes.length > 0) {
    sizeSelect.parentElement.style.display = "block";
    sizeSelect.innerHTML = product.sizes.map(s => `
      <option value="${s}">${s}</option>
    `).join("");
  } else {
    sizeSelect.parentElement.style.display = "none";
  }

  // Specs List
  const specsContainer = document.getElementById("modal-specs");
  if (product.specs) {
    specsContainer.innerHTML = Object.entries(product.specs).map(([key, val]) => `
      <li>
        <strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
        <span>${val}</span>
      </li>
    `).join("");
  } else {
    specsContainer.innerHTML = "";
  }

  dialog.showModal();
}

function selectModalColor(colorName, buttonEl) {
  AppState.modalSelectedColor = colorName;
  document.querySelectorAll("#modal-colors .color-swatch").forEach(el => el.classList.remove("active"));
  buttonEl.classList.add("active");
  const label = document.getElementById("selected-color-name");
  if (label) label.textContent = colorName;
}

function adjustModalQty(delta) {
  AppState.modalQuantity = Math.max(1, AppState.modalQuantity + delta);
  document.getElementById("modal-qty-val").textContent = AppState.modalQuantity;
}

function addModalItemToCart() {
  if (!AppState.selectedProductForModal) return;

  const sizeSelect = document.getElementById("modal-size");
  const selectedSize = sizeSelect && sizeSelect.value ? sizeSelect.value : "Standard";

  addToCart(
    AppState.selectedProductForModal,
    AppState.modalQuantity,
    AppState.modalSelectedColor,
    selectedSize
  );

  closeDialog("quick-view-dialog");
  showToast(`Added ${AppState.modalQuantity}x "${AppState.selectedProductForModal.name}" to your cart.`);
  openCartDrawer();
}

function orderModalItemWhatsApp() {
  if (!AppState.selectedProductForModal) return;

  const product = AppState.selectedProductForModal;
  const sizeSelect = document.getElementById("modal-size");
  const size = sizeSelect && sizeSelect.value ? sizeSelect.value : "Standard";
  const color = AppState.modalSelectedColor;
  const qty = AppState.modalQuantity;
  const total = product.price * qty;

  const message = `✨ *SALAMA FABRICS & BEDDING - DIRECT ORDER* ✨\n\n` +
    `Hello, I would like to order:\n` +
    `• *Product:* ${product.name}\n` +
    `• *Variant/Color:* ${color}\n` +
    `• *Size/Dimensions:* ${size}\n` +
    `• *Quantity:* ${qty}\n` +
    `• *Total Price:* ${formatNaira(total)}\n\n` +
    `Please confirm stock availability and send payment account details. Thank you!`;

  closeDialog("quick-view-dialog");
  window.open(`https://wa.me/2348147709019?text=${encodeURIComponent(message)}`, "_blank");
}

function orderDirectWhatsApp(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const message = `✨ *SALAMA FABRICS & BEDDING - PRODUCT INQUIRY* ✨\n\n` +
    `Hello SALAMA Team, I am interested in:\n` +
    `• *Product:* ${product.name}\n` +
    `• *Price:* ${formatNaira(product.price)}\n` +
    `• *Category:* ${product.categoryName}\n\n` +
    `Is this currently available for delivery? Please provide more details.`;

  window.open(`https://wa.me/2348147709019?text=${encodeURIComponent(message)}`, "_blank");
}

/* ==========================================================================
   Live Search Modal
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      renderSearchResults(q);
    });
  }

  window.addEventListener("keydown", (e) => {
    if ((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openSearchDialog();
    }
  });
}

function openSearchDialog() {
  const dialog = document.getElementById("search-dialog");
  if (dialog) {
    dialog.showModal();
    const input = document.getElementById("search-input");
    if (input) {
      input.value = "";
      input.focus();
      renderSearchResults("");
    }
  }
}

function renderSearchResults(query) {
  const resultsContainer = document.getElementById("search-results-list");
  if (!resultsContainer) return;

  if (!query) {
    resultsContainer.innerHTML = `
      <p style="text-align: center; color: var(--muted); font-size: 0.85rem; padding: 20px;">
        Type to search luxury bedding, damask brocades, velvet curtains, or accessories...
      </p>
    `;
    return;
  }

  const matches = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query) ||
    p.categoryName.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    resultsContainer.innerHTML = `
      <p style="text-align: center; color: var(--muted); font-size: 0.85rem; padding: 20px;">
        No products found matching "${query}".
      </p>
    `;
    return;
  }

  resultsContainer.innerHTML = matches.map(p => `
    <div class="search-result-item" onclick="closeDialog('search-dialog'); openQuickView('${p.id}');">
      <img src="${p.image}" alt="${p.name}" class="search-thumb" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';">
      <div class="search-item-info">
        <h4>${p.name}</h4>
        <span>${formatNaira(p.price)} &bull; ${p.categoryName}</span>
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   Checkout & Payment Gateway Handlers (Paystack, Flutterwave, POD, WhatsApp)
   ========================================================================== */
function openCheckoutModal() {
  if (AppState.cart.length === 0) {
    showToast("Your cart is empty! Please add items before checking out.");
    return;
  }

  const dialog = document.getElementById("checkout-dialog");
  if (!dialog) return;

  closeCartDrawer();

  const summaryBox = document.getElementById("checkout-summary-box");
  const subtotal = getCartSubtotal();

  if (summaryBox) {
    summaryBox.innerHTML = `
      <div class="sum-row">
        <span>Items (${AppState.cart.reduce((s, i) => s + i.quantity, 0)}):</span>
        <span>${formatNaira(subtotal)}</span>
      </div>
      <div class="sum-row">
        <span>Nationwide Delivery:</span>
        <span style="color: var(--success); font-weight: 600;">Calculated at Dispatch</span>
      </div>
      <div class="sum-row" style="font-weight: 700; font-size: 1.05rem; margin-top: 8px; border-top: 1px solid var(--border); padding-top: 8px; color: var(--navy);">
        <span>Total Payable:</span>
        <span>${formatNaira(subtotal)}</span>
      </div>
    `;
  }

  // Update button text according to currently selected payment method
  updateCheckoutButtonText();

  dialog.showModal();
}

function onPaymentMethodChanged(method) {
  AppState.selectedPaymentMethod = method;

  // Update active state visual styling on cards
  document.querySelectorAll(".payment-method-card").forEach(card => card.classList.remove("active"));
  const activeCard = document.getElementById(`label-${method}`);
  if (activeCard) {
    activeCard.classList.add("active");
  }

  const radio = document.getElementById(`pay-method-${method}`);
  if (radio) {
    radio.checked = true;
  }

  // Toggle bank transfer details box
  const bankBox = document.getElementById("bank-details-box");
  if (bankBox) {
    bankBox.style.display = (method === "bank_transfer") ? "block" : "none";
  }

  updateCheckoutButtonText();
}

function updateCheckoutButtonText() {
  const btnText = document.getElementById("checkout-btn-text");
  if (!btnText) return;

  const total = formatNaira(getCartSubtotal());

  switch (AppState.selectedPaymentMethod) {
    case "paystack":
      btnText.textContent = `💳 Pay ${total} with Paystack`;
      break;
    case "flutterwave":
      btnText.textContent = `🦋 Pay ${total} with Flutterwave`;
      break;
    case "bank_transfer":
      btnText.textContent = `🏛️ Confirm Bank Transfer (${total})`;
      break;
    case "pod":
      btnText.textContent = `🚚 Confirm Order (Pay on Delivery)`;
      break;
    case "whatsapp":
      btnText.textContent = `💬 Send Order to WhatsApp`;
      break;
    default:
      btnText.textContent = `Proceed to Payment`;
  }
}

function copySalamaAccount() {
  const accountNum = PAYMENT_CONFIG.bankDetails ? PAYMENT_CONFIG.bankDetails.accountNumber : "0147709019";
  navigator.clipboard.writeText(accountNum).then(() => {
    const btn = document.getElementById("copy-btn-text");
    if (btn) {
      btn.textContent = "✓ Copied!";
      setTimeout(() => { btn.textContent = "📋 Copy"; }, 2500);
    }
    showToast(`Account ${accountNum} copied to clipboard!`);
  }).catch(() => {
    showToast(`Account: ${accountNum}`);
  });
}

function processCheckoutOrder(event) {
  event.preventDefault();

  const name = document.getElementById("cust-name").value.trim();
  const emailInput = document.getElementById("cust-email");
  const email = emailInput ? emailInput.value.trim() : "";
  const phone = document.getElementById("cust-phone").value.trim();
  const address = document.getElementById("cust-address").value.trim();
  const state = document.getElementById("cust-state").value;
  const notes = document.getElementById("cust-notes").value.trim();

  if (!name || !phone || !address) {
    showToast("Please fill in your name, WhatsApp phone number, and delivery address.");
    return;
  }

  if (AppState.cart.length === 0) {
    showToast("Your cart is empty! Add items first.");
    return;
  }

  const subtotal = getCartSubtotal();
  const orderRef = "SALAMA-" + Math.floor(100000 + Math.random() * 900000);
  const orderData = {
    ref: orderRef,
    name,
    email: email || "customer@salamafabrics.ng",
    phone,
    address,
    state,
    notes,
    amount: subtotal,
    items: [...AppState.cart]
  };

  const method = AppState.selectedPaymentMethod || "paystack";

  if (method === "paystack") {
    initiatePaystackPayment(orderData);
  } else if (method === "flutterwave") {
    initiateFlutterwavePayment(orderData);
  } else if (method === "bank_transfer") {
    confirmBankTransferOrder(orderData);
  } else if (method === "pod") {
    confirmPodOrder(orderData);
  } else {
    sendWhatsAppDirectOrder(orderData);
  }
}

// 1. Paystack Inline Checkout
function initiatePaystackPayment(orderData) {
  // CRITICAL FIX: Close native dialog first so the browser top layer doesn't trap or obscure the Paystack iframe
  closeDialog("checkout-dialog");

  showToast("Opening secure Paystack checkout...");

  if (typeof PaystackPop === "undefined") {
    showToast("Paystack SDK not loaded. Switching to Direct Bank Transfer...");
    confirmBankTransferOrder(orderData);
    return;
  }

  try {
    const handler = PaystackPop.setup({
      key: PAYMENT_CONFIG.paystackPublicKey,
      email: orderData.email,
      amount: Math.round(orderData.amount * 100), // Kobo
      currency: "NGN",
      ref: orderData.ref,
      metadata: {
        custom_fields: [
          { display_name: "Customer Name", variable_name: "customer_name", value: orderData.name },
          { display_name: "Phone Number", variable_name: "phone_number", value: orderData.phone },
          { display_name: "Delivery State", variable_name: "delivery_state", value: orderData.state },
          { display_name: "Delivery Address", variable_name: "delivery_address", value: orderData.address }
        ]
      },
      callback: function(response) {
        const txRef = response.reference || response.trxref || orderData.ref;
        handlePaymentSuccess("Paystack Online", txRef, orderData, "Paid & Verified (Instant)");
      },
      onClose: function() {
        showToast("Payment window closed. Reopening checkout options...");
        const dialog = document.getElementById("checkout-dialog");
        if (dialog && typeof dialog.showModal === "function") {
          dialog.showModal();
        }
      }
    });

    handler.openIframe();
  } catch (err) {
    console.error("Paystack error:", err);
    showToast("Paystack unavailable. Switching to Direct Bank Transfer...");
    confirmBankTransferOrder(orderData);
  }
}

// 2. Flutterwave v3 Inline Checkout
function initiateFlutterwavePayment(orderData) {
  // CRITICAL FIX: Close native dialog first so the browser top layer doesn't trap the Flutterwave modal
  closeDialog("checkout-dialog");

  showToast("Opening secure Flutterwave checkout...");

  if (typeof FlutterwaveCheckout === "undefined") {
    showToast("Flutterwave SDK not loaded. Switching to Direct Bank Transfer...");
    confirmBankTransferOrder(orderData);
    return;
  }

  try {
    FlutterwaveCheckout({
      public_key: PAYMENT_CONFIG.flutterwavePublicKey,
      tx_ref: orderData.ref,
      amount: orderData.amount,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd,mobilemoneyghana,barter",
      customer: {
        email: orderData.email,
        phone_number: orderData.phone,
        name: orderData.name
      },
      customizations: {
        title: PAYMENT_CONFIG.businessName,
        description: `Order ${orderData.ref} (${orderData.items.length} items)`,
        logo: PAYMENT_CONFIG.businessLogo
      },
      callback: function(data) {
        const txRef = data.transaction_id || data.tx_ref || orderData.ref;
        handlePaymentSuccess("Flutterwave Online", txRef, orderData, "Paid & Verified (Instant)");
      },
      onclose: function() {
        showToast("Flutterwave window closed. Reopening checkout...");
        const dialog = document.getElementById("checkout-dialog");
        if (dialog && typeof dialog.showModal === "function") {
          dialog.showModal();
        }
      }
    });
  } catch (err) {
    console.error("Flutterwave error:", err);
    showToast("Flutterwave unavailable. Switching to Direct Bank Transfer...");
    confirmBankTransferOrder(orderData);
  }
}

// 3. Direct Bank Transfer Order Confirmation
function confirmBankTransferOrder(orderData) {
  handlePaymentSuccess(
    "Direct Bank Transfer", 
    orderData.ref, 
    orderData, 
    "Awaiting Transfer Confirmation"
  );
}

// 4. Payment on Delivery (POD) Confirmation
function confirmPodOrder(orderData) {
  handlePaymentSuccess(
    "Payment on Delivery (POD)", 
    orderData.ref, 
    orderData, 
    "POD Confirmed (Pay upon Arrival)"
  );
}

// 5. Direct WhatsApp Order
function sendWhatsAppDirectOrder(orderData) {
  const dateStr = new Date().toLocaleDateString('en-GB');

  let itemsListText = orderData.items.map((item, idx) => {
    return `${idx + 1}. *${item.name}*\n   • Option: ${item.color} ${item.size !== "Standard" ? '• ' + item.size : ''}\n   • Qty: ${item.quantity} × ${formatNaira(item.price)} = ${formatNaira(item.quantity * item.price)}`;
  }).join("\n\n");

  const message = 
    `🛍️ *SALAMA FABRICS & BEDDING - NEW ORDER* 🛍️\n` +
    `----------------------------------------\n` +
    `🔖 *Ref:* ${orderData.ref}\n` +
    `📅 *Date:* ${dateStr}\n\n` +
    `👤 *CUSTOMER DETAILS:*\n` +
    `• *Name:* ${orderData.name}\n` +
    `• *WhatsApp:* ${orderData.phone}\n` +
    `• *Email:* ${orderData.email}\n` +
    `• *Address:* ${orderData.address}\n` +
    `• *Location:* ${orderData.state}\n` +
    (orderData.notes ? `• *Order Notes:* ${orderData.notes}\n` : '') +
    `----------------------------------------\n` +
    `📦 *ORDER ITEMS:*\n\n` +
    `${itemsListText}\n` +
    `----------------------------------------\n` +
    `💳 *SUBTOTAL:* ${formatNaira(orderData.amount)}\n` +
    `🚚 *DELIVERY:* Nationwide (Doorstep/Interstate)\n` +
    `----------------------------------------\n` +
    `Please confirm my order and provide payment instructions. Thank you!`;

  closeDialog("checkout-dialog");
  window.open(`https://wa.me/${PAYMENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  showToast("Order prepared! Opening WhatsApp to finalize with our team.");
}

// 6. Payment / Order Success Handler & Receipt Dialog
function handlePaymentSuccess(gateway, reference, orderData, statusLabel = "Paid & Verified") {
  // Clear cart state & storage
  AppState.cart = [];
  saveCart();
  renderCartItems();
  updateCartBadge();

  // Close checkout modal
  closeDialog("checkout-dialog");

  // Populate receipt dialog elements
  const refEl = document.getElementById("receipt-ref");
  const methodEl = document.getElementById("receipt-method");
  const statusEl = document.getElementById("receipt-status");
  const custEl = document.getElementById("receipt-customer");
  const addrEl = document.getElementById("receipt-address");
  const amountEl = document.getElementById("receipt-amount");
  const subtitleEl = document.getElementById("receipt-subtitle");
  const bankBoxEl = document.getElementById("receipt-bank-box");

  if (refEl) refEl.textContent = reference;
  if (methodEl) methodEl.textContent = gateway;
  if (custEl) custEl.textContent = orderData.name;
  if (addrEl) addrEl.textContent = `${orderData.state} (${orderData.address})`;
  if (amountEl) amountEl.textContent = formatNaira(orderData.amount);

  const isPod = gateway.includes("POD") || gateway.includes("Delivery");
  const isBank = gateway.includes("Bank");

  if (bankBoxEl) {
    bankBoxEl.style.display = isBank ? "block" : "none";
  }

  if (statusEl) {
    statusEl.textContent = statusLabel;
    if (isPod) {
      statusEl.className = "receipt-status-badge pod";
      if (subtitleEl) subtitleEl.textContent = "Your order has been booked for Doorstep Delivery! Inspect and pay via Cash or POS to the rider upon receipt.";
    } else if (isBank) {
      statusEl.className = "receipt-status-badge bank-transfer";
      if (subtitleEl) subtitleEl.textContent = "Order placed! Please transfer the subtotal to the GTBank account below and upload your receipt on WhatsApp.";
    } else {
      statusEl.className = "receipt-status-badge";
      if (subtitleEl) subtitleEl.textContent = "Your payment was successful and verified. We are preparing your order for prompt dispatch!";
    }
  }

  // Setup WhatsApp receipt dispatch link
  const waBtn = document.getElementById("receipt-whatsapp-btn");
  if (waBtn) {
    let waHeader = `✅ *SALAMA FABRICS - ONLINE PAYMENT RECEIPT* ✅`;
    if (isPod) {
      waHeader = `🚚 *SALAMA FABRICS - PAYMENT ON DELIVERY CONFIRMATION* 🚚`;
    } else if (isBank) {
      waHeader = `🏛️ *SALAMA FABRICS - DIRECT BANK TRANSFER ORDER* 🏛️`;
    }
    
    let itemsSummary = orderData.items.map((item, idx) => 
      `${idx + 1}. ${item.name} (${item.color}, Qty: ${item.quantity}) - ${formatNaira(item.quantity * item.price)}`
    ).join("\n");

    let actionInstructions = `My payment is completed and verified. Please send dispatch and courier tracking updates. Thank you!`;
    if (isPod) {
      actionInstructions = `Please dispatch my package. I will inspect and pay upon doorstep arrival.`;
    } else if (isBank) {
      actionInstructions = `I have placed a Direct Bank Transfer order. Attached is my payment transfer receipt/proof for confirmation.`;
    }

    const waMsg = 
      `${waHeader}\n` +
      `----------------------------------------\n` +
      `🔖 *Order Reference:* ${reference}\n` +
      `💳 *Payment Method:* ${gateway}\n` +
      `📌 *Status:* ${statusLabel}\n` +
      `💰 *Total Amount:* ${formatNaira(orderData.amount)}\n` +
      (isBank ? `🏦 *Beneficiary:* GTBank | 0147709019 | SALAMA Fabrics Ltd\n` : '') +
      `----------------------------------------\n` +
      `👤 *Customer:* ${orderData.name}\n` +
      `📞 *Phone:* ${orderData.phone}\n` +
      `📍 *Delivery Address:* ${orderData.address}, ${orderData.state}\n` +
      (orderData.notes ? `📝 *Notes:* ${orderData.notes}\n` : '') +
      `----------------------------------------\n` +
      `📦 *Items:* \n${itemsSummary}\n\n` +
      actionInstructions;

    waBtn.onclick = () => {
      window.open(`https://wa.me/${PAYMENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMsg)}`, "_blank");
    };

    const waBtnText = waBtn.querySelector("span");
    if (waBtnText) {
      if (isBank) {
        waBtnText.textContent = "📲 Send Bank Transfer Proof on WhatsApp";
      } else if (isPod) {
        waBtnText.textContent = "🚚 Dispatch Order via WhatsApp";
      } else {
        waBtnText.textContent = "💬 Track & Dispatch via WhatsApp";
      }
    }
  }

  // Display receipt dialog
  const successDialog = document.getElementById("order-success-dialog");
  if (successDialog && typeof successDialog.showModal === "function") {
    successDialog.showModal();
  }

  if (isBank) {
    showToast("Order booked! Please transfer to GTBank account and send proof on WhatsApp.");
  } else if (isPod) {
    showToast("Order booked for Payment on Delivery!");
  } else {
    showToast("Payment successful! Order confirmed.");
  }
}

/* ==========================================================================
   Modals & Dialog Listeners
   ========================================================================== */
function initModals() {
  document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  });
}

function closeDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (dialog && typeof dialog.close === "function") {
    dialog.close();
  }
}

function initMobileMenu() {
  const btn = document.getElementById("menu-toggle-btn");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => menu.classList.remove("open"));
    });
  }
}

function initContactForm() {
  const form = document.getElementById("newsletter-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input && input.value) {
        showToast("Thank you for subscribing to SALAMA Private Previews!");
        input.value = "";
      }
    });
  }
}

function showToast(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✨</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("removing");
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

/* ==========================================================================
   Progressive Web App (PWA) Registration & Install Prompt
   ========================================================================== */
let deferredPrompt = null;

function initPwa() {
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered. Scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }

  // Intercept beforeinstallprompt for Chrome / Android / Desktop PWA
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtns = document.querySelectorAll('.mobile-install-btn');
    installBtns.forEach(btn => btn.style.display = 'inline-flex');
  });

  // Track app installation
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    showToast('SALAMA Fabrics app installed successfully! ✨');
    const installBtns = document.querySelectorAll('.mobile-install-btn');
    installBtns.forEach(btn => btn.style.display = 'none');
  });

  // Bottom navigation tab active state tracker on scroll
  const homeTab = document.getElementById('mobile-tab-home');
  const shopTab = document.getElementById('mobile-tab-shop');
  const shopSection = document.getElementById('shop');

  if (homeTab && shopTab && shopSection) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      const shopTop = shopSection.offsetTop - 120;
      if (scrollPos >= shopTop) {
        shopTab.classList.add('active');
        homeTab.classList.remove('active');
      } else {
        homeTab.classList.add('active');
        shopTab.classList.remove('active');
      }
    }, { passive: true });
  }
}

function triggerPwaInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showToast('Thank you for installing SALAMA Fabrics & Bedding!');
      }
      deferredPrompt = null;
    });
  } else {
    // Show iOS / manual browser install modal
    const dialog = document.getElementById('pwa-install-dialog');
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      showToast('To install: Tap browser menu & select "Add to Home screen" 📲');
    }
  }
}

