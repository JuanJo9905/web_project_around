class Card {
  constructor(texto, enlaceImagen, enlaceIconoEliminar, selectorPlantilla, handleCardClick) {
    this.texto = texto;
    this.enlaceImagen = enlaceImagen;
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
    evt.target.classList.toggle('content__grid-like-active');
  }

  // Método privado para manejar el evento de click en el icono de eliminar
  _handleDeleteClick(evt) {
    const elemento = evt.currentTarget.parentNode;
    elemento.remove();
  }

  // Método público que devuelve el elemento card completamente funcional y lleno de datos
  obtenerElementoCard() {
    return this._elementoCard;
  }
}

export default Card;
