const API_URL = "https://hp-api.onrender.com/API/CHARACTERS";
const charactersContainer = document.querySelector("#characters");
let characters = [];

class Character {
  constructor(data) {
    this.name = data.name;
    this.image = data.image || "./images/troll.jpg";
    this.house = data.house;
  }
}

function showCharacters(list) {
  charactersContainer.replaceChildren();

  list.forEach((character) => {
    let houseClass = "";

    if (character.house === "Gryffindor")
      houseClass = "p_griff";
    if (character.house === "Slytherin")
      houseClass = "p_serp";
    if (character.house === "Hufflepuff")
       houseClass = "p_pour";
    if (character.house === "Ravenclaw")
       houseClass = "p_serd";

    const card = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("p");

    image.className = houseClass;
    image.src = character.image;
    image.alt = character.name;
    image.onerror = () => {
      image.src = "./images/troll.jpg";
    };
    name.textContent = character.name;

    card.append(image, name);
    charactersContainer.appendChild(card);
  });
}

document.querySelectorAll(".houses > div").forEach((house) => {
  house.addEventListener("click", () => {
    const houseCharacters = characters
      .filter((character) => character.house === house.dataset.house)
      .sort((a, b) => a.name.localeCompare(b.name));

    showCharacters(houseCharacters);
  });
});

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    characters = data.slice(0, 20).map((character) => new Character(character));
    showCharacters(characters);
  })
  .catch((error) => {
    console.error("Erreur lors du chargement des personnages :", error);
    charactersContainer.textContent = "Impossible de charger les personnages.";
  });
