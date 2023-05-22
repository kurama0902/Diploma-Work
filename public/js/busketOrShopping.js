'use strict';

let continueShoppingBtn = document.querySelector('.continue-shopping');
let goToCartBtn = document.querySelector('.go-to-cart');

continueShoppingBtn.addEventListener('click', function (){
    let busketModal = document.getElementById('busket-items-modal-wrap');
    if(busketModal.style.display == 'flex') {
        busketModal.style.display = 'none';
        document.body.style.overflowY = 'scroll';
        // let busketInfo = document.getElementById('busket-info-wrap');
        // busketInfo.innerHTML = '<h1 class="busket-label">Goods:</h1>';
    }
})



goToCartBtn.addEventListener('click', function () {
    location.href = '/shopping-bag';
})