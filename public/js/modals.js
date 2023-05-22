"use strict";

let modal = document.getElementById('liked-items-modal-wrap');
let modalWindow = document.getElementById('liked-info-wrap');
modalWindow.style.alignItems = 'center';
let closeModalBtn = document.querySelector('#close-liked-modal-btn');
let heartBtn = [document.querySelector('#header-liked'), document.querySelector('#mobile-nav-liked')];

// let notificationsPC = document.querySelector('.notification-popup-wrap');
// let notificationsMob = document.querySelector('notification-popup-wrap-mob');
let popupsList = [document.querySelector('#notification-popup-wrap'), document.querySelector('#notification-popup-wrap-mob')]
let notificationBtn = document.getElementById('header-notifications');
let mobNotificationsBtn = document.getElementById('header-notifications-mob');

heartBtn.forEach(btn => {
    btn.onclick = function showModal(e) {
        modal.style.display = 'flex';
        document.body.style.overflowY = 'hidden';
        let likedGoods = JSON.parse(localStorage.getItem('liked-goods'));
        
        if(likedGoods.length > 0) {
            modalWindow.innerHTML = '<h1 class="liked-goods-label">Your liked goods:</h1>';
        } else {
            modalWindow.innerHTML = '<h1 class="liked-goods-label">Your liked goods basket empty</h1>';
        }
            
        likedGoods.forEach(item => {


            allWineCategories.forEach(category => {
                let likedW = category.find(w => w.id == item);
                if(likedW) {
                    let modalWindow = document.getElementById('liked-info-wrap');
                        let {id, cl, cost, year, avaliableAmount, fixedPrice, quality, description, imgURL} = likedW;
                        modalWindow.innerHTML += `
                        <div class="viewed-wine">
                        <button class="liked-cross" id="l${id}">X</button>
                        <div class="img-and-nameOfWine" style="background-image: url('${imgURL}');">
                            <p class="nameOfWine">${description}</p>
                            <p class="year">${year}</p>
                        </div>
                        <div class="wine-description">
                            <div class="first-section">
                                <div class="amount">
                                    <p class="wine-description-amount">${avaliableAmount} bottles <span>aviable</span></p>
                                </div>
                                <div class="cost">
                                    <p class="wine-description-cost">€${cost} <span>/ ${cl}cl</span></p>
                                </div>
                            </div>
                            <div class="second-section">
                                <div class="quality">
                                    <p class="wine-description-quality">${quality} <span>condition</span></p>
                                </div>
                                <div class="price">
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 7V4.77778C5.5 3.24365 6.84315 2 8.5 2C10.1569 2 11.5 3.24365 11.5 4.77778V7M8.5 11.01V11M4.5 15H12.5C13.6046 15 14.5 14.1046 14.5 13V9C14.5 7.89543 13.6046 7 12.5 7H4.5C3.39543 7 2.5 7.89543 2.5 9V13C2.5 14.1046 3.39543 15 4.5 15Z" stroke="#434960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <p class="wine-description-price">${fixedPrice}</p>
                                </div>
                            </div>
                        </div>
                        <button class="buy" id="b${id}" ${!avaliableAmount && 'disabled'}>Buy</button>                   
                    </div>
                        `;
                        modalWindow.querySelectorAll('.buy').forEach(btn => btn.addEventListener('click', buyAction));
                        deleteItemLiked();
                }
            })
        });
    }
})

    function deleteItemLiked() {
        let deleteLikedBtns = document.querySelectorAll('.liked-cross');
    let likedGoods = JSON.parse(localStorage.getItem('liked-goods'));

    deleteLikedBtns.forEach(item => item.addEventListener('click', function (e) {
            e.target.parentNode.style.display = 'none';
            let cntr = document.querySelectorAll('.liked-goods-counter')
            if(IDs.length == 1) {
                IDs = [];
                modalWindow.innerHTML = '<h1 class="liked-goods-label">Your liked basket empty</h1>';
                cntr.forEach(item => {
                    item.innerText = '0';
                    item.style.display = 'none';
                })
            } else {
               IDs.splice(likedGoods.indexOf(e.target.id.split('')[1]), 1);
                cntr.forEach(item => {
                    item.style.display = 'flex';
                    item.innerText -= 1;
                })
            }

            changeBtnColors(e);
            localStorage.setItem('liked-goods', JSON.stringify(IDs));
    }))
    }
    


closeModalBtn.onclick = function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflowY = 'scroll';
    let modalWindow = document.getElementById('liked-info-wrap');
    modalWindow.innerHTML = '';
}

// popupsList.forEach(block => {
//     if(block.style.display === 'flex') {
//         block.style.display = 'none';
//     } else {
//         block.style.display = 'flex';
//     }
// })

notificationBtn.onclick = function showNotificationBlock() {
    popupsList.forEach(block => {
        if(block.style.display === 'flex') {
            block.style.display = 'none';
        } else {
            block.style.display = 'flex';
        }
    })
}

mobNotificationsBtn.onclick = function showNotificationBlock() {
    popupsList.forEach(block => {
        if(block.style.display === 'flex') {
            block.style.display = 'none';
        } else {
            block.style.display = 'flex';
        }
    })
}





// Description modal
let descriptionModal = document.querySelector('.learn-more-wrap');
let descriptionBtn = document.querySelector('.learn-more');

descriptionBtn.addEventListener('click', () => {
    descriptionModal.style.display = 'block';
    document.body.style.overflowY = 'hidden';
})

descriptionModal.addEventListener('click', (e) => {
    console.log(e.target.className);

    if(e.target.className == 'learn-more-wrap') {
        descriptionModal.style.display = 'none';
        document.body.style.overflowY = 'scroll';
    }
})




// Modal for basket
let busketModal = document.getElementById('busket-items-modal-wrap');
let closeBusketModalBtn = document.getElementById('close-busket-modal-btn');


function changeBtnColors(e) {
    let currentBtn = document.getElementById(e.target.id.split('').splice(1).join(''));
            if(currentBtn.style.backgroundColor == 'white') {
                currentBtn.style.backgroundColor = 'transparent';
                currentBtn.style.stroke = '#ABADB3';
                return;
            } else {
                currentBtn.style.backgroundColor = 'white';
                currentBtn.style.stroke = 'red';
            }
} 