'use strict';

let sortSelectors = document.querySelectorAll('.sort-by');
let sortBy = null;
let sortedGoods = null;
let sortID = null;
let section = null;

sortSelectors.forEach(selector => {
    selector.addEventListener('change', (e) => {
        sortID = e.target.id.split('filter-')[1];
        section = document.querySelector(`.${sortID}`);
        sortBy = e.target.value;
        section.innerHTML = ``;
        sortByFunc();
        loadSortedGoods();
    })
})




function sortByFunc() {
    if(filteredItemsArr === infoFromDB) {
        if(Number(sortBy) === 1) {
            sortedGoods = Object.assign(infoFromDB)[sortID].sort((a, b) => a.cost - b.cost);
            console.log(sortedGoods);
        } else if(Number(sortBy) === 0) {
            sortedGoods = Object.assign(infoFromDB)[sortID].sort((a, b) => b.cost - a.cost);
            console.log(sortedGoods);
        }
    } else {
        if(Number(sortBy) === 1) {
            sortedGoods = filteredItemsArr.sort((a, b) => a.cost - b.cost);
            console.log(sortedGoods);
        } else if(Number(sortBy) === 0) {
            sortedGoods = filteredItemsArr.sort((a, b) => b.cost - a.cost);
            console.log(sortedGoods);
        }
    }
}

function loadSortedGoods() {
    sortedGoods.forEach(item => {
        let {id, cl, cost, year, avaliableAmount, fixedPrice, quality, description} = item;
        section.innerHTML += markupItem(item);
    });
    buyAndLikeActions();
}

