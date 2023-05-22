let likedGoodsCounter = [document.querySelector('#liked-goods-counter'), document.querySelector('#liked-goods-counter-mob')];

if(JSON.parse(localStorage.getItem('liked-goods')) != null && JSON.parse(localStorage.getItem('liked-goods')).length != 0) {
    likedGoodsCounter.forEach(item => {
        item.style.display = 'flex';
        item.innerText += Number(JSON.parse(localStorage.getItem('liked-goods')).length);
    })
}

// Adding to localStorage id of goods

let addToBusketBtns = document.querySelectorAll('.buy');


if(!localStorage.getItem('busket-goods')) localStorage.setItem('busket-goods', JSON.stringify([]));