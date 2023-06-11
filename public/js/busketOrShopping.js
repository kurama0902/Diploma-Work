'use strict';

let continueShoppingBtn = document.querySelector('.continue-shopping');
let goToCartBtn = document.querySelector('.go-to-cart');

continueShoppingBtn.addEventListener('click', function (){
    let busketModal = document.getElementById('busket-items-modal-wrap');
    if(busketModal.style.display == 'flex') {
        busketModal.style.display = 'none';
        document.body.style.overflowY = 'scroll';
    }
})



goToCartBtn.addEventListener('click', function () {
    location.href = '/shopping-bag';
})