const winesWrap = document.querySelectorAll(".viewed-wine-wrap");

allWines.wines.forEach(item => {
    winesWrap[0].innerHTML += markupItem(item);
});

allWines.winesNewSale.forEach(item => {
  winesWrap[1].innerHTML += markupItem(item);
});

allWines.winesPremium.forEach(item => {
  winesWrap[2].innerHTML += markupItem(item);
});