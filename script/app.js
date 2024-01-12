const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart-overlay-item');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.product-center');
const productsDetails = document.querySelector('#product-details');
const productLinks = document.querySelector('.product-thumb');
const randomList = document.querySelector('.related');
const randomArrivals = document.querySelector('.new-arrival');
const randomFeatured = document.querySelector('.featured');
const scroll = document.querySelectorAll('.scroll');
const filterinput = document.getElementById('filterinput');
const buttons = document.querySelectorAll('.button-value');
const selectWrapper = document.querySelector('.select-wrapper');
const selectIcon = document.querySelector('.select-icon');
const popUp = document.querySelector('.popup-center');
const dismissPopup = document.querySelector('#dismiss-popup');
const popUpMain = document.querySelector('.popup');
const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");
const nav = document.querySelector(".nav-menu");
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup-close");


let select = document.getElementById("select");
let cart = [];
let buttonsDOM = [];
let randomProducts = [];
let arrSelect = [];
let liElements, dm, sortli;


if (hamburger) {
  hamburger.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

if (hamburger) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("open-nav");
  });
}

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


/*getting the product*/
class Products{
    constructor() {
        this.filteredProducts = [];
    }

    async getProducts(){
        try{
            let result = await fetch('products.json');
            let data = await result.json();

            let products = data.items;
            products = products.map(item => {
                const {title,newPrice,oldPrice,category,status,discount,type,numberOfUnits,rating} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url;
                return {title,newPrice,oldPrice,id,image,category,status,discount,type,numberOfUnits,rating};
            })
            return products;
        }catch (error){
            console.log('error')
        }
    }
}

/*display products*/
class UI{
    displayProductsAll(products) {
        let result = '';
        [...products].forEach(product => {
          if (product.status === "NEW") {
            result += this.getProductHtml(product);
          } else if (product.status === "BESTSELLER") {
            result += this.getProductHtml(product);
          } else if (product.status === "SALE") {
            result += this.getProductHtml(product);
          }
        });
        productsDOM.innerHTML = result;
      }
      
    getProductHtml(product) {
        return `
          <div class="product-item">
            <div class="overlay">
              <a href="productDetails.html?id=${product.id}" class="product-thumb">
                <img src=${product.image} class="featured" alt="product">
                ${(product.status === "SALE") || (product.status === "BESTSELLER")? '<span class="discount">' + product.type + '</span>' : ''}
              </a>
            </div>
            <div class="product-info">
              <span class="product-category">${product.category}</span>
              <a href="productDetails.html?id=${product.id}" class="link">${product.title}</a>
              <div class="prise">
                ${product.status === "SALE" ? '<h4 style="text-decoration: line-through;">€' + product.oldPrice + '</h4>' : ''}
                <span class="new-price"> €${product.newPrice} </span>
              </div>
            </div>
            <ul class="icons">
              <li class="bag-btn" data-id="${product.id}"><i class='bx bx-cart bx-tada' ></i></li>
            </ul>
          </div>
        `;
      }

    displayProductsDetails(products){
                let content = `
                <div class="details">
                <div class="left image-container">
                    <img src=${products.image}  alt="" />
                </div>
                <div class="right">
                    <h2>${products.title}</h2>
                    <div class="price">€${products.newPrice}</div>
                    <form class="form">
                        <a href="#card" data-id="${products.id}" class="bag-btn">Add To Cart</a>
                    </form>
                    <h3>Product Detail</h3>
                    <p class="description">
                    Introducing our one-of-a-kind product line that is perfect for all your needs! Our versatile and innovative products are designed to meet the demands of any lifestyle, making them the ideal choice for anyone looking for high-quality and practical solutions. Whether you're a student, professional, or just looking for convenience, our products are the perfect fit for your needs.
                    </p>
                </div>
            </div>
                `;
                productsDetails.innerHTML = content;     
        }

    randomDisplayProducts(products,id,block){
        const randomCategoryIndex = Math.floor(Math.random() * products.length);
        const category = products[randomCategoryIndex].status;
        const categoryProducts = products.filter(product => product.status === category);
        const randomProducts = [];

        while (randomProducts.length < id) {
            const randomProductIndex = Math.floor(Math.random() * categoryProducts.length);
            const randomProduct = categoryProducts[randomProductIndex];
            if (!randomProducts.includes(randomProduct)) {
                randomProducts.push(randomProduct);
                }
            }

        let res = '';
        randomProducts.forEach(product => {
        res += this.getProductHtml(product);
        });

        block.innerHTML = res;
    }

    filterProduct(products,categoryProduct) {
        
        let items = [...productsDOM.querySelectorAll('.product-item')];
        const category = [...productsDOM.querySelectorAll('.product-category')];

        const allProductsButton = [...buttons].find(button => button.innerText.toUpperCase() === categoryProduct);
        allProductsButton.classList.add('active-categories');
       
        buttons.forEach((button) => {
            button.addEventListener('click' , () => {
                let value = button.dataset.value;
                if(button.innerText === value){
                    buttons.forEach((button) => {
                        button.classList.remove('active-categories');
                      });
                    button.classList.add('active-categories');
                    select.value = 'Default Sorting';
                }
                else{
                    button.classList.remove('active-categories');
                    }
            })
        })

        buttons.forEach(button => {
            let value = button.dataset.value.toUpperCase();
            button.addEventListener('click', () => {
                this.filteredProducts = products.filter(product => {
                    const category = product.category.toUpperCase();
                    const status = product.status.toUpperCase();
                    if((value === 'ALL PRODUCTS') || (value === category) || (value === status)){
                        return true;
                    }
                    else{
                        return false;
                    }
                })
                this.displayProductsAll(this.filteredProducts);
                this.getBagButtons();
            })
        })
    }


    setupSortSelect(products) {
        const sortOriginal = [...products];
        const sortSelect = document.getElementById('select');
      
        const applySorting = () => {
          const selectedValue = sortSelect.value;
          switch (selectedValue) {
            case 'Most Popular':
              this.filteredProducts.sort((a, b) => b.rating - a.rating);
              break;
            case 'Price low to hight':
              this.filteredProducts.sort((a, b) => a.newPrice - b.newPrice);
              break;
            case 'Price hight to low':
              this.filteredProducts.sort((a, b) => b.newPrice - a.newPrice);
              break;
            default:
              const selectedCategory = document.querySelector('.active-categories').dataset.value.toUpperCase();
              this.filteredProducts = sortOriginal.filter(product => {
                const category = product.category.toUpperCase();
                const status = product.status.toUpperCase();
                return selectedCategory === 'ALL PRODUCTS' || category === selectedCategory || status === selectedCategory;
              });
              break;
          }
        };
      
        applySorting();
        this.displayProductsAll(this.filteredProducts);
        // this.getBagButtons();
      
        sortSelect.addEventListener('change', () => {
          applySorting();
          this.displayProductsAll(this.filteredProducts);
          this.getBagButtons();
        });
    }

    getBagButtons(){
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            button.addEventListener('click', event => {
                let id = button.dataset.id;
                let inCart = cart.find(item => item.id === id);
                if (inCart) {
                    inCart.amount++;
                    this.setCartValues(cart);
                    Storage.saveCart(cart);
                    this.populateCart(cart);
                    
                }else{

                    let cartItem = {...Storage.getProduct(id), amount: 1};
                    cart = [...cart, cartItem];
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    this.addCartItem(cartItem);
                }
                this.showCart();
            })
        })
    }

    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.newPrice * item.amount;
            itemsTotal += item.amount;
        });
        cartItems.innerText = itemsTotal;
        cartTotal.textContent = tempTotal.toFixed(2);

    }
    addCartItem(item){
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = ` <img src=${item.image} alt="product">
                    <div>
                        <h4>${item.title}</h4>
                        <h5>€${item.newPrice}</h5>
                        <h4 class="remove-item" data-id=${item.id}>remove</h4>
                    </div>
                    <div>
                        <i class="bx bx-chevron-up" data-id=${item.id}></i>
                        <p class="item-amount">${item.amount}</p>
                        <i class="bx bx-chevron-down" data-id=${item.id}></i>
                    </div>
                    
        `;
        cartContent.prepend(div);
    }

    scroll(){
        const observer = new IntersectionObserver((enteries) => {
            enteries.forEach((entery)=>{
                entery.target.classList.toggle('appear',entery.isIntersecting);
            })
        })

        scroll.forEach(el => observer.observe(el));
    }

    reveal(object){
        let reveals = document.querySelectorAll(object);
        for(let i = 0; i < reveals.length; i++){
            let windowHeight = window.innerHeight;
            let revealTop = reveals[i].getBoundingClientRect().top;
            let revealPoint = 150;

            reveals[i].classList.toggle('active-scroll', revealTop < windowHeight - revealPoint);
        }
    }

    searchButton(){
        const searchBar = document.getElementById('search-bar'),
        searchButton = document.getElementById('search-button');

        searchButton.addEventListener('click', ()=> {
            searchBar.classList.toggle('show-search')
        })
    }

    filterinput(){
        let filerValue = filterinput.value.toUpperCase();
        let item = productsDOM.querySelectorAll('.product-item');
        let found = false;

        for(let i = 0; i < item.length; i++){
            let span = item[i].querySelector('.link');
            if(span.innerHTML.toUpperCase().indexOf(filerValue) > -1){
                item[i].style.display = "initial";
                found = true;
            }else{
                item[i].style.display = "none";
            }
        }

        const noResults = productsDOM.querySelector('.no-results');
        if (noResults) {
          noResults.remove();
        }

        if (!found) {
            const noResults = document.createElement('img');
            noResults.setAttribute('src', '/images/404.png');
            noResults.classList.add('no-results');
            productsDOM.appendChild(noResults);
        }  
    }

    getFilter(){
        const input = document.querySelector('#search-bar');
        input.addEventListener('keypress', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                window.location.href = 'product.html';
            }
          });
    }

    showCart(){
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }
    setupAPP(){
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click',this.showCart);
        closeCartBtn.addEventListener('click',this.hideCart);
        clearCartBtn.addEventListener('click', () => {
        this.clearCart();
        });
    }

    populateCart(cart){
        cartContent.innerHTML = '';
        cart.forEach(item => this.addCartItem(item));
    }

    hideCart(){
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');
    }

    cartLogic(){
        clearCartBtn.addEventListener('click',()=> this.clearCart());

        cartContent.addEventListener('click', event => {
            if(event.target.classList.contains('remove-item')){
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);
            }else if(event.target.classList.contains('bx-chevron-up')) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            }else if(event.target.classList.contains('bx-chevron-down')){
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount - 1;
                if(tempItem.amount > 0){
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    lowerAmount.previousElementSibling.innerText = tempItem.amount;
                }else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement);
                    this.removeItem(id);
                }
                Storage.saveCart(cart);
                this.setCartValues(cart);
            }
        })
    }

    clearCart(){
        cart = [];
        Storage.saveCart(cart);
        this.setCartValues(cart);
        this.populateCart(cart);
    }


    removeItem(id){
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleBtn(id);
        button.disabled = false;
    }
    getSingleBtn(id){
        return buttonsDOM.find(button => button.dataset.id === id);
    }

    validateForm() {

        const form = document.querySelector('.login-form form');
      
        form.addEventListener('submit', function(event) {
            event.preventDefault();
 
            const nameInput = form.querySelector('input[data-rule="name"]');
            const emailInput = form.querySelector('input[data-rule="email"]');
            const passwordInput = form.querySelector('input[data-rule="password"]');
            const errorName = form.querySelector('.error-name');
            const errorEmail = form.querySelector('.error-email');
            const errorPassword = form.querySelector('.error-password');
      
            let isFormValid = true;
      
            if (nameInput) {
              if (!/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/.test(nameInput.value)) {
                isFormValid = false;
                errorName.textContent = 'Please enter a valid name';
              } else {
                errorName.textContent = '';
              }
            }
            
            if (emailInput) {
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                isFormValid = false;
                errorEmail.textContent = 'Please enter a valid email address';
              } else {
                errorEmail.textContent = '';
              }
            }
      
            if (passwordInput) {
              if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(passwordInput.value)) {
                isFormValid = false;
                errorPassword.textContent = 'Password must be at least 8 characters long and contain at least one digit, one lowercase letter and one uppercase letter';
              } else {
                errorPassword.textContent = '';
              }
            }
      
            if (isFormValid) {
                // form.submit();
                form.reset();

                // popup confirm
                popUp.classList.add('active-popup');
                dismissPopup.addEventListener('click',()=>{
                    popUp.classList.remove('active-popup');
                })
            }
          });
        
    }

    getTimer(){
        const countDownDate = new Date("April 1, 2024 00:00:00").getTime();
        
        setInterval(() => {
            const now = new Date().getTime(); 
            const distance = countDownDate - now; 
            const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

            const countdownDays = document.getElementById("days");
            const countdownHours = document.getElementById("hours");
            const countdownMin = document.getElementById("minutes");
            const countdownSec = document.getElementById("seconds");

            countdownDays.innerHTML = days;
            countdownHours.innerHTML = hours;
            countdownMin.innerHTML = minutes;
            countdownSec.innerHTML = seconds;
        }, 1000);
    }

    getPopUp(){
        const popup = document.querySelector(".popup");
        const closePopup = document.querySelector(".popup-close");

        if (popup) {
            closePopup.addEventListener("click", () => {
                popup.classList.add("hide-popup");
            });

            window.addEventListener("load", () => {
                setTimeout(() => {
                    popup.classList.remove("hide-popup");
                }, 7000);
            });
        }
    }

    getInfiniteLogoCarousel(){
        let copy = document.querySelector('.logos-slide').cloneNode(true);
        document.querySelector('.logos').appendChild(copy);
    }

    tiltAnimation(block){
        VanillaTilt.init(document.querySelectorAll(block), {
            scale:1.2,
            reverse:true,
            glare:true,
            'max-glare': 0.5,
        });
    }
}

/*local storage*/
class Storage{
    static saveProduct(products){
        localStorage.setItem('products', JSON.stringify(products))
    }

    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'))
        return products.find(product => product.id === id)
    }

    static saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    static getCart(){
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
    }
}



document.addEventListener('DOMContentLoaded',()=>{
    const ui = new UI();
    const products = new Products();
    let page = document.body.id;

    /*setup app*/
    ui.setupAPP();

    products.getProducts()
        .then(products => {
            switch (page) {
                case 'home-page':
                    ui.randomDisplayProducts(products,8,randomArrivals);
                    ui.randomDisplayProducts(products,8,randomFeatured);
                    ui.getTimer();
                    ui.getPopUp();          
                    Storage.saveProduct(products);
                    break;

                case 'product':
                    window.addEventListener('scroll',ui.reveal('.all-products'));

                    ui.filterProduct(products,"ALL PRODUCTS");
                    ui.setupSortSelect(products);

                    ui.searchButton();

                    filterinput.addEventListener('keyup',() => {
                        ui.filterinput();
                    })

                    Storage.saveProduct(products);
                    break;

                case 'productDetails':
                    const urlParams = new URLSearchParams(window.location.search);
                    const id = urlParams.get('id');
                    const product = products.find(item => item.id === id);
                    window.addEventListener('scroll',ui.reveal('.product-detail'));
                    ui.displayProductsDetails(product);             

                    ui.randomDisplayProducts(products,4,randomList);
                    
                    ui.searchButton();

                    Storage.saveProduct(products);
                    break;

                case 'about-us':
                    window.addEventListener('scroll',ui.reveal('.about-info'));
                    ui.getInfiniteLogoCarousel();
                    ui.searchButton();

                    ui.tiltAnimation('.cards-tilt');
                    
                    Storage.saveProduct(products);
                    break;
                    
                case 'contact':
                    ui.searchButton()
                    window.addEventListener('scroll',ui.reveal('.section-contact-details'));
                    Storage.saveProduct(products);
                    break;

                case 'womens-wear':
                    window.addEventListener('scroll',ui.reveal('.all-products'));

                    ui.filterProduct(products,"WOMEN'S CLOTHES");
                    ui.setupSortSelect(products);
                    ui.searchButton();

                    filterinput.addEventListener('keyup',() => {
                        ui.filterinput();
                    })

                    Storage.saveProduct(products);
                    break;

                case 'mens-wear':
                    window.addEventListener('scroll',ui.reveal('.all-products'));

                    ui.filterProduct(products,"MEN'S WEAR");
                    ui.setupSortSelect(products);
                    ui.searchButton();
                    
                    filterinput.addEventListener('keyup',() => {
                        ui.filterinput();
                    })
    
                    Storage.saveProduct(products);
                    break;
                    
                case 'accessories':
                    window.addEventListener('scroll',ui.reveal('.all-products'));

                    ui.filterProduct(products,"ACCESSORIES");
                    ui.setupSortSelect(products);
                    ui.searchButton();

                    filterinput.addEventListener('keyup',() => {
                        ui.filterinput();
                    })
    
                    Storage.saveProduct(products);
                    break;
                                        
                case 'sale':
                    window.addEventListener('scroll',ui.reveal('.all-products'));

                    ui.filterProduct(products,"SALE");
                    ui.setupSortSelect(products);
                    ui.searchButton();

                    filterinput.addEventListener('keyup',() => {
                        ui.filterinput();
                    })
    
                    Storage.saveProduct(products);
                    break;
                
                case 'login':
                    ui.searchButton();        
                    // ui.logLink(); 
                    Storage.saveProduct(products);
                    break;

                case 'signup':
                    ui.searchButton();        
                    // ui.logLink(); 
                    Storage.saveProduct(products);
                    break;                    
                  
                default:
                    console.log('Error')
            }
            
        })
    .then(() => {
        ui.getBagButtons();
        ui.cartLogic();
        ui.scroll();
        document.addEventListener("DOMContentLoaded", () => ui.getFilter());
        document.addEventListener("DOMContentLoaded", () => ui.validateForm());
    })

});
