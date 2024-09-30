/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = () => {
  document
    .getElementById("generate-btn")
    .addEventListener("click", generateRandomCards);

  document
    .getElementById("sort-btn")
    .addEventListener("click", sortAndShowChanges);
};

let generateRandomNumber = () => {
  let numbers = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  let indexNumbers = Math.floor(Math.random() * numbers.length);
  return numbers[indexNumbers];
};

let generateRandomSuit = () => {
  let suit = ["diamond", "spade", "heart", "club"];
  let indexSuit = Math.floor(Math.random() * suit.length);
  return suit[indexSuit];
};

function convertCardValue(value) {
  switch (value) {
    case "1":
      return "A";
    case "11":
      return "J";
    case "12":
      return "Q";
    case "13":
      return "K";
    default:
      return value;
  }
}

function generateRandomCards() {
  const numCards = parseInt(document.getElementById("num-cards").value, 10);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  for (let i = 0; i < numCards; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    const suit = generateRandomSuit();
    card.classList.add(suit);
    const randomNumber = generateRandomNumber();
    card.innerHTML = convertCardValue(randomNumber);
    cardContainer.appendChild(card);
  }

  document.getElementById("cambios-dificiles-container").innerHTML = "";
}

function sortAndShowChanges() {
  const cardsContainer = document.getElementById("card-container");
  const originalCards = Array.from(cardsContainer.querySelectorAll(".card"));
  const cambiosDificilesContainer = document.getElementById(
    "cambios-dificiles-container"
  );

  cambiosDificilesContainer.innerHTML = "";

  const cards = originalCards.map(card => ({
    value: card.innerHTML,
    suit: card.className.split(" ")[1]
  }));

  function selectionSortWithChanges(cards) {
    const n = cards.length;
    let step = 0;

    for (let i = 0; i < n; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (compareCards(cards[j], cards[minIndex]) < 0) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [cards[i], cards[minIndex]] = [cards[minIndex], cards[i]];
        step++;
        displayStep(cards, step);
      }
    }
  }

  function compareCards(card1, card2) {
    const getCardValue = card => {
      if (card.value === "A") return 15;
      if (card.value === "K") return 13;
      if (card.value === "Q") return 12;
      if (card.value === "J") return 11;
      return parseInt(card.value);
    };

    return getCardValue(card1) - getCardValue(card2);
  }

  function displayStep(cards, step) {
    const stepContainer = document.createElement("div");
    stepContainer.className = "step-container";

    const stepNumber = document.createElement("div");
    stepNumber.className = "step-number";
    stepNumber.textContent = step;
    stepContainer.appendChild(stepNumber);

    const cardsRow = document.createElement("div");
    cardsRow.className = "cards-row";

    cards.forEach(card => {
      const cardElement = document.createElement("div");
      cardElement.className = `card ${card.suit}`;
      cardElement.innerHTML = card.value;
      cardsRow.appendChild(cardElement);
    });

    stepContainer.appendChild(cardsRow);
    cambiosDificilesContainer.appendChild(stepContainer);
  }

  selectionSortWithChanges(cards);
}
