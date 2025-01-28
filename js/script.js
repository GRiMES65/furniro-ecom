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