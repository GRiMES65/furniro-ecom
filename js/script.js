const sliderImg = document.querySelectorAll(".sliderImg");
const sliderContainer = document.querySelector(".sliderContainer");
const leftArrow = document.querySelector(".sliderArrow .left");
const rightArrow = document.querySelector(".sliderArrow .right");
let counter = 0;


const slideWidth = sliderImg[0].clientWidth + 20; 


function updateArrows() {
    
    if (counter === 0) {
        leftArrow.disabled = true;
    } else {
        leftArrow.disabled = false;
    }

    
    if (counter === sliderImg.length - 1) {
        rightArrow.disabled = true;
    } else {
        rightArrow.disabled = false;
    }
}

function left() {
    if (counter > 0) {
        counter--;
        moveImages();
        updateArrows();
    }
}

function right() {
    if (counter < sliderImg.length - 1) {
        counter++;
        moveImages();
        updateArrows();
    }
}

function moveImages() {
    
    const translateXValue = -counter * slideWidth;
    sliderImg.forEach((img) => {
        img.style.transform = `translateX(${translateXValue}px)`;
    });
}


leftArrow.addEventListener("click", left);
rightArrow.addEventListener("click", right);


updateArrows();


//Shopping Cart

// Shopping Cart Logic
const cartSidebar = document.getElementById("cartSidebar");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = [];

// Function to open the cart sidebar
function openCart() {
    cartSidebar.classList.add("open");
}

// Function to close the cart sidebar
function closeCart() {
    cartSidebar.classList.remove("open");
}

// Function to add an item to the cart
function addToCart(product) {
    const existingItem = cart.find((item) => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    openCart();
}

// Function to update the cart display
function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="decreaseQuantity('${item.name}')">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity('${item.name}')">+</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}

// Function to increase item quantity
function increaseQuantity(name) {
    const item = cart.find((item) => item.name === name);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

// Function to decrease item quantity
function decreaseQuantity(name) {
    const item = cart.find((item) => item.name === name);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCart();
    } else {
        cart = cart.filter((item) => item.name !== name);
        updateCart();
    }
}

// Event Listeners
closeCartBtn.addEventListener("click", closeCart);
checkoutBtn.addEventListener("click", () => {
    alert("Thank you for your purchase!");
    cart = [];
    updateCart();
    closeCart();
});

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll(".prodCardHoverElements button").forEach((button) => {
    button.addEventListener("click", (e) => {
        const productCard = e.target.closest(".productCards");
        const product = {
            name: productCard.querySelector("h4").textContent,
            description: productCard.querySelector("p").textContent,
            price: parseFloat(productCard.querySelector("h4:nth-child(3)").textContent.replace("$", "")),
            image: productCard.querySelector("img").src,
        };
        addToCart(product);
    });
});

// Get the cart icon
const cartIcon = document.getElementById("cartIcon");

// Add event listener to open the cart sidebar
cartIcon.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default link behavior
    openCart(); // Open the cart sidebar
});