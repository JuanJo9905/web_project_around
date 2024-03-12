document.addEventListener("DOMContentLoaded", function() {
  let addButton = document.querySelector('.content__explorer_add-enable');
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
  let gridImages = document.querySelectorAll('.content__grid_image');
  let popupWindow = document.querySelector('.content__grid_poster');
  let popupButton = document.querySelector('.content__grid_poster-close');

  if (gridImages.length > 0 && popupWindow && popupButton) {
    gridImages.forEach(function(gridImage) {
      gridImage.addEventListener('click', function(event) {
        let image = event.target.getAttribute('src');
        let name = event.target.parentElement.querySelector('.content__grid_card-name').textContent;

        let posterImage = `url(${image})`;

        let posterImageElement = document.querySelector('.content__grid_poster-image');
        let posterNameElement = document.querySelector('.content__grid_poster-name');

        posterImageElement.style.backgroundImage = posterImage;
        posterNameElement.textContent = name;

        popupWindow.classList.add("content__grid_poster-enabled");
      });
    });
    popupButton.addEventListener('click', function(){
      popupWindow.classList.remove("content__grid_poster-enabled");
    });
  } else {
    console.error("No se pudo encontrar uno o ambos elementos.");
  }
});


let cardContainer = document.querySelector('.content__grid');
let addButton = document.querySelector('.popup__window_form-button');
let deleteButton = document.querySelectorAll('.content__grid_image-delete');

function addCard() {
  let image = document.querySelector('#popup__window_form-link');
  let name = document.querySelector('#popup__window_form-title');
  cardContainer.insertAdjacentHTML('beforeend', `
    <div class="content__grid_card">
      <img src="${image.value}" alt="New Image" class="content__grid_image">
      <img src="./images/Trash.svg" alt="eliminar" class="content__grid_image-delete">
      <div class="content__grid_card-description">
        <p class="content__grid_card-name">${name.value}</p><img src="./images/like.svg" alt="like" class="content__grid_like">
      </div>
    </div>
  `);
image.value = '';
name.value = '';
deleteButton = document.querySelectorAll('.content__grid_image-delete');
console.log(deleteButton);
deleteButton.forEach(function(deleteButton) {
  deleteButton.addEventListener("click", function(event) {
    const elemento = event.currentTarget.parentNode;
    console.log(elemento);
    elemento.remove();
  });
});
};

addButton.addEventListener('click', addCard);

deleteButton.forEach(function(deleteButton) {
  deleteButton.addEventListener("click", function(event) {
    const elemento = event.currentTarget.parentNode;
    console.log(elemento);
    elemento.remove();
  });
});


