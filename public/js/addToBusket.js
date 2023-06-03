'use strict';

let goodsWrap = document.querySelector('.goods-wrap');
let busketItems = JSON.parse(localStorage.getItem('busket-goods'));
let goodsAmount = document.querySelector('.shopping-bag-label');

let deleteBtns = document.querySelectorAll('.cross');
let busketGoods = JSON.parse(localStorage.getItem('busket-goods'))

let amountArr = [];

window.addEventListener('load', function () {
    goodsAmount.innerHTML += `(${busketItems.length}):`;
    busketGoods.forEach(item => {
        allWineCategories.forEach(category => {
            let winchik = category.find(wino => wino.id == item)

            if(winchik) {
                let {id, cl, cost, year, avaliableAmount, fixedPrice, quality, description, type, imgURL} = winchik;
            goodsWrap.innerHTML += `
            <div class="goods-item">
            <button class="cross" id="${id}">
                <svg class="" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1L1 13M1 1L13 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>    
            <div class="about-wine">
                <img src="${imgURL}" alt="">
                <div class="wine-description">
                    <div class="first-section">
                        <p class="f-s-color">${type}</p>
                        <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8401 3.60999C19.8086 2.57799 18.4093 1.99817 16.9501 1.99817C15.491 1.99817 14.0916 2.57799 13.0601 3.60999L12.0001 4.66999L10.9401 3.60999C8.79173 1.46161 5.30851 1.46161 3.16012 3.60999C1.01173 5.75838 1.01173 9.24161 3.16012 11.39L12.0001 20.23L20.8401 11.39C21.8721 10.3585 22.4519 8.95913 22.4519 7.49999C22.4519 6.04086 21.8721 4.64152 20.8401 3.60999Z" stroke="#ABADB3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="second-section">
                        <p class="name">${description}</p>
                    </div>
                    <div class="price-wrap">
                        <div class="price-description">
                            <p>Fixed Price</p>
                            <p class="cost-for-one">€${cost}<span> / ${cl}cl</span></p>
                        </div>
                        <div class="price-description">
                            <p>Shipping</p>
                            <p class="shipping-cost">${cost > 100 ? 'Free' : '10€'}</p>
                        </div>
                        <div class="price-description">
                            <p>Quantity</p>
                            <div class="select-wrapper">
  <select name="" id="select-amount-g${id}">
    ${
        function () {
            let option = ``;
            for(let i = 0; i < avaliableAmount; i++) {
                option += `<option value="${i + 1}">${i + 1}</option>`;
            }
            return option;
        }()
    }
  </select>

  <svg class="arrow" version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
    <path d="M61.784,60.169l-8.451,8.45V20h-6.666v48.619l-8.454-8.45l-4.714,4.713l14.145,14.141c1.302,1.303,3.414,1.303,4.713,0
	l14.145-14.141L61.784,60.169z" />
  </svg>
</div>
                        </div>
                        <div class="price-line"></div>
                        <div class="price-description">
                            <p>Subtotal</p>
                            <p class="subtotal">€${cost > 100 ? cost : cost + 10}.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;
        document.querySelectorAll('select').forEach(item => item.style.visibility = 'visible');
            }




        })
        
    });

    let newH1 = document.createElement('h1');
    newH1.className = 'total-price';

    let h1Text = document.createTextNode('Total: ');
    newH1.appendChild(h1Text);

    document.querySelector('.wrap').appendChild(newH1);

    if(busketGoods.length > 0) {
        document.querySelector('.total-price').style.display = 'block';
        document.querySelector('.total-price').style.textAlign = 'right';
    }

    amountArrPush();
    addAndDeleteInTotal(newH1);

    document.querySelectorAll("select").forEach(item => {
        item.addEventListener('change', function (e) {
            let goodsItem = item;
            while((goodsItem.parentNode.className) != "price-wrap") {
    
                if((goodsItem.parentNode.parentNode.className) == "price-wrap") {
                    goodsItem = goodsItem.parentNode.parentNode;
                    console.log(goodsItem);
                    break;
                }
    
                goodsItem = goodsItem.parentNode;
                // console.log(goodsItem);
            }

            let subTotal = goodsItem.querySelector('.subtotal');
            let costForOne = goodsItem.querySelector('.cost-for-one');
            let shippingCostText = goodsItem.querySelector('.shipping-cost').innerText.split('');
            shippingCostText.splice(shippingCostText.length - 1);
            let shippingCost = (goodsItem.querySelector('.shipping-cost').innerText == 'Free') ? 0 : Number(shippingCostText.join(''));
            let costForOneNum = +costForOne.innerText.split(' / ')[0].split('').splice(1).join('') * +item.value + shippingCost;

            subTotal.innerText = `€${costForOneNum}.00`;
            
            addAndDeleteInTotal(newH1);

        })
    })

    
        // Delete from busket;
        deleteBtns = document.querySelectorAll('.cross');
        deleteBtns.forEach(item => item.addEventListener('click', function (e) { 

            let total = Number(newH1.innerText.split(': €')[1]) - Number(item.parentNode.querySelector('.subtotal').innerText.split('').splice(1).join('')); // Розiбратися із ціною за доставку
            if(busketGoods.length == 1) {
                busketGoods = []; 
                newH1.innerText = 'Total: €' + total;
                document.querySelector('.orderbtn-wrap').style.display = 'none';
            } else {
               busketGoods.splice(busketGoods.indexOf(e.target.id), 1);
               newH1.innerText = 'Total: €' + total;
            }
            localStorage.setItem('busket-goods', JSON.stringify(busketGoods));
            goodsAmount.innerText = `My Shopping Bag (${busketGoods.length}):`;

            if(busketGoods.length == 0) {
                document.querySelector('.total-price').style.display = 'none';
            }

            e.target.parentNode.querySelector('select').style.visibility = 'hidden';
            e.target.parentNode.style.display = 'none';
        }))
    })

function addAndDeleteInTotal(newH1) {
    amountArrPush();
    let subTotal = document.querySelectorAll('.subtotal');
    let selects = document.querySelectorAll('select');
    let totalAmount = 0;

    for(let j = 0; j < selects.length; j++) {
        if(selects[j].style.visibility == 'visible') {
            let cost = subTotal[j].innerText.split('');
            cost.splice(0, 1);
            totalAmount += Number(cost.join(''));
        }
    }

    newH1.innerText = 'Total: €' + totalAmount;
    let orderBtn = document.createElement('button');
    let orderBtnWrap = document.createElement('div');
    orderBtnWrap.className = 'orderbtn-wrap';
    orderBtn.className = 'order-btn';
    let orderBtnText = document.createTextNode('Order goods');
    orderBtn.appendChild(orderBtnText);
    orderBtnWrap.appendChild(orderBtn);
    document.body.appendChild(orderBtnWrap);

    if(JSON.parse(localStorage.getItem('busket-goods')).length > 0) {
        document.querySelector('.orderbtn-wrap').style.display = 'flex';
    } else {
        document.querySelector('.orderbtn-wrap').style.display = 'none';
    }

    orderBtn.addEventListener('click', () => {
        let goodsNames = [];
        let subtotals = [];
        let amount = []
        let totalPrice = document.querySelector('.total-price').innerText;

        document.querySelectorAll('.name').forEach(item => {
            goodsNames.push(item.innerText);
        })

        document.querySelectorAll('.subtotal').forEach(item => {
            subtotals.push(item.innerText);
        })

        document.querySelectorAll('select').forEach(item => {
            amount.push(item.value);
        })

        let orderInfo = '<table border="1" style="padding: 10px">';
        orderInfo += '<tr><th style="padding: 5px" align="center">Name</th><th style="padding: 5px" align="center">Amount</th><th style="padding: 5px" align="center">Subtotals</th></tr>'
        for(let i = 0; i < goodsNames.length; i++) {
            orderInfo += `<tr><td style="padding: 5px" align="center">${goodsNames[i]}</td><td style="padding: 5px" align="center">${amount[i]}</td><td style="padding: 5px" align="center">${subtotals[i]}</td></tr>`;
        }
        orderInfo += `<tr><th style="padding: 5px" colspan="3" align="right">${totalPrice}</th></tr></table>`;
        console.log(goodsNames);
        fetch('/api/feedback', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // goodsIDs: JSON.parse(localStorage.getItem('busket-goods')) + '\n',
                info: orderInfo,
                totalPrice: totalPrice
            })
        })
    })

}

function amountArrPush() {
    amountArr = [];
    let selects = document.querySelectorAll("select");
    selects.forEach(item => {
        if(item.style.visibility == 'visible') {
            amountArr.push(item.value);
        }
    })
}