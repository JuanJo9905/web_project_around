import Popup from "./Popup.js";
import Api from "./Api.js";
const groupId = "web_es_11";
const token = "2b046d27-e300-4552-a820-76fed2ad182a";



class Card {
  constructor(texto, enlaceImagen, idImagen, likes, enlaceIconoEliminar, selectorPlantilla, handleCardClick) {
    this.texto = texto;
    this.enlaceImagen = enlaceImagen;
    this._idImagen = idImagen;
    this.likes = likes;
    this.enlaceIconoEliminar = enlaceIconoEliminar;
    this.plantilla = document.querySelector(selectorPlantilla).content.cloneNode(true);
    this._elementoCard = this.plantilla.querySelector('.content__grid-card');
    this._handleCardClick = handleCardClick;
    this._inicializarCard();
  }

  // Método privado para inicializar la tarjeta con los datos proporcionados
  _inicializarCard() {
    this._agregarDatos();
    this._agregarEventListeners();
  }

  // Método privado para agregar los datos a la tarjeta
  _agregarDatos() {
    this._elementoCard.querySelector('.content__grid-card-name').textContent = this.texto;
    this._elementoCard.querySelector('.content__grid-image').src = this.enlaceImagen;
    this._elementoCard.querySelector('.content__grid-image-delete').src = this.enlaceIconoEliminar;
    this._elementoCard.querySelector('.content__grid-number').textContent = this.likes;
  }

  // Método privado para agregar detectores de eventos
  _agregarEventListeners() {
    const botonLike = this._elementoCard.querySelector('.content__grid-like');
    botonLike.addEventListener('click', this._handleLikeClick.bind(this));

    const iconoEliminar = this._elementoCard.querySelector('.content__grid-image-delete');
    iconoEliminar.addEventListener('click', this._handleDeleteClick.bind(this));

    const imagen = this._elementoCard.querySelector('.content__grid-image');
    imagen.addEventListener('click', () => {
      this._handleCardClick(this.enlaceImagen, this.texto);
    });
  }

  // Método privado para manejar el evento de click en el botón de like
  _handleLikeClick(evt) {
    const likeButton = evt.target;
  
    // Verificar si el elemento ya tiene la clase 'content__grid-like-active'
    if (!likeButton.classList.contains('content__grid-like-active')) {
      const api = new Api(
        {
          baseUrl:`https://around.nomoreparties.co/v1/${groupId}/cards/likes/${this._idImagen}`
        ,
        headers:
        {
          authorization: token,
        }
        });
        api.likeCard()
          .then((data)=>{
            likeButton.classList.add('content__grid-like-active');
            console.log('Like añadido');  
          })
          .catch((err)=>{
            console.log(err);
          });

    } else {
      const api = new Api(
        {
          baseUrl:`https://around.nomoreparties.co/v1/${groupId}/cards/likes/${this._idImagen}`
        ,
        headers:
        {
          authorization: token,
        }
        });
      api.dislikeCard()
        .then((data)=>{
          likeButton.classList.remove('content__grid-like-active');
          console.log('Like removido');  
        })
        .catch((err)=>{
          console.log(err);
        });

    }
  }

  // Método privado para manejar el evento de click en el icono de eliminar
  _handleDeleteClick(evt) {
    const elemento = evt.currentTarget.parentNode;
    const confirmPopup = new Popup('#confirm');
    confirmPopup.open();
  
    const button = document.querySelector('#confirm__window-form-button');
    button.disabled = false;
  
    button.addEventListener('click', () => {
      const api = new Api(
        {
          baseUrl:`https://around.nomoreparties.co/v1/${groupId}/cards/${this._idImagen}`
        ,
        headers:
        {
          authorization: token,
        }
        });
      api.deleteCard()  
        .then((data)=>{
          elemento.remove();
          confirmPopup.close();
          console.log('Elemento eliminado');  
        })
        .catch((err)=>{
          console.log(err);
        });
    }, { once: true }); //Evita múltiples clics
  }

  // Método para eliminar el ícono de eliminación
  eliminarIconoEliminar() {
    const iconoEliminar = this._elementoCard.querySelector('.content__grid-image-delete');
    if (iconoEliminar) {
      iconoEliminar.remove();
    }
  }

  // Método público que devuelve el elemento card completamente funcional y lleno de datos
  obtenerElementoCard() {
    return this._elementoCard;
  }
}

export default Card;
