const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const nav = document.querySelector('.nav-menu');
console.log(nav)

if(hamburger){
    hamburger.addEventListener('click' , () => {
        navList.classList.toggle('open');
    })
}

if(hamburger){
    hamburger.addEventListener('click' , () => {
        nav.classList.toggle('open-nav');
    })
}

// Popup

const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup-close");

if (popup) {
    closePopup.addEventListener("click", () => {
        popup.classList.add("hide-popup");
    });

    window.addEventListener("load", () => {
        setTimeout(() => {
            popup.classList.remove("hide-popup");
        }, 8000);
    });
}