'use strict';

let viewedWineWrap = document.querySelector('.viewed-wine-wrap');
let busketInfo = document.getElementById('busket-info-wrap');
let buyBtns = document.querySelectorAll('.buy');

let IDs = [];

function deleteAction(ev) {
    let busketGoods = JSON.parse(localStorage.getItem('busket-goods')) || [];
    const deleteItemId = ev.target.id.split('')[1];
    if (busketGoods.length == 1) {
        busketGoods = [];
        busketInfo.innerHTML = '<h1 class="busket-label">Your goods basket empty</h1>';
    } else {
        busketGoods.splice(busketGoods.indexOf(deleteItemId), 1);
    }
    localStorage.setItem('busket-goods', JSON.stringify(busketGoods));
    ev.target.parentNode.style.display = 'none';
}

const renderWineInBusketModal = (wine) => {
    // let { id, cost, year, description, imgURL } = wine;
    busketInfo.innerHTML += `<div class="item-wrap">
            <img class="busket-img" src="${wine.imgURL}" alt="">
            <div class="name-and-description">
              <p>${wine.description} ${wine.year}</p>
              <div class="cost">
                <p>Cost: ${wine.cost}$</p>
              </div>
            </div>
            <button id="${'c' + wine.id}" class="delete-item-modal">X</button>
          </div>`;

    let deleteItemBtns = document.querySelectorAll('.delete-item-modal');
    deleteItemBtns = deleteItemBtns.forEach((btn) => btn.addEventListener('click', deleteAction));
    return;
}

const changeBtnColorsAction = (e) => {
    let currentBtn = document.getElementById(e.target.id);
    if (currentBtn.style.backgroundColor == 'white') {
        currentBtn.style.backgroundColor = 'transparent';
        currentBtn.style.stroke = '#ABADB3';
        return;
    }
    currentBtn.style.backgroundColor = 'white';
    currentBtn.style.stroke = 'red';
    currentBtn.style.fill = 'red';
}

const likeAction = (e) => {
    e.stopPropagation();
    if (!IDs.includes(e.target.id)) {
        changeBtnColorsAction(e);
        IDs.push(e.target.id);
        localStorage.setItem('liked-goods', JSON.stringify(IDs));
        likedGoodsCounter.forEach(item => {
            item.style.display = 'flex';
            item.innerText = (Number(item.innerText) + 1).toString();
        }) 
    } else {
        changeBtnColorsAction(e);
        if (IDs.length === 1) {
            IDs.pop()
            // modalWindow.innerHTML = '<h1 class="busket-label">Your liked goods basket empty</h1>';
            likedGoodsCounter.forEach(item => {
                item.style.display = 'none';
                item.innerText = 0;
            })
        }
        let index = IDs.findIndex(item => item === e.target.id);
        IDs.splice(index, 1);
        localStorage.setItem('liked-goods', JSON.stringify(IDs));
        if (IDs.length != 0) {
            likedGoodsCounter.forEach(item => {
                item.innerText = (Number(item.innerText) - 1).toString();
            })
        }
    }
}

const buyAction = (e) => {
    busketModal.style.display = 'flex';
    document.body.style.overflowY = 'hidden';

    const wineId = e.target.id.split('').splice(1).join('');
    const busketGoods = JSON.parse(localStorage.getItem('busket-goods')) || [];

    if (busketGoods && busketGoods.length > 0) {
        if (!busketGoods.includes(wineId)) {
            busketGoods.push(wineId);
            localStorage.setItem('busket-goods', JSON.stringify(busketGoods));

            let allWinesKeys = Object.keys(allWines);
            allWinesKeys.forEach(key => {
                let currentWine = allWines[key].find((wine) => String(wine.id) === wineId);
                if(currentWine) {
                    renderWineInBusketModal(currentWine);
                }
            }) 
        }
    } else {
        busketInfo.innerHTML = '<h1 class="busket-label">Goods:</h1>';
        localStorage.setItem('busket-goods', JSON.stringify([wineId]));
        allWineCategories.forEach(category => {
            const wine = category.find((wine) => String(wine.id) === wineId);
            if (wine) {
                renderWineInBusketModal(wine);
            }
        })
    }
}

window.addEventListener('load', buyAndLikeActions);

function buyAndLikeActions() {
    IDs = JSON.parse(localStorage.getItem('liked-goods'));
    if (IDs === null) IDs = [];
    let likedBtns = document.querySelectorAll('.liked-wine');

    for (let i = 0; i < IDs.length; i++) {
        let el = document.getElementById(IDs[i]);
        if (el.style.backgroundColor == 'white') {
            el.style.backgroundColor = 'transparent';
            el.style.stroke = '#ABADB3';
            break;
        }
        el.style.backgroundColor = 'white';
        el.style.stroke = 'red';
    }

    likedBtns = likedBtns.forEach(btn => btn.addEventListener('click', likeAction));

    buyBtns = document.querySelectorAll('.buy');
    buyBtns = buyBtns.forEach(btn => btn.addEventListener('click', buyAction))
}
