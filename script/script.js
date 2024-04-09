const explorerContainer = document.querySelector('.content__explorer');
const closeModal = function (event){
  posterContainer.classList.remove("content__grid-poster-enabled");
  //popupWindow.classList.remove("popup__window-enabled");
  //popupButton.classList.remove("popup__close-enabled");
  //editWindow.classList.remove("edit__window-enabled");
  //editButton.classList.remove("edit__close-enabled");
  console.log('Clickeado!');
};


const cardsContainer = document.querySelector('.content__grid');
/**
 * Muestra el poster al darle click
 */
const gridContainer = document.querySelector('.grid');
const posterContainer = document.querySelector('.content__grid-poster');
const posterButton = posterContainer.querySelector('.content__grid-poster-close');

posterButton.addEventListener('click', function(){
  posterContainer.classList.remove("content__grid-poster-enabled");
});

/*
  * Carga las imagenes iniciales haciendo uso del template
*/
function loadImage(img, name){
  const cardTemplate = document.querySelector('#content__grid').content;
  const card = cardTemplate.querySelector('.content__grid-card').cloneNode(true);

  card.querySelector('.content__grid-image').src = img;
  card.querySelector('.content__grid-image').alt = name;
  card.querySelector('.content__grid-image-delete').src = '../images/Trash.svg';
  card.querySelector('.content__grid-card-name').textContent = name;
  card.querySelector('.content__grid-like').addEventListener('click',function(evt){
    evt.target.classList.toggle('content__grid-like-active');
  });
  card.querySelector('.content__grid-image-delete').addEventListener('click',function(evt){
    const elemento = evt.currentTarget.parentNode;
    elemento.remove();
  });

  card.querySelector('.content__grid-image').addEventListener('click', function(evt) {
    const image = evt.target.getAttribute('src');
    const name = evt.target.parentElement.querySelector('.content__grid-card-name').textContent;
    const posterImageElement = gridContainer.querySelector('.content__grid-poster-image');
    const posterNameElement = gridContainer.querySelector('.content__grid-poster-name');
    posterImageElement.src = img;
    posterImageElement.alt = name;
    posterNameElement.textContent = name;
    posterContainer.classList.add("content__grid-poster-enabled");
    explorerContainer.addEventListener('click', closeModal);
  });
  cardsContainer.append(card);
};

const initialImages = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

initialImages.forEach(element => {
  loadImage(element['link'], element['name']);
});

/**
 * Abre y cierra el pop up
 */
const addButton = document.querySelector('.content__explorer-add-enable');
const popUpContainer = document.querySelector('.popup')
const popupWindow = popUpContainer.querySelector('.popup__window');
const popupButton = popUpContainer.querySelector('.popup__close');

addButton.addEventListener('click',function(){
  popupWindow.classList.add("popup__window-enabled");
  popupButton.classList.add("popup__close-enabled");
});

popupButton.addEventListener('click', function(){
  popupWindow.classList.remove("popup__window-enabled");
  popupButton.classList.remove("popup__close-enabled");
});

/**
 * Abre y cierra la edicion del perfil
 */
const edit = document.querySelector('.content__explorer-edit-enable');
const editWindow = document.querySelector('.edit');
const editButton = editWindow.querySelector('.edit__close');

const explorerName = document.querySelector('.content__explorer-name').textContent;
const explorerJob = document.querySelector('.content__explorer-job').textContent;


edit.addEventListener('click', function(){
  let name = editWindow.querySelector('#edit__window-form-name');
  let job = editWindow.querySelector('#edit__window-form-title');
  editWindow.classList.add("edit__window-enabled");
  editButton.classList.add("edit__close-enabled");
  name.value = explorerName;
  job.value = explorerJob;
});

editButton.addEventListener('click', function(){
  editWindow.classList.remove("edit__window-enabled");
  editButton.classList.remove("edit__close-enabled");
});


/**
 * Añadir una nueva carta
 */
const saveCard = popUpContainer.querySelector('.popup__window-form-button');
const saveEdit = editWindow.querySelector('.edit__window-form-button');

function addCard() {
  let image = popUpContainer.querySelector('#popup__window-form-link');
  let name =  popUpContainer.querySelector('#popup__window-form-title');
  loadImage(image.value, name.value);
  image.value = '';
  name.value = '';
  popupWindow.classList.remove("popup__window-enabled");
  popupButton.classList.remove("popup__close-enabled");
};

function editExplorer(){
  let name = editWindow.querySelector('#edit__window-form-name');
  let job = editWindow.querySelector('#edit__window-form-title');

  let nameExplorer = document.querySelector('.content__explorer-name');
  let jobExplorer = document.querySelector('.content__explorer-job');

  nameExplorer.textContent = name.value;
  jobExplorer.textContent = job.value;

  editWindow.classList.remove("edit__window-enabled");
  editButton.classList.remove("edit__close-enabled");
}

saveCard.addEventListener('click', addCard);
saveEdit.addEventListener('click', editExplorer);


/**
 * Manejo de validaciones

*/

// elimina las clases de error de los span segun su nombre
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

// agrega las clases de error a los span segun su id
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

//Valida si el elemento es valido usuando su contenedor(formulario) y su elemento
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Verifica si por lo menos uno de los elementos es invalido
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Activa o inactiva el botón de acuerdo a la valides de todos los input
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
    buttonElement.removeEventListener('click',addCard);
    buttonElement.removeEventListener('click',editExplorer);

  } else {
    buttonElement.classList.remove("button_inactive");
    saveCard.addEventListener('click', addCard);
    saveEdit.addEventListener('click', editExplorer);
  }
};

const setEventListeners = (inputList, formElement, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(config.inputSelector));
    setEventListeners(fieldsetList, formElement, config);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});
