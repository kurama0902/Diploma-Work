const winesWrap = document.querySelectorAll(".viewed-wine-wrap");

async function insertGoods () {
  const infoFromDB = await fetch('/api/popular-wines', {
    method: 'GET',
  })
  .then(infoJSON => infoJSON.json())
  .then(info => info);
  
  infoFromDB.popularWines.forEach(item => {
      winesWrap[0].innerHTML += markupItem(item);
  });
  
  infoFromDB.winesNewSale.forEach(item => {
    winesWrap[1].innerHTML += markupItem(item);
  });
  
  infoFromDB.winesPremium.forEach(item => {
    winesWrap[2].innerHTML += markupItem(item);
  });

  buyAndLikeActions();
  // deleteItemLiked();
}

insertGoods();