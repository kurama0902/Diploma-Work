"use strict";

let filterModal = document.getElementById("block-wrap");
let filterBtns = document.querySelectorAll(".filter-btn");
let closeFilterModalBtn = document.querySelector(".close-filter-wrap-btn");
let applyFilters = document.querySelector(".apply-filters");
let clearFilters = document.querySelector(".clear-filters");

let filterId = null;

let infoFromDB = null;
let filteredItemsArr = null;
fillInfoFromDB();


filterBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    filterModal.style.display = "flex";
    document.body.style.overflowY = "hidden";
    filterId = e.target.id;
    filteredItemsArr = infoFromDB[filterId];
    fillSelectsFilterByDefault();
  })
);

closeFilterModalBtn.addEventListener("click", () => {
  filterModal.style.display = "none";
  document.body.style.overflowY = "scroll";
});

year.addEventListener("change", (e) => {
  type.innerHTML = "";
  quality.innerHTML = "";

  infoFromDB[filterId]
    .filter((item) => item.year == e.target.value)
    .forEach((item) => {
      if (
        !type.innerHTML.includes(
          `<option value="${item.type}">${item.type}</option>`
        )
      ) {
        type.innerHTML += `<option value="${item.type}">${item.type}</option>`;
      }

      if (
        !quality.innerHTML.includes(
          `<option value="${item.quality}">${item.quality}</option>`
        )
      ) {
        quality.innerHTML += `<option value="${item.quality}">${item.quality}</option>`;
      }
    });
});

type.addEventListener("change", (e) => {
  quality.innerHTML = ``;

  infoFromDB[filterId]
    .filter((item) => item.type == e.target.value && item.year == year.value)
    .forEach((item) => {
      if (
        !quality.innerHTML.includes(
          `<option value="${item.quality}">${item.quality}</option>`
        )
      ) {
        quality.innerHTML += `<option value="${item.quality}">${item.quality}</option>`;
      }
    });
});

applyFilters.addEventListener("click", () => {
  let yearValue = year.value;
  let typeValue = type.value;
  let qualityValue = quality.value;

  if (
    yearValue === "Year" ||
    typeValue === "Type" ||
    qualityValue === "Quality"
  ) {
    alert("You need to select all the filters correctly!");
  } else {
    let showWinesContainer = document.querySelector(`.${filterId}`);
    filteredItemsArr = [];
    showWinesContainer.innerHTML = "";
    infoFromDB[filterId]
      .filter(
        (item) =>
          item.year == yearValue &&
          item.type == typeValue &&
          item.quality == qualityValue
      )
      .forEach((item) => {
        showWinesContainer.innerHTML += markupItem(item);
        filteredItemsArr.push(item);
      });
    buyAndLikeActions();
  }
});

clearFilters.addEventListener("click", () => {
  filteredItemsArr = infoFromDB;
  fillSelectsFilterByDefault();
});

function fillSelectsFilterByDefault() {
  let year = document.querySelector("#year");
  let type = document.querySelector("#type");
  let quality = document.querySelector("#quality");

  year.innerHTML = `<option value="Year" selected disabled>Year</option>`;
  type.innerHTML = `<option value="Type" selected disabled>Type</option>`;
  quality.innerHTML = `<option value="Quality" selected disabled>Quality</option>`;
  let section = document.querySelector(`.${filterId}`);
  section.innerHTML = "";

  infoFromDB[filterId].forEach((wine) => {
    if (
      !year.innerHTML.includes(
        `<option value="${wine.year}">${wine.year}</option>`
      )
    ) {
      year.innerHTML += `<option value="${wine.year}">${wine.year}</option>`;
    }

    if (
      !type.innerHTML.includes(
        `<option value="${wine.type}">${wine.type}</option>`
      )
    ) {
      type.innerHTML += `<option value="${wine.type}">${wine.type}</option>`;
    }

    if (
      !quality.innerHTML.includes(
        `<option value="${wine.quality}">${wine.quality}</option>`
      )
    ) {
      quality.innerHTML += `<option value="${wine.quality}">${wine.quality}</option>`;
    }

    section.innerHTML += markupItem(wine);
    buyAndLikeActions();
  });
}


async function fillInfoFromDB() {
  infoFromDB = await fetch('/api/popular-wines')
  .then(infoJSON => infoJSON.json())
  .then(info => info)

  filteredItemsArr = infoFromDB;
}
