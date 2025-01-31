//Card Slider

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


const cartSidebar = document.getElementById("cartSidebar");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = [];


function openCart() {
    cartSidebar.classList.add("open");
}


function closeCart() {
    cartSidebar.classList.remove("open");
}


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


function increaseQuantity(name) {
    const item = cart.find((item) => item.name === name);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}


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


closeCartBtn.addEventListener("click", closeCart);
checkoutBtn.addEventListener("click", () => {
    alert("Thank you for your purchase!");
    cart = [];
    updateCart();
    closeCart();
});


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


const cartIcon = document.getElementById("cartIcon");


cartIcon.addEventListener("click", (e) => {
    e.preventDefault(); 
    openCart(); 
});