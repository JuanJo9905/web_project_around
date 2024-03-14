document.addEventListener("DOMContentLoaded", function() {
  let addButton = document.querySelector('.content__explorer-add-enable');
  let popupWindow = document.querySelector('.popup__window');
  let popupButton = document.querySelector('.popup__close');

  if (addButton && popupWindow && popupButton) {
    addButton.addEventListener('click', function(){
      popupWindow.classList.toggle("popup__window-enabled");
      popupButton.classList.toggle("popup__close-enabled");
    });

    popupButton.addEventListener('click', function(){
      popupWindow.classList.remove("popup__window-enabled");
      popupButton.classList.remove("popup__close-enabled");
    });
  } else {
    console.error("No se pudo encontrar uno o ambos elementos.");
  }
});


document.addEventListener("DOMContentLoaded", function() {
  let edit = document.querySelector('.content__explorer-edit-enable');
  let editWindow = document.querySelector('.edit');
  let editButton = document.querySelector('.edit__close');

  if (edit && editWindow && editButton) {
    edit.addEventListener('click', function(){
      editWindow.classList.toggle("edit__window-enabled");
      editButton.classList.toggle("edit__close-enabled");
    });

    editButton.addEventListener('click', function(){
      editWindow.classList.remove("edit__window-enabled");
      editButton.classList.remove("edit__close-enabled");
    });
  } else {
    console.error("No se pudo encontrar uno o ambos elementos.");
  }
});


document.addEventListener("DOMContentLoaded", function() {
  let gridImages = document.querySelectorAll('.content__grid-image');
  let popupWindow = document.querySelector('.content__grid-poster');
  let popupButton = document.querySelector('.content__grid-poster-close');
  let popupWindowE = document.querySelector('.popup__window');
  let popupButtonE = document.querySelector('.popup__close');

  if (gridImages.length > 0 && popupWindow && popupButton) {
    gridImages.forEach(function(gridImage) {
      gridImage.addEventListener('click', function(event) {
        let image = event.target.getAttribute('src');
        let name = event.target.parentElement.querySelector('.content__grid-card-name').textContent;

        let posterImage = `url(${image})`;

        let posterImageElement = document.querySelector('.content__grid-poster-image');
        let posterNameElement = document.querySelector('.content__grid-poster-name');

        posterImageElement.style.backgroundImage = posterImage;
        posterNameElement.textContent = name;

        popupWindow.classList.add("content__grid-poster-enabled");
      });
    });
    popupButton.addEventListener('click', function(){
      popupWindow.classList.remove("content__grid-poster-enabled");
    });

  } else {
    console.error("No se pudo encontrar uno o ambos elementos.");
  }
  popupWindowE.classList.remove("popup__window-enabled");
  popupButtonE.classList.remove("popup__close-enabled");
});


let cardContainer = document.querySelector('.content__grid');
let addButton = document.querySelector('.popup__window-form-button');
let deleteButton = document.querySelectorAll('.content__grid-image-delete');
let editButton = document.querySelector('.edit__window-form-button');

function addCard() {
  let image = document.querySelector('#popup__window-form-link');
  let name = document.querySelector('#popup__window-form-title');
  cardContainer.insertAdjacentHTML('beforeend', `
    <div class="content__grid-card">
      <img src="${image.value}" alt="New Image" class="content__grid-image">
      <img src="./images/Trash.svg" alt="eliminar" class="content__grid-image-delete">
      <div class="content__grid-card-description">
        <p class="content__grid-card-name">${name.value}</p><img src="./images/like.svg" alt="like" class="content__grid-like">
      </div>
    </div>
  `);
image.value = '';
name.value = '';
deleteButton = document.querySelectorAll('.content__grid-image-delete');
console.log(deleteButton);
deleteButton.forEach(function(deleteButton) {
  deleteButton.addEventListener("click", function(event) {
    const elemento = event.currentTarget.parentNode;
    console.log(elemento);
    elemento.remove();
  });
});
};

function editExplorer(){
  let name = document.querySelector('#edit__window-form-name');
  let job = document.querySelector('#edit__window-form-title');
  let editWindow = document.querySelector('.edit');
  let editButton = document.querySelector('.edit__close');

  let nameExplorer = document.querySelector('.content__explorer-name');
  let jobExplorer = document.querySelector('.content__explorer-job');

  nameExplorer.textContent = name.value;
  jobExplorer.textContent = job.value;

  editWindow.classList.remove("edit__window-enabled");
  editButton.classList.remove("edit__close-enabled");
}

addButton.addEventListener('click', addCard);

//editButton.addEventListener('click',editExplorer);

deleteButton.forEach(function(deleteButton) {
  deleteButton.addEventListener("click", function(event) {
    const elemento = event.currentTarget.parentNode;
    console.log(elemento);
    elemento.remove();
  });
});


