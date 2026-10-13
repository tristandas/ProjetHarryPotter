const API_URL = "https://hp-api.onrender.com/API/CHARACTERS";
const params = new URLSearchParams(window.location.search);
const characterId = params.get("id");

fetch(API_URL)
  .then((response) => response.json())
  .then((characters) => {
    const character = characters.find((item) => item.id === characterId);

    if (!character) {
      document.querySelector("#character-name").textContent = "Personnage introuvable";
      return;
    }

    document.querySelector("#character-name").textContent = character.name;

    const image = document.querySelector("#character-image");
    image.src = character.image || "./images/troll.jpg";
    image.alt = character.name;
    if (character.alive === false) image.style.filter = "grayscale(100%)";
    image.onerror = () => {
      image.src = "./images/troll.jpg";
    };

    document.querySelector("#character-actor").textContent = character.actor || "Inconnu";
    document.querySelector("#character-gender").textContent = character.gender || "Inconnu";
    document.querySelector("#character-eyes").textContent = character.eyeColour || "Inconnu";
    document.querySelector("#character-hair").textContent = character.hairColour || "Inconnu";
    document.querySelector("#character-birth").textContent = character.dateOfBirth || "Inconnu";
    document.querySelector("#character-patronus").textContent = character.patronus || "Inconnu";
    document.querySelector("#character-nickname").textContent =
      character.alternate_names?.join(", ") || "Aucun";

    const houseImage = document.querySelector("#house-image");
    const houses = {
      Gryffindor: "Gryffindor",
      Hufflepuff: "Hufflepuff",
      Ravenclaw: "Ravenclaw",
      Slytherin: "Slytherin",
    };

    if (houses[character.house]) {
      houseImage.src = `./images/logo/${houses[character.house]}.png`;
      houseImage.alt = character.house;
    } else {
      houseImage.remove();
    }
  })
  .catch((error) => {
    console.error("Erreur lors du chargement du personnage :", error);
    document.querySelector("#character-name").textContent = "Impossible de charger le personnage.";
  });
