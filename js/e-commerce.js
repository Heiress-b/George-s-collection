let mall_menu = [
    { image: 'glasses-1.jpg', title: 'Warby Parker', price: 10,},
    { image: 'glasses-2.jpg', title: 'Retrosuperfuture', price: 12,},
    { image: 'glasses-3.jpg', title: 'Costa Del Mar', price: 8,},
    { image: 'glasses-4.jpg', title: 'Nike', price: 12,},
    { image: 'glasses-5.jpg', title: 'Ace and Tate', price: 5,},
    { image: 'glasses-6.jpg', title: 'Akila', price: 10,},
    { image: 'glasses-7.jpg', title: 'Oakley', price: 10,},
    { image: 'glasses-8.jpg', title: 'Maui Jim', price: 10,},
    { image: 'glasses-9.jpg', title: 'Dior', price: 10,},
    { image: 'glasses-10.jpg', title: 'Carrera', price: 10,},
    { image: 'glasses-11.jpg', title: 'Saint Laurent', price: 10,},
    { image: 'glasses-12.jpg', title: ' Kate Spade', price: 10,},
    { image: 'glasses-13.jpg', title: 'Fendi', price: 10,},
    { image: 'glasses-14.jpg', title: 'Coach', price: 10,},
    { image: 'glasses-15.jpg', title: 'Dolce', price: 10,},
    { image: 'glasses-16.jpg', title: 'Gabbana', price: 10,},
];

let searchInput = document.getElementById('enter-book-name'); 

function loadMall() {
    let mallItems = '';
    mall_menu.forEach((m, index) => {
        mallItems += `<div id="menu-item" class="col-12 col-md-3">
            <img src="/img/img/${m.image}" alt="" height="300px">
            <h3>${m.title}</h3>
            <p>$${m.price}<sup> .99</sup></p>
            <p>${m.author}</p>
            <div class="justify-content-between">
                <a href="#display-cart"><button class="add-btn" onclick= "addToCart(${index})">Add to Cart</button></a>
            </div>
        </div>`
    });
    document.getElementById('display-menu').innerHTML = mallItems;
}

function searchFood() {
    let searchInput = document.getElementById('enter-book-name');
    let food = searchInput.value.trim();
    // category = searchInput.value.trim();
    if(food == '') {
        alert('kindly enter your desired food')
    // }else if(category) {
    //     displaycategory(category);
    }else{
        displayFood(food);
    }
}

function displayFood(food) {
    let menulist = mall_menu.find(x => x.title == food);
    if(menulist) {
        let menuitem =`<div id="menu-item" class="col-12 col-md-4">
            <img src="/img/img/${menulist.image}" alt="" height="300px">
            <h3>${menulist.title}</h3>
            <p>$${menulist.price}</p>
            <button class="add-btn" onclick="addToCart(1)">Add to Cart</button>
        </div>`
        document.getElementById('display-menu').innerHTML = menuitem
        searchInput.value = ''
    }else{
        alert(`${food} not in menu`)
        searchInput.value = ''
    }
    
}

cart = [];
function addToCart(menuIndex) {
    let menuItem = mall_menu[menuIndex];
    let cartSearch = cart.find((cartItem) => cartItem.title == menuItem.title);
    if (!cartSearch) {
        document.getElementById('display-cart').innerHTML = ''
        let quantity = 1 
        cart.push({
            title: menuItem.title,
            price: menuItem.price,
            quantity: 1,
            total: menuItem.price
        });
        updateLocalstorage ()
        alert(`${menuItem.title} added to cart`);
        document.getElementById('display-cart').innerHTML +=`<div id="display-cart" class="col-12 col-lg-6 d-lg-block mt-4" style="margin-left: 1px;">        
            <div class="row rounded-2" style="border: 1px dashed; margin-left: 5px; padding: 10px 5px;">
                <div class="col-6">
                    <p style="font-weight: bold;">Pack 1</p>
                </div>
                <div class="col-6 text-end">
                    <i onclick="removeBook('0')"class="bi bi-trash" style="color: red;"></i>
                </div>
                <div class="col-6">
                    Name: ${menuItem.title}
                    <p>Price: ${menuItem.price}</p>
                    <p>Quantity: ${quantity}</p>
                    <p>Total: ${menuItem.price}</p>
                </div>
                <div class="col-6 text-end">
                    <button class="rounded-pill border-0 px-2"> - 1 + </button>
                </div>
                <div class="col-12 text-center">
                    <a href="payment.html" style="color: white;">
                        <button class="rounded-pill border-0 px-2 w-100" style="background-color: #02C27F;">Place Order</button>
                    </a>
                </div>
            </div>
            <div id="display-total"></div>
        </div>`
        cartNumber();
        sumCartTotal()
    } else {
        cartSearch.quantity += 1;
        cartSearch.price = menuItem.price;
        cartSearch.total = cartSearch.quantity * menuItem.price;
        alert('your cart has been updated')
        let ordered_design = ""
        ordered_design +=`<div id="display-cart" class="col-12 col-lg-6 d-lg-block mt-4" style="margin-left: 1px;">
            <div class="row rounded-2" style="border: 1px dashed; margin-left: 5px; padding: 10px 5px;">
                <div class="col-6">
                    <p style="font-weight: bold;">Your Book</p>
                </div>
                <div class="col-6 text-end">
                    <i onclick="removeBook('0')"class="bi bi-trash" style="color: red;"></i>
                </div>
                <div class="col-6">
                    Dish: ${menuItem.title}
                    <p> Price: ${menuItem.price}</p>
                    <p>Quantity: ${cartSearch.quantity}</p>
                    <p>Total: ${cartSearch.total}</p>
                </div>
                <div class="col-6 text-end">
                    <button class="rounded-pill border-0 px-2"> - 1 + </button>
                </div>
                <div class="col-12 text-center">
                    <a href="payment.html" style="color: white;">
                        <button class="rounded-pill border-0 px-2 w-100" style="background-color: #02C27F;">Place Order</button>
                    </a>
                </div>
            </div>
            <div id="display-total"></div>
        </div>`
        document.getElementById('display-cart').innerHTML = ordered_design
        updateLocalstorage();
        sumCartTotal();
        let localCart = localStorage.getItem('mycart');
        let cart = !localCart ? [] : JSON.parse(localCart);
    }
    
}



// function removeFood(name) {
//     let item = cart[name]
//     let index = cart.find(cartitem => cartitem.name == item.name);
//     if(index) {
//         let notification = confirm('are you sure you would like to remove this item?')
//         if(notification == true) {
//             cart.splice(index)
//             alert('your order has been removed')
        
//             document.getElementById('display-cart').innerHTML = ''
//             updateLocalstorage()
//         }else{
//             addFood('index')
//         }
//     }
// }


// function sumCartTotal() {
//     let totalCost = 0;
//     cart.forEach(cartItem => {
//         totalCost += cartItem.total
//     });
//     document.getElementById('display-total').innerHTML = `<p style="font-size: 30px;"> Your Total Bill is: $${totalCost}</p>`;
// }

// function listCartItems() {
//     let cartLi = '';
//     if (cart.length == 0) {
//         cartLi = `<li class="text-center" style="font-size: 80px;" id="cart-bg">your cart appears here!</li>`;
//         // sumCartTotal()
//     } else {
//         cart.forEach((cartItem, index) => {
//             cartLi += `
//             <div id="menu-item" class="col-12">
//             <h4>Item: ${cartItem.name}</h4>
//             <p>Price: $${cartItem.price}</p>
//             <p>Qty: ${cartItem.quantity}</p>
//             <p>Total: $${cartItem.total}</p>
//             <a href="payment.html" style="color: white;">
//                 <button class="rounded-pill border-0 px-2 w-100" style="background-color: #02C27F;">Place Order</button>
//             </a>
//             <div class="col-6 text-end">
//                 <i onclick="removeFood(${index})"class="bi bi-trash" style="color: white;"></i>
//             </div>
//         </div>`
//         });
//         // sumCartTotal()
        
//     }

//     document.getElementById('display-cart').innerHTML = cartLi;
// }

function cartNumber() {
    document.getElementById('count').innerHTML = cart.length;
}

function updateLocalstorage () {
    localStorage.setItem('mycart', JSON.stringify(cart));
}


// listCartItems()
// sumCartTotal()

