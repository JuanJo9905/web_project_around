// NUEVO
const cardsContainer = document.querySelector('.content__grid');

/*
  * Carga las imagenes iniciales haciendo uso del template
*/
function loadImage(img, name){
  const cardTemplate = document.querySelector('#content__grid').content;
  const card = cardTemplate.querySelector('.content__grid-card').cloneNode(true);

  card.querySelector('.content__grid-image').src = img;
  card.querySelector('.content__grid-image-delete').src = '../images/Trash.svg';
  card.querySelector('.content__grid-card-name').textContent = name;
  card.querySelector('.content__grid-like').addEventListener('click',function(evt){
    evt.target.classList.toggle('.content__grid-like-active');
  });
  card.querySelector('.content__grid-image-delete').addEventListener('click',function(evt){
    const elemento = evt.currentTarget.parentNode;
    elemento.remove();
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

edit.addEventListener('click', function(){
  editWindow.classList.add("edit__window-enabled");
  editButton.classList.add("edit__close-enabled");
});

editButton.addEventListener('click', function(){
  editWindow.classList.remove("edit__window-enabled");
  editButton.classList.remove("edit__close-enabled");
});

/**
 * Muestra el poster al darle click
 */
const gridContainer = document.querySelector('.grid');
const gridImages = gridContainer.querySelectorAll('.content__grid-image');
const posterContainer = document.querySelector('.content__grid-poster');
const posterButton = posterContainer.querySelector('.content__grid-poster-close');

gridImages.forEach(element => {
element.addEventListener('click', function(event) {
  const image = event.target.getAttribute('src');
  const name = event.target.parentElement.querySelector('.content__grid-card-name').textContent;
  const posterImage = `url(${image})`;
  const posterImageElement = gridContainer.querySelector('.content__grid-poster-image');
  const posterNameElement = gridContainer.querySelector('.content__grid-poster-name');
  posterImageElement.style.backgroundImage = posterImage;
  posterNameElement.textContent = name;
  posterContainer.classList.add("content__grid-poster-enabled");
});
});

posterButton.addEventListener('click', function(){
  posterContainer.classList.remove("content__grid-poster-enabled");
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
