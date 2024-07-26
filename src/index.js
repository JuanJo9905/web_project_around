import Card from "./script/Card.js";
import FormValidator from "./script/FormValidator.js";
import PopupWithForm from "./script/PopupWithForm.js";
import UserInfo from "./script/UserInfo.js";
import "./styles/index.css";

const groupId = "web_es_11";
const token = "2b046d27-e300-4552-a820-76fed2ad182a";

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


/**
 * Obtener las imagenes iniciales del servidor
 */
const contenedor_imagenes = document.querySelector(".content__grid");
let likes = [];
async function getImages(){
  let images = await fetch(`https://around.nomoreparties.co/v1/${groupId}/cards`,{
    headers:{
      'Authorization':token
    }
  })
  .then((res) => {
    if(res.ok){
      return res.json();
    }
    return Promise.reject(res.status);
  })
  .then((data)=>{
    console.log('Imagenes Cargadas: ',data);
    data.forEach((image)=>{
      const card = new Card(
        image.name,
        image.link,
        image._id,
        "./images/Trash.svg",
        "#content__grid",
        handleCardClick
      );
      contenedor_imagenes.appendChild(card.obtenerElementoCard());
      likes.push({[image.name]:image.likes.length});
      if (image.owner._id != '9c29dd25ee3a3c6151ca4cf7'){
        card.eliminarIconoEliminar();
      }
    });
  })
  .catch((err)=>{
    console.log(err);
  })  
  .finally(() =>{
    console.log('Petición images terminada');
    showLikes(likes);

  })
  ;

};
getImages();

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

  let imageEnvio = image.value;
  let nameEnvio = name.value;
  //Envío del formulario al servidor
  fetch(`https://around.nomoreparties.co/v1/${groupId}/cards`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: nameEnvio,
        link: imageEnvio
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) =>{
      console.log('Error en la solicitud: ',err);
    })
    .finally(() =>{
      console.log('Carta enviada');
    });


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

  //Envio de la info al servidor
  fetch(`https://around.nomoreparties.co/v1/${groupId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name.value,
      about: job.value
    })
  })  
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  })
  .catch((err) =>{
    console.log('Error en la solicitud: ',err);
  })
  .finally(() =>{
    console.log('Edicion terminada');
  });
  }

saveCard.addEventListener("click", addCard);
saveEdit.addEventListener("click", editExplorer);


/** 
 * Obtener la información del servidor
*/
function searchUser(groupId,token){
  fetch(`https://around.nomoreparties.co/v1/${groupId}/users/me`,{
    headers:{
      'Authorization': token
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  })
  .then((data) => {
    let nameExplorer = document.querySelector(".content__explorer-name");
    let jobExplorer = document.querySelector(".content__explorer-job");
    let imageExplorer = document.querySelector(".content__explorer-image-image");
  
    nameExplorer.textContent = data.name;
    jobExplorer.textContent = data.about;
    imageExplorer.src = data.avatar;
  })
  .catch((err) =>{
    console.log('Error en la solicitud: ',err);
  })
  .finally(() =>{
    console.log('Petición explorer terminada');
  });
};

searchUser(groupId,token);

/**
 * Funcion que obtiene la cantidad de likes de cada tarjeta
 */
function showLikes(likes){
  likes.forEach((data) =>{
    const key = Object.keys(data)[0]; 
    const val = data[key];
    //console.log(`Lugar: ${key} - Likes: ${val}`);
  });
}



const EditAvatarContainer = document.querySelector("#editAvatar");
const saveAvatar = EditAvatarContainer.querySelector(".popup__window-form-button");
const editAvatarButton = document.querySelector(".content__explorer-image-button");
const popupEditAvatar = new PopupWithForm('#editAvatar', changeAvatarImage);
editAvatarButton.addEventListener("click", function () {
  popupEditAvatar.open();
});

function changeAvatarImage() {
  console.log('Cambiar imagen');
  let image = EditAvatarContainer.querySelector("#editAvatar__window-form-link");
  let profileImage = document.querySelector(".content__explorer-image");
  console.log(image.value);
  //Envío del formulario al servidor
  fetch(`https://around.nomoreparties.co/v1/${groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: image.value
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) =>{
      console.log('Error en la solicitud: ',err);
    })
    .finally(() =>{
      console.log('Imagen actualizada');
    });
  

    const style = document.createElement('style');  
    style.innerHTML = `.content__explorer-image.new-background::before { background-image: url('${image.value}'); }`;
    document.head.appendChild(style);  
    profileImage.classList.add('new-background');
    popupEditAvatar.close();
  }

  saveAvatar.addEventListener("click", changeAvatarImage);