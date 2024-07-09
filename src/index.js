import Card from "./script/Card.js";
import FormValidator from "./script/FormValidator.js";
import PopupWithForm from "./script/PopupWithForm.js";
import UserInfo from "./script/UserInfo.js";

/**
 * Manejo de validaciones
 */

// Configuración para la validación del formulario
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Instancia de FormValidator para cada formulario en la página
document.addEventListener("DOMContentLoaded", () => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    validator.enableValidation();
  });
});

const explorerContainer = document.querySelector(".content__explorer");
const closeModal = function (event) {
  posterContainer.classList.remove("content__grid-poster-enabled");
};

const cardsContainer = document.querySelector(".content__grid");

/*
 * Carga las imagenes iniciales haciendo uso del template
 */
function loadImage(img, name) {
  const cardTemplate = document.querySelector("#content__grid").content;
  const card = cardTemplate
    .querySelector(".content__grid-card")
    .cloneNode(true);

  card.querySelector(".content__grid-image").src = img;
  card.querySelector(".content__grid-image").alt = name;
  card.querySelector(".content__grid-image-delete").src = "./images/Trash.svg";
  card.querySelector(".content__grid-card-name").textContent = name;
  card
    .querySelector(".content__grid-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("content__grid-like-active");
    });
  card
    .querySelector(".content__grid-image-delete")
    .addEventListener("click", function (evt) {
      const elemento = evt.currentTarget.parentNode;
      elemento.remove();
    });

  card
    .querySelector(".content__grid-image")
    .addEventListener("click", function (evt) {
      const image = evt.target.getAttribute("src");
      const name = evt.target.parentElement.querySelector(
        ".content__grid-card-name"
      ).textContent;
      const posterImageElement = gridContainer.querySelector(
        ".content__grid-poster-image"
      );
      const posterNameElement = gridContainer.querySelector(
        ".content__grid-poster-name"
      );
      posterImageElement.src = img;
      posterImageElement.alt = name;
      posterNameElement.textContent = name;
      posterContainer.classList.add("content__grid-poster-enabled");
      posterContainer
        .querySelector(".content__grid-poster-overlay")
        .addEventListener("click", closeModal);
    });
  cardsContainer.append(card);
}

const initialImages = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const contenedor_imagenes = document.querySelector(".content__grid");
document.addEventListener("DOMContentLoaded", () => {
  initialImages.forEach((element) => {
    const card = new Card(
      element["name"],
      element["link"],
      "./images/Trash.svg",
      "#content__grid",
      handleCardClick
    );
    contenedor_imagenes.appendChild(card.obtenerElementoCard());
  });
});

/**
 * Muestra el poster al darle click
 */
function handleCardClick(link, name) {
  const posterContainer = document.querySelector(".content__grid-poster");
  const posterButton = posterContainer.querySelector(".content__grid-poster-close");
  const posterImageElement = posterContainer.querySelector(".content__grid-poster-image");
  const posterNameElement = posterContainer.querySelector(".content__grid-poster-name");

  posterImageElement.src = link;
  posterImageElement.alt = name;
  posterNameElement.textContent = name;

  posterContainer.classList.add("content__grid-poster-enabled");

  posterButton.addEventListener("click", function () {
    posterContainer.classList.remove("content__grid-poster-enabled");
  });
}


/**
 * Uso del objeto popup
*/ 
const popUpContainer = document.querySelector(".popup");

const addButton = document.querySelector(".content__explorer-add-enable");
const popupWithForm = new PopupWithForm('.popup', addCard);
addButton.addEventListener("click", function () {
  popupWithForm.open();
});


/*
* Objeto que obtiene los valores del usuario 
*/
const userInfo = new UserInfo({
  nameSelector: '.content__explorer-name',
  jobSelector: '.content__explorer-job'
});
/**
 * Uso del objeto popUp para la edicion
 */
const editWindow = document.querySelector("#edit");
const editForm = editWindow.querySelector("#edit__window");
const editButton = document.querySelector(".content__explorer-edit-enable");
const edit = new PopupWithForm('#edit',editExplorer);
userInfo.getUserInfo();
editButton.addEventListener("click", function () {
  edit.open();
  
});


/**
 * Añadir una nueva carta
 */
const saveCard = popUpContainer.querySelector(".popup__window-form-button");
const saveEdit = editWindow.querySelector("#edit__window-form-button");

function addCard() {
  let image = popUpContainer.querySelector("#popup__window-form-link");
  let name = popUpContainer.querySelector("#popup__window-form-title");
  const card = new Card(
    name.value,
    image.value,
    "./images/Trash.svg",
    "#content__grid",
    handleCardClick
  );
  contenedor_imagenes.appendChild(card.obtenerElementoCard());
  image.value = "";
  name.value = "";
  popUpContainer.classList.remove("popup__enabled");
  }

function editExplorer() {
  let name = editWindow.querySelector("#edit__window-form-name");
  let job = editWindow.querySelector("#edit__window-form-title");

  let nameExplorer = document.querySelector(".content__explorer-name");
  let jobExplorer = document.querySelector(".content__explorer-job");

  nameExplorer.textContent = name.value;
  jobExplorer.textContent = job.value;
  editWindow.classList.remove("popup__enabled");
  }

saveCard.addEventListener("click", addCard);
saveEdit.addEventListener("click", editExplorer);
